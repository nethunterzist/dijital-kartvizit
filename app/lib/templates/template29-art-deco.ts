export const artDecoTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Poppins', sans-serif;
            background: #2C2C2C;
            overflow-y: auto;
            color: #EAEAEA;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 50%, #2C2C2C 100%);
            position: relative;
            border-left: 4px solid #C5A35A;
            border-right: 4px solid #C5A35A;
        }
        
        /* Art Deco Sunburst Pattern */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, transparent 30%, rgba(197, 163, 90, 0.1) 31%, rgba(197, 163, 90, 0.1) 32%, transparent 33%);
            background-size: 20px 20px;
            opacity: 0.3;
            z-index: 1;
        }
        
        /* Geometric Pattern */
        .main-container::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px;
            background: 
                linear-gradient(45deg, transparent 25%, rgba(197, 163, 90, 0.1) 25%, rgba(197, 163, 90, 0.1) 50%, transparent 50%),
                linear-gradient(-45deg, transparent 25%, rgba(197, 163, 90, 0.1) 25%, rgba(197, 163, 90, 0.1) 50%, transparent 50%);
            background-size: 30px 30px;
            z-index: 1;
        }
        
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
        
        .profile-container {
            margin-bottom: 40px;
            position: relative;
        }
        .profile-image {
            width: 150px;
            height: 150px;
            border-radius: 0;
            object-fit: cover;
            border: 4px solid #C5A35A;
            box-shadow: 
                0 0 0 8px rgba(197, 163, 90, 0.2),
                0 8px 32px rgba(197, 163, 90, 0.3);
            transition: all 0.4s ease;
            clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
        }
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 0 12px rgba(197, 163, 90, 0.3),
                0 12px 48px rgba(197, 163, 90, 0.4);
        }
        .profile-placeholder {
            width: 150px;
            height: 150px;
            border-radius: 0;
            background: rgba(197, 163, 90, 0.1);
            border: 4px solid #C5A35A;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 0 8px rgba(197, 163, 90, 0.2);
            clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
        }
        
        /* Art Deco decorative elements */
        .profile-container::before {
            content: '';
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 20px;
            background: linear-gradient(90deg, transparent, #C5A35A, transparent);
            clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
        }
        .profile-container::after {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 20px;
            background: linear-gradient(90deg, transparent, #C5A35A, transparent);
            clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #EAEAEA;
        }
        .company-name {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 15px;
            color: #EAEAEA;
            line-height: 1.2;
            letter-spacing: 2px;
            text-transform: uppercase;
            position: relative;
        }
        .company-name::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #C5A35A, transparent);
        }
        .company-name::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #C5A35A, transparent);
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #C5A35A;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #EAEAEA;
            font-weight: 400;
            letter-spacing: 1px;
            opacity: 0.9;
        }
        .contact-button {
            background: linear-gradient(135deg, #C5A35A 0%, #B8941F 100%);
            border: 2px solid #C5A35A;
            border-radius: 0;
            padding: 15px 30px;
            color: #2C2C2C;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
            box-shadow: 0 4px 15px rgba(197, 163, 90, 0.3);
        }
        .contact-button:hover {
            background: linear-gradient(135deg, #B8941F 0%, #C5A35A 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(197, 163, 90, 0.4);
            color: #2C2C2C;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            max-width: 360px;
            width: 100%;
            margin-top: 40px;
        }
        
        .icon-card {
            background: rgba(197, 163, 90, 0.1);
            border: 2px solid rgba(197, 163, 90, 0.3);
            border-radius: 0;
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
        }
        
        .icon-card:hover {
            background: rgba(197, 163, 90, 0.2);
            border-color: #C5A35A;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(197, 163, 90, 0.3);
        }
        .icon-card a {
            color: #EAEAEA;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .icon-card i {
            font-size: 22px;
            margin-bottom: 6px;
            transition: all 0.3s ease;
            color: #C5A35A;
        }
        .icon-card:hover i {
            transform: scale(1.1);
            text-shadow: 0 0 10px rgba(197, 163, 90, 0.6);
        }
        .icon-label {
            font-size: 11px;
            font-weight: 600;
            line-height: 1.3;
            color: #EAEAEA;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 0;
            background: rgba(197, 163, 90, 0.1);
            padding: 12px;
            border: 2px solid rgba(197, 163, 90, 0.3);
            transition: all 0.3s ease;
            clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
        }
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #C5A35A;
            box-shadow: 0 4px 15px rgba(197, 163, 90, 0.3);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(44, 44, 44, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        .custom-popup-content {
            background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%);
            border: 2px solid #C5A35A;
            border-radius: 0;
            padding: 35px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 15px 50px rgba(197, 163, 90, 0.3);
            position: relative;
            color: #EAEAEA;
            font-family: 'Poppins', sans-serif;
            clip-path: polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%);
        }
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #C5A35A;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #B8941F;
        }
        .popup-title {
            font-size: 1.8rem;
            font-weight: 900;
            margin-bottom: 25px;
            color: #C5A35A;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 1rem;
            color: #EAEAEA;
            line-height: 1.6;
        }
        .copy-btn {
            background: linear-gradient(135deg, #C5A35A, #B8941F);
            border: 1px solid #C5A35A;
            border-radius: 0;
            padding: 6px 10px;
            color: #2C2C2C;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #B8941F, #C5A35A);
            transform: translateY(-1px);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(197, 163, 90, 0.1);
            border: 1px solid rgba(197, 163, 90, 0.3);
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .iban-text {
            background: rgba(44, 44, 44, 0.8);
            border: 2px solid rgba(197, 163, 90, 0.3);
            border-radius: 0;
            padding: 10px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #EAEAEA;
        }
        .iban-text:focus {
            border-color: #C5A35A;
            outline: none;
            box-shadow: 0 0 10px rgba(197, 163, 90, 0.3);
        }
        
        @keyframes artDecoGlow {
            0%, 100% { 
                text-shadow: 0 0 5px rgba(197, 163, 90, 0.3);
            }
            50% { 
                text-shadow: 0 0 15px rgba(197, 163, 90, 0.6);
            }
        }
        
        .company-name {
            animation: artDecoGlow 3s ease-in-out infinite;
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 30px 20px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .company-name {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-gem" style="font-size: 50px; color: #C5A35A;"></i>
                </div>
                {{/if}}
            </div>

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
                        <i class="fas fa-file-text"></i>
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

            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>

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
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 700; font-size: 1.1rem; color: #C5A35A;">{{bank.banka_adi}}</div>
                                    <div style="color: #EAEAEA; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 0; background: linear-gradient(135deg, #C5A35A, #B8941F); color: #2C2C2C; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);">
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
                    <div style="text-align:center; color:#EAEAEA; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
                btn.style.background = 'linear-gradient(135deg, #C5A35A, #B8941F)';
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
