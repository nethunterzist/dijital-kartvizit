export const kodSatiriTemplate = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Fira Code', monospace;
            background: #0D1117;
            overflow-y: auto;
            color: #C9D1D9;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #0D1117;
            position: relative;
            border: 1px solid #21262D;
        }
        
        /* Terminal-like header */
        .main-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: #21262D;
            border-bottom: 1px solid #30363D;
            z-index: 1;
        }
        
        /* Terminal dots */
        .main-container::after {
            content: '● ● ●';
            position: absolute;
            top: 8px;
            left: 12px;
            font-size: 12px;
            color: #FF5F56;
            z-index: 2;
        }
        
        .card-content {
            padding: 50px 25px 40px;
            text-align: left;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 2;
        }
        
        /* Code-like structure */
        .code-block {
            background: #161B22;
            border: 1px solid #30363D;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .code-line {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .line-number {
            color: #6E7681;
            margin-right: 15px;
            min-width: 20px;
            text-align: right;
            user-select: none;
        }
        
        .code-content {
            color: #C9D1D9;
        }
        
        .keyword {
            color: #FF7B72;
        }
        
        .string {
            color: #A5D6FF;
        }
        
        .comment {
            color: #8B949E;
            font-style: italic;
        }
        
        .function {
            color: #D2A8FF;
        }
        
        .variable {
            color: #79C0FF;
        }
        
        .profile-section {
            margin-bottom: 30px;
        }
        
        .profile-container {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .profile-image {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #30363D;
            margin-right: 20px;
            transition: all 0.3s ease;
        }
        
        .profile-image:hover {
            border-color: #58A6FF;
            box-shadow: 0 0 10px rgba(88, 166, 255, 0.3);
        }
        
        .profile-placeholder {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #21262D;
            border: 2px solid #30363D;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
        }
        
        .profile-info h1 {
            font-size: 1.5rem;
            color: #58A6FF;
            margin-bottom: 5px;
        }
        
        .profile-info h2 {
            font-size: 1rem;
            color: #F85149;
            margin-bottom: 3px;
        }
        
        .profile-info p {
            font-size: 0.9rem;
            color: #8B949E;
        }
        
        .contact-button {
            background: #238636;
            border: 1px solid #2EA043;
            border-radius: 6px;
            padding: 8px 16px;
            color: #FFFFFF;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            font-family: 'Fira Code', monospace;
            transition: all 0.2s ease;
            margin-top: 15px;
        }
        
        .contact-button:hover {
            background: #2EA043;
            transform: translateY(-1px);
            color: #FFFFFF;
            text-decoration: none;
        }
        
        .icons-section {
            margin-top: 20px;
        }
        
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-top: 15px;
        }
        
        .icon-item {
            background: #21262D;
            border: 1px solid #30363D;
            border-radius: 6px;
            padding: 12px;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .icon-item:hover {
            background: #30363D;
            border-color: #58A6FF;
        }
        
        .icon-item a {
            color: #C9D1D9;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.85rem;
        }
        
        .icon-item i {
            font-size: 16px;
            color: #58A6FF;
            min-width: 20px;
        }
        
        .company-logo {
            margin-top: 30px;
            text-align: center;
        }
        
        .logo-image {
            width: 60px;
            height: 60px;
            object-fit: contain;
            border-radius: 6px;
            background: #21262D;
            padding: 8px;
            border: 1px solid #30363D;
            transition: all 0.3s ease;
        }
        
        .logo-image:hover {
            border-color: #58A6FF;
            box-shadow: 0 0 10px rgba(88, 166, 255, 0.2);
        }
        
        .custom-popup-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(13, 17, 23, 0.95);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(4px);
        }
        
        .custom-popup-content {
            background: #0D1117;
            border: 1px solid #30363D;
            border-radius: 6px;
            padding: 25px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 16px 32px rgba(1, 4, 9, 0.85);
            position: relative;
            color: #C9D1D9;
            font-family: 'Fira Code', monospace;
        }
        
        .custom-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #8B949E;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .custom-popup-close:hover {
            color: #F85149;
        }
        
        .popup-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #58A6FF;
            text-align: center;
        }
        
        .tax-info div, .about-content {
            margin-bottom: 12px;
            font-size: 0.85rem;
            color: #C9D1D9;
            line-height: 1.5;
        }
        
        .copy-btn {
            background: #21262D;
            border: 1px solid #30363D;
            border-radius: 4px;
            padding: 4px 8px;
            color: #C9D1D9;
            cursor: pointer;
            margin-left: 8px;
            font-size: 0.75rem;
            transition: all 0.2s;
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            font-family: 'Fira Code', monospace;
        }
        
        .copy-btn:hover {
            background: #30363D;
            border-color: #58A6FF;
        }
        
        .bank-accounts-list {
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .bank-card {
            background: #161B22;
            border: 1px solid #30363D;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 10px;
        }
        
        .iban-text {
            background: #0D1117;
            border: 1px solid #30363D;
            border-radius: 4px;
            padding: 8px;
            font-family: 'Fira Code', monospace;
            font-size: 0.8rem;
            width: 100%;
            margin: 6px 0;
            transition: border-color 0.2s;
            color: #C9D1D9;
        }
        
        .iban-text:focus {
            border-color: #58A6FF;
            outline: none;
            box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
        }
        
        @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
        }
        
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #58A6FF; }
        }
        
        .typing-effect {
            overflow: hidden;
            white-space: nowrap;
            border-right: 2px solid #58A6FF;
            animation: typing 2s steps(20) 1s both, blink 1s infinite;
        }
        
        @media (max-width: 480px) {
            .card-content {
                padding: 40px 15px 30px;
            }
            .icons-grid {
                grid-template-columns: 1fr;
            }
            .profile-container {
                flex-direction: column;
                text-align: center;
            }
            .profile-image, .profile-placeholder {
                margin-right: 0;
                margin-bottom: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <!-- Profile Section -->
            <div class="code-block profile-section">
                <div class="code-line">
                    <span class="line-number">1</span>
                    <span class="code-content"><span class="comment">// Profil Bilgileri</span></span>
                </div>
                <div class="code-line">
                    <span class="line-number">2</span>
                    <span class="code-content"><span class="keyword">const</span> <span class="variable">profile</span> = {</span>
                </div>
                
                <div class="profile-container">
                    {{#if profil_foto}}
                    <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
                    {{else}}
                    <div class="profile-placeholder">
                        <i class="fas fa-code" style="font-size: 30px; color: #58A6FF;"></i>
                    </div>
                    {{/if}}
                    
                    <div class="profile-info">
                        <h1 class="typing-effect">{{firma_adi}}</h1>
                        {{#if yetkili_adi}}
                        <h2>{{yetkili_adi}}</h2>
                        {{/if}}
                        {{#if yetkili_pozisyon}}
                        <p>{{yetkili_pozisyon}}</p>
                        {{/if}}
                        
                        <a href="/{{slug}}/{{slug}}.vcf" download="{{firma_adi}}.vcf" class="contact-button">
                            <i class="fas fa-download"></i>
                            vCard İndir
                        </a>
                    </div>
                </div>
                
                <div class="code-line">
                    <span class="line-number">3</span>
                    <span class="code-content">};</span>
                </div>
            </div>

            <!-- Icons Section -->
            <div class="code-block icons-section">
                <div class="code-line">
                    <span class="line-number">4</span>
                    <span class="code-content"><span class="comment">// İletişim Kanalları</span></span>
                </div>
                <div class="code-line">
                    <span class="line-number">5</span>
                    <span class="code-content"><span class="keyword">const</span> <span class="variable">contacts</span> = [</span>
                </div>
                
                <div class="icons-grid">
                    <!-- QR Kod -->
                    <div class="icon-item">
                        <a href="/{{slug}}/qr" target="_blank">
                            <i class="fas fa-qrcode"></i>
                            <span>QR Kod</span>
                        </a>
                    </div>
                    
                    <!-- Sosyal Medya -->
                    {{#if social_media}}
                        {{#each social_media}}
                        <div class="icon-item">
                            <a href="{{this.url}}" target="_blank">
                                <i class="{{getIconClass this.icon this.label}}"></i>
                                <span>{{this.label}}</span>
                            </a>
                        </div>
                        {{/each}}
                    {{/if}}
                    
                    <!-- İletişim -->
                    {{#if communication}}
                        {{#each communication}}
                        <div class="icon-item">
                            <a href="{{this.url}}" target="_blank">
                                <i class="{{getIconClass this.icon this.label}}"></i>
                                <span>{{this.label}}</span>
                            </a>
                        </div>
                        {{/each}}
                    {{/if}}

                    <!-- Katalog -->
                    {{#if katalog}}
                    <div class="icon-item">
                        <a href="{{katalog.url}}" target="_blank">
                            <i class="fas fa-book"></i>
                            <span>{{katalog.label}}</span>
                        </a>
                    </div>
                    {{/if}}
                    
                    <!-- Banka -->
                    {{#if iban}}
                    <div class="icon-item">
                        <a href="#" onclick="showBankPopup(event)">
                            <i class="fas fa-university"></i>
                            <span>{{iban.label}}</span>
                        </a>
                    </div>
                    {{/if}}
                    
                    <!-- Vergi -->
                    {{#if tax}}
                    <div class="icon-item">
                        <a href="#" onclick="showTaxPopup(event)">
                            <i class="fas fa-file-text"></i>
                            <span>{{tax.label}}</span>
                        </a>
                    </div>
                    {{/if}}
                    
                    <!-- Hakkımızda -->
                    {{#if about}}
                    <div class="icon-item">
                        <a href="#" onclick="showAboutPopup(event)">
                            <i class="fas fa-info-circle"></i>
                            <span>{{about.label}}</span>
                        </a>
                    </div>
                    {{/if}}
                </div>
                
                <div class="code-line">
                    <span class="line-number">6</span>
                    <span class="code-content">];</span>
                </div>
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
            <h2 class="popup-title">// Vergi Bilgileri</h2>
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
            <h2 class="popup-title">// Hakkımızda</h2>
            <div class="about-content">{{about.content}}</div>
        </div>
    </div>

    <div id="bank-popup" class="custom-popup-overlay" style="display:none;">
        <div class="custom-popup-content" style="max-width: 500px;">
            <button class="custom-popup-close" onclick="closeBankPopup()">&times;</button>
            <h2 class="popup-title">// Banka Hesapları</h2>
            <div class="bank-accounts-list">
                {{#if iban.value}}
                    {{#each (parseBankAccounts iban.value) as |bank|}}
                        <div class="bank-card">
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                {{#if bank.bank_logo}}
                                    <img src="{{bank.bank_logo}}" alt="{{bank.bank_label}}" style="width: 30px; height: 30px; object-fit: contain; margin-right: 10px;">
                                {{/if}}
                                <div>
                                    <div style="font-weight: 600; font-size: 0.9rem; color: #58A6FF;">{{bank.bank_label}}</div>
                                    <div style="color: #8B949E; font-size: 0.8rem;">{{bank.account_holder}}</div>
                                </div>
                            </div>
                            {{#each bank.accounts}}
                                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                                    <span style="display: inline-flex; width: 25px; height: 25px; border-radius: 4px; background: #21262D; color: #58A6FF; font-weight: 600; align-items: center; justify-content: center; margin-right: 8px; font-size: 0.7rem; border: 1px solid #30363D;">
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
                                    <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)"><i class="fas fa-copy"></i></button>
                                </div>
                            {{/each}}
                        </div>
                    {{/each}}
                {{else}}
                    <div style="text-align:center; color:#8B949E; padding: 30px;">// Tanımlı banka hesabı bulunamadı</div>
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
            btn.style.background = '#238636';
            btn.style.borderColor = '#2EA043';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = '#21262D';
                btn.style.borderColor = '#30363D';
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
