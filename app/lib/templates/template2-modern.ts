export const modernTemplate = `
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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow-y: auto;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 20px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 30px;
            position: relative;
        }
        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            transition: transform 0.3s ease;
        }
        .profile-image:hover {
            transform: scale(1.05);
        }
        .profile-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: 4px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 30px;
            color: white;
        }
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 5px;
            opacity: 0.9;
        }
        .position {
            font-size: 1rem;
            opacity: 0.8;
            margin-bottom: 20px;
        }
        .contact-button {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50px;
            padding: 12px 24px;
            color: white;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .contact-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            color: white;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 350px;
            width: 100%;
            margin-top: 40px;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
        }
        .icon-card:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .icon-card a {
            color: white;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .icon-card i {
            font-size: 24px;
            margin-bottom: 5px;
        }
        .icon-label {
            font-size: 11px;
            font-weight: 500;
            opacity: 0.9;
            line-height: 1.2;
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
        .icon-card i.fab.fa-tiktok { color: #000000; }
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
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        .logo-image:hover {
            transform: scale(1.05);
            background: rgba(255, 255, 255, 0.2);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        }
        .custom-popup-content {
            background: white;
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            position: relative;
            animation: popupIn 0.3s ease;
        }
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #999;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #666;
        }
        .popup-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
        }
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 1rem;
            color: #555;
            line-height: 1.6;
        }
        .copy-btn {
            background: #667eea;
            border: none;
            border-radius: 8px;
            padding: 5px 10px;
            color: white;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.8rem;
            transition: background 0.2s;
        }
        .copy-btn:hover {
            background: #5a67d8;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 15px;
            border: 1px solid rgba(102, 126, 234, 0.1);
        }
        .iban-text {
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            width: 100%;
            margin: 5px 0;
            transition: border-color 0.2s;
        }
        .iban-text:focus {
            border-color: #667eea;
            outline: none;
        }
        
        /* 11. Animations */
        @keyframes popupIn {
            from { transform: scale(0.9) translateY(20px); opacity: 0; }
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
                    <i class="fas fa-user" style="font-size: 60px; color: rgba(255,255,255,0.7);"></i>
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
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #333;">{{bank.bank_label}}</div>
                                    <div style="color: #666; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
                                        {{#if this.currency}}
                                            {{#ifEquals this.currency "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.currency "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 10px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#888; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#48bb78';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#667eea';
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
