export const greenSoulTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Nunito', sans-serif;
            background: #F1F8F4;
            color: #2E7D32;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #F1F8F4;
            position: relative;
        }
        
        .card-content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .profile-container {
            margin-bottom: 30px;
        }
        .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #A5D6A7;
            margin: 0 auto;
            display: block;
            box-shadow: 0 8px 25px rgba(165, 214, 167, 0.4);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: #E8F5E8;
            border: 4px solid #A5D6A7;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 8px 25px rgba(165, 214, 167, 0.4);
        }
        
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 1.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #2E7D32;
            letter-spacing: -0.02em;
        }
        .person-name {
            font-size: 1.3rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #66BB6A;
        }
        .position {
            font-size: 1rem;
            color: #4CAF50;
            margin-bottom: 25px;
            font-weight: 400;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #A5D6A7, #66BB6A);
            color: #2E7D32;
            text-decoration: none;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            box-shadow: 0 4px 15px rgba(165, 214, 167, 0.3);
        }
        .contact-button:active {
            background: #C8E6C9;
            transform: scale(0.95);
            color: #2E7D32;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 40px;
            padding: 0 10px;
        }
        
        .icon-card {
            background: #FFFFFF;
            border: 2px solid #A5D6A7;
            border-radius: 20px;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 15px rgba(165, 214, 167, 0.2);
        }
        .icon-card:active {
            background: #E8F5E8;
            transform: scale(0.95);
            border-color: #66BB6A;
            box-shadow: 0 6px 20px rgba(165, 214, 167, 0.4);
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
            color: #4CAF50;
            transition: all 0.3s ease;
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #2E7D32;
            text-align: center;
            line-height: 1.2;
        }
        
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
            border: 2px solid #A5D6A7;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(165, 214, 167, 0.2);
        }
        .logo-image:active {
            background: #E8F5E8;
            transform: scale(0.95);
            border-color: #66BB6A;
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(46, 125, 50, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #F1F8F4;
            border-radius: 25px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 50px rgba(165, 214, 167, 0.4);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 3px solid #A5D6A7;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #4CAF50;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #2E7D32;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #66BB6A;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #2E7D32;
            line-height: 1.5;
        }
        .copy-btn {
            background: #FFFFFF;
            border: 2px solid #A5D6A7;
            border-radius: 15px;
            padding: 4px 8px;
            color: #2E7D32;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            background: #E8F5E8;
            transform: scale(0.95);
            border-color: #66BB6A;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #FFFFFF;
            border: 2px solid #A5D6A7;
            border-radius: 20px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(165, 214, 167, 0.2);
        }
        .iban-text {
            background: #FFFFFF;
            border: 2px solid #A5D6A7;
            border-radius: 15px;
            padding: 8px 12px;
            font-family: 'Nunito', sans-serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #2E7D32;
        }
        .iban-text:focus {
            border-color: #66BB6A;
            outline: none;
            background: #E8F5E8;
        }
        
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
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
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-user" style="font-size: 52px; color: #A5D6A7;"></i>
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
                <!-- Dynamic icons will be inserted here -->
            </div>

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
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #66BB6A;">{{bank.bank_label}}</div>
                                    <div style="color: #4CAF50; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #A5D6A7, #66BB6A); color: #2E7D32; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
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
                    <div style="text-align:center; color:#4CAF50; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#C8E6C9';
            btn.style.borderColor = '#4CAF50';
            btn.style.color = '#2E7D32';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = '#FFFFFF';
                btn.style.borderColor = '#A5D6A7';
                btn.style.color = '#2E7D32';
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
