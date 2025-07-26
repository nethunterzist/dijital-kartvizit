describe('Kartvizit Fonksiyonları Tests', () => {
  let testFirma;

  before(() => {
    // Test için bir kartvizit oluştur
    cy.adminLogin();
    cy.createKartvizit({
      firmaAdi: 'Fonksiyon Test Firma',
      yetkiliAdi: 'Test Yetkili',
      telefon: '05551234567',
      email: 'test@example.com',
      adres: 'Test Adres, Test Mahallesi'
    }).then(firma => {
      testFirma = firma;
    });
  });

  beforeEach(() => {
    // Her test öncesi kartvizit sayfasına git
    cy.adminLogin();
    cy.visit('/admin/firmalar');
    cy.contains(testFirma.firmaAdi).parent().within(() => {
      cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
        .first()
        .click();
    });
  });

  describe('VCard (Rehbere Ekle) Fonksiyonu', () => {
    it('VCard butonu görünür olmalı', () => {
      // VCard butonunu bul
      cy.get('button:contains("Rehbere"), a:contains("Rehbere"), button:contains("VCard"), a:contains("VCard"), [data-testid="vcard-button"]')
        .should('be.visible');
    });

    it('VCard butonuna tıklandığında dosya indirme işlemi başlamalı', () => {
      // Download işlemini yakalamak için intercept kullan
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      // VCard butonuna tıkla
      cy.get('button:contains("Rehbere"), a:contains("Rehbere"), button:contains("VCard"), a:contains("VCard"), [data-testid="vcard-button"]')
        .first()
        .click();

      // Download başlatılmış olmalı (window.open veya direct download)
      cy.get('@windowOpen').should('have.been.called').or(() => {
        // Alternatif: direct link download kontrol et
        cy.get('a[download], a[href*=".vcf"]').should('exist');
      });
    });

    it('VCard dosyası doğru içeriğe sahip olmalı', () => {
      // VCard API endpoint'ini test et
      cy.request('GET', '/api/sayfalar/test-slug/vcard').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('text/vcard');
        
        const vcard = response.body;
        expect(vcard).to.include('BEGIN:VCARD');
        expect(vcard).to.include('END:VCARD');
        expect(vcard).to.include(testFirma.yetkiliAdi);
        expect(vcard).to.include(testFirma.telefon);
        expect(vcard).to.include(testFirma.email);
      });
    });

    it('VCard butonunda loading state gösterilmeli', () => {
      // Network delay simüle et
      cy.intercept('GET', '**/vcard', { delay: 2000 }).as('vcardRequest');
      
      cy.get('button:contains("Rehbere"), a:contains("Rehbere"), [data-testid="vcard-button"]')
        .first()
        .click();
      
      // Loading state kontrol et (spinner, disabled button, vs.)
      cy.get('button:contains("Rehbere"), [data-testid="vcard-button"]')
        .should('have.attr', 'disabled').or('contain', 'loading').or('have.class', 'loading');
    });

    it('VCard hata durumunda uygun mesaj göstermeli', () => {
      // API hatasını simüle et
      cy.intercept('GET', '**/vcard', { statusCode: 500 }).as('vcardError');
      
      cy.get('button:contains("Rehbere"), a:contains("Rehbere"), [data-testid="vcard-button"]')
        .first()
        .click();
      
      // Hata mesajı görünmeli
      cy.contains('hata', { matchCase: false, timeout: 5000 }).should('be.visible').or(() => {
        cy.contains('başarısız', { matchCase: false }).should('be.visible');
      });
    });
  });

  describe('QR Kod Fonksiyonu', () => {
    it('QR kod butonu görünür olmalı', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .should('be.visible');
    });

    it('QR kod butonuna tıklandığında modal/popup açılmalı', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // Modal/popup açılmış olmalı
      cy.get('[data-testid="qr-modal"], .modal, .popup, [role="dialog"]')
        .should('be.visible');
    });

    it('QR kod görseli yüklenmeli', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // QR kod görseli görünür olmalı
      cy.get('img[alt*="QR"], canvas, svg, [data-testid="qr-image"]', { timeout: 10000 })
        .should('be.visible');
    });

    it('QR kod API endpoint doğru çalışmalı', () => {
      // QR kod API'sini test et
      cy.request('GET', '/api/qr-codes/test-slug').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('image/');
      });
    });

    it('QR kod modalı kapatılabilmeli', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // Modal açılmış olmalı
      cy.get('[data-testid="qr-modal"], .modal, .popup, [role="dialog"]')
        .should('be.visible');
      
      // Kapatma butonunu bul ve tıkla
      cy.get('button:contains("×"), button:contains("Kapat"), button[aria-label="Close"], [data-testid="close-modal"]')
        .first()
        .click();
      
      // Modal kapanmış olmalı
      cy.get('[data-testid="qr-modal"], .modal, .popup, [role="dialog"]')
        .should('not.be.visible');
    });

    it('QR kod ESC tuşu ile kapatılabilmeli', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // ESC tuşuna bas
      cy.get('body').type('{esc}');
      
      // Modal kapanmış olmalı
      cy.get('[data-testid="qr-modal"], .modal, .popup, [role="dialog"]')
        .should('not.be.visible');
    });

    it('QR kod modalında download/paylaşım seçenekleri olmalı', () => {
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // Download/paylaşım butonları kontrol et
      cy.get('body').then($body => {
        const hasDownload = $body.find('button:contains("İndir"), a:contains("İndir"), [download]').length > 0;
        const hasShare = $body.find('button:contains("Paylaş"), a:contains("Paylaş")').length > 0;
        
        if (hasDownload || hasShare) {
          cy.get('button:contains("İndir"), a:contains("İndir"), button:contains("Paylaş"), a:contains("Paylaş")')
            .should('be.visible');
        }
      });
    });

    it('QR kod loading state göstermeli', () => {
      // Network delay simüle et
      cy.intercept('GET', '**/qr-codes/**', { delay: 2000 }).as('qrRequest');
      
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // Loading state kontrol et
      cy.get('[data-testid="qr-loading"], .loading, .spinner')
        .should('be.visible');
    });

    it('QR kod hata durumunda uygun mesaj göstermeli', () => {
      // QR API hatasını simüle et
      cy.intercept('GET', '**/qr-codes/**', { statusCode: 500 }).as('qrError');
      
      cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
        .first()
        .click();
      
      // Hata mesajı görünmeli
      cy.contains('hata', { matchCase: false, timeout: 5000 }).should('be.visible').or(() => {
        cy.contains('yüklen', { matchCase: false }).should('be.visible');
      });
    });
  });

  describe('Social Media Links', () => {
    it('Sosyal medya linkleri çalışmalı (varsa)', () => {
      // Sosyal medya linklerini kontrol et
      cy.get('body').then($body => {
        const socialLinks = $body.find('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"], a[href*="whatsapp"]');
        
        if (socialLinks.length > 0) {
          socialLinks.each((index, link) => {
            cy.wrap(link)
              .should('have.attr', 'href')
              .and('not.be.empty');
            
            // External links new tab'da açılmalı
            cy.wrap(link)
              .should('have.attr', 'target', '_blank')
              .or('have.attr', 'rel').and('include', 'noopener');
          });
        }
      });
    });

    it('WhatsApp link doğru format olmalı (varsa)', () => {
      cy.get('body').then($body => {
        const whatsappLink = $body.find('a[href*="whatsapp"], a[href*="wa.me"]');
        
        if (whatsappLink.length > 0) {
          cy.wrap(whatsappLink.first())
            .should('have.attr', 'href')
            .and('match', /(?:whatsapp|wa\.me)/);
        }
      });
    });

    it('Email link mailto formatında olmalı', () => {
      cy.get(`a[href*="${testFirma.email}"]`)
        .should('have.attr', 'href')
        .and('include', 'mailto:');
    });

    it('Telefon link tel formatında olmalı', () => {
      cy.get(`a[href*="${testFirma.telefon}"]`)
        .should('have.attr', 'href')
        .and('include', 'tel:');
    });
  });

  describe('Diğer Fonksiyonlar', () => {
    it('Harita/Lokasyon linki çalışmalı (varsa)', () => {
      cy.get('body').then($body => {
        const mapLinks = $body.find('a[href*="maps"], a[href*="google"], button:contains("Harita"), a:contains("Harita")');
        
        if (mapLinks.length > 0) {
          cy.wrap(mapLinks.first())
            .should('be.visible')
            .click();
          
          // Yeni tab açılmış olmalı
          cy.window().its('open').should('have.been.called');
        }
      });
    });

    it('Yön tarifi linki çalışmalı (varsa)', () => {
      cy.get('body').then($body => {
        const directionLinks = $body.find('a:contains("Yön"), button:contains("Yön"), a[href*="directions"]');
        
        if (directionLinks.length > 0) {
          cy.wrap(directionLinks.first())
            .should('be.visible')
            .and('have.attr', 'href');
        }
      });
    });

    it('Paylaşım fonksiyonları çalışmalı (varsa)', () => {
      cy.get('body').then($body => {
        const shareButtons = $body.find('button:contains("Paylaş"), a:contains("Paylaş"), [data-testid="share"]');
        
        if (shareButtons.length > 0) {
          cy.wrap(shareButtons.first())
            .should('be.visible')
            .click();
          
          // Share modal/menu açılmış olmalı
          cy.get('.share-modal, .share-menu, [data-testid="share-modal"]')
            .should('be.visible');
        }
      });
    });

    it('Tüm butonlar erişilebilir olmalı', () => {
      // Butonların keyboard ile erişilebilir olduğunu kontrol et
      cy.get('button, a[role="button"]').each($button => {
        cy.wrap($button)
          .should('not.have.attr', 'disabled')
          .focus()
          .should('be.focused');
      });
    });
  });

  describe('Mobile Fonksiyonlar', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });

    it('Mobile\'da VCard fonksiyonu çalışmalı', () => {
      cy.testVCardDownload();
    });

    it('Mobile\'da QR kod fonksiyonu çalışmalı', () => {
      cy.testQRCode();
    });

    it('Mobile\'da telefon araması başlatılabilmeli', () => {
      cy.get(`a[href*="tel:${testFirma.telefon}"]`)
        .should('be.visible')
        .click();
      
      // Mobile'da tel: link'i sistem tarafından handle edilir
    });

    it('Mobile\'da email uygulaması açılabilmeli', () => {
      cy.get(`a[href*="mailto:${testFirma.email}"]`)
        .should('be.visible')
        .click();
      
      // Mobile'da mailto: link'i sistem tarafından handle edilir
    });
  });
});