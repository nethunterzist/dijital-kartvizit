// QR Kod Template'leri - Her template için ayrı QR kod tasarımı
// Auto-generated QR templates for all main templates

export const qrTemplate2 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: white;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #667eea;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #667eea;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #667eea;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #667eea;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate3 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #ffffff;
            color: #1f2937;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #1f2937;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #374151;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #374151;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #374151;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #374151;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate4 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #FFD700;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #FFD700;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #FFD700;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #FFD700;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate5 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #f8f9fa;
            color: #333;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #f8f9fa;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #333;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #007bff;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #007bff;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #007bff;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate6 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #121212;
            color: #FFFFFF;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #FFFFFF;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #FFD700;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #FFD700;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #FFD700;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #FFD700;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate7 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #F2F2F2;
            color: #1A1A1A;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #F2F2F2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #1A1A1A;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #003366;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #003366;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #003366;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #003366;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate8 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #ffffff;
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4299e1;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #4299e1;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4299e1;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #4299e1;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate9 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #63b3ed;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #63b3ed;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #63b3ed;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #63b3ed;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate10 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #a78bfa;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #a78bfa;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #a78bfa;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #a78bfa;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate11 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            color: #4a5568;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #4a5568;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #ed8936;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #ed8936;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #ed8936;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #ed8936;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate12 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #e53e3e;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #e53e3e;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #e53e3e;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #e53e3e;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate13 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #f7fafc;
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #f7fafc;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4299e1;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #4299e1;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4299e1;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #4299e1;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate14 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link href="https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@300;400;500&display=swap" rel="stylesheet">
    <style>
        /* Template 14 Monotone QR - Exact match with main template */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background: #FFFFFF;
            color: #111111;
            line-height: 1.6;
            overflow-y: auto;
            font-weight: 300;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #FFFFFF;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 40px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2.2rem;
            font-weight: 300;
            margin-bottom: 12px;
            color: #111111;
            letter-spacing: -0.03em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 30px;
            color: #CCCCCC;
        }
        
        .qr-container {
            background: #FFFFFF;
            border: none;
            border-radius: 0;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: none;
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 0;
            background: white;
            margin: 0 auto;
            filter: grayscale(100%);
        }
        
        .website-link {
            font-size: 1rem;
            color: #888888;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 300;
        }
        
        .website-link:hover {
            color: #111111;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 90px;
            height: 90px;
            object-fit: contain;
            border-radius: 0;
            background: transparent;
            padding: 0;
            border: none;
            filter: grayscale(100%);
        }
        
        /* Responsive */
        @media (max-width: 400px) {
            .card-content {
                padding: 40px 30px;
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
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate15 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #9f7aea;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #9f7aea;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #9f7aea;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #9f7aea;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate16 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #121212;
            color: #FFFFFF;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #FFFFFF;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #FFD700;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #FFD700;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #FFD700;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #FFD700;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate17 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #38a169;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #38a169;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #38a169;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #38a169;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate18 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #3182ce;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #3182ce;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #3182ce;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #3182ce;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate19 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #f093fb;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #f093fb;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #f093fb;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #f093fb;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate20 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #805ad5;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #805ad5;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #805ad5;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #805ad5;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate21 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #e53e3e;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #e53e3e;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #e53e3e;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #e53e3e;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate23 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #38a169;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #38a169;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #38a169;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #38a169;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate25 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #d4a574 0%, #8b4513 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #d4a574 0%, #8b4513 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #d69e2e;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #d69e2e;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #d69e2e;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #d69e2e;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate26 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #3182ce;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #3182ce;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #3182ce;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #3182ce;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate27 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
            color: #1a202c;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #1a202c;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #d69e2e;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #d69e2e;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #d69e2e;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #d69e2e;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate28 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #3182ce;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #3182ce;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #3182ce;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #3182ce;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate29 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #c9b037 0%, #928639 100%);
            color: #1a202c;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #c9b037 0%, #928639 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #1a202c;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #d69e2e;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #d69e2e;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #d69e2e;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #d69e2e;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate30 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%);
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #38a169;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #38a169;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #38a169;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #38a169;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate32 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4299e1;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #4299e1;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4299e1;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #4299e1;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate33 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #fbb6ce 0%, #f093fb 100%);
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #fbb6ce 0%, #f093fb 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #ed64a6;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #ed64a6;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #ed64a6;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #ed64a6;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate34 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #a0aec0;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #a0aec0;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #a0aec0;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #a0aec0;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate35 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #1a202c;
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #1a202c;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4299e1;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #4299e1;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4299e1;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #4299e1;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate36 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: #f7fafc;
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: #f7fafc;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4a5568;
        }
        
        .qr-container {
            background: #ffffff;
            border: 2px solid #4a5568;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4a5568;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: #ffffff;
            padding: 8px;
            border: 1px solid #4a5568;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate37 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #f093fb;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #f093fb;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #f093fb;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #f093fb;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate38 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
            color: #2d3748;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #2d3748;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4a5568;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #4a5568;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4a5568;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #4a5568;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;

export const qrTemplate39 = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - QR Kod</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        html, body {
            height: 100%;
            font-family: 'Rubik', sans-serif;
            background: linear-gradient(135deg, #2c5282 0%, #2a4365 100%);
            color: #ffffff;
            overflow-y: auto;
        }
        
        .main-container {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
            min-height: 100vh;
            background: linear-gradient(135deg, #2c5282 0%, #2a4365 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .card-content {
            padding: 50px 30px;
            text-align: center;
            width: 100%;
        }
        
        .company-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 12px;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        
        .person-name {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            color: #4299e1;
        }
        
        .qr-container {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #4299e1;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code {
            width: 220px;
            height: 220px;
            border-radius: 12px;
            background: white;
            margin: 0 auto;
        }
        
        .website-link {
            font-size: 1rem;
            color: #4299e1;
            text-decoration: none;
            word-break: break-all;
            margin-bottom: 20px;
            display: block;
            font-weight: 500;
        }
        
        .company-logo {
            margin-top: 20px;
        }
        
        .logo-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px;
            border: 1px solid #4299e1;
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <h1 class="company-name">{{firma_adi}}</h1>
            {{#if yetkili_adi}}
            <h2 class="person-name">{{yetkili_adi}}</h2>
            {{/if}}
            
            <div class="qr-container">
                <img src="{{qr_code_url}}" alt="QR Kod" class="qr-code" />
            </div>
            
            {{#if website}}
            <a href="{{website}}" target="_blank" rel="noopener noreferrer" class="website-link">
                {{website_display}}
            </a>
            {{/if}}
            
            {{#if firma_logo}}
            <div class="company-logo">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="logo-image">
            </div>
            {{/if}}
        </div>
    </div>
</body>
</html>`;



// QR Template seçici fonksiyonu
export function getQRTemplate(templateId: number): string {
  switch (templateId) {
    case 2:
      return qrTemplate2;
    case 3:
      return qrTemplate3;
    case 4:
      return qrTemplate4;
    case 5:
      return qrTemplate5;
    case 6:
      return qrTemplate6;
    case 7:
      return qrTemplate7;
    case 8:
      return qrTemplate8;
    case 9:
      return qrTemplate9;
    case 10:
      return qrTemplate10;
    case 11:
      return qrTemplate11;
    case 12:
      return qrTemplate12;
    case 13:
      return qrTemplate13;
    case 14:
      return qrTemplate14;
    case 15:
      return qrTemplate15;
    case 16:
      return qrTemplate16;
    case 17:
      return qrTemplate17;
    case 18:
      return qrTemplate18;
    case 19:
      return qrTemplate19;
    case 20:
      return qrTemplate20;
    case 21:
      return qrTemplate21;
    case 23:
      return qrTemplate23;
    case 25:
      return qrTemplate25;
    case 26:
      return qrTemplate26;
    case 27:
      return qrTemplate27;
    case 28:
      return qrTemplate28;
    case 29:
      return qrTemplate29;
    case 30:
      return qrTemplate30;
    case 32:
      return qrTemplate32;
    case 33:
      return qrTemplate33;
    case 34:
      return qrTemplate34;
    case 35:
      return qrTemplate35;
    case 36:
      return qrTemplate36;
    case 37:
      return qrTemplate37;
    case 38:
      return qrTemplate38;
    case 39:
      return qrTemplate39;
    default:
      return qrTemplate2; // Fallback
  }
}
