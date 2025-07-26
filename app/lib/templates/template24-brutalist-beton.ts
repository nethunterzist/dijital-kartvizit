export const brutalistBetonTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
            font-family: 'Helvetica', 'Arial', sans-serif;
            background: #EAEAEA;
            overflow-y: auto;
            color: #000000;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FFFFFF;
            position: relative;
            border: 4px solid #000000;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 30px;
            text-align: left;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            position: relative;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 40px;
            border: 3px solid #000000;
            padding: 20px;
            background: #FFFFFF;
        }
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 0;
            object-fit: cover;
            border: 3px solid #000000;
            display: block;
            margin: 0 auto 20px auto;
        }
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 0;
            background: #EAEAEA;
            border: 3px solid #000000;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px auto;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 40px;
            color: #000000;
            text-align: center;
        }
        .company-name {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 10px;
            color: #000000;
            line-height: 1.1;
            letter-spacing: -1px;
            text-transform: uppercase;
            border-bottom: 4px solid #000000;
            padding-bottom: 10px;
        }
        .person-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #000000;
            font-weight: 400;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .contact-button {
            background: #FFFF00;
            border: 3px solid #000000;
            border-radius: 0;
            padding: 15px 30px;
            color: #000000;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-size: 1rem;
            font-weight: 900;
            font-family: 'Helvetica', 'Arial', sans-serif;
            transition: all 0.1s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .contact-button:hover {
            background: #000000;
            color: #FFFF00;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 3px;
            width: 100%;
            margin-top: 40px;
            border: 3px solid #000000;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: #FFFFFF;
            border: 2px solid #000000;
            border-radius: 0;
            padding: 25px 15px;
            text-align: center;
            transition: all 0.1s ease;
            cursor: pointer;
            position: relative;
        }
        
        .icon-card:hover {
            background: #000000;
            color: #FFFFFF;
        }
        .icon-card:hover a {
            color: #FFFFFF;
        }
        .icon-card:hover i {
            color: #FFFF00 !important;
        }
        .icon-card a {
            color: #000000;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        .icon-card i {
            font-size: 28px;
            margin-bottom: 8px;
            transition: all 0.1s ease;
        }
        .icon-label {
            font-size: 12px;
            font-weight: 700;
            line-height: 1.2;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .icon-card:hover .icon-label {
            color: #FFFFFF;
        }
        
        /* 9. Icon Styles - All Black */
        .icon-card i {
            color: #000000 !important;
        }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
            border: 3px solid #000000;
            padding: 20px;
            background: #EAEAEA;
        }
        .logo-image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 0;
            border: 2px solid #000000;
            background: #FFFFFF;
            padding: 10px;
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-content {
            background: #FFFFFF;
            border: 4px solid #000000;
            border-radius: 0;
            padding: 40px;
            max-width: 450px;
            width: 90%;
            position: relative;
            color: #000000;
            font-family: 'Helvetica', 'Arial', sans-serif;
        }
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: #000000;
            border: none;
            font-size: 1.5rem;
            color: #FFFFFF;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-popup-close:hover {
            background: #FFFF00;
            color: #000000;
        }
        .popup-title {
            font-size: 2rem;
            font-weight: 900;
            margin-bottom: 30px;
            color: #000000;
            text-transform: uppercase;
            letter-spacing: 1px;
            border-bottom: 3px solid #000000;
            padding-bottom: 10px;
        }
        .tax-info div, .about-content {
            margin-bottom: 20px;
            font-size: 1rem;
            color: #000000;
            line-height: 1.5;
            font-weight: 400;
        }
        .copy-btn {
            background: #FFFF00;
            border: 2px solid #000000;
            border-radius: 0;
            padding: 8px 12px;
            color: #000000;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.9rem;
            transition: all 0.1s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-weight: 700;
            text-transform: uppercase;
        }
        .copy-btn:hover {
            background: #000000;
            color: #FFFF00;
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: #EAEAEA;
            border: 2px solid #000000;
            border-radius: 0;
            padding: 20px;
            margin-bottom: 15px;
        }
        .iban-text {
            background: #FFFFFF;
            border: 2px solid #000000;
            border-radius: 0;
            padding: 12px;
            font-family: 'Helvetica', 'Arial', sans-serif;
            font-size: 1rem;
            width: 100%;
            margin: 8px 0;
            color: #000000;
            font-weight: 700;
        }
        .iban-text:focus {
            outline: 3px solid #FFFF00;
        }
        
        /* 11. Grid Layout Adjustments */
        @media (max-width: 480px) {
            .card-content {
                padding: 20px 15px;
            }
            .icons-grid {
                grid-template-columns: 1fr;
            }
            .company-name {
                font-size: 2rem;
            }
        }
        
        /* 12. Strong Typography */
        strong {
            font-weight: 900;
            text-transform: uppercase;
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
                    <i class="fas fa-user" style="font-size: 40px; color: #000000;"></i>
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
                    REHBERE EKLE
                </a>
            </div>

            <!-- Icons Section -->
            <div class="icons-grid">
                <!-- QR Kod - Her zaman ilk sırada -->
                <div class="icon-card">
                    <a href="/{{slug}}/qr" target="_blank">
                        <i class="fas fa-qrcode"></i>
                        <span class="icon-label">QR KOD</span>
                    </a>
                </div>
                
                <!-- Sosyal Medya -->
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
                
                <!-- İletişim -->
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

                <!-- Katalog -->
                {{#if katalog}}
                <div class="icon-card">
                    <a href="{{katalog.url}}" target="_blank">
                        <i class="fas fa-book"></i>
                        <span class="icon-label">{{katalog.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Banka -->
                {{#if iban}}
                <div class="icon-card">
                    <a href="#" onclick="showBankPopup(event)">
                        <i class="fas fa-university"></i>
                        <span class="icon-label">{{iban.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Vergi -->
                {{#if tax}}
                <div class="icon-card">
                    <a href="#" onclick="showTaxPopup(event)">
                        <i class="fas fa-file-text"></i>
                        <span class="icon-label">{{tax.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Hakkımızda -->
                {{#if about}}
                <div class="icon-card">
                    <a href="#" onclick="showAboutPopup(event)">
                        <i class="fas fa-info-circle"></i>
                        <span class="icon-label">{{about.label}}</span>
                    </a>
                </div>
                {{/if}}
            </div>

            <!-- Firma Logosu - En altta -->
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>

    <!-- Vergi Bilgileri Popup -->
    <div id="tax-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeTaxPopup()">&times;</button>
            <h2 class="popup-title">VERGI BILGILERI</h2>
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

    <!-- Hakkımızda Popup -->
    <div id="about-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeAboutPopup()">&times;</button>
            <h2 class="popup-title">HAKKIMIZDA</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <!-- Banka Hesapları Popup -->
    <div id="bank-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">BANKA HESAPLARI</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px; border: 2px solid #000000;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 900; font-size: 1.1rem; color: #000000; text-transform: uppercase;">{{bank.bank_label}}</div>
                                    <div style="color: #000000; font-size: 0.9rem; font-weight: 700;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 0; background: #FFFF00; color: #000000; font-weight: 900; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem; border: 2px solid #000000;">
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
                    <div style="text-align:center; color:#000000; padding: 40px; font-weight: 700; text-transform: uppercase;">TANIMLI BANKA HESABI BULUNAMADI.</div>
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
            btn.style.background = '#000000';
            btn.style.color = '#FFFF00';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = '#FFFF00';
                btn.style.color = '#000000';
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
