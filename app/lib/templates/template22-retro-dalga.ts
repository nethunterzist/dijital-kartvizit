export const retroDalgaTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=VT323:wght@400&display=swap" rel="stylesheet">
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
            font-family: 'VT323', monospace;
            background: #1A1A2E;
            overflow-y: auto;
            color: #F0F0F0;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%);
            position: relative;
            overflow: hidden;
        }
        
        /* Scanline Effect */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.03) 2px,
                rgba(0, 255, 255, 0.03) 4px
            );
            pointer-events: none;
            z-index: 1;
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
            position: relative;
            z-index: 2;
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
            border: 3px solid #E94560;
            box-shadow: 
                0 0 20px #E94560,
                0 0 40px #E94560,
                0 0 60px #E94560;
            transition: all 0.3s ease;
        }
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 30px #E94560,
                0 0 60px #E94560,
                0 0 90px #E94560;
        }
        .profile-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: rgba(233, 69, 96, 0.2);
            border: 3px solid #E94560;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 20px #E94560,
                0 0 40px #E94560;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 30px;
            color: #F0F0F0;
        }
        .company-name {
            font-size: 2.2rem;
            font-weight: 400;
            margin-bottom: 10px;
            text-shadow: 
                0 0 5px #E94560,
                0 0 10px #E94560,
                0 0 15px #E94560;
            color: #F0F0F0;
            letter-spacing: 2px;
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 5px;
            color: #00FFFF;
            text-shadow: 
                0 0 5px #00FFFF,
                0 0 10px #00FFFF;
            letter-spacing: 1px;
        }
        .position {
            font-size: 1.1rem;
            margin-bottom: 20px;
            color: #F0F0F0;
            opacity: 0.8;
            letter-spacing: 1px;
        }
        .contact-button {
            background: linear-gradient(45deg, #E94560, #00FFFF);
            border: 2px solid #E94560;
            border-radius: 0;
            padding: 12px 24px;
            color: #1A1A2E;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 400;
            font-family: 'VT323', monospace;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 
                0 0 10px #E94560,
                inset 0 0 10px rgba(255, 255, 255, 0.1);
        }
        .contact-button:hover {
            background: linear-gradient(45deg, #00FFFF, #E94560);
            transform: translateY(-2px);
            box-shadow: 
                0 0 20px #E94560,
                0 0 30px #00FFFF,
                inset 0 0 20px rgba(255, 255, 255, 0.2);
            color: #1A1A2E;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            max-width: 350px;
            width: 100%;
            margin-top: 40px;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: rgba(233, 69, 96, 0.1);
            border: 2px solid #E94560;
            border-radius: 0;
            padding: 20px 10px;
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
            background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .icon-card:hover::before {
            left: 100%;
        }
        
        .icon-card:hover {
            background: rgba(0, 255, 255, 0.1);
            border-color: #00FFFF;
            transform: translateY(-3px);
            box-shadow: 
                0 0 15px #00FFFF,
                0 0 25px #E94560;
        }
        .icon-card a {
            color: #F0F0F0;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 2;
        }
        .icon-card i {
            font-size: 24px;
            margin-bottom: 5px;
            text-shadow: 
                0 0 5px currentColor,
                0 0 10px currentColor;
        }
        .icon-label {
            font-size: 12px;
            font-weight: 400;
            line-height: 1.2;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        
        /* 9. Icon Styles - Neon Colors */
        .icon-card:nth-child(1) i { color: #FFFF00; } /* QR - Yellow */
        .icon-card i.fa-phone { color: #00FF00; }
        .icon-card i.fa-envelope { color: #FF00FF; }
        .icon-card i.fa-whatsapp { color: #00FFFF; }
        .icon-card i.fab.fa-telegram { color: #00AAFF; }
        .icon-card i.fab.fa-instagram { color: #FF0080; }
        .icon-card i.fab.fa-facebook { color: #0080FF; }
        .icon-card i.fab.fa-twitter { color: #00FFFF; }
        .icon-card i.fab.fa-linkedin { color: #0080FF; }
        .icon-card i.fab.fa-youtube { color: #FF0040; }
        .icon-card i.fab.fa-tiktok { color: #FF0080; }
        .icon-card i.fa-globe { color: #80FF00; }
        .icon-card i.fa-map-marker-alt { color: #FF8000; }
        .icon-card i.fa-university { color: #FFFF00; }
        .icon-card i.fa-file-text { color: #00FFFF; }
        .icon-card i.fa-info-circle { color: #8000FF; }
        .icon-card i.fa-book { color: #FF4000; }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 0;
            background: rgba(233, 69, 96, 0.1);
            padding: 8px;
            border: 2px solid #E94560;
            transition: all 0.3s ease;
            box-shadow: 
                0 0 10px #E94560;
        }
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #00FFFF;
            box-shadow: 
                0 0 20px #00FFFF,
                0 0 30px #E94560;
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(26, 26, 46, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        }
        .custom-popup-content {
            background: #1A1A2E;
            border: 2px solid #E94560;
            border-radius: 0;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 
                0 0 30px #E94560,
                0 0 60px #00FFFF;
            position: relative;
            color: #F0F0F0;
            font-family: 'VT323', monospace;
        }
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #E94560;
            cursor: pointer;
            transition: color 0.2s;
            text-shadow: 0 0 10px #E94560;
        }
        .custom-popup-close:hover {
            color: #00FFFF;
            text-shadow: 0 0 15px #00FFFF;
        }
        .popup-title {
            font-size: 1.8rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #00FFFF;
            text-shadow: 0 0 10px #00FFFF;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 1.1rem;
            color: #F0F0F0;
            line-height: 1.6;
            letter-spacing: 1px;
        }
        .copy-btn {
            background: linear-gradient(45deg, #E94560, #00FFFF);
            border: 1px solid #E94560;
            border-radius: 0;
            padding: 6px 8px;
            color: #1A1A2E;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'VT323', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 0 5px #E94560;
        }
        .copy-btn:hover {
            background: linear-gradient(45deg, #00FFFF, #E94560);
            box-shadow: 0 0 15px #00FFFF;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(233, 69, 96, 0.1);
            border: 1px solid #E94560;
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
        }
        .iban-text {
            background: #1A1A2E;
            border: 2px solid #E94560;
            border-radius: 0;
            padding: 10px;
            font-family: 'VT323', monospace;
            font-size: 1rem;
            width: 100%;
            margin: 5px 0;
            transition: border-color 0.2s;
            color: #F0F0F0;
            letter-spacing: 1px;
        }
        .iban-text:focus {
            border-color: #00FFFF;
            outline: none;
            box-shadow: 0 0 10px #00FFFF;
        }
        
        /* 11. Animations */
        @keyframes neonPulse {
            0%, 100% { 
                text-shadow: 
                    0 0 5px currentColor,
                    0 0 10px currentColor,
                    0 0 15px currentColor;
            }
            50% { 
                text-shadow: 
                    0 0 10px currentColor,
                    0 0 20px currentColor,
                    0 0 30px currentColor;
            }
        }
        
        .company-name {
            animation: neonPulse 2s ease-in-out infinite;
        }
        
        @keyframes popupIn {
            from { 
                transform: scale(0.8) translateY(20px); 
                opacity: 0; 
            }
            to { 
                transform: scale(1) translateY(0); 
                opacity: 1; 
            }
        }
        
        .custom-popup-content {
            animation: popupIn 0.3s ease;
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
                    <i class="fas fa-user" style="font-size: 60px; color: #E94560;"></i>
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
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #00FFFF; text-shadow: 0 0 5px #00FFFF;">{{bank.bank_label}}</div>
                                    <div style="color: #F0F0F0; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 0; background: linear-gradient(45deg, #E94560, #00FFFF); color: #1A1A2E; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; border: 1px solid #E94560;">
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
                    <div style="text-align:center; color:#F0F0F0; padding: 40px;">TANIMLI BANKA HESABI BULUNAMADI.</div>
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
            btn.style.background = '#00FF00';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(45deg, #E94560, #00FFFF)';
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
