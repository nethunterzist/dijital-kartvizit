export const crimsonEdgeTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Oswald', sans-serif;
            background: linear-gradient(135deg, #1A1A1A, #2C2C2C);
            color: #FFFFFF;
            line-height: 1.6;
            overflow-y: auto;
        }
        
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(45deg, transparent 30%, rgba(220, 20, 60, 0.1) 50%, transparent 70%),
                radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.05) 0%, transparent 50%);
            z-index: -1;
            pointer-events: none;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #1A1A1A, #2C2C2C);
            position: relative;
            border-left: 2px solid #DC143C;
            border-right: 2px solid #DC143C;
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
            border-radius: 8px;
            object-fit: cover;
            border: 3px solid #DC143C;
            margin: 0 auto;
            display: block;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.5);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 8px;
            background: #2C2C2C;
            border: 3px solid #DC143C;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(220, 20, 60, 0.5);
        }
        
        .company-info {
            margin-bottom: 40px;
        }
        .company-name {
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #FFFFFF;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(220, 20, 60, 0.3);
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 6px;
            color: #DC143C;
            letter-spacing: 0.02em;
            text-shadow: 0 0 8px rgba(220, 20, 60, 0.5);
        }
        .position {
            font-size: 1rem;
            color: #CCCCCC;
            margin-bottom: 25px;
            font-weight: 400;
            letter-spacing: 0.02em;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #DC143C;
            color: #FFFFFF;
            text-decoration: none;
            border-radius: 0;
            font-size: 0.9rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 2px solid #DC143C;
            box-shadow: 0 0 15px rgba(220, 20, 60, 0.4);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .contact-button:active {
            background: #B91C3C;
            box-shadow: 0 0 25px rgba(220, 20, 60, 0.6);
            transform: scale(0.95);
            color: #FFFFFF;
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
            background: #2C2C2C;
            border: 2px solid #444444;
            border-radius: 0;
            padding: 16px 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .icon-card:active {
            background: #3C3C3C;
            border-color: #DC143C;
            box-shadow: 0 0 15px rgba(220, 20, 60, 0.4);
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
            color: #DC143C;
            transition: all 0.3s ease;
            text-shadow: 0 0 8px rgba(220, 20, 60, 0.3);
        }
        .icon-label {
            font-size: 0.75rem;
            font-weight: 500;
            color: #FFFFFF;
            text-align: center;
            line-height: 1.2;
            text-transform: uppercase;
            letter-spacing: 0.02em;
        }
        
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 0;
            background: #2C2C2C;
            padding: 8px;
            border: 2px solid #444444;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .logo-image:active {
            border-color: #DC143C;
            box-shadow: 0 0 15px rgba(220, 20, 60, 0.4);
            transform: scale(0.95);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(26, 26, 26, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #1A1A1A;
            border-radius: 0;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 30px rgba(220, 20, 60, 0.4);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 3px solid #DC143C;
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
            color: #DC143C;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 16px;
            color: #DC143C;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #FFFFFF;
            line-height: 1.5;
        }
        .copy-btn {
            background: #2C2C2C;
            border: 2px solid #444444;
            border-radius: 0;
            padding: 4px 8px;
            color: #FFFFFF;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            font-weight: 500;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
            text-transform: uppercase;
        }
        .copy-btn:active {
            border-color: #DC143C;
            background: #3C3C3C;
            transform: scale(0.95);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #2C2C2C;
            border: 2px solid #444444;
            border-radius: 0;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .iban-text {
            background: #3C3C3C;
            border: 2px solid #444444;
            border-radius: 0;
            padding: 8px 12px;
            font-family: 'Oswald', sans-serif;
            font-size: 0.875rem;
            width: 100%;
            margin: 4px 0;
            transition: border-color 0.2s;
            color: #FFFFFF;
        }
        .iban-text:focus {
            border-color: #DC143C;
            outline: none;
            box-shadow: 0 0 8px rgba(220, 20, 60, 0.3);
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
                font-size: 1.7rem;
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
                    <i class="fas fa-user" style="font-size: 52px; color: #DC143C;"></i>
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
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #DC143C;">{{bank.bank_label}}</div>
                                    <div style="color: #CCCCCC; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 0; background: #DC143C; color: #FFFFFF; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
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
                btn.style.background = '#2C2C2C';
                btn.style.borderColor = '#444444';
                btn.style.color = '#FFFFFF';
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
