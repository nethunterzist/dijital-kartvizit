export const wavesTemplate = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{firma_adi}} - Dijital Kartvizit</title>
    <link rel="icon" href="https://sanalkartvizitim.com/wp-content/uploads/2024/03/fav.png" type="image/png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap">
    <style>
        :root {
            --gold-primary: #D4AF37;
            --gold-light: #F7E98E;
            --gold-dark: #B8860B;
            --text-dark: #2C2C2C;
            --text-medium: #666666;
            --white: #FFFFFF;
            --shadow-light: rgba(0, 0, 0, 0.1);
            --shadow-medium: rgba(0, 0, 0, 0.15);
            --shadow-heavy: rgba(0, 0, 0, 0.25);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: 'Rubik', sans-serif;
            background-color: var(--white);
            overflow-x: hidden;
        }

        .main-container {
            background: url('/img/bg/2.png') no-repeat center center;
            background-size: contain;
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0;
            position: relative;
        }

        .card-content {
            width: 100%;
            max-width: 400px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            position: relative;
            z-index: 1;
            margin: 0 auto;
            box-sizing: border-box;
        }

        /* Profile Section */
        .profile-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
        }

        .profile-image {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            border: 8px solid transparent;
            background: linear-gradient(45deg, {{#if gradient_color}}{{gradient_color}}{{else}}#D4AF37, #F7E98E, #B8860B{{/if}}) border-box;
            background-clip: border-box;
            object-fit: cover;
            box-shadow: 0 8px 24px var(--shadow-medium);
            transition: transform 0.3s ease;
            position: relative;
        }

        .profile-image::before {
            content: '';
            position: absolute;
            top: -8px;
            left: -8px;
            right: -8px;
            bottom: -8px;
            background: linear-gradient(45deg, {{#if gradient_color}}{{gradient_color}}{{else}}#D4AF37, #F7E98E, #B8860B{{/if}});
            border-radius: 50%;
            z-index: -1;
        }

        .profile-image:hover {
            transform: scale(1.05);
        }

        .profile-info {
            text-align: center;
        }

        .profile-name {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-dark);
            margin-bottom: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .company-name {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 8px;
            text-align: center;
        }

        .profile-position {
            font-size: 1rem;
            font-weight: 400;
            color: var(--text-medium);
            text-transform: capitalize;
        }

        /* Rehbere Ekle Button */
        .vcard-button {
            background: rgb(246 246 246 / 28%);
            color: var(--text-dark);
            padding: 12px 24px;
            border: 3px solid var(--text-dark);
            border-radius: 15px;
            font-size: 0.95rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 16px var(--shadow-light);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .vcard-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px var(--shadow-medium);
            text-decoration: none;
            color: var(--text-dark);
            background: rgb(248 248 248 / 35%);
        }

        .vcard-button i {
            font-size: 1.1rem;
            color: var(--text-dark) !important;
        }

        /* Icons Grid */
        .icons-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            width: 100%;
            max-width: 320px;
            margin: 5px auto;
            justify-content: center;
            box-sizing: border-box;
            overflow: visible;
            padding-top: 8px;
        }

        .icon-item, .icon-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            transition: transform 0.3s ease;
        }

        .icon-item:hover, .icon-card:hover {
            transform: translateY(-3px);
        }

        .icon-card a {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            color: var(--text-dark);
        }

        .icon-card i {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            background: rgb(246 246 246 / 28%);
            border-radius: 15px;
            box-shadow: 0 4px 12px var(--shadow-light);
            border: 5px solid var(--text-dark);
            transition: all 0.3s ease;
            font-size: 2rem;
        }

        .icon-card:hover i {
            box-shadow: 0 6px 20px var(--shadow-medium);
            border-color: var(--text-dark);
            transform: scale(1.05);
        }

        .icon-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            background: rgb(246 246 246 / 28%);
            border-radius: 15px;
            box-shadow: 0 4px 12px var(--shadow-light);
            border: 5px solid var(--text-dark);
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .icon-link:hover {
            box-shadow: 0 6px 20px var(--shadow-medium);
            border-color: var(--text-dark);
            transform: scale(1.05);
        }

        .icon-link i {
            font-size: 2.2rem;
        }

        /* Icon Colors - For all icon types */
        .icon-telefon i, .icon-card .fa-phone, .icon-item .fa-phone { color: #4CAF50 !important; }
        .icon-adres i, .icon-card .fa-map-marker-alt, .icon-item .fa-map-marker-alt { color: #FF5722 !important; }
        .icon-whatsapp i, .icon-card .fa-whatsapp, .icon-item .fa-whatsapp { color: #25D366 !important; }
        .icon-instagram i, .icon-card .fa-instagram, .icon-item .fa-instagram { color: #E4405F !important; }
        .icon-email i, .icon-card .fa-envelope, .icon-item .fa-envelope { color: #FF9800 !important; }
        .icon-paylas i, .icon-card .fa-share-alt, .icon-item .fa-share-alt { color: #2196F3 !important; }
        .icon-qr i, .icon-card .fa-qrcode, .icon-item .fa-qrcode { color: #9C27B0 !important; }
        .icon-website i, .icon-card .fa-globe, .icon-item .fa-globe { color: #607D8B !important; }
        .icon-card .fa-facebook, .icon-item .fa-facebook { color: #1877F2 !important; }
        .icon-card .fa-twitter, .icon-item .fa-twitter { color: #1DA1F2 !important; }
        .icon-card .fa-linkedin, .icon-item .fa-linkedin { color: #0A66C2 !important; }
        .icon-card .fa-youtube, .icon-item .fa-youtube { color: #FF0000 !important; }
        .icon-card .fa-tiktok, .icon-item .fa-tiktok { color: #000000 !important; }
        .icon-card .fa-telegram, .icon-item .fa-telegram { color: #2AABEE !important; }
        .icon-card .fa-book, .icon-item .fa-book { color: #795548 !important; }
        .icon-card .fa-university, .icon-item .fa-university { color: #4CAF50 !important; }
        .icon-card .fa-file-invoice, .icon-item .fa-file-invoice { color: #FF9800 !important; }
        .icon-card .fa-info-circle, .icon-item .fa-info-circle { color: #2196F3 !important; }
        .icon-card .fa-download, .icon-item .fa-download { color: #4CAF50 !important; }

        .icon-label {
            font-size: 0.7rem;
            font-weight: 500;
            color: var(--text-dark);
            text-align: center;
            margin-top: 6px;
            line-height: 1.1;
            max-width: 70px;
            word-wrap: break-word;
            white-space: normal;
            display: block;
        }
        /* YouTube Section */
        .youtube-section {
            margin: 5px 0 5px 0;
        }

        .youtube-button {
            background: #FF0000;
            color: var(--white);
            padding: 12px 32px;
            border: none;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 16px rgba(255, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        .youtube-button:hover {
            background: #CC0000;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
            text-decoration: none;
            color: var(--white);
        }

        .youtube-button i {
            font-size: 1.2rem;
        }

        /* Company Logo Section */
        .company-logo-section {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .company-logo {
            max-width: 120px;
            max-height: 60px;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 2px 8px var(--shadow-light));
        }

        /* Share Popup */
        #share-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
        }

        .share-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .share-content {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 550px;
            background: white;
            border-radius: 20px 20px 0 0;
            padding: 30px;
            text-align: center;
            animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(100%); }
            to { transform: translateX(-50%) translateY(0); }
        }

        .share-content h3 {
            margin: 0 0 20px 0;
            font-size: 1.3rem;
            color: #333;
        }

        .share-buttons {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
        }

        .share-buttons button {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 20px;
            border: none;
            border-radius: 12px;
            background: #f8f8f8;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.2s;
        }

        .share-buttons button:hover {
            background: #e8e8e8;
        }

        .close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
            .main-container {
                background-size: cover;
                background-position: center center;
            }

            .card-content {
                padding: 0 15px;
                gap: 15px;
            }

            .profile-image {
                width: 180px;
                height: 180px;
            }

            .profile-image::before {
                top: -6px;
                left: -6px;
                right: -6px;
                bottom: -6px;
            }

            .profile-name {
                font-size: 1.3rem;
            }

            .company-name {
                font-size: 1.1rem;
            }

            .profile-position {
                font-size: 0.9rem;
            }

            .icons-grid {
                gap: 6px;
                max-width: 300px;
            }

            .icon-link, .icon-card i {
                width: 65px;
                height: 65px;
                border-radius: 12px;
                border: 4px solid #000000;
            }

            .icon-link i, .icon-card i {
                font-size: 1.9rem;
            }

            .vcard-button, .youtube-button {
                padding: 10px 20px;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 360px) {
            .card-content {
                max-width: 350px;
                padding: 15px;
            }
            
            .icons-grid {
                gap: 6px;
                max-width: 280px;
                grid-template-columns: repeat(4, 1fr);
            }

            .icon-link, .icon-card i {
                width: 55px;
                height: 55px;
                border-radius: 10px;
                border: 4px solid #000000;
            }

            .icon-link i, .icon-card i {
                font-size: 1.8rem;
            }
        }

        /* Animation for smooth loading */
        .card-content > * {
            opacity: 0;
            animation: fadeInUp 0.6s ease forwards;
        }

        .profile-section { animation-delay: 0.1s; }
        .vcard-button { animation-delay: 0.2s; }
        .icons-grid { animation-delay: 0.3s; }
        .youtube-section { animation-delay: 0.4s; }
        .company-logo-section { animation-delay: 0.5s; }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
        }

        .modal-overlay.open {
            display: flex;
        }

        .modal-content {
            background: var(--white);
            border-radius: 15px;
            box-shadow: 0 10px 40px var(--shadow-heavy);
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            border-bottom: 1px solid #E0E0E0;
        }

        .modal-header h3 {
            margin: 0;
            color: var(--text-dark);
            font-size: 1.3rem;
            font-weight: 600;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--text-medium);
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-close:hover {
            color: var(--text-dark);
        }

        .modal-body {
            padding: 25px;
        }

        .modal-body p {
            margin: 0;
            line-height: 1.6;
            color: var(--text-dark);
            font-size: 1rem;
        }

        .tax-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #F0F0F0;
        }

        .tax-item:last-child {
            border-bottom: none;
        }

        .tax-item strong {
            color: var(--text-dark);
            font-weight: 600;
        }

        .tax-item span {
            color: var(--text-medium);
            text-align: right;
        }

        /* Bank Modal Specific Styles */
        .bank-accounts {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .bank-account {
            border: 1px solid #E0E0E0;
            border-radius: 10px;
            overflow: hidden;
        }

        .bank-header {
            background: #F8F9FA;
            padding: 15px 20px;
            border-bottom: 1px solid #E0E0E0;
        }

        .bank-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .bank-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }

        .bank-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--text-dark);
        }

        .account-holder {
            font-size: 0.9rem;
            color: var(--text-medium);
            margin-top: 2px;
        }

        .accounts-list {
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .account-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: #FAFAFA;
            border-radius: 8px;
            border: 1px solid #F0F0F0;
        }

        .account-details {
            flex: 1;
        }

        .iban-number {
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-dark);
            font-family: monospace;
            letter-spacing: 1px;
        }

        .account-info {
            display: flex;
            gap: 10px;
            margin-top: 5px;
        }

        .currency, .account-type {
            font-size: 0.8rem;
            color: var(--text-medium);
            background: #E8F4F8;
            padding: 2px 8px;
            border-radius: 12px;
        }

        .copy-iban-btn {
            background: var(--gold-primary);
            color: var(--white);
            border: none;
            border-radius: 6px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .copy-iban-btn:hover {
            background: var(--gold-dark);
            transform: translateY(-1px);
        }

        .copy-iban-btn.copied {
            background: #4CAF50;
        }

        @media (max-width: 480px) {
            .modal-content {
                margin: 10px;
                max-width: calc(100% - 20px);
            }

            .modal-header {
                padding: 15px 20px;
            }

            .modal-body {
                padding: 20px;
            }

            .tax-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }

            .tax-item span {
                text-align: left;
            }

            /* Banka Modal Mobil Düzeltmeleri */
            .modal-content {
                margin: 10px;
                max-height: 90vh;
                overflow-y: auto;
            }

            .bank-accounts {
                gap: 15px;
            }

            .bank-account {
                border-radius: 8px;
            }

            .bank-header {
                padding: 12px 15px;
            }

            .bank-info {
                flex-direction: row;
                align-items: center;
                gap: 12px;
            }

            .bank-logo {
                width: 35px;
                height: 35px;
                flex-shrink: 0;
            }

            .bank-name {
                font-size: 1rem;
                line-height: 1.2;
            }

            .account-holder {
                font-size: 0.85rem;
                margin-top: 2px;
            }

            .accounts-list {
                padding: 15px;
                gap: 15px;
            }

            .account-item {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .account-details {
                width: 100%;
            }

            .iban-number {
                font-size: 0.95rem;
                font-weight: 600;
                color: var(--text-dark);
                word-break: break-all;
                line-height: 1.3;
                margin-bottom: 8px;
            }

            .account-info {
                display: flex;
                gap: 8px;
                margin-top: 5px;
            }

            .currency {
                background: #e3f2fd;
                color: #1976d2;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .copy-iban-btn {
                align-self: flex-end;
                width: 50px;
                height: 40px;
                border-radius: 6px;
                font-size: 0.9rem;
                padding: 8px;
                min-width: unset;
            }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="card-content">
            <!-- Profile Section -->
            <div class="profile-section">
                <img src="{{#if profil_foto}}{{profil_foto}}{{else}}https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg{{/if}}" alt="{{yetkili_adi}}" class="profile-image">
                
                <div class="profile-info">
                    {{#if yetkili_adi}}
                    <h1 class="profile-name">{{yetkili_adi}}</h1>
                    {{/if}}
                    {{#if firma_adi}}
                    <h2 class="company-name">{{firma_adi}}</h2>
                    {{/if}}
                    {{#if yetkili_pozisyon}}
                    <p class="profile-position">{{yetkili_pozisyon}}</p>
                    {{/if}}
                </div>
            </div>

            <!-- vCard Button -->
            <a href="/{{slug}}/vcard" class="vcard-button" target="_blank">
                <i class="fas fa-download"></i>
                Rehbere Ekle
            </a>

            <!-- Icons Grid - Ordered by Icon Order Settings -->
            <div class="icons-grid">
                <!-- Icons ordered by admin settings -->
                {{#each icon_order}}
                
                {{#ifEquals this.id 'paylas'}}
                <div class="icon-item">
                    <a href="#" onclick="openShareMenu(event)" class="icon-link icon-paylas">
                        <i class="{{this.icon}}"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                
                {{#ifEquals this.id 'qr'}}
                <div class="icon-item">
                    <a href="/{{../slug}}/qr" class="icon-link icon-qr" target="_blank">
                        <i class="{{this.icon}}"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                
                {{#ifEquals this.id 'instagram'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'instagram'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'facebook'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'facebook'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-facebook"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'twitter'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'twitter'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'linkedin'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'linkedin'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'youtube'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'youtube'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-youtube"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'tiktok'}}
                {{#each ../social_media}}
                {{#ifEquals this.platform 'tiktok'}}
                <div class="icon-item">
                    <a href="{{this.url}}" class="icon-link" target="_blank">
                        <i class="fab fa-tiktok"></i>
                    </a>
                    <span class="icon-label">{{this.label}}</span>
                </div>
                {{/ifEquals}}
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'telefon'}}
                {{#each ../communication_data.telefonlar}}
                <div class="icon-item">
                    <a href="tel:{{this.value}}" class="icon-link icon-telefon">
                        <i class="fas fa-phone"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}Telefon{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'eposta'}}
                {{#each ../communication_data.epostalar}}
                <div class="icon-item">
                    <a href="mailto:{{this.value}}" class="icon-link icon-email">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}E-posta{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'whatsapp'}}
                {{#each ../communication_data.whatsapplar}}
                <div class="icon-item">
                    <a href="https://wa.me/{{this.value}}" class="icon-link icon-whatsapp" target="_blank">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}WhatsApp{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'telegram'}}
                {{#each ../communication_data.telegramlar}}
                <div class="icon-item">
                    <a href="https://t.me/{{this.value}}" class="icon-link" target="_blank">
                        <i class="fab fa-telegram"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}Telegram{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'website'}}
                {{#each ../communication_data.websiteler}}
                <div class="icon-item">
                    <a href="{{this.value}}" class="icon-link icon-website" target="_blank">
                        <i class="fas fa-globe"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}Web Sitesi{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'harita'}}
                {{#each ../communication_data.haritalar}}
                <div class="icon-item">
                    <a href="{{this.value}}" class="icon-link icon-adres" target="_blank">
                        <i class="fas fa-map-marker-alt"></i>
                    </a>
                    <span class="icon-label">{{#if this.label}}{{this.label}}{{else}}Harita{{/if}}</span>
                </div>
                {{/each}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'katalog'}}
                {{#if ../katalog}}
                <div class="icon-item">
                    <a href="{{../katalog.url}}" class="icon-link" target="_blank">
                        <i class="fas fa-book"></i>
                    </a>
                    <span class="icon-label">{{../katalog.label}}</span>
                </div>
                {{/if}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'banka'}}
                {{#if ../bankaHesaplari}}
                <div class="icon-item">
                    <div class="icon-link" onclick="showBankModal()">
                        <i class="fas fa-university"></i>
                    </div>
                    <span class="icon-label">Banka Hesapları</span>
                </div>
                {{/if}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'vergi'}}
                {{#if ../tax}}
                <div class="icon-item">
                    <div class="icon-link" onclick="openTaxModal()">
                        <i class="fas fa-file-invoice"></i>
                    </div>
                    <span class="icon-label">{{../tax.label}}</span>
                </div>
                {{/if}}
                {{/ifEquals}}
                
                {{#ifEquals this.id 'hakkimizda'}}
                {{#if ../about}}
                <div class="icon-item">
                    <div class="icon-link" onclick="openAboutModal()">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <span class="icon-label">{{../about.label}}</span>
                </div>
                {{/if}}
                {{/ifEquals}}
                
                {{/each}}
            </div>

            <!-- YouTube Section -->
            {{#if youtube}}
            <div class="youtube-section">
                <a href="{{youtube}}" class="youtube-button" target="_blank">
                    <i class="fab fa-youtube"></i>
                    YouTube
                </a>
            </div>
            {{/if}}

            <!-- Company Logo -->
            {{#if firma_logo}}
            <div class="company-logo-section">
                <img src="{{firma_logo}}" alt="{{firma_adi}} Logo" class="company-logo">
            </div>
            {{/if}}
        </div>
    </div>

    <!-- Share Menu -->
    <div id="share-menu" style="display: none;">
        <div class="share-overlay" onclick="closeShareMenu()"></div>
        <div class="share-content">
            <h3>Paylaş</h3>
            <div class="share-buttons">
                <button onclick="shareToWhatsApp()">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
                <button onclick="shareToTwitter()">
                    <i class="fab fa-twitter"></i> Twitter
                </button>
                <button onclick="shareToFacebook()">
                    <i class="fab fa-facebook"></i> Facebook
                </button>
                <button onclick="copyLink()">
                    <i class="fas fa-copy"></i> Bağlantıyı Kopyala
                </button>
            </div>
            <button onclick="closeShareMenu()" class="close-btn">×</button>
        </div>
    </div>

    <!-- About Modal -->
    {{#if about}}
    <div class="modal-overlay" id="about-modal" onclick="closeModal('about-modal')">
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3>{{firma_hakkinda_baslik}}</h3>
                <button class="modal-close" onclick="closeModal('about-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <p>{{about.content}}</p>
            </div>
        </div>
    </div>
    {{/if}}

    <!-- Tax Modal -->
    {{#if tax}}
    <div class="modal-overlay" id="tax-modal" onclick="closeModal('tax-modal')">
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3>{{tax.label}}</h3>
                <button class="modal-close" onclick="closeModal('tax-modal')">&times;</button>
            </div>
            <div class="modal-body">
                {{#if tax.firma_unvan}}
                <div class="tax-item">
                    <strong>Firma Ünvanı:</strong>
                    <span>{{tax.firma_unvan}}</span>
                </div>
                {{/if}}
                {{#if tax.firma_vergi_no}}
                <div class="tax-item">
                    <strong>Vergi Numarası:</strong>
                    <span>{{tax.firma_vergi_no}}</span>
                </div>
                {{/if}}
                {{#if tax.vergi_dairesi}}
                <div class="tax-item">
                    <strong>Vergi Dairesi:</strong>
                    <span>{{tax.vergi_dairesi}}</span>
                </div>
                {{/if}}
            </div>
        </div>
    </div>
    {{/if}}

    <!-- Bank Modal -->
    {{#if bankaHesaplari}}
    <div class="modal-overlay" id="bank-modal" onclick="closeModal('bank-modal')">
        <div class="modal-content" onclick="event.stopPropagation()">
            <div class="modal-header">
                <h3>Banka Hesapları</h3>
                <button class="modal-close" onclick="closeModal('bank-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="bank-accounts">
                    {{#each bankaHesaplari}}
                    <div class="bank-account">
                        <div class="bank-header">
                            <div class="bank-info">
                                {{#if this.banka_logo}}
                                <img src="{{this.banka_logo}}" alt="{{this.banka_adi}}" class="bank-logo">
                                {{/if}}
                                <div>
                                    <div class="bank-name">{{this.banka_adi}}</div>
                                    {{#if this.hesap_sahibi}}
                                    <div class="account-holder">{{this.hesap_sahibi}}</div>
                                    {{/if}}
                                </div>
                            </div>
                        </div>
                        <div class="accounts-list">
                            {{#each this.hesaplar}}
                            <div class="account-item">
                                <div class="account-details">
                                    <div class="iban-number">{{this.iban}}</div>
                                    <div class="account-info">
                                        {{#if this.para_birimi}}
                                        <span class="currency">{{this.para_birimi}}</span>
                                        {{/if}}
                                        {{#if this.hesap_turu}}
                                        <span class="account-type">{{this.hesap_turu}}</span>
                                        {{/if}}
                                    </div>
                                </div>
                                <button class="copy-iban-btn" onclick="copyIban('{{this.iban}}', this)">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            {{/each}}
                        </div>
                    </div>
                    {{/each}}
                </div>
            </div>
        </div>
    </div>
    {{/if}}

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const shareMenu = document.getElementById('share-menu');
            
            // Global functions
            window.openShareMenu = function openShareMenu(event) {
                event.preventDefault();
                event.stopPropagation();
                const menu = document.getElementById('share-menu');
                if (menu) {
                    menu.style.display = 'block';
                    menu.style.bottom = '0px';
                }
            }

            window.closeShareMenu = function closeShareMenu() {
                const menu = document.getElementById('share-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            }

            // Share functions
            window.shareToWhatsApp = function() {
                const url = window.location.href;
                const text = encodeURIComponent('{{firma_adi}} - Dijital Kartvizit: ' + url);
                window.open('https://wa.me/?text=' + text, '_blank');
            }

            window.shareToTwitter = function() {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('{{firma_adi}} - Dijital Kartvizit');
                window.open('https://twitter.com/intent/tweet?text=' + text + '&url=' + url, '_blank');
            }

            window.shareToFacebook = function() {
                const url = encodeURIComponent(window.location.href);
                window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
            }

            window.shareToMessenger = function() {
                const url = encodeURIComponent(window.location.href);
                window.open('https://www.messenger.com/t/?link=' + url, '_blank');
            }

            window.shareToEmail = function() {
                const url = window.location.href;
                const subject = encodeURIComponent('{{firma_adi}} - Dijital Kartvizit');
                const body = encodeURIComponent('{{firma_adi}} dijital kartvizitini inceleyin: ' + url);
                window.open('mailto:?subject=' + subject + '&body=' + body, '_blank');
            }

            window.copyLink = function copyLink() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                // Visual feedback
                const button = document.querySelector('.copy-link-button');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                button.style.color = '#4CAF50';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.color = '';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const button = document.querySelector('.copy-link-button');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
                button.style.color = '#4CAF50';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.color = '';
                }, 2000);
            });
        }

        // Modal Functions
        window.openAboutModal = function() {
            document.getElementById('about-modal').classList.add('open');
        }

        window.openTaxModal = function() {
            document.getElementById('tax-modal').classList.add('open');
        }

        window.showBankModal = function() {
            const modal = document.getElementById('bank-modal');
            if (modal) {
                modal.classList.add('open');
            }
        }

        window.closeModal = function(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('open');
            }
        }

        window.copyIban = function(iban, button) {
            navigator.clipboard.writeText(iban).then(() => {
                // Visual feedback
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = iban;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const originalHtml = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = originalHtml;
                    button.classList.remove('copied');
                }, 2000);
            });
        }

        // Close share menu with Escape key and modals
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeShareMenu();
                // Close any open modals
                const modals = document.querySelectorAll('.modal-overlay.open');
                modals.forEach(modal => modal.classList.remove('open'));
            }
        });
        
        }); // End of DOMContentLoaded
    </script>
</body>
</html>`;