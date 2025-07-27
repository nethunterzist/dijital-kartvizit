export const gazeteKagidiTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Crimson Text', serif;
            background: #F5F5DC;
            overflow-y: auto;
            color: #2F2F2F;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #F5F5DC 0%, #F0F0E6 50%, #F5F5DC 100%);
            position: relative;
            border-left: 2px solid #D2B48C;
            border-right: 2px solid #D2B48C;
        }
        
        /* Newspaper texture */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(rgba(210, 180, 140, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(210, 180, 140, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.3;
            z-index: 1;
        }
        
        /* Vintage paper texture */
        .main-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(139, 69, 19, 0.05) 0%, transparent 50%);
            z-index: 1;
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
            z-index: 2;
        }
        
        /* Newspaper header */
        .newspaper-header {
            width: 100%;
            border-top: 3px solid #8B4513;
            border-bottom: 3px solid #8B4513;
            padding: 15px 0;
            margin-bottom: 40px;
            background: rgba(210, 180, 140, 0.1);
        }
        
        .newspaper-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: #8B4513;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 5px;
        }
        
        .newspaper-date {
            font-size: 0.9rem;
            color: #696969;
            font-style: italic;
        }
        
        .profile-container {
            margin-bottom: 40px;
            position: relative;
        }
        
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 0;
            object-fit: cover;
            border: 3px solid #8B4513;
            box-shadow: 
                0 4px 8px rgba(139, 69, 19, 0.3),
                inset 0 0 0 2px rgba(245, 245, 220, 0.8);
            transition: all 0.3s ease;
            filter: sepia(20%) contrast(1.1);
        }
        
        .profile-image:hover {
            transform: scale(1.05);
            box-shadow: 
                0 6px 12px rgba(139, 69, 19, 0.4),
                inset 0 0 0 2px rgba(245, 245, 220, 0.9);
        }
        
        .profile-placeholder {
            width: 120px;
            height: 120px;
            border-radius: 0;
            background: rgba(210, 180, 140, 0.2);
            border: 3px solid #8B4513;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        /* Vintage decorative corners */
        .profile-container::before {
            content: '❦';
            position: absolute;
            top: -15px;
            left: -15px;
            font-size: 20px;
            color: #8B4513;
        }
        
        .profile-container::after {
            content: '❦';
            position: absolute;
            bottom: -15px;
            right: -15px;
            font-size: 20px;
            color: #8B4513;
            transform: rotate(180deg);
        }
        
        .company-info {
            margin-bottom: 40px;
            color: #2F2F2F;
        }
        
        .company-name {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #8B4513;
            line-height: 1.2;
            text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.1);
        }
        
        .person-name {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 8px;
            color: #2F2F2F;
            font-style: italic;
        }
        
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #696969;
            font-weight: 400;
            font-style: italic;
        }
        
        .contact-button {
            background: #8B4513;
            border: 2px solid #8B4513;
            border-radius: 0;
            padding: 12px 24px;
            color: #F5F5DC;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 1rem;
            font-weight: 600;
            font-family: 'Playfair Display', serif;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 3px 6px rgba(139, 69, 19, 0.3);
        }
        
        .contact-button:hover {
            background: #A0522D;
            border-color: #A0522D;
            transform: translateY(-2px);
            box-shadow: 0 5px 10px rgba(139, 69, 19, 0.4);
            color: #F5F5DC;
            text-decoration: none;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            max-width: 350px;
            width: 100%;
            margin-top: 40px;
        }
        
        .icon-card {
            background: rgba(245, 245, 220, 0.8);
            border: 2px solid #D2B48C;
            border-radius: 0;
            padding: 18px 10px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            box-shadow: 0 2px 4px rgba(139, 69, 19, 0.2);
        }
        
        .icon-card:hover {
            background: rgba(210, 180, 140, 0.3);
            border-color: #8B4513;
            transform: translateY(-3px);
            box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        .icon-card a {
            color: #2F2F2F;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }
        
        .icon-card i {
            font-size: 20px;
            margin-bottom: 4px;
            transition: all 0.3s ease;
            color: #8B4513;
        }
        
        .icon-card:hover i {
            transform: scale(1.1);
        }
        
        .icon-label {
            font-size: 10px;
            font-weight: 600;
            line-height: 1.3;
            color: #2F2F2F;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-family: 'Playfair Display', serif;
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
            background: rgba(245, 245, 220, 0.8);
            padding: 10px;
            border: 2px solid #D2B48C;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(139, 69, 19, 0.2);
            filter: sepia(10%);
        }
        
        .logo-image:hover {
            transform: scale(1.05);
            border-color: #8B4513;
            box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(245, 245, 220, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
        }
        
        .custom-popup-content {
            background: #F5F5DC;
            border: 3px solid #8B4513;
            border-radius: 0;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 30px rgba(139, 69, 19, 0.3);
            position: relative;
            color: #2F2F2F;
            font-family: 'Crimson Text', serif;
        }
        
        .custom-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #8B4513;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #A0522D;
        }
        
        .popup-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #8B4513;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 1rem;
            color: #2F2F2F;
            line-height: 1.6;
        }
        
        .copy-btn {
            background: #8B4513;
            border: 1px solid #8B4513;
            border-radius: 0;
            padding: 5px 8px;
            color: #F5F5DC;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.85rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Playfair Display', serif;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .copy-btn:hover {
            background: #A0522D;
            transform: translateY(-1px);
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: rgba(210, 180, 140, 0.2);
            border: 1px solid #D2B48C;
            border-radius: 0;
            padding: 18px;
            margin-bottom: 12px;
        }
        
        .iban-text {
            background: rgba(245, 245, 220, 0.9);
            border: 2px solid #D2B48C;
            border-radius: 0;
            padding: 8px;
            font-family: 'Crimson Text', serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #2F2F2F;
        }
        
        .iban-text:focus {
            border-color: #8B4513;
            outline: none;
            box-shadow: 0 0 5px rgba(139, 69, 19, 0.3);
        }
        
        /* Vintage decorative elements */
        .decorative-line {
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #8B4513, transparent);
            margin: 20px 0;
        }
        
        @keyframes vintageGlow {
            0%, 100% { 
                text-shadow: 1px 1px 2px rgba(139, 69, 19, 0.1);
            }
            50% { 
                text-shadow: 2px 2px 4px rgba(139, 69, 19, 0.2);
            }
        }
        
        .company-name {
            animation: vintageGlow 4s ease-in-out infinite;
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 30px 20px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .company-name {
                font-size: 1.8rem;
            }
            .newspaper-title {
                font-size: 1.2rem;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <div class="newspaper-header">
                <div class="newspaper-title">Dijital Kartvizit</div>
                <div class="newspaper-date">Güncel Bilgiler</div>
            </div>
            
            <div class="profile-container">
                {{#if profil_foto}}
                <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                {{else}}
                <div class="profile-placeholder">
                    <i class="fas fa-newspaper" style="font-size: 40px; color: #8B4513;"></i>
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
                
                <div class="decorative-line"></div>
                
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
                            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                {{#if bank.banka_logo}}
                                    <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 12px; filter: sepia(10%);">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1rem; color: #8B4513;">{{bank.banka_adi}}</div>
                                    <div style="color: #2F2F2F; font-size: 0.9rem;">{{bank.hesap_sahibi}}</div>
                                </div>
                            </div>
                            {{#each bank.hesaplar}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 30px; height: 30px; border-radius: 0; background: #8B4513; color: #F5F5DC; font-weight: bold; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.8rem; border: 1px solid #A0522D;">
                                        {{#if this.para_birimi}}
                                            {{#ifEquals this.para_birimi "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.para_birimi "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 8px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)"><i class="fas fa-copy"></i></button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#696969; padding: 30px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = '#228B22';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = '#8B4513';
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
