export const vibeStreamTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
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
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(45deg, #8E2DE2, #4A00E0);
            color: #FFFFFF;
            line-height: 1.6;
            overflow-y: auto;
            position: relative;
        }
        
        /* 3. Animated Background */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(255, 64, 129, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 201, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(142, 45, 226, 0.2) 0%, transparent 50%);
            animation: vibeShift 8s ease-in-out infinite alternate;
            z-index: -1;
            pointer-events: none;
        }
        
        /* 4. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            position: relative;
        }
        
        /* 5. Card Content */
        .card-content {
            padding: 40px 30px;
            text-align: center;
        }
        
        /* 6. Profile Section */
        .profile-container {
            margin-bottom: 30px;
        }
        .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #FF4081;
            margin: 0 auto;
            display: block;
            box-shadow: 0 0 30px rgba(255, 64, 129, 0.5);
            animation: profileGlow 3s ease-in-out infinite alternate;
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 3px solid #FF4081;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(255, 64, 129, 0.5);
            animation: profileGlow 3s ease-in-out infinite alternate;
        }
        
        /* 7. Company Info */
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 1.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #FFFFFF;
            letter-spacing: -0.02em;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #FF4081;
            text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
        }
        .position {
            font-size: 1rem;
            color: #00C9FF;
            margin-bottom: 25px;
            font-weight: 500;
            text-shadow: 0 0 10px rgba(0, 201, 255, 0.5);
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(45deg, #FF4081, #00C9FF);
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 0 20px rgba(255, 64, 129, 0.4);
            animation: buttonPulse 2s ease-in-out infinite;
        }
        .contact-button:active {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(255, 64, 129, 0.6);
            color: #FFFFFF;
            text-decoration: none;
        }
        
        /* 8. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 40px;
            padding: 0 10px;
        }
        
        /* 9. Icon Cards - Vibrant glow */
        .icon-card {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid transparent;
            border-radius: 20px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .icon-card:active {
            transform: scale(1.1);
            background: rgba(255, 255, 255, 0.2);
            border-color: #FF4081;
            box-shadow: 0 0 25px rgba(255, 64, 129, 0.5), 0 0 35px rgba(0, 201, 255, 0.3);
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
        }
        .icon-card i {
            font-size: 24px;
            color: #FFFFFF;
            transition: all 0.3s ease;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #FFFFFF;
            text-align: center;
            line-height: 1.2;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        /* 10. Icon Colors - Vibrant neon */
        .icon-card:nth-child(1) i { color: #00FF88; text-shadow: 0 0 15px rgba(0, 255, 136, 0.7); } /* QR */
        .icon-card i.fa-phone { color: #FF4081; text-shadow: 0 0 15px rgba(255, 64, 129, 0.7); }
        .icon-card i.fa-envelope { color: #00C9FF; text-shadow: 0 0 15px rgba(0, 201, 255, 0.7); }
        .icon-card i.fa-whatsapp { color: #00FF88; text-shadow: 0 0 15px rgba(0, 255, 136, 0.7); }
        .icon-card i.fab.fa-telegram { color: #00C9FF; text-shadow: 0 0 15px rgba(0, 201, 255, 0.7); }
        .icon-card i.fab.fa-instagram { color: #FF4081; text-shadow: 0 0 15px rgba(255, 64, 129, 0.7); }
        .icon-card i.fab.fa-facebook { color: #4A90E2; text-shadow: 0 0 15px rgba(74, 144, 226, 0.7); }
        .icon-card i.fab.fa-twitter { color: #00C9FF; text-shadow: 0 0 15px rgba(0, 201, 255, 0.7); }
        .icon-card i.fab.fa-linkedin { color: #4A90E2; text-shadow: 0 0 15px rgba(74, 144, 226, 0.7); }
        .icon-card i.fab.fa-youtube { color: #FF1744; text-shadow: 0 0 15px rgba(255, 23, 68, 0.7); }
        .icon-card i.fab.fa-tiktok { color: #FFFFFF; text-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
        .icon-card i.fa-globe { color: #8E2DE2; text-shadow: 0 0 15px rgba(142, 45, 226, 0.7); }
        .icon-card i.fa-map-marker-alt { color: #FF6B35; text-shadow: 0 0 15px rgba(255, 107, 53, 0.7); }
        .icon-card i.fa-university { color: #00FF88; text-shadow: 0 0 15px rgba(0, 255, 136, 0.7); }
        .icon-card i.fa-file-invoice { color: #00C9FF; text-shadow: 0 0 15px rgba(0, 201, 255, 0.7); }
        .icon-card i.fa-info-circle { color: #00C9FF; text-shadow: 0 0 15px rgba(0, 201, 255, 0.7); }
        .icon-card i.fa-book { color: #FFD700; text-shadow: 0 0 15px rgba(255, 215, 0, 0.7); }
        
        /* 11. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 2px solid transparent;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        .logo-image:active {
            transform: scale(1.1);
            border-color: #FF4081;
            box-shadow: 0 0 20px rgba(255, 64, 129, 0.5);
        }
        
        /* 12. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: rgba(142, 45, 226, 0.9);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 40px rgba(255, 64, 129, 0.4);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 2px solid #FF4081;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #FFFFFF;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #FF4081;
            transform: scale(0.9);
            text-shadow: 0 0 10px rgba(255, 64, 129, 0.7);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #FF4081;
            text-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #FFFFFF;
            line-height: 1.5;
        }
        .copy-btn {
            background: rgba(255, 64, 129, 0.3);
            border: 1px solid #FF4081;
            border-radius: 15px;
            padding: 6px 8px;
            color: #FFFFFF;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
            backdrop-filter: blur(10px);
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
        }
        .copy-btn:active {
            background: rgba(255, 64, 129, 0.5);
            box-shadow: 0 0 15px rgba(255, 64, 129, 0.5);
            transform: scale(0.95);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 64, 129, 0.3);
            border-radius: 20px;
            padding: 16px;
            margin-bottom: 12px;
            backdrop-filter: blur(10px);
        }
        .iban-text {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 64, 129, 0.5);
            border-radius: 10px;
            padding: 8px 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #FFFFFF;
            backdrop-filter: blur(5px);
        }
        .iban-text:focus {
            border-color: #FF4081;
            outline: none;
            box-shadow: 0 0 10px rgba(255, 64, 129, 0.3);
        }
        
        /* 13. Animations */
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes vibeShift {
            0% { transform: translateX(-10px) translateY(-5px); }
            50% { transform: translateX(10px) translateY(5px); }
            100% { transform: translateX(-5px) translateY(-10px); }
        }
        
        @keyframes profileGlow {
            from { box-shadow: 0 0 30px rgba(255, 64, 129, 0.5); }
            to { box-shadow: 0 0 40px rgba(255, 64, 129, 0.8), 0 0 60px rgba(0, 201, 255, 0.3); }
        }
        
        @keyframes buttonPulse {
            0% { box-shadow: 0 0 20px rgba(255, 64, 129, 0.4); }
            50% { box-shadow: 0 0 30px rgba(255, 64, 129, 0.6), 0 0 40px rgba(0, 201, 255, 0.3); }
            100% { box-shadow: 0 0 20px rgba(255, 64, 129, 0.4); }
        }
        
        /* 14. Responsive */
        @media (max-width: 400px) {
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .profile-image, .profile-placeholder {
                width: 110px;
                height: 110px;
            }
            .company-name {
                font-size: 1.6rem;
            }
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
                    <i class="fas fa-user" style="font-size: 52px; color: rgba(255, 255, 255, 0.7);"></i>
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
                <div class="icon-card">
                    <a href="/{{slug}}/qr" target="_blank">
                        <i class="fas fa-qrcode"></i>
                        <span class="icon-label">QR Kod</span>
                    </a>
                </div>
                
                {{#if social_media}}
                    {{#each social_media}}
                    <div class="icon-card">
                        <a href="{{this.url}}" target="_blank">
                            <i class="{{getIconClass this.icon this.label}}"></i>
                            <span class="icon-label">{{this.label}}</span>
                        </a>
                    </div>
                    {{/each}}
                {{/if}}
                
                {{#if communication}}
                    {{#each communication}}
                    <div class="icon-card">
                        <a href="{{this.url}}" target="_blank">
                            <i class="{{getIconClass this.icon this.label}}"></i>
                            <span class="icon-label">{{this.label}}</span>
                        </a>
                    </div>
                    {{/each}}
                {{/if}}

                {{#if katalog}}
                <div class="icon-card">
                    <a href="{{katalog.url}}" target="_blank">
                        <i class="fas fa-book"></i>
                        <span class="icon-label">{{katalog.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                {{#if iban}}
                <div class="icon-card">
                    <a href="#" onclick="showBankPopup(event)">
                        <i class="fas fa-university"></i>
                        <span class="icon-label">{{iban.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                {{#if tax}}
                <div class="icon-card">
                    <a href="#" onclick="showTaxPopup(event)">
                        <i class="fas fa-file-invoice"></i>
                        <span class="icon-label">{{tax.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                {{#if about}}
                <div class="icon-card">
                    <a href="#" onclick="showAboutPopup(event)">
                        <i class="fas fa-info-circle"></i>
                        <span class="icon-label">{{about.label}}</span>
                    </a>
                </div>
                {{/if}}
            </div>

            <!-- Firma Logosu -->
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>

    <!-- Popups -->
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

    <div id="about-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeAboutPopup()">&times;</button>
            <h2 class="popup-title">Hakkımızda</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <div id="bank-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 12px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #FF4081;">{{bank.banka_adi}}</div>
                                    <div style="color: rgba(255, 255, 255, 0.8); font-size: 0.8rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(45deg, #FF4081, #00C9FF); color: #FFFFFF; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
                                        {{#if this.para_birimi}}
                                            {{#ifEquals this.para_birimi "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "EUR"}}€{{/ifEquals}}
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
                    <div style="text-align:center; color: rgba(255, 255, 255, 0.8); padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#48bb78';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = btn.style.background.replace('#48bb78', '');
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
