export const luxuryTemplate = `
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
            color: #2d2d2d;
            line-height: 1.6;
            overflow-y: auto;
            position: relative;
        }
        
        /* 3. Background Pattern - Altın çizgiler */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(45deg, transparent 40%, rgba(255, 215, 0, 0.1) 41%, rgba(255, 215, 0, 0.1) 42%, transparent 43%),
                linear-gradient(45deg, transparent 45%, rgba(255, 215, 0, 0.15) 46%, rgba(255, 215, 0, 0.15) 47%, transparent 48%),
                linear-gradient(45deg, transparent 50%, rgba(255, 215, 0, 0.1) 51%, rgba(255, 215, 0, 0.1) 52%, transparent 53%),
                linear-gradient(45deg, transparent 55%, rgba(255, 215, 0, 0.08) 56%, rgba(255, 215, 0, 0.08) 57%, transparent 58%),
                linear-gradient(45deg, transparent 60%, rgba(255, 215, 0, 0.12) 61%, rgba(255, 215, 0, 0.12) 62%, transparent 63%);
            background-size: 80px 80px, 120px 120px, 100px 100px, 140px 140px, 160px 160px;
            z-index: -1;
            pointer-events: none;
        }
        
        /* 4. Main Container */
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-left: 1px solid rgba(255, 215, 0, 0.3);
            border-right: 1px solid rgba(255, 215, 0, 0.3);
            position: relative;
        }
        
        /* 5. Card Content */
        .card-content {
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        /* 6. Profile Section */
        .profile-container {
            margin-bottom: 30px;
            position: relative;
        }
        .profile-image {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            object-fit: cover;
            border: 6px solid #FFD700;
            margin: 0 auto;
            display: block;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
            position: relative;
            z-index: 2;
        }
        .profile-placeholder {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: linear-gradient(135deg, #f8f8f8, #e8e8e8);
            border: 6px solid #FFD700;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
            position: relative;
            z-index: 2;
        }
        
        /* 7. Company Info */
        .company-info {
            margin-bottom: 40px;
            position: relative;
            z-index: 2;
        }
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #2d2d2d;
            letter-spacing: -0.02em;
            text-transform: uppercase;
        }
        .person-name {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 6px;
            color: #444;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .position {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 25px;
            font-weight: 500;
            text-transform: capitalize;
        }
        .contact-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 15px 30px;
            background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .contact-button:active {
            transform: scale(0.95);
            background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
            color: white;
            text-decoration: none;
        }
        
        /* 8. Icons Section - Grid formatı */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 40px;
            padding: 0 10px;
            position: relative;
            z-index: 2;
        }
        
        /* 9. Icon Cards - Kare format */
        .icon-card {
            background: rgba(255, 255, 255, 0.9);
            border: 3px solid #2d2d2d;
            border-radius: 12px;
            padding: 20px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            backdrop-filter: blur(5px);
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
            background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .icon-card:active::before {
            opacity: 1;
        }
        .icon-card:active {
            transform: scale(0.95);
            border-color: #FFD700;
            background: rgba(255, 255, 255, 1);
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
            font-size: 28px;
            color: #2d2d2d;
            transition: all 0.3s ease;
        }
        .icon-label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #2d2d2d;
            text-align: center;
            line-height: 1.2;
            text-transform: capitalize;
        }
        
        /* 10. Icon Colors - Platform specific */
        .icon-card:nth-child(1) i { color: #059669; } /* QR */
        .icon-card i.fa-phone { color: #3b82f6; }
        .icon-card i.fa-envelope { color: #f59e0b; }
        .icon-card i.fa-whatsapp { color: #16a34a; }
        .icon-card i.fab.fa-telegram { color: #0891b2; }
        .icon-card i.fab.fa-instagram { color: #e11d48; }
        .icon-card i.fab.fa-facebook { color: #1d4ed8; }
        .icon-card i.fab.fa-twitter { color: #0ea5e9; }
        .icon-card i.fab.fa-linkedin { color: #1e40af; }
        .icon-card i.fab.fa-youtube { color: #dc2626; }
        .icon-card i.fab.fa-tiktok { color: #111827; }
        .icon-card i.fa-globe { color: #7c3aed; }
        .icon-card i.fa-map-marker-alt { color: #ea580c; }
        .icon-card i.fa-university { color: #059669; }
        .icon-card i.fa-file-invoice { color: #0ea5e9; }
        .icon-card i.fa-info-circle { color: #0ea5e9; }
        .icon-card i.fa-book { color: #92400e; }
        .icon-card i.fa-share-alt { color: #6366f1; }
        
        /* 11. Special YouTube styling */
        .icon-card.youtube-special {
            grid-column: span 2;
            background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
            border-color: #ff0000;
            color: white;
        }
        .icon-card.youtube-special i {
            color: white;
            font-size: 32px;
        }
        .icon-card.youtube-special .icon-label {
            color: white;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .icon-card.youtube-special:active {
            background: linear-gradient(135deg, #cc0000 0%, #990000 100%);
            transform: scale(0.95);
        }
        
        /* 12. Company Logo */
        .company-logo {
            margin-top: 40px;
            text-align: center;
            position: relative;
            z-index: 2;
        }
        .logo-image {
            width: 100px;
            height: 100px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.9);
            padding: 12px;
            border: 2px solid #e5e5e5;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        .logo-image:active {
            transform: scale(0.95);
            border-color: #FFD700;
            background: rgba(255, 255, 255, 1);
        }
        
        /* 13. Popup Styles */
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        }
        .custom-popup-content {
            background: white;
            border-radius: 16px;
            padding: 30px;
            max-width: 420px;
            width: 90%;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            position: relative;
            animation: popupIn 0.3s ease;
            border: 2px solid #FFD700;
        }
        .custom-popup-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #999;
            cursor: pointer;
            transition: color 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .custom-popup-close:active {
            color: #666;
            transform: scale(0.9);
        }
        .popup-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #2d2d2d;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .tax-info div, .about-content {
            margin-bottom: 15px;
            font-size: 0.95rem;
            color: #444;
            line-height: 1.6;
        }
        .copy-btn {
            background: linear-gradient(135deg, #f8f8f8, #e8e8e8);
            border: 2px solid #ddd;
            border-radius: 6px;
            padding: 6px 12px;
            color: #444;
            cursor: pointer;
            margin-left: 10px;
            font-size: 0.8rem;
            font-weight: 600;
            transition: all 0.2s;
            -webkit-tap-highlight-color: transparent;
        }
        .copy-btn:active {
            background: linear-gradient(135deg, #e8e8e8, #d8d8d8);
            border-color: #bbb;
            transform: scale(0.95);
        }
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        .bank-card {
            background: linear-gradient(135deg, #f9f9f9, #f0f0f0);
            border: 2px solid #e5e5e5;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
        }
        .iban-text {
            background: white;
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 10px 15px;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 0.9rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
        }
        .iban-text:focus {
            border-color: #FFD700;
            outline: none;
        }
        
        /* 14. Animations */
        @keyframes popupIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        /* 15. Responsive adjustments */
        @media (max-width: 400px) {
            .icons-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }
            .icon-card.youtube-special {
                grid-column: span 3;
            }
            .profile-image, .profile-placeholder {
                width: 150px;
                height: 150px;
            }
            .company-name {
                font-size: 1.6rem;
            }
            .person-name {
                font-size: 1.2rem;
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
                    <i class="fas fa-user" style="font-size: 60px; color: #bbb;"></i>
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
                    <i class="fas fa-download"></i>
                    Rehbere Ekle
                </a>
            </div>

            <!-- Icons Section -->
            <div class="icons-grid">
                <!-- Dynamic icons will be inserted here -->
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
                                    <div style="font-weight: 600; font-size: 1.1rem; color: #2d2d2d;">{{bank.bank_label}}</div>
                                    <div style="color: #666; font-size: 0.9rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; background: #2d2d2d; color: white; font-weight: 700; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
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
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#999; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
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
            btn.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#065f46';
            setTimeout(() => { 
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #f8f8f8, #e8e8e8)';
                btn.style.borderColor = '#ddd';
                btn.style.color = '#444';
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
