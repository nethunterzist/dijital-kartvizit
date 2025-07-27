export const okyanusDerinligiTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Poppins', sans-serif;
            background: #0B1426;
            overflow-y: auto;
            color: #E8F4F8;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(180deg, #0B1426 0%, #1B2951 30%, #2A4A7A 60%, #1B2951 90%, #0B1426 100%);
            position: relative;
        }
        
        /* Ocean wave effects */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 20% 20%, rgba(64, 224, 255, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(0, 191, 255, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(30, 144, 255, 0.05) 0%, transparent 70%);
            z-index: 1;
        }
        
        /* Floating bubbles */
        .main-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 15% 25%, rgba(64, 224, 255, 0.3) 2px, transparent 2px),
                radial-gradient(circle at 85% 75%, rgba(0, 191, 255, 0.2) 1px, transparent 1px),
                radial-gradient(circle at 45% 15%, rgba(30, 144, 255, 0.25) 1.5px, transparent 1.5px);
            background-size: 100px 100px, 150px 150px, 80px 80px;
            animation: floatBubbles 20s ease-in-out infinite;
            z-index: 1;
        }
        
        .card-content {
            padding: 60px 30px;
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
            margin-bottom: 50px;
            position: relative;
        }
        
        .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #40E0FF;
            box-shadow: 
                0 0 30px rgba(64, 224, 255, 0.4),
                0 0 60px rgba(64, 224, 255, 0.2),
                inset 0 0 20px rgba(64, 224, 255, 0.1);
            transition: all 0.4s ease;
        }
        
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 40px rgba(64, 224, 255, 0.6),
                0 0 80px rgba(64, 224, 255, 0.3),
                inset 0 0 30px rgba(64, 224, 255, 0.2);
        }
        
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(64, 224, 255, 0.1);
            border: 3px solid #40E0FF;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 30px rgba(64, 224, 255, 0.4),
                0 0 60px rgba(64, 224, 255, 0.2);
        }
        
        /* Ocean ripple effect */
        .profile-container::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 160px;
            height: 160px;
            border: 2px solid rgba(64, 224, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 3s ease-out infinite;
        }
        
        .profile-container::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            border: 1px solid rgba(64, 224, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 3s ease-out infinite 1.5s;
        }
        
        .company-info {
            margin-bottom: 50px;
            color: #E8F4F8;
        }
        
        .company-name {
            font-size: 2.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #40E0FF;
            line-height: 1.3;
            text-shadow: 0 0 20px rgba(64, 224, 255, 0.5);
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 10px;
            color: #87CEEB;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 30px;
            color: #B0E0E6;
            font-weight: 300;
        }
        
        .contact-button {
            background: linear-gradient(135deg, #40E0FF 0%, #1E90FF 100%);
            border: 2px solid #40E0FF;
            border-radius: 25px;
            padding: 15px 30px;
            color: #0B1426;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(64, 224, 255, 0.3);
        }
        
        .contact-button:hover {
            background: linear-gradient(135deg, #1E90FF 0%, #40E0FF 100%);
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(64, 224, 255, 0.4);
            color: #0B1426;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 360px;
            width: 100%;
            margin-top: 50px;
        }
        
        .icon-card {
            background: rgba(64, 224, 255, 0.1);
            border: 1px solid rgba(64, 224, 255, 0.3);
            border-radius: 20px;
            padding: 20px 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(64, 224, 255, 0.1);
        }
        
        .icon-card:hover {
            background: rgba(64, 224, 255, 0.2);
            border-color: rgba(64, 224, 255, 0.5);
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(64, 224, 255, 0.2);
        }
        
        .icon-card a {
            color: #E8F4F8;
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
            color: #40E0FF;
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
            text-shadow: 0 0 10px rgba(64, 224, 255, 0.8);
        }
        
        .icon-label {
            font-size: 11px;
            font-weight: 500;
            line-height: 1.3;
            color: #E8F4F8;
        }
        
        .company-logo {
            margin-top: 50px;
            text-align: center;
        }
        
        .logo-image {
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 15px;
            background: rgba(64, 224, 255, 0.1);
            padding: 12px;
            border: 1px solid rgba(64, 224, 255, 0.3);
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(64, 224, 255, 0.1);
        }
        
        .logo-image:hover {
            transform: scale(1.05);
            border-color: rgba(64, 224, 255, 0.5);
            box-shadow: 0 8px 25px rgba(64, 224, 255, 0.2);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(11, 20, 38, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(12px);
        }
        
        .custom-popup-content {
            background: rgba(27, 41, 81, 0.95);
            border: 2px solid rgba(64, 224, 255, 0.3);
            border-radius: 20px;
            padding: 35px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(64, 224, 255, 0.2);
            position: relative;
            color: #E8F4F8;
            font-family: 'Poppins', sans-serif;
            backdrop-filter: blur(20px);
        }
        
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #40E0FF;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #87CEEB;
        }
        
        .popup-title {
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 25px;
            color: #40E0FF;
            text-align: center;
            text-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
        }
        
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 1rem;
            color: #E8F4F8;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: linear-gradient(135deg, #40E0FF, #1E90FF);
            border: 1px solid #40E0FF;
            border-radius: 12px;
            padding: 6px 12px;
            color: #0B1426;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.85rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
        }
        
        .copy-btn:hover {
            background: linear-gradient(135deg, #1E90FF, #40E0FF);
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: rgba(64, 224, 255, 0.1);
            border: 1px solid rgba(64, 224, 255, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 16px;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(64, 224, 255, 0.1);
        }
        
        .iban-text {
            background: rgba(11, 20, 38, 0.8);
            border: 1px solid rgba(64, 224, 255, 0.3);
            border-radius: 10px;
            padding: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #E8F4F8;
        }
        
        .iban-text:focus {
            border-color: #40E0FF;
            outline: none;
            box-shadow: 0 0 10px rgba(64, 224, 255, 0.3);
        }
        
        /* Ocean animations */
        @keyframes floatBubbles {
            0%, 100% { 
                transform: translateY(0px);
            }
            50% { 
                transform: translateY(-10px);
            }
        }
        
        @keyframes ripple {
            0% {
                transform: translate(-50%, -50%) scale(0.8);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0;
            }
        }
        
        @keyframes oceanFlow {
            0%, 100% { 
                text-shadow: 0 0 20px rgba(64, 224, 255, 0.5);
            }
            50% { 
                text-shadow: 0 0 30px rgba(64, 224, 255, 0.8);
            }
        }
        
        .company-name {
            animation: oceanFlow 4s ease-in-out infinite;
        }
        
        @keyframes waveShimmer {
            0% { 
                background-position: -200% 0;
            }
            100% { 
                background-position: 200% 0;
            }
        }
        
        .contact-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }
        
        .contact-button:hover::before {
            left: 100%;
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 40px 25px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
            }
            .company-name {
                font-size: 1.9rem;
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
                    <i class="fas fa-water" style="font-size: 45px; color: #40E0FF;"></i>
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
                            <div style="display: flex; align-items: center; margin-bottom: 16px;">
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 16px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #40E0FF;">{{bank.banka_adi}}</div>
                                    <div style="color: #E8F4F8; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; background: linear-gradient(135deg, #40E0FF, #1E90FF); color: #0B1426; font-weight: 600; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.9rem;">
                                        {{#if this.para_birimi}}
                                            {{#ifEquals this.para_birimi "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 12px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)"><i class="fas fa-copy"></i></button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#B0E0E6; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
                btn.style.background = 'linear-gradient(135deg, #40E0FF, #1E90FF)';
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
