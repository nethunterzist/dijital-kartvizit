export const altinVarakTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&display=swap" rel="stylesheet">
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
            font-family: 'Playfair Display', serif;
            background: #121212;
            overflow-y: auto;
            color: #F5F5F5;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%);
            position: relative;
            border-left: 3px solid #D4AF37;
            border-right: 3px solid #D4AF37;
        }
        
        /* Gold texture overlay */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 50px 30px;
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
            margin-bottom: 40px;
            position: relative;
        }
        .profile-image {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #D4AF37;
            box-shadow: 
                0 0 30px rgba(212, 175, 55, 0.4),
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 0 20px rgba(212, 175, 55, 0.1);
            transition: all 0.4s ease;
        }
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 40px rgba(212, 175, 55, 0.6),
                0 12px 48px rgba(0, 0, 0, 0.4),
                inset 0 0 30px rgba(212, 175, 55, 0.2);
        }
        .profile-placeholder {
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.1);
            border: 4px solid #D4AF37;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 30px rgba(212, 175, 55, 0.4);
        }
        
        /* Gold decorative lines */
        .profile-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -60px;
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            transform: translateY(-50%);
        }
        .profile-container::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -60px;
            width: 40px;
            height: 1px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
            transform: translateY(-50%);
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 40px;
            color: #F5F5F5;
        }
        .company-name {
            font-size: 2.8rem;
            font-weight: 900;
            margin-bottom: 20px;
            color: #F5F5F5;
            line-height: 1.2;
            letter-spacing: 1px;
            position: relative;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        .company-name::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        .person-name {
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #D4AF37;
            font-style: italic;
            letter-spacing: 0.5px;
        }
        .position {
            font-size: 1.1rem;
            margin-bottom: 30px;
            color: #F5F5F5;
            opacity: 0.9;
            font-weight: 400;
            letter-spacing: 1px;
        }
        .contact-button {
            background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
            border: 2px solid #D4AF37;
            border-radius: 30px;
            padding: 15px 35px;
            color: #121212;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Playfair Display', serif;
            transition: all 0.3s ease;
            letter-spacing: 1px;
            box-shadow: 
                0 8px 25px rgba(212, 175, 55, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        .contact-button:hover {
            background: linear-gradient(135deg, #B8941F 0%, #D4AF37 100%);
            transform: translateY(-3px);
            box-shadow: 
                0 12px 35px rgba(212, 175, 55, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            color: #121212;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 380px;
            width: 100%;
            margin-top: 40px;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 25px 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            backdrop-filter: blur(10px);
            box-shadow: 
                0 4px 20px rgba(212, 175, 55, 0.15),
                inset 0 1px 0 rgba(212, 175, 55, 0.2);
        }
        
        .icon-card:hover {
            background: rgba(212, 175, 55, 0.2);
            border-color: #D4AF37;
            transform: translateY(-5px);
            box-shadow: 
                0 8px 30px rgba(212, 175, 55, 0.25),
                inset 0 1px 0 rgba(212, 175, 55, 0.3);
        }
        .icon-card a {
            color: #F5F5F5;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .icon-card i {
            font-size: 24px;
            margin-bottom: 6px;
            transition: all 0.3s ease;
            color: #D4AF37;
        }
        .icon-card:hover i {
            transform: scale(1.1);
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.6);
        }
        .icon-label {
            font-size: 11px;
            font-weight: 500;
            line-height: 1.3;
            color: #F5F5F5;
            letter-spacing: 0.5px;
        }
        
        /* 9. Icon Styles - Luxury gold theme */
        .icon-card i {
            color: #D4AF37 !important;
        }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 50px;
            text-align: center;
        }
        .logo-image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 15px;
            background: rgba(212, 175, 55, 0.1);
            padding: 15px;
            border: 2px solid rgba(212, 175, 55, 0.3);
            transition: all 0.3s ease;
            box-shadow: 
                0 4px 20px rgba(212, 175, 55, 0.2);
        }
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #D4AF37;
            box-shadow: 
                0 6px 30px rgba(212, 175, 55, 0.3);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(18, 18, 18, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .custom-popup-content {
            background: linear-gradient(135deg, #1a1a1a 0%, #121212 100%);
            border: 2px solid #D4AF37;
            border-radius: 20px;
            padding: 40px;
            max-width: 450px;
            width: 90%;
            box-shadow: 
                0 20px 60px rgba(212, 175, 55, 0.3),
                inset 0 1px 0 rgba(212, 175, 55, 0.2);
            position: relative;
            color: #F5F5F5;
            font-family: 'Playfair Display', serif;
        }
        .custom-popup-close {
            position: absolute;
            top: 20px;
            right: 25px;
            background: none;
            border: none;
            font-size: 1.8rem;
            color: #D4AF37;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #B8941F;
        }
        .popup-title {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 30px;
            color: #D4AF37;
            text-align: center;
            letter-spacing: 1px;
            position: relative;
        }
        .popup-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        .tax-info div, .about-content {
            margin-bottom: 20px;
            font-size: 1rem;
            color: #F5F5F5;
            line-height: 1.7;
        }
        .copy-btn {
            background: linear-gradient(135deg, #D4AF37, #B8941F);
            border: 1px solid #D4AF37;
            border-radius: 10px;
            padding: 8px 12px;
            color: #121212;
            cursor: pointer;
            margin-left: 12px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Playfair Display', serif;
            font-weight: 600;
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #B8941F, #D4AF37);
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(212, 175, 55, 0.1);
        }
        .iban-text {
            background: rgba(18, 18, 18, 0.8);
            border: 2px solid rgba(212, 175, 55, 0.3);
            border-radius: 10px;
            padding: 12px;
            font-family: 'Playfair Display', serif;
            font-size: 0.95rem;
            width: 100%;
            margin: 10px 0;
            transition: border-color 0.2s;
            color: #F5F5F5;
        }
        .iban-text:focus {
            border-color: #D4AF37;
            outline: none;
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        
        /* 11. Animations */
        @keyframes goldShimmer {
            0%, 100% { 
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            50% { 
                text-shadow: 
                    2px 2px 4px rgba(0, 0, 0, 0.3),
                    0 0 20px rgba(212, 175, 55, 0.4);
            }
        }
        
        .company-name {
            animation: goldShimmer 4s ease-in-out infinite;
        }
        
        @keyframes luxurySlideIn {
            from { 
                transform: translateY(40px) scale(0.9); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
            }
        }
        
        .custom-popup-content {
            animation: luxurySlideIn 0.5s ease;
        }
        
        /* 12. Responsive */
        @media (max-width: 480px) {
            .card-content {
                padding: 30px 20px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .company-name {
                font-size: 2.2rem;
            }
            .profile-container::before,
            .profile-container::after {
                display: none;
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
                    <i class="fas fa-crown" style="font-size: 60px; color: #D4AF37;"></i>
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
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 700; font-size: 1.1rem; color: #D4AF37;">{{bank.banka_adi}}</div>
                                    <div style="color: #F5F5F5; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #D4AF37, #B8941F); color: #121212; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
                                        {{#if this.para_birimi}}
                                            {{#ifEquals this.para_birimi "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "EUR"}}€{{/ifEquals}}
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
                    <div style="text-align:center; color:#F5F5F5; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = 'linear-gradient(135deg, #32CD32, #228B22)';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, #D4AF37, #B8941F)';
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
