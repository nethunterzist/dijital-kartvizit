export const suluboyaPaletiTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Quicksand', sans-serif;
            background: #FEF7F0;
            overflow-y: auto;
            color: #5A4A42;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #FEF7F0 0%, #F8E8E0 50%, #FEF7F0 100%);
            position: relative;
        }
        
        /* Watercolor splash effects */
        .main-container::before {
            content: '';
            position: absolute;
            top: 20px;
            right: 30px;
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            z-index: 1;
        }
        
        .main-container::after {
            content: '';
            position: absolute;
            bottom: 50px;
            left: 20px;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(173, 216, 230, 0.3) 0%, transparent 70%);
            border-radius: 50%;
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
            border: 4px solid rgba(255, 182, 193, 0.6);
            box-shadow: 
                0 8px 25px rgba(255, 182, 193, 0.3),
                0 0 0 8px rgba(173, 216, 230, 0.2);
            transition: all 0.4s ease;
        }
        
        .profile-image:hover {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 
                0 12px 35px rgba(255, 182, 193, 0.4),
                0 0 0 12px rgba(173, 216, 230, 0.3);
        }
        
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(255, 182, 193, 0.2);
            border: 4px solid rgba(255, 182, 193, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 8px 25px rgba(255, 182, 193, 0.3);
        }
        
        /* Watercolor brush strokes */
        .profile-container::before {
            content: '';
            position: absolute;
            top: -20px;
            left: -20px;
            width: 40px;
            height: 15px;
            background: linear-gradient(45deg, rgba(255, 182, 193, 0.4), transparent);
            border-radius: 50px;
            transform: rotate(45deg);
        }
        
        .profile-container::after {
            content: '';
            position: absolute;
            bottom: -15px;
            right: -15px;
            width: 35px;
            height: 12px;
            background: linear-gradient(-45deg, rgba(173, 216, 230, 0.4), transparent);
            border-radius: 50px;
            transform: rotate(-30deg);
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #5A4A42;
        }
        
        .company-name {
            font-family: 'Dancing Script', cursive;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #8B4B8C;
            line-height: 1.2;
            text-shadow: 2px 2px 4px rgba(139, 75, 140, 0.1);
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #D2691E;
            font-style: italic;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #5A4A42;
            font-weight: 400;
            opacity: 0.8;
        }
        
        .contact-button {
            background: linear-gradient(135deg, #FFB6C1 0%, #ADD8E6 100%);
            border: 2px solid rgba(255, 182, 193, 0.6);
            border-radius: 25px;
            padding: 12px 25px;
            color: #5A4A42;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Quicksand', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
        }
        
        .contact-button:hover {
            background: linear-gradient(135deg, #ADD8E6 0%, #FFB6C1 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 182, 193, 0.4);
            color: #5A4A42;
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
            background: rgba(255, 255, 255, 0.7);
            border: 2px solid rgba(255, 182, 193, 0.3);
            border-radius: 20px;
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            backdrop-filter: blur(5px);
            box-shadow: 0 4px 15px rgba(255, 182, 193, 0.2);
        }
        
        .icon-card:nth-child(odd) {
            transform: rotate(1deg);
        }
        
        .icon-card:nth-child(even) {
            transform: rotate(-1deg);
        }
        
        .icon-card:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(255, 182, 193, 0.6);
            transform: translateY(-3px) rotate(0deg) scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
        }
        
        .icon-card a {
            color: #5A4A42;
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
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
        }
        
        .icon-label {
            font-size: 10px;
            font-weight: 500;
            line-height: 1.3;
            color: #5A4A42;
        }
        
        /* Watercolor icon colors */
        .icon-card:nth-child(1) i { color: #8B4B8C; } /* QR - Purple */
        .icon-card i.fa-phone { color: #FF6B6B; }
        .icon-card i.fa-envelope { color: #4ECDC4; }
        .icon-card i.fa-whatsapp { color: #95E1D3; }
        .icon-card i.fab.fa-telegram { color: #74B9FF; }
        .icon-card i.fab.fa-instagram { color: #FD79A8; }
        .icon-card i.fab.fa-facebook { color: #6C5CE7; }
        .icon-card i.fab.fa-twitter { color: #74B9FF; }
        .icon-card i.fab.fa-linkedin { color: #0984E3; }
        .icon-card i.fab.fa-youtube { color: #E17055; }
        .icon-card i.fab.fa-tiktok { color: #2D3436; }
        .icon-card i.fa-globe { color: #00B894; }
        .icon-card i.fa-map-marker-alt { color: #E84393; }
        .icon-card i.fa-university { color: #FDCB6E; }
        .icon-card i.fa-file-text { color: #A29BFE; }
        .icon-card i.fa-info-circle { color: #81ECEC; }
        .icon-card i.fa-book { color: #FD79A8; }
        
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        
        .logo-image {
            width: 85px;
            height: 85px;
            object-fit: contain;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.7);
            padding: 10px;
            border: 2px solid rgba(255, 182, 193, 0.3);
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 182, 193, 0.2);
        }
        
        .logo-image:hover {
            transform: scale(1.05) rotate(2deg);
            border-color: rgba(255, 182, 193, 0.6);
            box-shadow: 0 6px 20px rgba(255, 182, 193, 0.3);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(254, 247, 240, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        
        .custom-popup-content {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid rgba(255, 182, 193, 0.6);
            border-radius: 20px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 15px 50px rgba(255, 182, 193, 0.3);
            position: relative;
            color: #5A4A42;
            font-family: 'Quicksand', sans-serif;
            backdrop-filter: blur(10px);
        }
        
        .custom-popup-close {
            position: absolute;
            top: 12px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #8B4B8C;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #D2691E;
        }
        
        .popup-title {
            font-family: 'Dancing Script', cursive;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #8B4B8C;
            text-align: center;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 0.95rem;
            color: #5A4A42;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: linear-gradient(135deg, #FFB6C1, #ADD8E6);
            border: 1px solid rgba(255, 182, 193, 0.6);
            border-radius: 12px;
            padding: 5px 8px;
            color: #5A4A42;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.8rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
        }
        
        .copy-btn:hover {
            background: linear-gradient(135deg, #ADD8E6, #FFB6C1);
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(255, 182, 193, 0.3);
            border-radius: 15px;
            padding: 18px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(255, 182, 193, 0.1);
        }
        
        .iban-text {
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(255, 182, 193, 0.3);
            border-radius: 10px;
            padding: 10px;
            font-family: 'Quicksand', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #5A4A42;
        }
        
        .iban-text:focus {
            border-color: rgba(255, 182, 193, 0.6);
            outline: none;
            box-shadow: 0 0 0 3px rgba(255, 182, 193, 0.1);
        }
        
        @keyframes watercolorFloat {
            0%, 100% { 
                transform: translateY(0px) rotate(1deg);
            }
            50% { 
                transform: translateY(-5px) rotate(-1deg);
            }
        }
        
        .company-name {
            animation: watercolorFloat 4s ease-in-out infinite;
        }
        
        @keyframes fadeInWatercolor {
            from { 
                transform: translateY(30px) scale(0.9); 
                opacity: 0; 
            }
            to { 
                transform: translateY(0) scale(1); 
                opacity: 1; 
            }
        }
        
        .custom-popup-content {
            animation: fadeInWatercolor 0.4s ease;
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 25px 15px;
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
                    <i class="fas fa-palette" style="font-size: 45px; color: #8B4B8C;"></i>
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
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #8B4B8C;">{{bank.bank_label}}</div>
                                    <div style="color: #5A4A42; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #FFB6C1, #ADD8E6); color: #5A4A42; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
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
                    <div style="text-align:center; color:#5A4A42; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
                btn.style.background = 'linear-gradient(135deg, #FFB6C1, #ADD8E6)';
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
