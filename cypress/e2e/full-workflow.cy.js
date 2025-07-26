describe('Tam İş Akışı - End-to-End Workflow', () => {
  let createdFirma;
  
  it('Tam admin akışı: Giriş → Kartvizit Oluştur → Görüntüle → Fonksiyon Test', () => {
    // 1. Admin Girişi
    cy.visit('/login');
    
    cy.get('input[name="username"]').type(Cypress.env('ADMIN_USERNAME'));
    cy.get('input[name="password"]').type(Cypress.env('ADMIN_PASSWORD'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/admin');
    cy.contains('Admin Panel', { timeout: 10000 }).should('be.visible');
    
    // 2. Firmalar Sayfasına Git
    cy.visit('/admin/firmalar');
    cy.contains('Firma', { timeout: 10000 }).should('be.visible');
    
    // 3. Yeni Firma Oluştur
    cy.get('a[href*="/admin/firmalar/yeni"], button:contains("Yeni"), a:contains("Ekle")')
      .first()
      .click();
    
    cy.url().should('include', '/admin/firmalar/yeni');
    
    // Unique firma bilgileri oluştur
    const timestamp = Date.now();
    createdFirma = {
      firmaAdi: `E2E Workflow Test ${timestamp}`,
      yetkiliAdi: 'E2E Yetkili',
      telefon: '05551234567',
      email: 'e2e-workflow@test.com',
      adres: 'E2E Test Adres, Test Mahalle'
    };
    
    // Form doldur
    cy.get('input[name="firmaAdi"]').type(createdFirma.firmaAdi);
    cy.get('input[name="yetkiliAdi"]').type(createdFirma.yetkiliAdi);
    cy.get('input[name="telefon"]').type(createdFirma.telefon);
    cy.get('input[name="email"]').type(createdFirma.email);
    cy.get('textarea[name="adres"], input[name="adres"]').type(createdFirma.adres);
    
    // Dropdown'ları doldur (varsa)
    cy.get('select[name="il"]').then($select => {
      if ($select.find('option').length > 1) {
        cy.get('select[name="il"]').select(1);
      }
    });
    
    cy.get('select[name="sektor"]').then($select => {
      if ($select.find('option').length > 1) {
        cy.get('select[name="sektor"]').select(1);
      }
    });
    
    // Formu gönder
    cy.get('button[type="submit"]').click();
    
    // Başarı kontrolü
    cy.url({ timeout: 15000 }).should('not.include', '/yeni');
    
    // 4. Oluşturulan Firmayı Listede Bul
    cy.visit('/admin/firmalar');
    cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
    
    // 5. Public Sayfaya Git
    cy.contains(createdFirma.firmaAdi).parent().within(() => {
      cy.get('a:contains("Görüntüle"), a:contains("Link"), [title="Görüntüle"]')
        .first()
        .click();
    });
    
    // 6. Public Sayfa Kontrolü
    cy.url().should('match', /\/[a-zA-Z0-9-]+$/);
    cy.contains(createdFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
    cy.contains(createdFirma.yetkiliAdi).should('be.visible');
    cy.contains(createdFirma.telefon).should('be.visible');
    cy.contains(createdFirma.email).should('be.visible');
    
    // 7. VCard Fonksiyon Testi
    cy.get('button:contains("Rehbere"), a:contains("Rehbere"), button:contains("VCard"), [data-testid="vcard-button"]')
      .should('be.visible')
      .first()
      .click();
    
    cy.wait(2000); // Download işlemini bekle
    
    // 8. QR Kod Fonksiyon Testi
    cy.get('button:contains("QR"), a:contains("QR"), [data-testid="qr-button"]')
      .should('be.visible')
      .first()
      .click();
    
    // QR Modal açılmış olmalı
    cy.get('[data-testid="qr-modal"], .modal, .popup, [role="dialog"]')
      .should('be.visible');
    
    // QR kod görseli yüklenmeli
    cy.get('img[alt*="QR"], canvas, svg, [data-testid="qr-image"]', { timeout: 10000 })
      .should('be.visible');
    
    // QR modalını kapat
    cy.get('button:contains("×"), button:contains("Kapat"), button[aria-label="Close"], [data-testid="close-modal"]')
      .first()
      .click();
    
    // 9. Responsive Test
    cy.viewport('iphone-6');
    cy.contains(createdFirma.firmaAdi).should('be.visible');
    
    cy.viewport('ipad-2');
    cy.contains(createdFirma.firmaAdi).should('be.visible');
    
    cy.viewport(1280, 720);
    cy.contains(createdFirma.firmaAdi).should('be.visible');
    
    // 10. Link Fonksiyon Testleri
    // Email link
    cy.get(`a[href*="mailto:${createdFirma.email}"]`)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'mailto:');
    
    // Telefon link
    cy.get(`a[href*="tel:${createdFirma.telefon}"]`)
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', 'tel:');
    
    // 11. SEO ve Meta Kontrolleri
    cy.title().should('include', createdFirma.firmaAdi);
    cy.get('head meta[name="description"]').should('have.attr', 'content');
    cy.get('head meta[name="viewport"]').should('exist');
    
    // 12. Admin Paneline Geri Dön ve Düzenleme Testi
    cy.visit('/admin/firmalar');
    
    cy.contains(createdFirma.firmaAdi).parent().within(() => {
      cy.get('a:contains("Düzenle"), button:contains("Düzenle"), [title="Düzenle"]')
        .first()
        .click();
    });
    
    // Düzenleme formunda bilgiler dolu olmalı
    cy.get('input[name="firmaAdi"]').should('have.value', createdFirma.firmaAdi);
    
    // Bir değeri değiştir
    const updatedName = `${createdFirma.firmaAdi} - Güncellendi`;
    cy.get('input[name="firmaAdi"]').clear().type(updatedName);
    
    // Kaydet
    cy.get('button[type="submit"]').click();
    
    // Güncellendiğini kontrol et
    cy.visit('/admin/firmalar');
    cy.contains(updatedName, { timeout: 10000 }).should('be.visible');
    
    // 13. Test Temizliği - Oluşturulan firmayı sil
    cy.contains(updatedName).parent().within(() => {
      cy.get('button:contains("Sil"), a:contains("Sil"), [title="Sil"]')
        .first()
        .click();
    });
    
    // Onay varsa onayla
    cy.get('body').then($body => {
      if ($body.find('button:contains("Onayla"), button:contains("Evet")').length > 0) {
        cy.get('button:contains("Onayla"), button:contains("Evet")').click();
      }
    });
    
    cy.wait(2000);
    
    // Silindiğini kontrol et
    cy.get('body').should('not.contain', updatedName);
  });

  it('Performans testi - Sayfa yükleme süreleri', () => {
    cy.visit('/login', {
      onBeforeLoad: (win) => {
        win.performance.mark('login-start');
      },
      onLoad: (win) => {
        win.performance.mark('login-end');
        win.performance.measure('login-load', 'login-start', 'login-end');
      }
    });
    
    // Login sayfası 3 saniyede yüklenmeli
    cy.window().its('performance').invoke('getEntriesByName', 'login-load')
      .then((measures) => {
        expect(measures[0].duration).to.be.lessThan(3000);
      });
    
    // Admin login
    cy.adminLogin();
    
    // Admin panel performance
    cy.visit('/admin', {
      onBeforeLoad: (win) => {
        win.performance.mark('admin-start');
      },
      onLoad: (win) => {
        win.performance.mark('admin-end');
        win.performance.measure('admin-load', 'admin-start', 'admin-end');
      }
    });
    
    cy.window().its('performance').invoke('getEntriesByName', 'admin-load')
      .then((measures) => {
        expect(measures[0].duration).to.be.lessThan(5000);
      });
  });

  it('Güvenlik testi - Unauthorized erişim', () => {
    // Çıkış yap
    cy.clearCookies();
    cy.clearLocalStorage();
    
    // Admin sayfalarına erişim engellenmeli
    const protectedRoutes = [
      '/admin',
      '/admin/firmalar',
      '/admin/firmalar/yeni',
      '/admin/ayarlar'
    ];
    
    protectedRoutes.forEach(route => {
      cy.visit(route);
      cy.url().should('include', '/login');
    });
  });

  it('Error handling testi', () => {
    cy.adminLogin();
    
    // Network hatası simülasyonu
    cy.intercept('GET', '/api/**', { forceNetworkError: true }).as('networkError');
    
    cy.visit('/admin/firmalar');
    
    // Sayfa hala kullanılabilir olmalı
    cy.get('body').should('be.visible');
    
    // Hata mesajı gösterilmeli (varsa)
    cy.get('body').then($body => {
      const hasErrorMessage = $body.text().toLowerCase().includes('hata') ||
                             $body.text().toLowerCase().includes('error') ||
                             $body.text().toLowerCase().includes('bağlantı');
      
      if (hasErrorMessage) {
        cy.contains(/hata|error|bağlantı/i).should('be.visible');
      }
    });
  });
});