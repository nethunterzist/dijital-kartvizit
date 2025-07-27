export const template6Luxury = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .card {
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            border: 2px solid #d4af37;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .content {
            position: relative;
            z-index: 1;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #d4af37;
            padding-bottom: 20px;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto 20px;
            border: 3px solid #d4af37;
            object-fit: cover;
            box-shadow: 0 10px 20px rgba(212, 175, 55, 0.4);
        }
        
        .company-name {
            font-size: 2.2em;
            font-weight: bold;
            color: #d4af37;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .person-name {
            font-size: 1.3em;
            color: #cccccc;
            margin-bottom: 5px;
        }
        
        .position {
            font-size: 1.1em;
            color: #999999;
            font-style: italic;
        }
        
        .contact-section {
            margin: 30px 0;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px;
            background: rgba(212, 175, 55, 0.1);
            border-radius: 10px;
            border-left: 4px solid #d4af37;
        }
        
        .contact-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            filter: brightness(0) saturate(100%) invert(77%) sepia(100%) saturate(1000%) hue-rotate(15deg);
        }
        
        .contact-text {
            color: #ffffff;
            text-decoration: none;
            font-size: 1.1em;
        }
        
        .contact-text:hover {
            color: #d4af37;
            transition: color 0.3s ease;
        }
        
        .social-section {
            margin-top: 30px;
        }
        
        .social-title {
            font-size: 1.3em;
            color: #d4af37;
            margin-bottom: 20px;
            text-align: center;
            font-weight: bold;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
            border-radius: 50%;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }
        
        .social-link:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(212, 175, 55, 0.5);
        }
        
        .social-icon {
            width: 24px;
            height: 24px;
            filter: brightness(0) saturate(100%) invert(0%);
        }
        
        .qr-section {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #d4af37;
        }
        
        .qr-code {
            width: 120px;
            height: 120px;
            margin: 0 auto;
            border: 3px solid #d4af37;
            border-radius: 15px;
            padding: 10px;
            background: #ffffff;
        }
        
        .qr-text {
            margin-top: 15px;
            color: #cccccc;
            font-size: 0.9em;
        }
        
        /* Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
            border: 2px solid #d4af37;
            border-radius: 20px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(212, 175, 55, 0.3);
            position: relative;
            animation: popupIn 0.3s ease;
        }
        .custom-popup-close {
            position: absolute;
            top: 16px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1.25rem;
            color: #cccccc;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #d4af37;
        }
        .popup-title {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 16px;
            color: #d4af37;
        }
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #ffffff;
            line-height: 1.5;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid #d4af37;
            border-radius: 10px;
            padding: 16px;
            margin-bottom: 12px;
        }
        
        @keyframes popupIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        @media (max-width: 600px) {
            .card {
                padding: 30px 20px;
                margin: 10px;
            }
            
            .company-name {
                font-size: 1.8em;
            }
            
            .person-name {
                font-size: 1.1em;
            }
            
            .contact-text {
                font-size: 1em;
            }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="content">
            <div class="header">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" alt="{{firma_adi}} Logo" class="logo">
                {{/if}}
                <h1 class="company-name">{{firma_adi}}</h1>
                {{#if yetkili_adi}}
                <h2 class="person-name">{{yetkili_adi}}</h2>
                {{/if}}
                {{#if yetkili_pozisyon}}
                <p class="position">{{yetkili_pozisyon}}</p>
                {{/if}}
            </div>
            
            <div class="contact-section">
                <!-- Communication Icons -->
                {{#each communication}}
                <div class="contact-item">
                    <i class="{{getIconClass this.icon this.label}} contact-icon"></i>
                    <a href="{{this.url}}" class="contact-text">{{this.label}}</a>
                </div>
                {{/each}}
            </div>
            
            {{#if social_media}}
            <div class="social-section">
                <h3 class="social-title">Sosyal Medya</h3>
                <div class="social-links">
                    {{#each social_media}}
                    <a href="{{this.url}}" target="_blank" class="social-link">
                        <i class="{{getIconClass this.icon this.label}} social-icon"></i>
                    </a>
                    {{/each}}
                </div>
            </div>
            {{/if}}
            
            <!-- Tax Info -->
            {{#if tax}}
            <div class="contact-item">
                <i class="{{getIconClass tax.icon tax.label}} contact-icon"></i>
                <a href="#" onclick="showTaxPopup(event)" class="contact-text">{{tax.label}}</a>
            </div>
            {{/if}}

            <!-- About Info -->
            {{#if about}}
            <div class="contact-item">
                <i class="{{getIconClass about.icon about.label}} contact-icon"></i>
                <a href="#" onclick="showAboutPopup(event)" class="contact-text">{{about.label}}</a>
            </div>
            {{/if}}

            <!-- Bank Info -->
            {{#if iban}}
            <div class="contact-item">
                <i class="{{getIconClass iban.icon iban.label}} contact-icon"></i>
                <a href="#" onclick="showBankPopup(event)" class="contact-text">{{iban.label}}</a>
            </div>
            {{/if}}
            
            <div class="qr-section">
                <img src="/qrcodes/{{slug}}.png" alt="QR Kod" class="qr-code">
                <p class="qr-text">QR kodu okutarak kartımı kaydedin</p>
            </div>
        </div>
    </div>

    <!-- Popups -->
    <div id="tax-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeTaxPopup()">&times;</button>
            <h2 class="popup-title">Vergi Bilgileri</h2>
            <div class="tax-info">
                <div><strong>Firma Ünvanı:</strong> {{tax.firma_unvan}}</div>
                <div><strong>Vergi Numarası:</strong> {{tax.firma_vergi_no}}</div>
                <div><strong>Vergi Dairesi:</strong> {{tax.vergi_dairesi}}</div>
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
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 32px; height: 32px; object-fit: contain; margin-right: 12px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: bold; color: #d4af37;">{{bank.banka_adi}}</div>
                                    <div style="color: #CCC; font-size: 0.8rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: #d4af37; color: #000; font-weight: bold; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.75rem;">
                                        ₺
                                    </span>
                                    <input type="text" value="{{this.iban}}" readonly style="flex:1; margin-right: 8px; padding: 8px; background: rgba(212, 175, 55, 0.1); border: 1px solid #d4af37; border-radius: 5px; color: #fff;">
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#CCC; padding: 32px;">Tanımlı banka hesabı bulunamadı.</div>
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
    function showBankPopup(e) {
        e.preventDefault();
        document.getElementById('bank-popup').style.display = 'flex';
    }
    function closeBankPopup() {
        document.getElementById('bank-popup').style.display = 'none';
    }
    </script>
</body>
</html>
`;

export default template6Luxury;
