#!/bin/bash

# 🗄️ AUTOMATED BACKUP SYSTEM FOR DIJITAL KARTVIZIT
# This script creates automated backups of database and uploaded files

set -e  # Exit on any error

# Configuration
BACKUP_DIR="/var/backups/dijital-kartvizit"
DATABASE_NAME="dijital_kartvizit"
UPLOADS_DIR="./public/uploads"
RETENTION_DAYS=30
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="/var/log/backup.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
    log "INFO: $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
    log "SUCCESS: $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
    log "WARNING: $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
    log "ERROR: $1"
}

# Check if running as root or with sufficient privileges
check_privileges() {
    if [[ $EUID -ne 0 ]] && ! groups $USER | grep -q '\bdocker\b'; then
        print_warning "Script not running as root. Some operations might fail."
    fi
}

# Create backup directory structure
create_backup_dirs() {
    print_status "Creating backup directory structure..."
    
    mkdir -p "$BACKUP_DIR"/{database,uploads,logs,config}
    mkdir -p "$BACKUP_DIR/database/$TIMESTAMP"
    mkdir -p "$BACKUP_DIR/uploads/$TIMESTAMP"
    
    print_success "Backup directories created"
}

# Backup SQLite database
backup_sqlite() {
    print_status "Backing up SQLite database..."
    
    if [ -f "./db.sqlite" ]; then
        cp "./db.sqlite" "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite"
        
        # Create SQL dump as well
        if command -v sqlite3 &> /dev/null; then
            sqlite3 "./db.sqlite" ".dump" > "$BACKUP_DIR/database/$TIMESTAMP/database_dump.sql"
            print_success "SQLite database backed up successfully"
        else
            print_warning "sqlite3 command not found. Binary backup only."
        fi
    else
        print_warning "SQLite database file not found"
    fi
}

# Backup PostgreSQL database (if used)
backup_postgresql() {
    print_status "Backing up PostgreSQL database..."
    
    if [ ! -z "$DATABASE_URL" ]; then
        # Extract database connection details from DATABASE_URL
        DB_HOST=$(echo $DATABASE_URL | sed -n 's/.*@\([^:]*\):.*/\1/p')
        DB_NAME=$(echo $DATABASE_URL | sed -n 's/.*\/\([^?]*\).*/\1/p')
        DB_USER=$(echo $DATABASE_URL | sed -n 's/postgresql:\/\/\([^:]*\):.*/\1/p')
        
        if command -v pg_dump &> /dev/null; then
            pg_dump "$DATABASE_URL" > "$BACKUP_DIR/database/$TIMESTAMP/postgresql_dump.sql"
            print_success "PostgreSQL database backed up successfully"
        else
            print_error "pg_dump command not found. Cannot backup PostgreSQL."
            return 1
        fi
    else
        print_status "No PostgreSQL DATABASE_URL found, skipping..."
    fi
}

# Backup uploaded files
backup_uploads() {
    print_status "Backing up uploaded files..."
    
    if [ -d "$UPLOADS_DIR" ]; then
        # Create tar.gz archive of uploads
        tar -czf "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" -C "$UPLOADS_DIR" .
        
        # Calculate file count and size
        FILE_COUNT=$(find "$UPLOADS_DIR" -type f | wc -l)
        TOTAL_SIZE=$(du -sh "$UPLOADS_DIR" | cut -f1)
        
        print_success "Uploaded files backed up successfully ($FILE_COUNT files, $TOTAL_SIZE)"
    else
        print_warning "Uploads directory not found: $UPLOADS_DIR"
    fi
}

# Backup configuration files
backup_config() {
    print_status "Backing up configuration files..."
    
    # Backup important config files (excluding secrets)
    cp package.json "$BACKUP_DIR/config/$TIMESTAMP/" 2>/dev/null || true
    cp next.config.js "$BACKUP_DIR/config/$TIMESTAMP/" 2>/dev/null || true
    cp tailwind.config.js "$BACKUP_DIR/config/$TIMESTAMP/" 2>/dev/null || true
    cp schema.prisma "$BACKUP_DIR/config/$TIMESTAMP/" 2>/dev/null || true
    
    # Create environment template (without secrets)
    if [ -f ".env.example" ]; then
        cp ".env.example" "$BACKUP_DIR/config/$TIMESTAMP/"
    fi
    
    print_success "Configuration files backed up"
}

