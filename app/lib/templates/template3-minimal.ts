export const minimalTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        /* 1. CSS Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* 2. HTML/Body */
        html, body {
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: #ffffff;
            color: #1f2937;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #ffffff;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 60px 30px;
            text-align: center;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 40px;
        }
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #f3f4f6;
            margin: 0 auto;
            display: block;
        }
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #f9fafb;
            border: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 50px;
        }
        .company-name {
            font-size: 1.875rem;
            font-weight: 300;
            margin-bottom: 8px;
            color: #111827;
            letter-spacing: -0.025em;
        }
        .person-name {
            font-size: 1.25rem;
            font-weight: 400;
            margin-bottom: 4px;
            color: #374151;
        }
        .position {
            font-size: 1rem;
            color: #6b7280;
            margin-bottom: 30px;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #111827;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.875rem;
            font-weight: 500;
            transition: background-color 0.2s;
        }
        .contact-button:hover {
            background: #1f2937;
            color: white;
            text-decoration: none;
        }
        
        /* 7. Icons Section - Liste formatı */
        .icons-grid {
            display: flex;
            flex-direction: column;
            gap: 1px;
            background: #f3f4f6;
            border-radius: 8px;
            overflow: hidden;
            margin-top: 40px;
        }
        
        /* 8. Icon Cards - Liste item formatı */
        .icon-card {
            background: white;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: background-color 0.2s;
            cursor: pointer;
        }
        .icon-card:hover {
            background: #f9fafb;
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 16px;
            width: 100%;
        }
        .icon-card i {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            background: #f3f4f6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #6b7280;
            flex-shrink: 0;
        }
        .icon-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #111827;
            flex: 1;
            text-align: left;
        }
        
        /* 9. Icon Styles - Platform Colors */
        .icon-card:nth-child(1) i { color: #059669; background: #ecfdf5; } /* QR */
        .icon-card i.fa-phone { color: #0ea5e9; background: #f0f9ff; }
        .icon-card i.fa-envelope { color: #dc2626; background: #fef2f2; }
        .icon-card i.fa-whatsapp { color: #16a34a; background: #f0fdf4; }
        .icon-card i.fab.fa-telegram { color: #0891b2; background: #f0fdfa; }
        .icon-card i.fab.fa-instagram { color: #e11d48; background: #fdf2f8; }
        .icon-card i.fab.fa-facebook { color: #1d4ed8; background: #eff6ff; }
        .icon-card i.fab.fa-twitter { color: #0ea5e9; background: #f0f9ff; }
        .icon-card i.fab.fa-linkedin { color: #1e40af; background: #eff6ff; }
        .icon-card i.fab.fa-youtube { color: #dc2626; background: #fef2f2; }
        .icon-card i.fab.fa-tiktok { color: #111827; background: #f9fafb; }
        .icon-card i.fa-globe { color: #7c3aed; background: #f5f3ff; }
        .icon-card i.fa-map-marker-alt { color: #ea580c; background: #fff7ed; }
        .icon-card i.fa-university { color: #059669; background: #ecfdf5; }
        .icon-card i.fa-file-text { color: #0ea5e9; background: #f0f9ff; }
        .icon-card i.fa-info-circle { color: #0ea5e9; background: #f0f9ff; }
        .icon-card i.fa-book { color: #92400e; background: #fefbf3; }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 8px;
            background: #f9fafb;
            padding: 8px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #d1d5db;
            background: #f3f4f6;
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            position: relative;
            animation: popupIn 0.2s ease;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #9ca3af;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #6b7280;
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #111827;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #374151;
            line-height: 1.5;
        }
        .copy-btn {
            background: #f3f4f6;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 4px 8px;
            color: #374151;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            transition: all 0.2s;
        }
        .copy-btn:hover {
            background: #e5e7eb;
            border-color: #9ca3af;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
        }
        .iban-text {
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            padding: 8px 12px;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
        }
        .iban-text:focus {
            border-color: #6b7280;
            outline: none;
        }
        
        /* 11. Animations */
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <!-- Profile Section -->
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-user" style="font-size: 48px; color: #9ca3af;"></i>
                </div>
                {{/if}}
            </div>

            <!-- Company Info -->
            <div class="company-info">
                <h1 class="company-name">{{firma_adi}}</h1>
                {{#if yetkili_adi}}
                <h2 class="person-name">{{yetkili_adi}}</h2>
                {{/if}}
                {{#if yetkili_pozisyon}}
                <p class="position">{{yetkili_pozisyon}}</p>
                {{/if}}
                
                <a href="/{{slug}}/{{slug}}.vcf" download="{{firma_adi}}.vcf" class="contact-button">
                    <i class="fas fa-address-book"></i>
                    Rehbere Ekle
                </a>
            </div>

            <!-- Icons Section -->
            <div class="icons-grid">
                <!-- QR Kod - Her zaman ilk sırada -->
                <div class="icon-card">
                    <a href="/{{slug}}/qr" target="_blank">
                        <i class="fas fa-qrcode"></i>
                        <span class="icon-label">QR Kod</span>
                    </a>
                </div>
                
                <!-- Sosyal Medya -->
                {{#if social_media}}
                    {{#each social_media}}
                    <div class="icon-card">
                        <a href="{{this.url}}" target="_blank">
                            <i class="{{this.icon}}"></i>
                            <span class="icon-label">{{this.label}}</span>
                        </a>
                    </div>
                    {{/each}}
                {{/if}}
                
                <!-- İletişim -->
                {{#if communication}}
                    {{#each communication}}
                    <div class="icon-card">
                        <a href="{{this.url}}" target="_blank">
                            <i class="{{this.icon}}"></i>
                            <span class="icon-label">{{this.label}}</span>
                        </a>
                    </div>
                    {{/each}}
                {{/if}}

                <!-- Katalog -->
                {{#if katalog}}
                <div class="icon-card">
                    <a href="{{katalog.url}}" target="_blank">
                        <i class="fas fa-book"></i>
                        <span class="icon-label">{{katalog.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Banka -->
                {{#if iban}}
                <div class="icon-card">
                    <a href="#" onclick="showBankPopup(event)">
                        <i class="fas fa-university"></i>
                        <span class="icon-label">{{iban.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Vergi -->
                {{#if tax}}
                <div class="icon-card">
                    <a href="#" onclick="showTaxPopup(event)">
                        <i class="fas fa-file-text"></i>
                        <span class="icon-label">{{tax.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Hakkımızda -->
                {{#if about}}
                <div class="icon-card">
                    <a href="#" onclick="showAboutPopup(event)">
                        <i class="fas fa-info-circle"></i>
                        <span class="icon-label">{{about.label}}</span>
                    </a>
                </div>
                {{/if}}
            </div>

            <!-- Firma Logosu - En altta -->
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>

    <!-- Vergi Bilgileri Popup -->
    <div id="tax-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeTaxPopup()">&times;</button>
            <h2 class="popup-title">Vergi Bilgileri</h2>
            <div class="tax-info">
                <div><strong>Firma Ünvanı:</strong> {{tax.firma_unvan}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_unvan}}', event)">Kopyala</button>
                </div>
                <div><strong>Vergi Numarası:</strong> {{tax.firma_vergi_no}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_vergi_no}}', event)">Kopyala</button>
                </div>
                <div><strong>Vergi Dairesi:</strong> {{tax.vergi_dairesi}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.vergi_dairesi}}', event)">Kopyala</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Hakkımızda Popup -->
    <div id="about-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeAboutPopup()">&times;</button>
            <h2 class="popup-title">Hakkımızda</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <!-- Banka Hesapları Popup -->
    <div id="bank-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 12px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 500; font-size: 0.875rem; color: #111827;">{{bank.bank_label}}</div>
                                    <div style="color: #6b7280; font-size: 0.75rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: #111827; color: white; font-weight: 500; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
                                        {{#if this.currency}}
                                            {{#ifEquals this.currency "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.currency "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 8px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#9ca3af; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
                {{/if}}
            </div>
        </div>
    </div>

    <script>
    function showTaxPopup(e) {
        e.preventDefault();
        document.getElementById('tax-popup').style.display = 'flex';
    }
    function closeTaxPopup() {
        document.getElementById('tax-popup').style.display = 'none';
    }
    function showAboutPopup(e) {
        e.preventDefault();
        document.getElementById('about-popup').style.display = 'flex';
    }
    function closeAboutPopup() {
        document.getElementById('about-popup').style.display = 'none';
    }
    function copyToClipboard(text, event) {
        event.preventDefault();
        if (!text) return;
        navigator.clipboard.writeText(text).then(function() {
            const btn = event.currentTarget;
            const originalText = btn.textContent;
            btn.textContent = 'Kopyalandı!';
            btn.style.background = '#d1fae5';
            btn.style.borderColor = '#a7f3d0';
            btn.style.color = '#065f46';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#f3f4f6';
                btn.style.borderColor = '#d1d5db';
                btn.style.color = '#374151';
            }, 1000);
        });
    }
    function showBankPopup(e) {
        e.preventDefault();
        document.getElementById('bank-popup').style.display = 'flex';
    }
    function closeBankPopup() {
        document.getElementById('bank-popup').style.display = 'none';
    }
    </script>
</body>
</html>`;
