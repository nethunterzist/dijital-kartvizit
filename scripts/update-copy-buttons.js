const fs = require('fs');
const path = require('path');

// Template files to update
const templateFiles = [
    'app/lib/templates/template-base.ts',
    'app/lib/templates/template3-minimal.ts',
    'app/lib/templates/template4-corporate.ts',
    'app/lib/templates/template5-colorful.ts',
    'app/lib/templates/template7-corporate-slate.ts',
    'app/lib/templates/template8-clean-sheet.ts',
    'app/lib/templates/template9-night-pulse.ts',
    'app/lib/templates/template10-glass-aura.ts',
    'app/lib/templates/template11-pastel-bloom.ts',
    'app/lib/templates/template12-retro-signal.ts',
    'app/lib/templates/template13-gridfolio.ts',
    'app/lib/templates/template14-monotone.ts',
    'app/lib/templates/template15-vibe-stream.ts',
    'app/lib/templates/template16-goldmark.ts',
    'app/lib/templates/template17-green-soul.ts',
    'app/lib/templates/template18-ocean-breeze.ts',
    'app/lib/templates/template19-sunset-glow.ts',
    'app/lib/templates/template20-purple-rain.ts',
    'app/lib/templates/template21-crimson-edge.ts'
];

function updateTemplate(filePath) {
    try {
        console.log(`Updating ${filePath}...`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace tax information copy buttons with icons
        content = content.replace(
            /<button class="copy-btn" onclick="copyToClipboard\('{{tax\.firma_unvan}}', event\)">Kopyala<\/button>/g,
            '<button class="copy-btn" onclick="copyToClipboard(\'{{tax.firma_unvan}}\', event)"><i class="fas fa-copy"></i></button>'
        );
        
        content = content.replace(
            /<button class="copy-btn" onclick="copyToClipboard\('{{tax\.firma_vergi_no}}', event\)">Kopyala<\/button>/g,
            '<button class="copy-btn" onclick="copyToClipboard(\'{{tax.firma_vergi_no}}\', event)"><i class="fas fa-copy"></i></button>'
        );
        
        content = content.replace(
            /<button class="copy-btn" onclick="copyToClipboard\('{{tax\.vergi_dairesi}}', event\)">Kopyala<\/button>/g,
            '<button class="copy-btn" onclick="copyToClipboard(\'{{tax.vergi_dairesi}}\', event)"><i class="fas fa-copy"></i></button>'
        );
        
        // Update the copyToClipboard function to handle icons
        content = content.replace(
            /function copyToClipboard\(text, event\) {[\s\S]*?btn\.textContent = originalText;[\s\S]*?}, 1000\);[\s\S]*?}\)/g,
            `function copyToClipboard(text, event) {
        event.preventDefault();
        if (!text) return;
        navigator.clipboard.writeText(text).then(function() {
            const btn = event.currentTarget;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#48bb78';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = btn.style.background.replace('#48bb78', '');
            }, 1000);
        });
    }`
        );
        
        // Update CSS for copy buttons to ensure proper inline display
        content = content.replace(
            /\.copy-btn {[\s\S]*?}/g,
            (match) => {
                if (match.includes('display: inline-flex')) {
                    return match; // Already updated
                }
                return match.replace(
                    /padding: \d+px \d+px;/,
                    'padding: 6px 8px;'
                ).replace(
                    /font-size: [\d.]+rem;/,
                    'font-size: 0.75rem;'
                ).replace(
                    /margin-left: \d+px;/,
                    'margin-left: 8px;'
                ).replace(
                    /}/,
                    `    display: inline-flex;
            align-items: center;
            vertical-align: middle;
        }`
                );
            }
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Successfully updated ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Update all template files
templateFiles.forEach(updateTemplate);

console.log('\n🎉 All template files have been updated!');
