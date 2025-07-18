export const pastelBloomTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600&display=swap" rel="stylesheet">
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
            font-family: 'Quicksand', sans-serif;
            background: #FFF0F5;
            color: #444444;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        /* 3. Background Pattern */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(178, 223, 219, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(255, 209, 128, 0.1) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
        }
        
        /* 4. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FFF0F5;
            position: relative;
        }
        
        /* 5. Card Content */
        .card-content {
            padding: 40px 30px;
            text-align: center;
        }
        
        /* 6. Profile Section */
        .profile-container {
            margin-bottom: 30px;
        }
        .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #FFB6C1;
            margin: 0 auto;
            display: block;
            box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: #FFEEF0;
            border: 4px solid #FFB6C1;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
        }
        
        /* 7. Company Info */
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 1.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #444444;
            letter-spacing: -0.02em;
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #FFB6C1;
        }
        .position {
            font-size: 1rem;
            color: #888;
            margin-bottom: 25px;
            font-weight: 400;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #FFB6C1, #B2DFDB);
            color: #444444;
            text-decoration: none;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
        }
        .contact-button:active {
            transform: scale(1.03);
            box-shadow: 0 6px 20px rgba(255, 182, 193, 0.4);
            color: #444444;
            text-decoration: none;
        }
        
        /* 8. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 40px;
            padding: 0 10px;
        }
        
        /* 9. Icon Cards - Soft pastel */
        .icon-card {
            background: #FFFFFF;
            border: 2px solid #DADADA;
            border-radius: 20px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 15px rgba(218, 218, 218, 0.2);
        }
        .icon-card:active {
            transform: scale(1.03);
            border-color: #FFB6C1;
            box-shadow: 0 6px 20px rgba(255, 182, 193, 0.3);
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
        }
        .icon-card i {
            font-size: 24px;
            color: #888;
            transition: all 0.3s ease;
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #444444;
            text-align: center;
            line-height: 1.2;
        }
        
        /* 10. Icon Colors - Pastel colors */
        .icon-card:nth-child(1) i { color: #B2DFDB; } /* QR */
        .icon-card i.fa-phone { color: #FFB6C1; }
        .icon-card i.fa-envelope { color: #FFD180; }
        .icon-card i.fa-whatsapp { color: #B2DFDB; }
        .icon-card i.fab.fa-telegram { color: #B3E5FC; }
        .icon-card i.fab.fa-instagram { color: #F8BBD9; }
        .icon-card i.fab.fa-facebook { color: #C5CAE9; }
        .icon-card i.fab.fa-twitter { color: #B3E5FC; }
        .icon-card i.fab.fa-linkedin { color: #BBDEFB; }
        .icon-card i.fab.fa-youtube { color: #FFCDD2; }
        .icon-card i.fab.fa-tiktok { color: #F3E5F5; }
        .icon-card i.fa-globe { color: #E1BEE7; }
        .icon-card i.fa-map-marker-alt { color: #FFCC80; }
        .icon-card i.fa-university { color: #C8E6C9; }
        .icon-card i.fa-file-invoice { color: #B3E5FC; }
        .icon-card i.fa-info-circle { color: #B2DFDB; }
        .icon-card i.fa-book { color: #FFF9C4; }
        
        /* 11. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 20px;
            background: #FFFFFF;
            padding: 8px;
            border: 2px solid #DADADA;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(218, 218, 218, 0.2);
        }
        .logo-image:active {
            transform: scale(1.03);
            border-color: #FFB6C1;
            box-shadow: 0 6px 20px rgba(255, 182, 193, 0.3);
        }
        
        /* 12. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(68, 68, 68, 0.6);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #FFF0F5;
            border-radius: 25px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 50px rgba(255, 182, 193, 0.3);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 3px solid #FFB6C1;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #888;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #444444;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #FFB6C1;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #444444;
            line-height: 1.5;
        }
        .copy-btn {
            background: #FFFFFF;
            border: 2px solid #DADADA;
            border-radius: 15px;
            padding: 4px 8px;
            color: #444444;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            transform: scale(1.03);
            border-color: #FFB6C1;
            background: #FFEEF0;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #FFFFFF;
            border: 2px solid #DADADA;
            border-radius: 20px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(218, 218, 218, 0.2);
        }
        .iban-text {
            background: #FFFFFF;
            border: 2px solid #DADADA;
            border-radius: 15px;
            padding: 8px 12px;
            font-family: 'Quicksand', sans-serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #444444;
        }
        .iban-text:focus {
            border-color: #FFB6C1;
            outline: none;
            background: #FFEEF0;
        }
        
        /* 13. Animations */
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* 14. Responsive */
        @media (max-width: 400px) {
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .profile-image, .profile-placeholder {
                width: 110px;
                height: 110px;
            }
            .company-name {
                font-size: 1.6rem;
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
                    <i class="fas fa-user" style="font-size: 52px; color: #CCC;"></i>
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
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_unvan}}', event)">Kopyala</button>
                </div>
                <div><strong>Vergi Numarası:</strong> {{tax.firma_vergi_no}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.firma_vergi_no}}', event)">Kopyala</button>
                </div>
                <div><strong>Vergi Dairesi:</strong> {{tax.vergi_dairesi}}
                    <button class="copy-btn" onclick="copyToClipboard('{{tax.vergi_dairesi}}', event)">Kopyala</button>
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
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 12px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #FFB6C1;">{{bank.bank_label}}</div>
                                    <div style="color: #888; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #FFB6C1, #B2DFDB); color: #444444; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
                                        {{#if this.currency}}
                                            {{#ifEquals this.currency "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.currency "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 8px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#888; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            const originalText = btn.textContent;
            btn.textContent = 'Kopyalandı!';
            btn.style.background = '#E8F5E8';
            btn.style.borderColor = '#C8E6C9';
            btn.style.color = '#2E7D32';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#FFFFFF';
                btn.style.borderColor = '#DADADA';
                btn.style.color = '#444444';
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
