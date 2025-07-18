export const corporateSlateTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet">
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
            font-family: 'Roboto Slab', serif;
            background: #F2F2F2;
            color: #1A1A1A;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #F2F2F2;
            position: relative;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 30px;
            text-align: center;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 30px;
        }
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #003366;
            margin: 0 auto;
            display: block;
            box-shadow: 0 4px 12px rgba(0, 51, 102, 0.2);
        }
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #E8E8E8;
            border: 3px solid #003366;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0, 51, 102, 0.2);
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #1A1A1A;
            letter-spacing: -0.02em;
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 6px;
            color: #003366;
        }
        .position {
            font-size: 1rem;
            color: #666;
            margin-bottom: 25px;
            font-weight: 400;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #003366;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 700;
            transition: all 0.3s ease;
            border: 2px solid #003366;
        }
        .contact-button:active {
            transform: scale(0.95);
            background: #002244;
            color: white;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 40px;
            padding: 0 10px;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: #FFFFFF;
            border: 1px solid #1A1A1A;
            border-radius: 8px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .icon-card:active {
            border-width: 2px;
            transform: scale(0.95);
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
            color: #003366;
            transition: all 0.3s ease;
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #1A1A1A;
            text-align: center;
            line-height: 1.2;
        }
        
        /* 9. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 8px;
            background: #FFFFFF;
            padding: 8px;
            border: 1px solid #1A1A1A;
            transition: all 0.3s ease;
        }
        .logo-image:active {
            border-width: 2px;
            transform: scale(0.95);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(26, 26, 26, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #F2F2F2;
            border-radius: 12px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 2px solid #003366;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #666;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #1A1A1A;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 16px;
            color: #003366;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #1A1A1A;
            line-height: 1.5;
        }
        .copy-btn {
            background: #FFFFFF;
            border: 1px solid #1A1A1A;
            border-radius: 4px;
            padding: 4px 8px;
            color: #1A1A1A;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            border-width: 2px;
            transform: scale(0.95);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #FFFFFF;
            border: 1px solid #1A1A1A;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
        }
        .iban-text {
            background: #FFFFFF;
            border: 1px solid #1A1A1A;
            border-radius: 6px;
            padding: 8px 12px;
            font-family: 'Roboto Slab', serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-width 0.2s;
        }
        .iban-text:focus {
            border-width: 2px;
            border-color: #003366;
            outline: none;
        }
        
        /* 11. Animations */
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* 12. Responsive */
        @media (max-width: 400px) {
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
            }
            .profile-image, .profile-placeholder {
                width: 100px;
                height: 100px;
            }
            .company-name {
                font-size: 1.5rem;
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
                    <i class="fas fa-user" style="font-size: 48px; color: #666;"></i>
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
                                    <div style="font-weight: 700; font-size: 0.9rem; color: #003366;">{{bank.bank_label}}</div>
                                    <div style="color: #666; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: #003366; color: white; font-weight: 700; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
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
                    <div style="text-align:center; color:#666; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#d4edda';
            btn.style.borderColor = '#c3e6cb';
            btn.style.color = '#155724';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#FFFFFF';
                btn.style.borderColor = '#1A1A1A';
                btn.style.color = '#1A1A1A';
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
