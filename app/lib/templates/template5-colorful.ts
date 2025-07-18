export const colorfulTemplate = `
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
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            overflow-y: auto;
        }
        
        /* 3. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            position: relative;
        }
        
        /* 4. Card Content */
        .card-content {
            padding: 40px 25px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
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
            border: 4px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            margin: 0 auto;
            display: block;
            transition: all 0.4s ease;
            animation: float 6s ease-in-out infinite;
        }
        .profile-image:hover {
            transform: scale(1.1) translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .profile-placeholder {
            width: 130px;
            height: 130px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: 4px solid rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            animation: float 6s ease-in-out infinite;
        }
        
        /* 6. Company Info */
        .company-info {
            margin-bottom: 40px;
            color: white;
        }
        .company-name {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 10px;
            color: #ffffff;
            text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
            letter-spacing: -0.02em;
            animation: slideInUp 0.8s ease;
        }
        .person-name {
            font-size: 1.4rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: rgba(255, 255, 255, 0.95);
            animation: slideInUp 0.8s ease 0.2s both;
        }
        .position {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 25px;
            font-weight: 400;
            animation: slideInUp 0.8s ease 0.4s both;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 14px 28px;
            background: rgba(255, 255, 255, 0.25);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.3s ease;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
            animation: slideInUp 0.8s ease 0.6s both;
        }
        .contact-button:hover {
            background: rgba(255, 255, 255, 0.35);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            color: white;
            text-decoration: none;
        }
        
        /* 7. Icons Section */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            max-width: 380px;
            margin: 0 auto;
            animation: fadeInUp 1s ease 0.8s both;
        }
        
        /* 8. Icon Cards */
        .icon-card {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 20px;
            padding: 20px 12px;
            text-align: center;
            transition: all 0.4s ease;
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .icon-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s;
        }
        .icon-card:hover::before {
            transform: translateX(100%);
        }
        .icon-card:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .icon-card a {
            color: white;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 1;
        }
        .icon-card i {
            font-size: 26px;
            margin-bottom: 6px;
            transition: all 0.3s ease;
        }
        .icon-card:hover i {
            transform: scale(1.2) rotate(5deg);
        }
        .icon-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.95);
            line-height: 1.2;
            text-align: center;
        }
        
        /* 9. Icon Styles - Vibrant platform colors */
        .icon-card:nth-child(1) i { color: #FFD700; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); } /* QR */
        .icon-card i.fa-phone { color: #00E676; text-shadow: 0 0 10px rgba(0, 230, 118, 0.5); }
        .icon-card i.fa-envelope { color: #FF5722; text-shadow: 0 0 10px rgba(255, 87, 34, 0.5); }
        .icon-card i.fa-whatsapp { color: #25D366; text-shadow: 0 0 10px rgba(37, 211, 102, 0.5); }
        .icon-card i.fab.fa-telegram { color: #0088cc; text-shadow: 0 0 10px rgba(0, 136, 204, 0.5); }
        .icon-card i.fab.fa-instagram { 
            background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 8px rgba(225, 48, 108, 0.5));
        }
        .icon-card i.fab.fa-facebook { color: #1877F2; text-shadow: 0 0 10px rgba(24, 119, 242, 0.5); }
        .icon-card i.fab.fa-twitter { color: #1DA1F2; text-shadow: 0 0 10px rgba(29, 161, 242, 0.5); }
        .icon-card i.fab.fa-linkedin { color: #0A66C2; text-shadow: 0 0 10px rgba(10, 102, 194, 0.5); }
        .icon-card i.fab.fa-youtube { color: #FF0000; text-shadow: 0 0 10px rgba(255, 0, 0, 0.5); }
        .icon-card i.fab.fa-tiktok { color: #ffffff; text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
        .icon-card i.fa-globe { color: #9C27B0; text-shadow: 0 0 10px rgba(156, 39, 176, 0.5); }
        .icon-card i.fa-map-marker-alt { color: #FF9800; text-shadow: 0 0 10px rgba(255, 152, 0, 0.5); }
        .icon-card i.fa-university { color: #4CAF50; text-shadow: 0 0 10px rgba(76, 175, 80, 0.5); }
        .icon-card i.fa-file-text { color: #2196F3; text-shadow: 0 0 10px rgba(33, 150, 243, 0.5); }
        .icon-card i.fa-info-circle { color: #2196F3; text-shadow: 0 0 10px rgba(33, 150, 243, 0.5); }
        .icon-card i.fa-book { color: #FF6B35; text-shadow: 0 0 10px rgba(255, 107, 53, 0.5); }
        
        /* 9.5. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
            animation: fadeInUp 1.2s ease 1s both;
        }
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px;
            backdrop-filter: blur(15px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            transition: all 0.4s ease;
            animation: float 6s ease-in-out infinite 2s;
        }
        .logo-image:hover {
            transform: scale(1.1) translateY(-5px);
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
        }
        
        /* 10. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(15px);
        }
        .custom-popup-content {
            background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
            border-radius: 25px;
            padding: 35px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
            position: relative;
            animation: popupIn 0.5s ease;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.3);
        }
        .custom-popup-close {
            position: absolute;
            top: 20px;
            right: 25px;
            background: linear-gradient(135deg, #ff6b6b, #ee5a52);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }
        .custom-popup-close:hover {
            transform: rotate(90deg) scale(1.1);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        .popup-title {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 25px;
            color: #333;
            text-align: center;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .tax-info div, .about-content {
            margin-bottom: 18px;
            font-size: 1rem;
            color: #444;
            line-height: 1.7;
        }
        .tax-info strong {
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .copy-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 20px;
            padding: 8px 16px;
            color: white;
            cursor: pointer;
            margin-left: 12px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .copy-btn:hover {
            background: linear-gradient(135deg, #764ba2, #667eea);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%);
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 18px;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .bank-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            border-color: rgba(102, 126, 234, 0.3);
        }
        .iban-text {
            background: rgba(255,255,255,0.8);
            border: 2px solid rgba(102, 126, 234, 0.2);
            border-radius: 15px;
            padding: 12px 16px;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.9rem;
            width: 100%;
            margin: 8px 0;
            transition: all 0.3s;
            color: #333;
        }
        .iban-text:focus {
            border-color: #667eea;
            outline: none;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        /* 11. Animations */
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInUp {
            from { transform: translateY(40px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        @keyframes popupIn {
            from { transform: scale(0.8) translateY(40px); opacity: 0; }
            to { transform: scale(1) translateY(0); opacity: 1; }
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
                    <i class="fas fa-user" style="font-size: 60px; color: rgba(255,255,255,0.8);"></i>
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
                            <i class="{{this.icon}}"></i>
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
                            <i class="{{this.icon}}"></i>
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
        <div class="custom-popup-content" style="max-width: 550px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 18px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 18px; border-radius: 12px; background: white; padding: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                {{/if}}
                                <div>
                                    <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 4px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">{{bank.bank_label}}</div>
                                    <div style="font-size: 0.9rem; color: #666;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                    <span style="display: inline-flex; width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-weight: 700; align-items: center; justify-content: center; margin-right: 12px; font-size: 0.9rem; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); animation: pulse 2s infinite;">
                                        {{#if this.currency}}
                                            {{#ifEquals this.currency "TL"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "TRY"}}₺{{/ifEquals}}
                                            {{#ifEquals this.currency "USD"}}&#36;{{/ifEquals}}
                                            {{#ifEquals this.currency "EUR"}}€{{/ifEquals}}
                                        {{else}}
                                            ₺
                                        {{/if}}
                                    </span>
                                    <input type="text" class="iban-text" value="{{this.iban}}" readonly style="flex:1; margin-right: 12px;">
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#666; padding: 48px;">
                        <i class="fas fa-university" style="font-size: 48px; color: #667eea; margin-bottom: 16px;"></i>
                        <p>Tanımlı banka hesabı bulunamadı.</p>
                    </div>
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
            btn.textContent = 'KOPYALANDI!';
            btn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            }, 1500);
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
