export const goldmarkTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
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
            color: #FFFFFF;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        /* 3. Background Pattern - Luxury texture */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.02) 50%, transparent 70%);
            z-index: -1;
            pointer-events: none;
        }
        
        /* 4. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #121212;
            position: relative;
            border-left: 1px solid rgba(255, 215, 0, 0.1);
            border-right: 1px solid rgba(255, 215, 0, 0.1);
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
            border: 3px solid #FFD700;
            margin: 0 auto;
            display: block;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: #1A1A1A;
            border: 3px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
        }
        
        /* 7. Company Info */
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #FFFFFF;
            letter-spacing: -0.02em;
            text-shadow: 0 2px 10px rgba(255, 215, 0, 0.2);
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #FFD700;
            text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }
        .position {
            font-size: 1rem;
            color: #CCCCCC;
            margin-bottom: 25px;
            font-weight: 400;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #FFD700, #FFA000);
            color: #121212;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 2px solid #FFD700;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
        }
        .contact-button:active {
            box-shadow: 0 8px 30px rgba(255, 215, 0, 0.5);
            transform: scale(0.95);
            color: #121212;
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
        
        /* 9. Icon Cards - Premium gold */
        .icon-card {
            background: #1A1A1A;
            border: 2px solid #FFD700;
            border-radius: 12px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
        }
        .icon-card:active {
            box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
            border-color: #FFA000;
            transform: scale(0.95);
            background: #222222;
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
            color: #FFD700;
            transition: all 0.3s ease;
            text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #FFFFFF;
            text-align: center;
            line-height: 1.2;
        }
        
        /* 10. Icon Colors - All gold variations */
        .icon-card:nth-child(1) i { color: #FFD700; } /* QR */
        .icon-card i.fa-phone { color: #FFD700; }
        .icon-card i.fa-envelope { color: #FFA000; }
        .icon-card i.fa-whatsapp { color: #FFD700; }
        .icon-card i.fab.fa-telegram { color: #FFC107; }
        .icon-card i.fab.fa-instagram { color: #FFB300; }
        .icon-card i.fab.fa-facebook { color: #FFA000; }
        .icon-card i.fab.fa-twitter { color: #FFC107; }
        .icon-card i.fab.fa-linkedin { color: #FFB300; }
        .icon-card i.fab.fa-youtube { color: #FF8F00; }
        .icon-card i.fab.fa-tiktok { color: #FFD700; }
        .icon-card i.fa-globe { color: #FFA000; }
        .icon-card i.fa-map-marker-alt { color: #FFB300; }
        .icon-card i.fa-university { color: #FFC107; }
        .icon-card i.fa-file-invoice { color: #FFD700; }
        .icon-card i.fa-info-circle { color: #FFA000; }
        .icon-card i.fa-book { color: #FFB300; }
        
        /* 11. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #1A1A1A;
            padding: 8px;
            border: 2px solid #FFD700;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.2);
        }
        .logo-image:active {
            box-shadow: 0 8px 30px rgba(255, 215, 0, 0.4);
            border-color: #FFA000;
            transform: scale(0.95);
        }
        
        /* 12. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(18, 18, 18, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #121212;
            border-radius: 15px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(255, 215, 0, 0.3);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 2px solid #FFD700;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #CCCCCC;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #FFD700;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #FFD700;
            text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #FFFFFF;
            line-height: 1.5;
        }
        .copy-btn {
            background: #1A1A1A;
            border: 1px solid #FFD700;
            border-radius: 6px;
            padding: 4px 8px;
            color: #FFD700;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            transform: scale(0.95);
            background: #222222;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #1A1A1A;
            border: 1px solid #FFD700;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 20px rgba(255, 215, 0, 0.1);
        }
        .iban-text {
            background: #222222;
            border: 1px solid #FFD700;
            border-radius: 6px;
            padding: 8px 12px;
            font-family: 'Playfair Display', serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #FFFFFF;
        }
        .iban-text:focus {
            border-color: #FFA000;
            outline: none;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
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
                font-size: 1.7rem;
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
                    <i class="fas fa-user" style="font-size: 52px; color: #FFD700;"></i>
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
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #FFD700;">{{bank.bank_label}}</div>
                                    <div style="color: #CCCCCC; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #FFD700, #FFA000); color: #121212; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
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
                    <div style="text-align:center; color:#CCCCCC; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#2E7D32';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#FFFFFF';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#1A1A1A';
                btn.style.borderColor = '#FFD700';
                btn.style.color = '#FFD700';
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
