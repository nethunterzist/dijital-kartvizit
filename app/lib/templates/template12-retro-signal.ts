export const retroSignalTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
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
            font-family: 'Lora', serif;
            background: #FAF3E0;
            color: #3E2723;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        /* 3. Background Pattern - Vintage texture */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 25% 25%, rgba(141, 110, 99, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 112, 67, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(77, 182, 172, 0.05) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
        }
        
        /* 4. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FAF3E0;
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
            border: 4px solid #8D6E63;
            margin: 0 auto;
            display: block;
            box-shadow: 0 8px 25px rgba(141, 110, 99, 0.3);
            filter: sepia(20%) saturate(120%);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: #F5F5DC;
            border: 4px solid #8D6E63;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 8px 25px rgba(141, 110, 99, 0.3);
        }
        
        /* 7. Company Info */
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 1.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #3E2723;
            letter-spacing: -0.02em;
            text-shadow: 2px 2px 4px rgba(141, 110, 99, 0.1);
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #8D6E63;
        }
        .position {
            font-size: 1rem;
            color: #6D4C41;
            margin-bottom: 25px;
            font-weight: 400;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #8D6E63, #FF7043);
            color: #FAF3E0;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            border: 2px solid #8D6E63;
            box-shadow: 0 4px 15px rgba(141, 110, 99, 0.3);
        }
        .contact-button:active {
            filter: saturate(150%);
            transform: scale(0.95);
            box-shadow: 0 6px 20px rgba(141, 110, 99, 0.4);
            color: #FAF3E0;
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
        
        /* 9. Icon Cards - Vintage style */
        .icon-card {
            background: #F5F5DC;
            border: 3px solid #8D6E63;
            border-radius: 12px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 15px rgba(141, 110, 99, 0.2);
            position: relative;
        }
        .icon-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255, 112, 67, 0.1) 50%, transparent 70%);
            border-radius: 9px;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .icon-card:active::before {
            opacity: 1;
        }
        .icon-card:active {
            filter: saturate(150%);
            transform: scale(0.95);
            border-color: #FF7043;
            box-shadow: 0 6px 20px rgba(255, 112, 67, 0.3);
        }
        .icon-card a {
            color: inherit;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            width: 100%;
            position: relative;
            z-index: 1;
        }
        .icon-card i {
            font-size: 24px;
            color: #6D4C41;
            transition: all 0.3s ease;
            filter: sepia(30%);
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #3E2723;
            text-align: center;
            line-height: 1.2;
        }
        
        /* 10. Icon Colors - Vintage/retro colors */
        .icon-card:nth-child(1) i { color: #4DB6AC; } /* QR */
        .icon-card i.fa-phone { color: #8D6E63; }
        .icon-card i.fa-envelope { color: #FF7043; }
        .icon-card i.fa-whatsapp { color: #4DB6AC; }
        .icon-card i.fab.fa-telegram { color: #5DADE2; }
        .icon-card i.fab.fa-instagram { color: #D7263D; }
        .icon-card i.fab.fa-facebook { color: #5B7BD5; }
        .icon-card i.fab.fa-twitter { color: #4DB6AC; }
        .icon-card i.fab.fa-linkedin { color: #5B7BD5; }
        .icon-card i.fab.fa-youtube { color: #D7263D; }
        .icon-card i.fab.fa-tiktok { color: #3E2723; }
        .icon-card i.fa-globe { color: #8E24AA; }
        .icon-card i.fa-map-marker-alt { color: #FF8A65; }
        .icon-card i.fa-university { color: #66BB6A; }
        .icon-card i.fa-file-invoice { color: #4DB6AC; }
        .icon-card i.fa-info-circle { color: #4DB6AC; }
        .icon-card i.fa-book { color: #D4AF37; }
        
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
            background: #F5F5DC;
            padding: 8px;
            border: 3px solid #8D6E63;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(141, 110, 99, 0.2);
            filter: sepia(20%);
        }
        .logo-image:active {
            filter: saturate(150%) sepia(30%);
            transform: scale(0.95);
            border-color: #FF7043;
        }
        
        /* 12. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(62, 39, 35, 0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #FAF3E0;
            border-radius: 15px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 50px rgba(141, 110, 99, 0.4);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 3px solid #8D6E63;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #6D4C41;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #3E2723;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #8D6E63;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #3E2723;
            line-height: 1.5;
        }
        .copy-btn {
            background: #F5F5DC;
            border: 2px solid #8D6E63;
            border-radius: 8px;
            padding: 4px 8px;
            color: #3E2723;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            filter: saturate(150%);
            transform: scale(0.95);
            border-color: #FF7043;
            background: #FFF8E1;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #F5F5DC;
            border: 2px solid #8D6E63;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(141, 110, 99, 0.2);
        }
        .iban-text {
            background: #FFFFFF;
            border: 2px solid #8D6E63;
            border-radius: 8px;
            padding: 8px 12px;
            font-family: 'Lora', serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #3E2723;
        }
        .iban-text:focus {
            border-color: #FF7043;
            outline: none;
            background: #FFF8E1;
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
                    <i class="fas fa-user" style="font-size: 52px; color: #8D6E63;"></i>
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
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 12px; filter: sepia(20%);">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #8D6E63;">{{bank.bank_label}}</div>
                                    <div style="color: #6D4C41; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #8D6E63, #FF7043); color: #FAF3E0; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
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
                    <div style="text-align:center; color:#6D4C41; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.borderColor = '#4DB6AC';
            btn.style.color = '#2E7D32';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#F5F5DC';
                btn.style.borderColor = '#8D6E63';
                btn.style.color = '#3E2723';
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
