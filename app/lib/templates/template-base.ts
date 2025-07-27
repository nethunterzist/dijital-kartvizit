// Template Base Structure - Tüm template'ler bu yapıyı takip etmeli

export interface TemplateStructure {
  // 1. HTML DOCTYPE ve HEAD
  doctype: string;
  head: {
    meta: string[];
    title: string;
    favicon: string;
    externalCSS: string[];
  };
  
  // 2. CSS Organizasyonu (sırayla)
  css: {
    reset: string;           // * { margin: 0; padding: 0; box-sizing: border-box; }
    htmlBody: string;        // html, body temel stiller
    mainContainer: string;   // .main-container
    cardContent: string;     // .card-content
    profileSection: string;  // .profile-container, .profile-image, .profile-placeholder
    companyInfo: string;     // .company-info, .company-name, .person-name, .position
    contactButton: string;   // .contact-button
    iconsSection: string;    // .icons-grid veya .icons-list
    iconCard: string;        // .icon-card veya .icon-item
    iconStyles: string;      // ikon renkleri ve efektler
    popupStyles: string;     // popup CSS'leri
    animations: string;      // keyframe animasyonlar
  };
  
  // 3. HTML Body Yapısı (sırayla)
  body: {
    mainContainer: string;
    cardContent: {
      profileContainer: string;
      companyInfo: string;
      iconsSection: string;
    };
    popups: {
      taxPopup: string;
      aboutPopup: string;
      bankPopup: string;
    };
  };
  
  // 4. JavaScript Fonksiyonları (standart)
  javascript: {
    popupFunctions: string;  // showTaxPopup, closeTaxPopup, vb.
    utilityFunctions: string; // copyToClipboard
  };
}

// Standart CSS Class İsimleri
export const STANDARD_CLASSES = {
  // Container
  mainContainer: 'main-container',
  cardContent: 'card-content',
  
  // Profile Section
  profileContainer: 'profile-container',
  profileImage: 'profile-image',
  profilePlaceholder: 'profile-placeholder',
  
  // Company Info
  companyInfo: 'company-info',
  companyName: 'company-name',
  personName: 'person-name',
  position: 'position',
  contactButton: 'contact-button',
  
  // Icons Section
  iconsGrid: 'icons-grid',      // Grid layout için
  iconsList: 'icons-list',      // Liste layout için
  iconCard: 'icon-card',        // Grid item için
  iconItem: 'icon-item',        // Liste item için
  iconWrapper: 'icon-wrapper',  // İkon container
  iconLabel: 'icon-label',      // İkon text
  
  // Popups
  popupOverlay: 'custom-popup-overlay',
  popupContent: 'custom-popup-content',
  popupClose: 'custom-popup-close',
  popupTitle: 'popup-title',
  
  // Specific Elements
  taxInfo: 'tax-info',
  aboutContent: 'about-content',
  bankAccountsList: 'bank-accounts-list',
  bankCard: 'bank-card',
  ibanText: 'iban-text',
  copyBtn: 'copy-btn'
};

// Standart JavaScript Fonksiyonları
export const STANDARD_JAVASCRIPT = `
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
function showBankPopup(e) {
    e.preventDefault();
    document.getElementById('bank-popup').style.display = 'flex';
}
function closeBankPopup() {
    document.getElementById('bank-popup').style.display = 'none';
}
function copyToClipboard(text, event) {
        event.preventDefault();
        if (!text) return;
        navigator.clipboard.writeText(text).then(function() {
            const btn = event.currentTarget;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#48bb78';
            setTimeout(() => { 
                btn.innerHTML = originalHTML;
                btn.style.background = btn.style.background.replace('#48bb78', '');
            }, 1000);
        });
    };
}
`;

// Standart Handlebars Değişkenleri
export const STANDARD_VARIABLES = [
  'firma_adi',
  'slug', 
  'yetkili_adi',
  'yetkili_pozisyon',
  'profil_foto',
  'firma_logo',
  'social_media',
  'communication',
  'katalog',
  'iban',
  'tax',
  'about'
];

// Standart HTML Yapısı
export const STANDARD_HTML_STRUCTURE = `
<div class="main-container">
    <div class="card-content">
        <!-- Profile Section -->
        <div class="profile-container">
            {{#if profil_foto}}
            <img src="{{profil_foto}}" class="profile-image" alt="{{firma_adi}}">
            {{else}}
            <div class="profile-placeholder">
                <!-- Template-specific placeholder content -->
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
                <!-- Template-specific button content -->
                Rehbere Ekle
            </a>
        </div>

            <!-- Icons Section -->
            <div class="icons-grid"> <!-- veya icons-list -->
                <!-- QR Kod - Her zaman ilk sırada -->
                <div class="icon-card"> <!-- veya icon-item -->
                    <a href="/{{slug}}/qr" target="_blank">
                        <!-- Template-specific icon -->
                        <span class="icon-label">QR Kod</span>
                    </a>
                </div>
                
                <!-- Sosyal Medya -->
                {{#if social_media}}
                    {{#each social_media}}
                    <div class="icon-card">
                        <a href="{{this.url}}" target="_blank">
                            <!-- Template-specific icon -->
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
                            <!-- Template-specific icon -->
                            <span class="icon-label">{{this.label}}</span>
                        </a>
                    </div>
                    {{/each}}
                {{/if}}

                <!-- Katalog -->
                {{#if katalog}}
                <div class="icon-card">
                    <a href="{{katalog.url}}" target="_blank">
                        <!-- Template-specific icon -->
                        <span class="icon-label">{{katalog.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Banka -->
                {{#if iban}}
                <div class="icon-card">
                    <a href="#" onclick="showBankPopup(event)">
                        <!-- Template-specific icon -->
                        <span class="icon-label">{{iban.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Vergi -->
                {{#if tax}}
                <div class="icon-card">
                    <a href="#" onclick="showTaxPopup(event)">
                        <!-- Template-specific icon -->
                        <span class="icon-label">{{tax.label}}</span>
                    </a>
                </div>
                {{/if}}
                
                <!-- Hakkımızda -->
                {{#if about}}
                <div class="icon-card">
                    <a href="#" onclick="showAboutPopup(event)">
                        <!-- Template-specific icon -->
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

<!-- Standart Popup'lar -->
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
                            {{#if bank.banka_logo}}
                                <img src="{{bank.banka_logo}}" alt="{{bank.banka_adi}}" style="width: 40px; height: 40px; object-fit: contain; margin-right: 15px;">
                            {{/if}}
                            <div>
                                <div style="font-weight: 600; font-size: 1.1rem;">{{bank.banka_adi}}</div>
                                <div style="font-size: 0.9rem; opacity: 0.8;">{{bank.hesap_sahibi}}</div>
                            </div>
                        </div>
                        {{#each bank.hesaplar}}
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <span style="display: inline-flex; width: 35px; height: 35px; border-radius: 50%; font-weight: bold; align-items: center; justify-content: center; margin-right: 10px; font-size: 0.9rem;">
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
                                <button class="copy-btn" onclick="copyToClipboard('{{this.iban}}', event)">Kopyala</button>
                            </div>
                        {{/each}}
                    </div>
                {{/each}}
            {{else}}
                <div style="text-align:center; padding: 40px;">Tanımlı banka hesabı bulunamadı.</div>
            {{/if}}
        </div>
    </div>
</div>
`;
