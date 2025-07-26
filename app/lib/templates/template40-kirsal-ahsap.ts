export const kirsalAhsapTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Open Sans', sans-serif;
            background: #8B4513;
            overflow-y: auto;
            color: #2F1B14;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #D2B48C 0%, #DEB887 50%, #D2B48C 100%);
            position: relative;
            border-left: 4px solid #8B4513;
            border-right: 4px solid #8B4513;
        }
        
        /* Wood grain texture */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(90deg, transparent 40%, rgba(139, 69, 19, 0.1) 50%, transparent 60%),
                linear-gradient(0deg, transparent 40%, rgba(160, 82, 45, 0.08) 50%, transparent 60%);
            background-size: 30px 30px, 40px 40px;
            z-index: 1;
        }
        
        /* Wood knots and patterns */
        .main-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 25% 25%, rgba(139, 69, 19, 0.15) 0%, transparent 40%),
                radial-gradient(ellipse at 75% 75%, rgba(160, 82, 45, 0.12) 0%, transparent 40%);
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
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #8B4513;
            box-shadow: 
                0 8px 25px rgba(139, 69, 19, 0.4),
                inset 0 0 0 3px rgba(222, 184, 135, 0.8);
            transition: all 0.3s ease;
            filter: sepia(10%) contrast(1.1);
        }
        
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 12px 35px rgba(139, 69, 19, 0.5),
                inset 0 0 0 3px rgba(222, 184, 135, 0.9);
        }
        
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(222, 184, 135, 0.8);
            border: 4px solid #8B4513;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 8px 25px rgba(139, 69, 19, 0.4);
        }
        
        /* Rustic decorative elements */
        .profile-container::before {
            content: '🌲';
            position: absolute;
            top: -25px;
            left: -25px;
            font-size: 20px;
        }
        
        .profile-container::after {
            content: '🌲';
            position: absolute;
            bottom: -25px;
            right: -25px;
            font-size: 20px;
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #2F1B14;
        }
        
        .company-name {
            font-family: 'Merriweather', serif;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #8B4513;
            line-height: 1.3;
            text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.2);
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #A0522D;
            font-family: 'Merriweather', serif;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #654321;
            font-weight: 400;
        }
        
        .contact-button {
            background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
            border: 2px solid #8B4513;
            border-radius: 25px;
            padding: 14px 28px;
            color: #F5DEB3;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Open Sans', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
        }
        
        .contact-button:hover {
            background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
            color: #F5DEB3;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            max-width: 350px;
            width: 100%;
            margin-top: 40px;
        }
        
        .icon-card {
            background: rgba(245, 222, 179, 0.9);
            border: 2px solid rgba(139, 69, 19, 0.3);
            border-radius: 15px;
            padding: 18px 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
        }
        
        .icon-card:hover {
            background: rgba(222, 184, 135, 0.9);
            border-color: rgba(139, 69, 19, 0.5);
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
        }
        
        .icon-card a {
            color: #2F1B14;
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
            color: #8B4513;
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
            color: #A0522D;
        }
        
        .icon-label {
            font-size: 10px;
            font-weight: 600;
            line-height: 1.3;
            color: #2F1B14;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        
        .logo-image {
            width: 85px;
            height: 85px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(245, 222, 179, 0.9);
            padding: 10px;
            border: 2px solid rgba(139, 69, 19, 0.3);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.2);
            filter: sepia(5%);
        }
        
        .logo-image:hover {
            transform: scale(1.05);
            border-color: rgba(139, 69, 19, 0.5);
            box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(210, 180, 140, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        
        .custom-popup-content {
            background: rgba(245, 222, 179, 0.98);
            border: 3px solid #8B4513;
            border-radius: 15px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 15px 40px rgba(139, 69, 19, 0.4);
            position: relative;
            color: #2F1B14;
            font-family: 'Open Sans', sans-serif;
        }
        
        .custom-popup-close {
            position: absolute;
            top: 12px;
            right: 18px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #8B4513;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #A0522D;
        }
        
        .popup-title {
            font-family: 'Merriweather', serif;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #8B4513;
            text-align: center;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 1rem;
            color: #2F1B14;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: linear-gradient(135deg, #8B4513, #A0522D);
            border: 1px solid #8B4513;
            border-radius: 8px;
            padding: 5px 10px;
            color: #F5DEB3;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.85rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Open Sans', sans-serif;
            font-weight: 600;
        }
        
        .copy-btn:hover {
            background: linear-gradient(135deg, #A0522D, #8B4513);
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: rgba(222, 184, 135, 0.8);
            border: 1px solid rgba(139, 69, 19, 0.3);
            border-radius: 12px;
            padding: 18px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(139, 69, 19, 0.1);
        }
        
        .iban-text {
            background: rgba(245, 222, 179, 0.9);
            border: 2px solid rgba(139, 69, 19, 0.3);
            border-radius: 8px;
            padding: 10px;
            font-family: 'Open Sans', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #2F1B14;
        }
        
        .iban-text:focus {
            border-color: #8B4513;
            outline: none;
            box-shadow: 0 0 8px rgba(139, 69, 19, 0.3);
        }
        
        /* Rustic animations */
        @keyframes rusticSway {
            0%, 100% { 
                transform: rotate(0deg);
            }
            25% { 
                transform: rotate(0.5deg);
            }
            75% { 
                transform: rotate(-0.5deg);
            }
        }
        
        .company-name {
            animation: rusticSway 6s ease-in-out infinite;
        }
        
        @keyframes woodGrain {
            0% { 
                background-position: 0% 0%;
            }
            100% { 
                background-position: 100% 100%;
            }
        }
        
        .main-container::before {
            animation: woodGrain 20s linear infinite;
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
                    <i class="fas fa-tree" style="font-size: 45px; color: #8B4513;"></i>
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
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px; filter: sepia(5%);">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1rem; color: #8B4513;">{{bank.bank_label}}</div>
                                    <div style="color: #2F1B14; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #8B4513, #A0522D); color: #F5DEB3; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.85rem;">
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
                    <div style="text-align:center; color:#654321; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
                btn.style.background = 'linear-gradient(135deg, #8B4513, #A0522D)';
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
