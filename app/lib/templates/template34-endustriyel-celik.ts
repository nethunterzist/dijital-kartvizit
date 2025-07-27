export const endustriyelCelikTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Roboto', sans-serif;
            background: #1A1A1A;
            overflow-y: auto;
            color: #E0E0E0;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 50%, #1A1A1A 100%);
            position: relative;
            border-left: 3px solid #FF6B35;
            border-right: 3px solid #FF6B35;
        }
        
        /* Industrial grid pattern */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(255, 107, 53, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 107, 53, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.3;
            z-index: 1;
        }
        
        /* Metal texture overlay */
        .main-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
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
            width: 140px;
            height: 140px;
            border-radius: 0;
            object-fit: cover;
            border: 3px solid #FF6B35;
            box-shadow: 
                0 0 0 6px rgba(255, 107, 53, 0.2),
                0 8px 25px rgba(0, 0, 0, 0.5),
                inset 0 0 20px rgba(255, 107, 53, 0.1);
            transition: all 0.4s ease;
            clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
        }
        
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 0 0 8px rgba(255, 107, 53, 0.3),
                0 12px 35px rgba(0, 0, 0, 0.7),
                inset 0 0 30px rgba(255, 107, 53, 0.2);
        }
        
        .profile-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 0;
            background: rgba(255, 107, 53, 0.1);
            border: 3px solid #FF6B35;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 0 6px rgba(255, 107, 53, 0.2),
                0 8px 25px rgba(0, 0, 0, 0.5);
            clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
        }
        
        /* Industrial corner brackets */
        .profile-container::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            width: 30px;
            height: 30px;
            border-top: 3px solid #FF6B35;
            border-left: 3px solid #FF6B35;
        }
        
        .profile-container::after {
            content: '';
            position: absolute;
            bottom: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            border-bottom: 3px solid #FF6B35;
            border-right: 3px solid #FF6B35;
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #E0E0E0;
        }
        
        .company-name {
            font-family: 'Orbitron', monospace;
            font-size: 2.2rem;
            font-weight: 900;
            margin-bottom: 15px;
            color: #FF6B35;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #E0E0E0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #B0B0B0;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .contact-button {
            background: linear-gradient(135deg, #FF6B35 0%, #D84315 100%);
            border: 2px solid #FF6B35;
            border-radius: 0;
            padding: 15px 30px;
            color: #FFFFFF;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 700;
            font-family: 'Orbitron', monospace;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }
        
        .contact-button:hover {
            background: linear-gradient(135deg, #D84315 0%, #FF6B35 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
            color: #FFFFFF;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 360px;
            width: 100%;
            margin-top: 40px;
        }
        
        .icon-card {
            background: rgba(44, 44, 44, 0.8);
            border: 2px solid rgba(255, 107, 53, 0.3);
            border-radius: 0;
            padding: 20px 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .icon-card:hover {
            background: rgba(255, 107, 53, 0.1);
            border-color: #FF6B35;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
        }
        
        .icon-card a {
            color: #E0E0E0;
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
            color: #FF6B35;
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
            text-shadow: 0 0 10px rgba(255, 107, 53, 0.6);
        }
        
        .icon-label {
            font-size: 10px;
            font-weight: 600;
            line-height: 1.3;
            color: #E0E0E0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-family: 'Orbitron', monospace;
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
            background: rgba(44, 44, 44, 0.8);
            padding: 12px;
            border: 2px solid rgba(255, 107, 53, 0.3);
            transition: all 0.3s ease;
            clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #FF6B35;
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(26, 26, 26, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        
        .custom-popup-content {
            background: linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%);
            border: 2px solid #FF6B35;
            border-radius: 0;
            padding: 30px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 15px 50px rgba(255, 107, 53, 0.3);
            position: relative;
            color: #E0E0E0;
            font-family: 'Roboto', sans-serif;
            clip-path: polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%);
        }
        
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #FF6B35;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #D84315;
        }
        
        .popup-title {
            font-family: 'Orbitron', monospace;
            font-size: 1.6rem;
            font-weight: 900;
            margin-bottom: 25px;
            color: #FF6B35;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 1rem;
            color: #E0E0E0;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: linear-gradient(135deg, #FF6B35, #D84315);
            border: 1px solid #FF6B35;
            border-radius: 0;
            padding: 6px 10px;
            color: #FFFFFF;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            text-transform: uppercase;
            clip-path: polygon(5px 0%, 100% 0%, calc(100% - 5px) 100%, 0% 100%);
        }
        
        .copy-btn:hover {
            background: linear-gradient(135deg, #D84315, #FF6B35);
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
            clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        
        .iban-text {
            background: rgba(26, 26, 26, 0.8);
            border: 2px solid rgba(255, 107, 53, 0.3);
            border-radius: 0;
            padding: 10px;
            font-family: 'Orbitron', monospace;
            font-size: 0.9rem;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #E0E0E0;
        }
        
        .iban-text:focus {
            border-color: #FF6B35;
            outline: none;
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.3);
        }
        
        @keyframes industrialGlow {
            0%, 100% { 
                text-shadow: 0 0 5px rgba(255, 107, 53, 0.3);
            }
            50% { 
                text-shadow: 0 0 15px rgba(255, 107, 53, 0.6);
            }
        }
        
        .company-name {
            animation: industrialGlow 3s ease-in-out infinite;
        }
        
        @keyframes metalShine {
            0% { 
                background-position: -100% 0;
            }
            100% { 
                background-position: 100% 0;
            }
        }
        
        .contact-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .contact-button:hover::before {
            left: 100%;
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
                font-size: 1.8rem;
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
                    <i class="fas fa-industry" style="font-size: 50px; color: #FF6B35;"></i>
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
                                    <div style="font-weight: 700; font-size: 1.1rem; color: #FF6B35;">{{bank.banka_adi}}</div>
                                    <div style="color: #E0E0E0; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 0; background: linear-gradient(135deg, #FF6B35, #D84315); color: #FFFFFF; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);">
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
                    <div style="text-align:center; color:#E0E0E0; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
                btn.style.background = 'linear-gradient(135deg, #FF6B35, #D84315)';
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
