export const akademikMaviTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Source Sans Pro', sans-serif;
            background: #F8FAFC;
            overflow-y: auto;
            color: #1E3A8A;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 50%, #F8FAFC 100%);
            position: relative;
            border-left: 4px solid #3B82F6;
            border-right: 4px solid #3B82F6;
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
        }
        
        .header-section {
            width: 100%;
            background: #1E3A8A;
            color: #FFFFFF;
            padding: 20px;
            margin: -50px -30px 40px;
            text-align: center;
        }
        
        .header-title {
            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        
        .profile-container {
            margin-bottom: 40px;
            position: relative;
        }
        
        .profile-image {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #3B82F6;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
        }
        
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
        }
        
        .profile-placeholder {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.1);
            border: 4px solid #3B82F6;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #1E3A8A;
        }
        
        .company-name {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #1E3A8A;
            line-height: 1.3;
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #3B82F6;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #64748B;
            font-weight: 400;
        }
        
        .contact-button {
            background: #3B82F6;
            border: 2px solid #3B82F6;
            border-radius: 8px;
            padding: 12px 24px;
            color: #FFFFFF;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Source Sans Pro', sans-serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .contact-button:hover {
            background: #1E3A8A;
            border-color: #1E3A8A;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            color: #FFFFFF;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            max-width: 360px;
            width: 100%;
            margin-top: 40px;
        }
        
        .icon-card {
            background: #FFFFFF;
            border: 2px solid #E5E7EB;
            border-radius: 12px;
            padding: 20px 12px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .icon-card:hover {
            background: #EFF6FF;
            border-color: #3B82F6;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        
        .icon-card a {
            color: #1E3A8A;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        
        .icon-card i {
            font-size: 22px;
            margin-bottom: 6px;
            transition: all 0.3s ease;
            color: #3B82F6;
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
            color: #1E3A8A;
        }
        
        .icon-label {
            font-size: 11px;
            font-weight: 600;
            line-height: 1.3;
            color: #1E3A8A;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        
        .logo-image {
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 8px;
            background: #FFFFFF;
            padding: 12px;
            border: 2px solid #E5E7EB;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #3B82F6;
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.2);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(248, 250, 252, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        
        .custom-popup-content {
            background: #FFFFFF;
            border: 2px solid #3B82F6;
            border-radius: 12px;
            padding: 30px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(59, 130, 246, 0.3);
            position: relative;
            color: #1E3A8A;
            font-family: 'Source Sans Pro', sans-serif;
        }
        
        .custom-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #64748B;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #1E3A8A;
        }
        
        .popup-title {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 25px;
            color: #1E3A8A;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 1rem;
            color: #1E3A8A;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: #3B82F6;
            border: 1px solid #3B82F6;
            border-radius: 6px;
            padding: 6px 10px;
            color: #FFFFFF;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.9rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 600;
        }
        
        .copy-btn:hover {
            background: #1E3A8A;
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: #EFF6FF;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 15px;
        }
        
        .iban-text {
            background: #FFFFFF;
            border: 2px solid #E5E7EB;
            border-radius: 6px;
            padding: 10px;
            font-family: 'Source Sans Pro', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 8px 0;
            transition: border-color 0.2s;
            color: #1E3A8A;
        }
        
        .iban-text:focus {
            border-color: #3B82F6;
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 30px 20px;
            }
            .header-section {
                margin: -30px -20px 30px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .company-name {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <div class="header-section">
                <div class="header-title">Dijital Kartvizit</div>
            </div>
            
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-graduation-cap" style="font-size: 50px; color: #3B82F6;"></i>
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
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 700; font-size: 1.1rem; color: #1E3A8A;">{{bank.banka_adi}}</div>
                                    <div style="color: #64748B; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 6px; background: #3B82F6; color: #FFFFFF; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
                                        {{#if this.para_birimi}}
                                            {{#ifEquals this.para_birimi "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "EUR"}}€{{/ifEquals}}
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
                    <div style="text-align:center; color:#64748B; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#10B981';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = '#3B82F6';
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
