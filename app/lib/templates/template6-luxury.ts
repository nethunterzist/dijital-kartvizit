export const template6Luxury = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
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
                {{#each iletisim_bilgileri}}
                <div class="contact-item">
                    <img src="/img/icons/{{icon}}.svg" alt="{{tip}}" class="contact-icon">
                    {{#if link}}
                    <a href="{{link}}" class="contact-text">{{deger}}</a>
                    {{else}}
                    <span class="contact-text">{{deger}}</span>
                    {{/if}}
                </div>
                {{/each}}
            </div>
            
            {{#if sosyal_medya_hesaplari}}
            <div class="social-section">
                <h3 class="social-title">Sosyal Medya</h3>
                <div class="social-links">
                    {{#each sosyal_medya_hesaplari}}
                    <a href="{{link}}" target="_blank" class="social-link">
                        <img src="/img/icons/{{icon}}.svg" alt="{{platform}}" class="social-icon">
                    </a>
                    {{/each}}
                </div>
            </div>
            {{/if}}
            
            <div class="qr-section">
                <img src="/qrcodes/{{slug}}.png" alt="QR Kod" class="qr-code">
                <p class="qr-text">QR kodu okutarak kartımı kaydedin</p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export default template6Luxury;
