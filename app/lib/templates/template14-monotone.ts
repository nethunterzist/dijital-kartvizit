export const monotoneTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500&display=swap" rel="stylesheet">
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
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: #FFFFFF;
            color: #111111;
            line-height: 1.6;
            overflow-y: auto;
            font-weight: 300;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FFFFFF;
            position: relative;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 50px 40px;
            text-align: center;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 40px;
        }
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: none;
            margin: 0 auto;
            display: block;
            filter: grayscale(100%);
        }
        .profile-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: #F8F8F8;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 50px;
        }
        .company-name {
            font-size: 2.2rem;
            font-weight: 300;
            margin-bottom: 12px;
            color: #111111;
            letter-spacing: -0.03em;
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 8px;
            color: #CCCCCC;
        }
        .position {
            font-size: 1rem;
            color: #888888;
            margin-bottom: 30px;
            font-weight: 300;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 28px;
            background: #111111;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 0;
            font-size: 0.9rem;
            font-weight: 400;
            transition: all 0.3s ease;
            border: 1px solid #111111;
        }
        .contact-button:active {
            opacity: 0.8;
            transform: scale(0.95);
            color: #FFFFFF;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 50px;
            padding: 0 10px;
        }
        
        /* 8. Icon Cards - Minimal monochrome */
        .icon-card {
            background: #FFFFFF;
            border: none;
            border-radius: 0;
            padding: 20px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .icon-card:active {
            opacity: 0.6;
            transform: scale(0.95);
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            width: 100%;
        }
        .icon-card i {
            font-size: 28px;
            color: #CCCCCC;
            transition: all 0.3s ease;
        }
        .icon-label {
            font-size: 0.8rem;
            font-weight: 300;
            color: #111111;
            text-align: center;
            line-height: 1.3;
        }
        
        /* 9. Icon Colors - All monochrome */
        .icon-card:nth-child(1) i { color: #CCCCCC; } /* QR */
        .icon-card i.fa-phone { color: #CCCCCC; }
        .icon-card i.fa-envelope { color: #CCCCCC; }
        .icon-card i.fa-whatsapp { color: #CCCCCC; }
        .icon-card i.fab.fa-telegram { color: #CCCCCC; }
        .icon-card i.fab.fa-instagram { color: #CCCCCC; }
        .icon-card i.fab.fa-facebook { color: #CCCCCC; }
        .icon-card i.fab.fa-twitter { color: #CCCCCC; }
        .icon-card i.fab.fa-linkedin { color: #CCCCCC; }
        .icon-card i.fab.fa-youtube { color: #CCCCCC; }
        .icon-card i.fab.fa-tiktok { color: #CCCCCC; }
        .icon-card i.fa-globe { color: #CCCCCC; }
        .icon-card i.fa-map-marker-alt { color: #CCCCCC; }
        .icon-card i.fa-university { color: #CCCCCC; }
        .icon-card i.fa-file-invoice { color: #CCCCCC; }
        .icon-card i.fa-info-circle { color: #CCCCCC; }
        .icon-card i.fa-book { color: #CCCCCC; }
        
        /* 10. Company Logo */
        .company-logo {
            margin-top: 50px;
            text-align: center;
        }
        .logo-image {
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 0;
            background: transparent;
            padding: 0;
            border: none;
            transition: all 0.3s ease;
            filter: grayscale(100%);
        }
        .logo-image:active {
            opacity: 0.8;
            transform: scale(0.95);
        }
        
        /* 11. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(17, 17, 17, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #FFFFFF;
            border-radius: 0;
            padding: 30px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(17, 17, 17, 0.2);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 1px solid #EEEEEE;
        }
        .custom-popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #CCCCCC;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
            font-weight: 300;
        }
        .custom-popup-close:active {
            color: #111111;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 20px;
            color: #CCCCCC;
        }
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 0.9rem;
            color: #111111;
            line-height: 1.6;
            font-weight: 300;
        }
        .copy-btn {
            background: #F8F8F8;
            border: none;
            border-radius: 0;
            padding: 6px 8px;
            color: #111111;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 300;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
        }
        .copy-btn:active {
            opacity: 0.6;
            transform: scale(0.95);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #FAFAFA;
            border: none;
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
        }
        .iban-text {
            background: #FFFFFF;
            border: 1px solid #EEEEEE;
            border-radius: 0;
            padding: 10px 15px;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 0.9rem;
            font-weight: 300;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #111111;
        }
        .iban-text:focus {
            border-color: #CCCCCC;
            outline: none;
        }
        
        /* 12. Animations */
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* 13. Responsive */
        @media (max-width: 400px) {
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .profile-image, .profile-placeholder {
                width: 120px;
                height: 120px;
            }
            .company-name {
                font-size: 1.8rem;
            }
            .card-content {
                padding: 40px 30px;
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
                    <i class="fas fa-user" style="font-size: 56px; color: #CCCCCC;"></i>
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
                <!-- Dynamic icons will be inserted here -->
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
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 36px; height: 36px; object-fit: contain; margin-right: 15px; filter: grayscale(100%);">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 400; font-size: 1rem; color: #CCCCCC;">{{bank.bank_label}}</div>
                                    <div style="color: #888888; font-size: 0.85rem; font-weight: 300;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 32px; height: 32px; border-radius: 0; background: #CCCCCC; color: #FFFFFF; font-weight: 400; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.8rem;">
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
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#888888; padding: 40px; font-weight: 300;">Tanımlı banka hesabı bulunamadı.</div>
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
    };
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