# Create backup manifest
create_manifest() {
    print_status "Creating backup manifest..."
    
    MANIFEST_FILE="$BACKUP_DIR/manifest_$TIMESTAMP.json"
    
    cat > "$MANIFEST_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "version": "$(node -p "require('./package.json').version" 2>/dev/null || echo 'unknown')",
  "environment": "${NODE_ENV:-development}",
  "backup_type": "full",
  "components": {
    "database": $([ -f "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite" ] && echo "true" || echo "false"),
    "postgresql": $([ -f "$BACKUP_DIR/database/$TIMESTAMP/postgresql_dump.sql" ] && echo "true" || echo "false"),
    "uploads": $([ -f "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" ] && echo "true" || echo "false"),
    "config": true
  },
  "sizes": {
    "database_mb": $([ -f "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite" ] && echo $(du -m "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite" | cut -f1) || echo 0),
    "uploads_mb": $([ -f "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" ] && echo $(du -m "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" | cut -f1) || echo 0)
  },
  "retention_days": $RETENTION_DAYS,
  "next_cleanup": "$(date -d "+$RETENTION_DAYS days" -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

    print_success "Backup manifest created: $MANIFEST_FILE"
}

# Cleanup old backups
cleanup_old_backups() {
    print_status "Cleaning up backups older than $RETENTION_DAYS days..."
    
    # Find and remove old backup directories
    find "$BACKUP_DIR" -type d -name "20*" -mtime +$RETENTION_DAYS -exec rm -rf {} + 2>/dev/null || true
    
    # Find and remove old manifest files
    find "$BACKUP_DIR" -name "manifest_*.json" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
    
    REMAINING_BACKUPS=$(find "$BACKUP_DIR" -type d -name "20*" | wc -l)
    print_success "Cleanup completed. $REMAINING_BACKUPS backup sets remaining."
}

# Verify backup integrity
verify_backup() {
    print_status "Verifying backup integrity..."
    
    local errors=0
    
    # Check database backup
    if [ -f "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite" ]; then
        if sqlite3 "$BACKUP_DIR/database/$TIMESTAMP/db.sqlite" "PRAGMA integrity_check;" | grep -q "ok"; then
            print_success "SQLite backup integrity verified"
        else
            print_error "SQLite backup integrity check failed"
            ((errors++))
        fi
    fi
    
    # Check uploads backup
    if [ -f "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" ]; then
        if tar -tzf "$BACKUP_DIR/uploads/$TIMESTAMP/uploads.tar.gz" > /dev/null 2>&1; then
            print_success "Uploads backup integrity verified"
        else
            print_error "Uploads backup integrity check failed"
            ((errors++))
        fi
    fi
    
    if [ $errors -eq 0 ]; then
        print_success "All backup integrity checks passed"
        return 0
    else
        print_error "$errors integrity check(s) failed"
        return 1
    fi
}

# Send backup notification (webhook)
send_notification() {
    local status=$1
    local message=$2
    
    if [ ! -z "$BACKUP_WEBHOOK_URL" ]; then
        curl -X POST "$BACKUP_WEBHOOK_URL" \
             -H "Content-Type: application/json" \
             -d "{
               \"timestamp\": \"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",
               \"status\": \"$status\",
               \"message\": \"$message\",
               \"environment\": \"${NODE_ENV:-development}\",
               \"backup_id\": \"$TIMESTAMP\"
             }" 2>/dev/null || true
    fi
}

# Main backup function
main() {
    print_status "Starting automated backup process..."
    log "=== BACKUP STARTED ==="
    
    local start_time=$(date +%s)
    
    # Pre-flight checks
    check_privileges
    
    # Create backup structure
    create_backup_dirs
    
    # Perform backups
    backup_sqlite
    backup_postgresql
    backup_uploads
    backup_config
    
    # Create manifest and verify
    create_manifest
    
    if verify_backup; then
        # Cleanup old backups
        cleanup_old_backups
        
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        
        print_success "✅ Backup completed successfully in ${duration} seconds"
        log "=== BACKUP COMPLETED SUCCESSFULLY ==="
        
        send_notification "success" "Backup completed successfully in ${duration} seconds"
        
        return 0
    else
        print_error "❌ Backup completed with errors"
        log "=== BACKUP COMPLETED WITH ERRORS ==="
        
        send_notification "error" "Backup completed with integrity check failures"
        
        return 1
    fi
}

# Script usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help           Show this help message"
    echo "  -d, --dir DIR        Custom backup directory"
    echo "  -r, --retention DAYS Retention period in days (default: 30)"
    echo "  -t, --test           Test mode (dry run)"
    echo ""
    echo "Environment Variables:"
    echo "  DATABASE_URL         PostgreSQL connection string"
    echo "  BACKUP_WEBHOOK_URL   Webhook URL for notifications"
    echo "  NODE_ENV            Environment (development/production)"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            usage
            exit 0
            ;;
        -d|--dir)
            BACKUP_DIR="$2"
            shift 2
            ;;
        -r|--retention)
            RETENTION_DAYS="$2"
            shift 2
            ;;
        -t|--test)
            print_status "Running in test mode (dry run)"
            # Add dry run logic here if needed
            shift
            ;;
        *)
            echo "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Run main function
main "$@"