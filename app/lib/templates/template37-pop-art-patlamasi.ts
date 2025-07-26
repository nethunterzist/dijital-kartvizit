export const popArtPatlamasiTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One:wght@400&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Nunito', sans-serif;
            background: #FF1744;
            overflow-y: auto;
            color: #FFFFFF;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(45deg, #FF1744 0%, #FF5722 25%, #FFEB3B 50%, #4CAF50 75%, #2196F3 100%);
            position: relative;
            border: 5px solid #FFFFFF;
        }
        
        /* Pop art dots pattern */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
                radial-gradient(circle at 60px 60px, rgba(0, 0, 0, 0.2) 2px, transparent 2px);
            background-size: 40px 40px, 80px 80px;
            z-index: 1;
        }
        
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
        
        .profile-container {
            margin-bottom: 30px;
            position: relative;
        }
        
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid #FFFFFF;
            box-shadow: 
                0 0 0 5px #FF1744,
                0 0 0 10px #FFFFFF,
                0 8px 25px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            filter: contrast(1.2) saturate(1.3);
        }
        
        .profile-image:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 
                0 0 0 5px #FFEB3B,
                0 0 0 10px #FFFFFF,
                0 12px 35px rgba(0, 0, 0, 0.4);
        }
        
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 5px solid #FF1744;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 0 0 5px #FFFFFF,
                0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        /* Pop art explosion effect */
        .profile-container::before {
            content: 'POW!';
            position: absolute;
            top: -30px;
            right: -30px;
            background: #FFEB3B;
            color: #FF1744;
            padding: 5px 10px;
            border-radius: 50%;
            font-family: 'Fredoka One', cursive;
            font-size: 12px;
            font-weight: bold;
            border: 3px solid #FFFFFF;
            transform: rotate(15deg);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .company-info {
            margin-bottom: 30px;
            color: #FFFFFF;
        }
        
        .company-name {
            font-family: 'Fredoka One', cursive;
            font-size: 2.2rem;
            font-weight: 400;
            margin-bottom: 15px;
            color: #FFFFFF;
            line-height: 1.2;
            text-shadow: 
                3px 3px 0px #000000,
                -1px -1px 0px #000000,
                1px -1px 0px #000000,
                -1px 1px 0px #000000,
                1px 1px 0px #000000;
            text-transform: uppercase;
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 800;
            margin-bottom: 8px;
            color: #FFEB3B;
            text-shadow: 2px 2px 0px #000000;
            text-transform: uppercase;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #FFFFFF;
            font-weight: 700;
            text-shadow: 1px 1px 0px #000000;
            text-transform: uppercase;
        }
        
        .contact-button {
            background: #FFEB3B;
            border: 4px solid #FFFFFF;
            border-radius: 25px;
            padding: 15px 30px;
            color: #FF1744;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1.1rem;
            font-weight: 800;
            font-family: 'Fredoka One', cursive;
            transition: all 0.3s ease;
            text-transform: uppercase;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
        }
        
        .contact-button:hover {
            background: #4CAF50;
            color: #FFFFFF;
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            max-width: 320px;
            width: 100%;
            margin-top: 30px;
        }
        
        .icon-card {
            background: #FFFFFF;
            border: 3px solid #000000;
            border-radius: 15px;
            padding: 15px 8px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .icon-card:nth-child(1) { background: #FF1744; }
        .icon-card:nth-child(2) { background: #FFEB3B; }
        .icon-card:nth-child(3) { background: #4CAF50; }
        .icon-card:nth-child(4) { background: #2196F3; }
        .icon-card:nth-child(5) { background: #FF5722; }
        .icon-card:nth-child(6) { background: #9C27B0; }
        .icon-card:nth-child(7) { background: #FF9800; }
        .icon-card:nth-child(8) { background: #00BCD4; }
        .icon-card:nth-child(9) { background: #8BC34A; }
        .icon-card:nth-child(10) { background: #E91E63; }
        .icon-card:nth-child(11) { background: #FFC107; }
        .icon-card:nth-child(12) { background: #3F51B5; }
        
        .icon-card:hover {
            transform: translateY(-5px) rotate(5deg) scale(1.1);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        
        .icon-card a {
            color: #FFFFFF;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }
        
        .icon-card:nth-child(2) a,
        .icon-card:nth-child(7) a,
        .icon-card:nth-child(11) a {
            color: #000000;
        }
        
        .icon-card i {
            font-size: 20px;
            margin-bottom: 4px;
            transition: all 0.3s ease;
            text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
        }
        
        .icon-card:hover i {
            transform: scale(1.2);
        }
        
        .icon-label {
            font-size: 9px;
            font-weight: 800;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-family: 'Fredoka One', cursive;
            text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
        }
        
        .company-logo {
            margin-top: 30px;
            text-align: center;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 15px;
            background: #FFFFFF;
            padding: 10px;
            border: 3px solid #000000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            filter: contrast(1.2) saturate(1.3);
        }
        
        .logo-image:hover {
            transform: scale(1.1) rotate(-5deg);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(255, 23, 68, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        
        .custom-popup-content {
            background: #FFFFFF;
            border: 5px solid #000000;
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
            position: relative;
            color: #000000;
            font-family: 'Nunito', sans-serif;
        }
        
        .custom-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: #FF1744;
            border: 2px solid #000000;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
            color: #FFFFFF;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .custom-popup-close:hover {
            background: #FFEB3B;
            color: #000000;
            transform: scale(1.1);
        }
        
        .popup-title {
            font-family: 'Fredoka One', cursive;
            font-size: 1.6rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #FF1744;
            text-align: center;
            text-transform: uppercase;
            text-shadow: 2px 2px 0px #FFEB3B;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 1rem;
            color: #000000;
            line-height: 1.6;
            font-weight: 600;
        }
        
        .copy-btn {
            background: #4CAF50;
            border: 2px solid #000000;
            border-radius: 10px;
            padding: 6px 10px;
            color: #FFFFFF;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.85rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Fredoka One', cursive;
            font-weight: 400;
            text-transform: uppercase;
        }
        
        .copy-btn:hover {
            background: #FF5722;
            transform: translateY(-2px) scale(1.05);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: linear-gradient(45deg, #FFEB3B, #FF9800);
            border: 3px solid #000000;
            border-radius: 15px;
            padding: 18px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .iban-text {
            background: #FFFFFF;
            border: 3px solid #000000;
            border-radius: 10px;
            padding: 10px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.9rem;
            font-weight: 700;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #000000;
        }
        
        .iban-text:focus {
            border-color: #FF1744;
            outline: none;
            box-shadow: 0 0 10px rgba(255, 23, 68, 0.5);
        }
        
        @keyframes popBounce {
            0%, 100% { 
                transform: scale(1);
            }
            50% { 
                transform: scale(1.05);
            }
        }
        
        .company-name {
            animation: popBounce 2s ease-in-out infinite;
        }
        
        @keyframes colorShift {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .main-container:hover {
            animation: colorShift 3s ease-in-out;
        }
        
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
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-star" style="font-size: 40px; color: #FF1744;"></i>
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
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 800; font-size: 1.1rem; color: #000000;">{{bank.bank_label}}</div>
                                    <div style="color: #000000; font-size: 0.9rem; font-weight: 600;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; background: #FF1744; color: #FFFFFF; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; border: 2px solid #000000;">
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
                    <div style="text-align:center; color:#000000; padding: 40px; font-weight: 700;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#2196F3';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = '#4CAF50';
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
