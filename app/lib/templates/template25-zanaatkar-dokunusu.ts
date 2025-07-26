export const zanaatkarDokunusuTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
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
            font-family: 'Inter', sans-serif;
            background: #FAF3E0;
            overflow-y: auto;
            color: #5D4037;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FAF3E0;
            position: relative;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(192, 108, 132, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(124, 157, 150, 0.05) 0%, transparent 50%);
        }
        
        /* Paper Texture */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(93, 64, 55, 0.02) 1px,
                    rgba(93, 64, 55, 0.02) 2px
                ),
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 1px,
                    rgba(93, 64, 55, 0.02) 1px,
                    rgba(93, 64, 55, 0.02) 2px
                );
            pointer-events: none;
            z-index: 1;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 25px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 2;
        }
        
        /* 5. Profile Section */
        .profile-container {
            margin-bottom: 35px;
            position: relative;
        }
        .profile-image {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #C06C84;
            box-shadow: 
                0 8px 25px rgba(192, 108, 132, 0.3),
                0 4px 12px rgba(93, 64, 55, 0.2);
            transition: all 0.4s ease;
            position: relative;
        }
        .profile-image:hover {
            transform: scale(1.05) rotate(2deg);
            box-shadow: 
                0 12px 35px rgba(192, 108, 132, 0.4),
                0 6px 18px rgba(93, 64, 55, 0.3);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(192, 108, 132, 0.15);
            border: 3px solid #C06C84;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 
                0 8px 25px rgba(192, 108, 132, 0.3);
        }
        
        /* Decorative elements around profile */
        .profile-container::before {
            content: '✦';
            position: absolute;
            top: -10px;
            right: 10px;
            font-size: 20px;
            color: #C06C84;
            opacity: 0.6;
            transform: rotate(15deg);
        }
        .profile-container::after {
            content: '❋';
            position: absolute;
            bottom: -5px;
            left: 5px;
            font-size: 18px;
            color: #7C9D96;
            opacity: 0.6;
            transform: rotate(-20deg);
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 35px;
            color: #5D4037;
        }
        .company-name {
            font-family: 'Caveat', cursive;
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: #5D4037;
            line-height: 1.2;
            transform: rotate(-1deg);
            text-shadow: 2px 2px 4px rgba(93, 64, 55, 0.1);
        }
        .person-name {
            font-family: 'Caveat', cursive;
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #C06C84;
            transform: rotate(0.5deg);
        }
        .position {
            font-size: 1rem;
            margin-bottom: 25px;
            color: #5D4037;
            opacity: 0.8;
            font-weight: 400;
            font-style: italic;
        }
        .contact-button {
            background: linear-gradient(135deg, #C06C84 0%, #7C9D96 100%);
            border: 2px solid #C06C84;
            border-radius: 25px;
            padding: 12px 25px;
            color: #FAF3E0;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.95rem;
            font-weight: 500;
            font-family: 'Inter', sans-serif;
            transition: all 0.3s ease;
            box-shadow: 
                0 4px 15px rgba(192, 108, 132, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            transform: rotate(-0.5deg);
        }
        .contact-button:hover {
            background: linear-gradient(135deg, #7C9D96 0%, #C06C84 100%);
            transform: rotate(0deg) translateY(-2px);
            box-shadow: 
                0 6px 20px rgba(192, 108, 132, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
            color: #FAF3E0;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
            max-width: 350px;
            width: 100%;
            margin-top: 35px;
        }
        
        /* 8. Icon Cards - Organic shapes */
        .icon-card {
            background: rgba(255, 255, 255, 0.8);
            border: 2px solid rgba(192, 108, 132, 0.3);
            border-radius: 20px 15px 25px 18px;
            padding: 20px 10px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
            backdrop-filter: blur(5px);
            box-shadow: 
                0 4px 15px rgba(192, 108, 132, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.6);
            transform: rotate(var(--rotation, 0deg));
        }
        
        .icon-card:nth-child(odd) {
            --rotation: 1deg;
        }
        .icon-card:nth-child(even) {
            --rotation: -1deg;
        }
        .icon-card:nth-child(3n) {
            --rotation: 0.5deg;
        }
        
        .icon-card:hover {
            background: rgba(255, 255, 255, 0.95);
            border-color: #C06C84;
            transform: rotate(0deg) translateY(-3px) scale(1.05);
            box-shadow: 
                0 8px 25px rgba(192, 108, 132, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        .icon-card a {
            color: #5D4037;
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
        }
        .icon-card:hover i {
            transform: scale(1.1);
        }
        .icon-label {
            font-size: 10px;
            font-weight: 500;
            line-height: 1.3;
            color: #5D4037;
        }
        
        /* 9. Icon Styles - Warm, handcrafted colors */
        .icon-card:nth-child(1) i { color: #8B4513; } /* QR - Saddle Brown */
        .icon-card i.fa-phone { color: #CD853F; }
        .icon-card i.fa-envelope { color: #DEB887; }
        .icon-card i.fa-whatsapp { color: #9ACD32; }
        .icon-card i.fab.fa-telegram { color: #4682B4; }
        .icon-card i.fab.fa-instagram { color: #E6967A; }
        .icon-card i.fab.fa-facebook { color: #6495ED; }
        .icon-card i.fab.fa-twitter { color: #87CEEB; }
        .icon-card i.fab.fa-linkedin { color: #4682B4; }
        .icon-card i.fab.fa-youtube { color: #F4A460; }
        .icon-card i.fab.fa-tiktok { color: #696969; }
        .icon-card i.fa-globe { color: #32CD32; }
        .icon-card i.fa-map-marker-alt { color: #FF6347; }
        .icon-card i.fa-university { color: #DAA520; }
        .icon-card i.fa-file-text { color: #D2691E; }
        .icon-card i.fa-info-circle { color: #708090; }
        .icon-card i.fa-book { color: #A0522D; }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
        }
        .logo-image {
            width: 85px;
            height: 85px;
            object-fit: contain;
            border-radius: 15px 12px 18px 14px;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border: 2px solid rgba(192, 108, 132, 0.3);
            transition: all 0.3s ease;
            box-shadow: 
                0 4px 15px rgba(192, 108, 132, 0.2);
            transform: rotate(-1deg);
        }
        .logo-image:hover {
            transform: rotate(0deg) scale(1.05);
            border-color: #C06C84;
            box-shadow: 
                0 6px 20px rgba(192, 108, 132, 0.3);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(250, 243, 224, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
        }
        .custom-popup-content {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid #C06C84;
            border-radius: 20px 15px 25px 18px;
            padding: 30px;
            max-width: 400px;
            width: 90%;
            box-shadow: 
                0 15px 50px rgba(192, 108, 132, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.7);
            position: relative;
            color: #5D4037;
            font-family: 'Inter', sans-serif;
            backdrop-filter: blur(10px);
            transform: rotate(-0.5deg);
        }
        .custom-popup-close {
            position: absolute;
            top: 12px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #C06C84;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover {
            color: #7C9D96;
        }
        .popup-title {
            font-family: 'Caveat', cursive;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #5D4037;
            text-align: center;
            transform: rotate(0.5deg);
        }
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 0.95rem;
            color: #5D4037;
            line-height: 1.6;
        }
        .copy-btn {
            background: linear-gradient(135deg, #C06C84, #7C9D96);
            border: 1px solid #C06C84;
            border-radius: 12px;
            padding: 5px 8px;
            color: #FAF3E0;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.8rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Inter', sans-serif;
            transform: rotate(-0.5deg);
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #7C9D96, #C06C84);
            transform: rotate(0deg) translateY(-1px);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(192, 108, 132, 0.3);
            border-radius: 15px 12px 18px 14px;
            padding: 18px;
            margin-bottom: 12px;
            box-shadow: 0 4px 15px rgba(192, 108, 132, 0.1);
            transform: rotate(0.5deg);
        }
        .bank-card:nth-child(even) {
            transform: rotate(-0.5deg);
        }
        .iban-text {
            background: rgba(255, 255, 255, 0.9);
            border: 2px solid rgba(192, 108, 132, 0.3);
            border-radius: 10px;
            padding: 10px;
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #5D4037;
        }
        .iban-text:focus {
            border-color: #C06C84;
            outline: none;
            box-shadow: 0 0 0 3px rgba(192, 108, 132, 0.1);
        }
        
        /* 11. Animations */
        @keyframes gentleSway {
            0%, 100% { 
                transform: rotate(-0.5deg);
            }
            50% { 
                transform: rotate(0.5deg);
            }
        }
        
        .company-name {
            animation: gentleSway 6s ease-in-out infinite;
        }
        
        @keyframes fadeInRotate {
            from { 
                transform: rotate(-5deg) translateY(30px); 
                opacity: 0; 
            }
            to { 
                transform: rotate(-0.5deg) translateY(0); 
                opacity: 1; 
            }
        }
        
        .custom-popup-content {
            animation: fadeInRotate 0.4s ease;
        }
        
        /* 12. Responsive */
        @media (max-width: 480px) {
            .card-content {
                padding: 25px 15px;
            }
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .company-name {
                font-size: 2.3rem;
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
                    <i class="fas fa-palette" style="font-size: 45px; color: #C06C84;"></i>
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
                <!-- QR Kod - Her zaman ilk sırada -->
                <div class="icon-card">
                    <a href="/{{slug}}/qr" target="_blank">
                        <i class="fas fa-qrcode"></i>
                        <span class="icon-label">QR Kod</span>
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

    <!-- Hakkımızda Popup -->
    <div id="about-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content">
            <button class="custom-popup-close" onclick="closeAboutPopup()">&times;</button>
            <h2 class="popup-title">Hakkımızda</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <!-- Banka Hesapları Popup -->
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
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #5D4037;">{{bank.bank_label}}</div>
                                    <div style="color: #C06C84; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #C06C84, #7C9D96); color: #FAF3E0; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
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
                    <div style="text-align:center; color:#5D4037; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = 'linear-gradient(135deg, #32CD32, #228B22)';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, #C06C84, #7C9D96)';
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
