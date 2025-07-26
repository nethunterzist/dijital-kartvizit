describe('Herkese Açık Kartvizit Sayfası Tests', () => {
  let createdFirma;

  before(() => {
    // Test için bir kartvizit oluştur
    cy.adminLogin();
    cy.createKartvizit({
      firmaAdi: 'E2E Test Firma',
      yetkiliAdi: 'E2E Test Yetkili',
      telefon: '05551234567',
      email: 'e2e@test.com',
      adres: 'E2E Test Adres'
    }).then(firma => {
      createdFirma = firma;
    });
  });

  describe('Kartvizit Sayfa Erişimi', () => {
    it('Oluşturulan kartvizit herkese açık sayfasına erişilebilmeli', () => {
      // Admin panelinden firma listesine git
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      // Oluşturulan firmayı bul ve public linkini al
      cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
      
      // Public link butonunu bul ve tıkla
      cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
        .first()
        .then($link => {
          const href = $link.attr('href');
          expect(href).to.exist;
          
          // Public sayfaya git
          cy.visit(href);
          
          // URL'nin slug formatında olduğunu kontrol et
          cy.url().should('match', /\/[a-zA-Z0-9-]+$/);
        });
    });

    it('Kartvizit sayfası doğru bilgileri göstermeli', () => {
      // Önce slug'ı al
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Firma bilgileri görünür olmalı
      cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
      cy.contains(createdFirma.yetkiliAdi).should('be.visible');
      cy.contains(createdFirma.telefon).should('be.visible');
      cy.contains(createdFirma.email).should('be.visible');
      cy.contains(createdFirma.adres).should('be.visible');
    });

    it('Sayfa meta bilgileri doğru olmalı', () => {
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Page title kontrol et
      cy.title().should('include', createdFirma.firmaAdi);
      
      // Meta description varsa kontrol et
      cy.get('head meta[name="description"]').should('have.attr', 'content');
    });

    it('Olmayan slug ile 404 hatası dönmeli', () => {
      cy.request({
        url: '/nonexistent-slug-12345',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
  });

  describe('Responsive Design', () => {
    beforeEach(() => {
      // Test kartvizit sayfasına git
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
    });

    it('Mobile görünümde doğru görüntülenmeli', () => {
      cy.viewport('iphone-6');
      
      // Ana içerik görünür olmalı
      cy.contains(createdFirma.firmaAdi).should('be.visible');
      
      // Navigation/menu mobile uyumlu olmalı
      cy.get('nav, .navigation, .menu').should('be.visible');
    });

    it('Tablet görünümde doğru görüntülenmeli', () => {
      cy.viewport('ipad-2');
      
      cy.contains(createdFirma.firmaAdi).should('be.visible');
      cy.contains(createdFirma.telefon).should('be.visible');
    });

    it('Desktop görünümde doğru görüntülenmeli', () => {
      cy.viewport(1280, 720);
      
      cy.contains(createdFirma.firmaAdi).should('be.visible');
      cy.contains(createdFirma.email).should('be.visible');
    });
  });

  describe('Loading ve Performance', () => {
    it('Sayfa makul sürede yüklenmeli', () => {
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Ana içerik 5 saniye içinde yüklenmeli
      cy.contains(createdFirma.firmaAdi, { timeout: 5000 }).should('be.visible');
    });

    it('Loading state gösterilmeli (varsa)', () => {
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Loading indicator varsa test et
      cy.get('body').then($body => {
        if ($body.find('[data-testid="loading"], .loading, .spinner').length > 0) {
          cy.get('[data-testid="loading"], .loading, .spinner')
            .should('not.exist');
        }
      });
    });

    it('Console hataları olmamalı', () => {
      cy.adminLogin();
      cy.visit('/admin/firmalar', {
        onBeforeLoad(win) {
          cy.stub(win.console, 'error').as('consoleError');
        }
      });
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      cy.wait(3000);
      
      // Kritik console hatalarını kontrol et
      cy.get('@consoleError').should('not.have.been.calledWith', 
        Cypress.sinon.match(/error|failed|undefined/i));
    });
  });

  describe('SEO ve Accessibility', () => {
    beforeEach(() => {
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
    });

    it('Temel SEO etiketleri mevcut olmalı', () => {
      // Title tag
      cy.get('head title').should('exist');
      
      // Meta description
      cy.get('head meta[name="description"]').should('exist');
      
      // Meta viewport
      cy.get('head meta[name="viewport"]').should('exist');
    });

    it('Temel accessibility standartlarına uygun olmalı', () => {
      // Ana başlık h1 olmalı
      cy.get('h1').should('contain', createdFirma.firmaAdi);
      
      // Alt metinler varsa kontrol et
      cy.get('img').each($img => {
        cy.wrap($img).should('have.attr', 'alt');
      });
      
      // Link'ler erişilebilir olmalı
      cy.get('a').each($link => {
        const text = $link.text().trim();
        const ariaLabel = $link.attr('aria-label');
        const title = $link.attr('title');
        
        expect(text || ariaLabel || title).to.have.length.greaterThan(0);
      });
    });

    it('Klavye navigasyonu çalışmalı', () => {
      // Tab ile gezinilebilmeli
      cy.get('body').tab();
      cy.focused().should('be.visible');
      
      // Enter ile tıklanabilir elementler aktif olmalı
      cy.get('button, a').first().focus().type('{enter}');
    });
  });

  describe('Error Handling', () => {
    it('Network hatalarında graceful degradation olmalı', () => {
      // Network'ü kes
      cy.intercept('GET', '/api/**', { forceNetworkError: true }).as('networkError');
      
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Hata durumunda bile temel içerik görünür olmalı
      cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
    });

    it('JavaScript hataları sayfa çökmesine neden olmamalı', () => {
      cy.adminLogin();
      cy.visit('/admin/firmalar');
      
      cy.window().then(win => {
        // Kasıtlı bir JavaScript hatası oluştur
        win.eval('throw new Error("Test error")');
      });
      
      cy.contains(createdFirma.firmaAdi).parent().within(() => {
        cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
          .first()
          .click();
      });
      
      // Sayfa hala çalışmalı
      cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
    });
  });
});