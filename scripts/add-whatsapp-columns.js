#!/usr/bin/env node

/**
 * Production Database Migration: Add WhatsApp Columns
 *
 * This script adds the missing WhatsApp-related columns to the SiteSettings table.
 * Run this in production environment with:
 *   node scripts/add-whatsapp-columns.js
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addWhatsAppColumns() {
  try {
    console.log('🔄 Starting database migration...');
    console.log('📊 Adding WhatsApp columns to SiteSettings table\n');

    // Execute raw SQL to add columns
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "SiteSettings"
      ADD COLUMN IF NOT EXISTS whatsapp_number VARCHAR(255),
      ADD COLUMN IF NOT EXISTS whatsapp_message TEXT,
      ADD COLUMN IF NOT EXISTS whatsapp_enabled BOOLEAN DEFAULT true;
    `);

    console.log('✅ WhatsApp columns added successfully!\n');

    // Verify the columns were added
    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'SiteSettings'
      AND column_name IN ('whatsapp_number', 'whatsapp_message', 'whatsapp_enabled')
      ORDER BY column_name;
    `);

    console.log('📋 Verification - WhatsApp columns in SiteSettings:');
    columns.forEach((col) => {
      console.log(`   ✓ ${col.column_name.padEnd(20)} | ${col.data_type.padEnd(25)} | nullable: ${col.is_nullable} | default: ${col.column_default || 'none'}`);
    });

    console.log('\n🎉 Migration completed successfully!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
addWhatsAppColumns()
  .then(() => {
    console.log('\n✨ Database is now ready for WhatsApp widget functionality!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
