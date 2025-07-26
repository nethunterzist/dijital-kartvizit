export const gelecekVizyonuTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap" rel="stylesheet">
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
            font-family: 'Orbitron', sans-serif;
            background: #0D1B2A;
            overflow-y: auto;
            color: #E0E1DD;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0D1B2A 100%);
            position: relative;
            overflow: hidden;
        }
        
        /* Circuit Board Pattern */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px),
                linear-gradient(0deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            pointer-events: none;
            z-index: 1;
        }
        
        /* Animated Grid Lines */
        .main-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 50px,
                    rgba(64, 224, 208, 0.05) 50px,
                    rgba(64, 224, 208, 0.05) 52px
                );
            pointer-events: none;
            z-index: 1;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 25px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 2;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 35px;
            position: relative;
        }
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #40E0D0;
            box-shadow: 
                0 0 20px rgba(64, 224, 208, 0.5),
                0 0 40px rgba(64, 224, 208, 0.3),
                inset 0 0 20px rgba(64, 224, 208, 0.1);
            transition: all 0.4s ease;
            position: relative;
        }
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 30px rgba(64, 224, 208, 0.7),
                0 0 60px rgba(64, 224, 208, 0.4),
                inset 0 0 30px rgba(64, 224, 208, 0.2);
        }
        .profile-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(64, 224, 208, 0.1);
            border: 3px solid #40E0D0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 20px rgba(64, 224, 208, 0.5);
        }
        
        /* Hexagon decorations around profile */
        .profile-container::before {
            content: '';
            position: absolute;
            top: -15px;
            right: -15px;
            width: 30px;
            height: 30px;
            background: #40E0D0;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            opacity: 0.7;
            animation: pulse 2s ease-in-out infinite;
        }
        .profile-container::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: -10px;
            width: 20px;
            height: 20px;
            background: #748CAB;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            opacity: 0.6;
            animation: pulse 2s ease-in-out infinite 1s;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 35px;
            color: #E0E1DD;
        }
        .company-name {
            font-size: 2.2rem;
            font-weight: 900;
            margin-bottom: 15px;
            color: #E0E1DD;
            line-height: 1.2;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-shadow: 
                0 0 10px rgba(64, 224, 208, 0.5),
                0 0 20px rgba(64, 224, 208, 0.3);
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #40E0D0;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #748CAB;
            font-weight: 500;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .contact-button {
            background: linear-gradient(135deg, #40E0D0 0%, #748CAB 100%);
            border: 2px solid #40E0D0;
            border-radius: 0;
            padding: 12px 25px;
            color: #0D1B2A;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
            font-weight: 700;
            font-family: 'Orbitron', sans-serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 
                0 0 15px rgba(64, 224, 208, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .contact-button:hover {
            background: linear-gradient(135deg, #748CAB 0%, #40E0D0 100%);
            transform: translateY(-2px);
            box-shadow: 
                0 0 25px rgba(64, 224, 208, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            color: #0D1B2A;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            max-width: 360px;
            width: 100%;
            margin-top: 35px;
        }
        
        /* 8. Icon Cards - Hexagon shapes */
        .icon-card {
            background: rgba(64, 224, 208, 0.1);
            border: 2px solid rgba(64, 224, 208, 0.3);
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            backdrop-filter: blur(5px);
        }
        
        .icon-card:hover {
            background: rgba(64, 224, 208, 0.2);
            border-color: #40E0D0;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 
                0 0 20px rgba(64, 224, 208, 0.4),
                inset 0 0 20px rgba(64, 224, 208, 0.1);
        }
        .icon-card a {
            color: #E0E1DD;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }
        .icon-card i {
            font-size: 20px;
            margin-bottom: 4px;
            transition: all 0.3s ease;
            text-shadow: 0 0 10px currentColor;
        }
        .icon-card:hover i {
            transform: scale(1.1);
            text-shadow: 0 0 15px currentColor;
        }
        .icon-label {
            font-size: 9px;
            font-weight: 500;
            line-height: 1.2;
            color: #E0E1DD;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        /* 9. Icon Styles - Futuristic colors */
        .icon-card:nth-child(1) i { color: #40E0D0; } /* QR - Turquoise */
        .icon-card i.fa-phone { color: #00FFFF; }
        .icon-card i.fa-envelope { color: #87CEEB; }
        .icon-card i.fa-whatsapp { color: #00FF7F; }
        .icon-card i.fab.fa-telegram { color: #1E90FF; }
        .icon-card i.fab.fa-instagram { color: #FF69B4; }
        .icon-card i.fab.fa-facebook { color: #4169E1; }
        .icon-card i.fab.fa-twitter { color: #00BFFF; }
        .icon-card i.fab.fa-linkedin { color: #0080FF; }
        .icon-card i.fab.fa-youtube { color: #FF4500; }
        .icon-card i.fab.fa-tiktok { color: #FF1493; }
        .icon-card i.fa-globe { color: #32CD32; }
        .icon-card i.fa-map-marker-alt { color: #FF6347; }
        .icon-card i.fa-university { color: #FFD700; }
        .icon-card i.fa-file-text { color: #40E0D0; }
        .icon-card i.fa-info-circle { color: #9370DB; }
        .icon-card i.fa-book { color: #FF8C00; }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            background: rgba(64, 224, 208, 0.1);
            padding: 10px;
            border: 2px solid rgba(64, 224, 208, 0.3);
            transition: all 0.3s ease;
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            box-shadow: 0 0 15px rgba(64, 224, 208, 0.3);
        }
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #40E0D0;
            box-shadow: 0 0 25px rgba(64, 224, 208, 0.5);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(13, 27, 42, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .custom-popup-content {
            background: linear-gradient(135deg, #1B263B 0%, #0D1B2A 100%);
            border: 2px solid #40E0D0;
            border-radius: 0;
            padding: 30px;
            max-width: 420px;
            width: 90%;
            box-shadow: 
                0 0 30px rgba(64, 224, 208, 0.3),
                inset 0 1px 0 rgba(64, 224, 208, 0.1);
            position: relative;
            color: #E0E1DD;
            font-family: 'Orbitron', sans-serif;
            clip-path: polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%);
        }
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #40E0D0;
            cursor: pointer;
            transition: color 0.2s;
            text-shadow: 0 0 10px currentColor;
        }
        .custom-popup-close:hover {
            color: #748CAB;
            text-shadow: 0 0 15px currentColor;
        }
        .popup-title {
            font-size: 1.6rem;
            font-weight: 900;
            margin-bottom: 25px;
            color: #40E0D0;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(64, 224, 208, 0.5);
        }
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 0.9rem;
            color: #E0E1DD;
            line-height: 1.6;
        }
        .copy-btn {
            background: linear-gradient(135deg, #40E0D0, #748CAB);
            border: 1px solid #40E0D0;
            border-radius: 0;
            padding: 6px 10px;
            color: #0D1B2A;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.8rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Orbitron', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #748CAB, #40E0D0);
            transform: translateY(-1px);
            box-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(64, 224, 208, 0.1);
            border: 1px solid rgba(64, 224, 208, 0.3);
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .iban-text {
            background: rgba(13, 27, 42, 0.8);
            border: 2px solid rgba(64, 224, 208, 0.3);
            border-radius: 0;
            padding: 10px;
            font-family: 'Orbitron', sans-serif;
            font-size: 0.85rem;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #E0E1DD;
            letter-spacing: 1px;
        }
        .iban-text:focus {
            border-color: #40E0D0;
            outline: none;
            box-shadow: 0 0 10px rgba(64, 224, 208, 0.3);
        }
        
        /* 11. Animations */
        @keyframes pulse {
            0%, 100% { 
                opacity: 0.7;
                transform: scale(1);
            }
            50% { 
                opacity: 1;
                transform: scale(1.1);
            }
        }
        
        @keyframes dataFlow {
            0% { 
                transform: translateX(-100%);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% { 
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .company-name {
            animation: pulse 3s ease-in-out infinite;
        }
        
        @keyframes slideInTech {
            from { 
                transform: translateY(30px) rotateX(20deg); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) rotateX(0); 
                opacity: 1; 
            }
        }
        
        .custom-popup-content {
            animation: slideInTech 0.4s ease;
        }
        
        /* 12. Responsive */
        @media (max-width: 480px) {
            .card-content {
                padding: 25px 15px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .company-name {
                font-size: 1.8rem;
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
                    <i class="fas fa-robot" style="font-size: 50px; color: #40E0D0;"></i>
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
                    REHBERE EKLE
                </a>
            </div>

            <!-- Icons Section -->
            <div class="icons-grid">
                <!-- QR Kod - Her zaman ilk sırada -->
                <div class="icon-card">
                    <a href="/{{slug}}/qr" target="_blank">
                        <i class="fas fa-qrcode"></i>
                        <span class="icon-label">QR KOD</span>
                    </a>
                </div>
                
                <!-- Sosyal Medya -->
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
                
                <!-- İletişim -->
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
            <h2 class="popup-title">VERGI BILGILERI</h2>
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
            <h2 class="popup-title">HAKKIMIZDA</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <!-- Banka Hesapları Popup -->
    <div id="bank-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">BANKA HESAPLARI</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 700; font-size: 1.1rem; color: #40E0D0; text-shadow: 0 0 5px currentColor;">{{bank.bank_label}}</div>
                                    <div style="color: #E0E1DD; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 0; background: linear-gradient(135deg, #40E0D0, #748CAB); color: #0D1B2A; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);">
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
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)"><i class="fas fa-copy"></i></button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#E0E1DD; padding: 40px;">TANIMLI BANKA HESABI BULUNAMADI.</div>
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
            btn.style.background = 'linear-gradient(135deg, #00FF00, #32CD32)';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, #40E0D0, #748CAB)';
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
