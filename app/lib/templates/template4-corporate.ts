export const corporateTemplate = `
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
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0a;
            color: #ffffff;
            overflow-y: auto;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
            position: relative;
            border-left: 1px solid #333;
            border-right: 1px solid #333;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 50px 30px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 40px;
            position: relative;
        }
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #FFD700;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
            margin: 0 auto;
            display: block;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
        }
        .profile-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: #2a2a2a;
            border: 3px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 50px;
        }
        .company-name {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        .person-name {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 8px;
            color: #FFD700;
            letter-spacing: -0.01em;
        }
        .position {
            font-size: 1.125rem;
            color: #cccccc;
            margin-bottom: 30px;
            font-weight: 300;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 16px 32px;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            color: #000000;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .contact-button:hover {
            background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
            color: #000000;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 350px;
            margin: 0 auto;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            border: 1px solid #333;
            border-radius: 16px;
            padding: 24px 16px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .icon-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            transition: left 0.5s;
        }
        .icon-card:hover::before {
            left: 100%;
        }
        .icon-card:hover {
            background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
            border-color: #FFD700;
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            position: relative;
            z-index: 1;
        }
        .icon-card i {
            font-size: 28px;
            color: #FFD700;
            margin-bottom: 8px;
            transition: transform 0.3s ease;
        }
        .icon-card:hover i {
            transform: scale(1.1);
        }
        .icon-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #ffffff;
            line-height: 1.2;
            text-align: center;
        }
        
        /* 9. Icon Styles - Platform Colors */
        .icon-card:nth-child(1) i { color: #FFD700; } /* QR */
        .icon-card i.fa-phone { color: #4CAF50; }
        .icon-card i.fa-envelope { color: #FF5722; }
        .icon-card i.fa-whatsapp { color: #25D366; }
        .icon-card i.fab.fa-telegram { color: #0088cc; }
        .icon-card i.fab.fa-instagram { color: #E4405F; }
        .icon-card i.fab.fa-facebook { color: #1877F2; }
        .icon-card i.fab.fa-twitter { color: #1DA1F2; }
        .icon-card i.fab.fa-linkedin { color: #0A66C2; }
        .icon-card i.fab.fa-youtube { color: #FF0000; }
        .icon-card i.fab.fa-tiktok { color: #ffffff; }
        .icon-card i.fa-globe { color: #9C27B0; }
        .icon-card i.fa-map-marker-alt { color: #FF9800; }
        .icon-card i.fa-university { color: #FFD700; }
        .icon-card i.fa-file-text { color: #2196F3; }
        .icon-card i.fa-info-circle { color: #2196F3; }
        .icon-card i.fa-book { color: #795548; }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            padding: 8px;
            border: 1px solid #FFD700;
            transition: all 0.3s ease;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
        }
        .logo-image:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
            border-color: #FFA500;
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .custom-popup-content {
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            border: 1px solid #FFD700;
            border-radius: 20px;
            padding: 32px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            position: relative;
            animation: popupIn 0.4s ease;
            color: #ffffff;
        }
        .custom-popup-close {
            position: absolute;
            top: 20px;
            right: 24px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #FFD700;
            cursor: pointer;
            transition: all 0.2s;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .custom-popup-close:hover {
            background: rgba(255, 215, 0, 0.1);
            transform: rotate(90deg);
        }
        .popup-title {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 24px;
            color: #FFD700;
            text-align: center;
            letter-spacing: -0.02em;
        }
        .tax-info div, .about-content {
            margin-bottom: 16px;
            font-size: 1rem;
            color: #cccccc;
            line-height: 1.6;
        }
        .tax-info strong {
            color: #FFD700;
        }
        .copy-btn {
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
            border: none;
            border-radius: 8px;
            padding: 6px 8px;
            color: #000000;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 600;
            transition: all 0.2s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #FFA500 0%, #FFD700 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: linear-gradient(135deg, #333 0%, #2a2a2a 100%);
            border: 1px solid #444;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 16px;
            transition: all 0.3s ease;
        }
        .bank-card:hover {
            border-color: #FFD700;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
        }
        .iban-text {
            background: #1a1a1a;
            border: 2px solid #444;
            border-radius: 12px;
            padding: 12px 16px;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.875rem;
            width: 100%;
            margin: 8px 0;
            transition: all 0.2s;
            color: #ffffff;
        }
        .iban-text:focus {
            border-color: #FFD700;
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        }
        
        /* 11. Animations */
        @keyframes popupIn {
            from { transform: scale(0.8) translateY(30px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
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
                    <i class="fas fa-user" style="font-size: 64px; color: #FFD700;"></i>
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
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_unvan}}', event)"><i class="fas fa-copy"></i></button>
                </div>
                <div><strong>Vergi Numarası:</strong> {{tax.firma_vergi_no}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_vergi_no}}', event)"><i class="fas fa-copy"></i></button>
                </div>
                <div><strong>Vergi Dairesi:</strong> {{tax.vergi_dairesi}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.vergi_dairesi}}', event)"><i class="fas fa-copy"></i></button>
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
        <div class="custom-popup-content" style="max-width: 550px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 48px; height: 48px; object-fit: contain; margin-right: 16px; border-radius: 8px; background: #ffffff; padding: 4px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1.125rem; color: #FFD700; margin-bottom: 4px;">{{bank.bank_label}}</div>
                                    <div style="color: #cccccc; font-size: 0.875rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <span style="display: inline-flex; width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #FFD700, #FFA500); color: #000000; font-weight: 700; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.875rem; box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);">
                                        {{#if this.currency}}
                                            {{#ifEquals this.currency "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.currency "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 12px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#666; padding: 48px;">
                        <i class="fas fa-university" style="font-size: 48px; color: #FFD700; margin-bottom: 16px;"></i>
                        <p>Tanımlı banka hesabı bulunamadı.</p>
                    </div>
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
            btn.textContent = 'KOPYALANDI!';
            btn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
            }, 1200);
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
