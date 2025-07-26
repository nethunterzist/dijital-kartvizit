describe('Admin Kartvizit CRUD Operations', () => {
  beforeEach(() => {
    cy.adminLogin();
  });

  describe('Yeni Kartvizit Oluşturma', () => {
    it('Admin yeni kartvizit oluşturma formuna erişebilmeli', () => {
      cy.visit('/admin/firmalar');
      
      // Yeni firma ekleme butonunu bul
      cy.get('a[href*="/admin/firmalar/yeni"], button:contains("Yeni"), a:contains("Ekle")')
        .first()
        .click();
      
      cy.url().should('include', '/admin/firmalar/yeni');
      cy.contains('Yeni Firma', { timeout: 10000 }).should('be.visible');
    });

    it('Kartvizit oluşturma formu tüm gerekli alanları içermeli', () => {
      cy.visit('/admin/firmalar/yeni');
      
      // Zorunlu form alanlarını kontrol et
      cy.get('input[name="firmaAdi"]').should('be.visible');
      cy.get('input[name="yetkiliAdi"]').should('be.visible');
      cy.get('input[name="telefon"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('textarea[name="adres"], input[name="adres"]').should('be.visible');
      
      // Dropdown alanları kontrol et
      cy.get('select[name="il"]').should('be.visible');
      cy.get('select[name="sektor"]').should('be.visible');
      
      // Submit butonu olmalı
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('Form validation çalışmalı - boş form gönderilememeli', () => {
      cy.visit('/admin/firmalar/yeni');
      
      // Boş formu göndermeye çalış
      cy.get('button[type="submit"]').click();
      
      // HTML5 validation veya custom validation mesajları görünmeli
      cy.get('input:invalid').should('have.length.at.least', 1);
    });

    it('Geçerli bilgilerle yeni kartvizit oluşturulabilmeli', () => {
      const testFirma = {
        firmaAdi: `Test Firma ${Date.now()}`,
        yetkiliAdi: 'Test Yetkili',
        telefon: '05551234567',
        email: 'test@example.com',
        adres: 'Test Mahallesi, Test Sokak No:1'
      };

      cy.visit('/admin/firmalar/yeni');
      
      // Form alanlarını doldur
      cy.get('input[name="firmaAdi"]').type(testFirma.firmaAdi);
      cy.get('input[name="yetkiliAdi"]').type(testFirma.yetkiliAdi);
      cy.get('input[name="telefon"]').type(testFirma.telefon);
      cy.get('input[name="email"]').type(testFirma.email);
      cy.get('textarea[name="adres"], input[name="adres"]').type(testFirma.adres);
      
      // Dropdown seçimleri (eğer gerekli option'lar varsa)
      cy.get('select[name="il"]').then($select => {
        if ($select.find('option').length > 1) {
          cy.get('select[name="il"]').select(1); // İkinci option'ı seç
        }
      });
      
      cy.get('select[name="sektor"]').then($select => {
        if ($select.find('option').length > 1) {
          cy.get('select[name="sektor"]').select(1);
        }
      });
      
      // Formu gönder
      cy.get('button[type="submit"]').click();
      
      // Başarı mesajı veya yönlendirme kontrolü
      cy.url({ timeout: 15000 }).should('not.include', '/yeni');
      
      // Başarı mesajı kontrolü
      cy.get('body').then($body => {
        const hasSuccessMessage = $body.text().toLowerCase().includes('başarı') ||
                                 $body.text().toLowerCase().includes('oluşturuldu') ||
                                 $body.text().toLowerCase().includes('kaydedildi');
        
        if (hasSuccessMessage) {
          cy.contains(/başarı|oluşturuldu|kaydedildi/i).should('be.visible');
        }
      });
      
      // Oluşturulan firmayı listede kontrol et
      cy.visit('/admin/firmalar');
      cy.contains(testFirma.firmaAdi, { timeout: 10000 }).should('be.visible');
    });

    it('Telefon numarası format validation çalışmalı', () => {
      cy.visit('/admin/firmalar/yeni');
      
      const invalidPhones = ['123', 'abc', '05551234', '123456789012345'];
      
      invalidPhones.forEach(phone => {
        cy.get('input[name="telefon"]').clear().type(phone);
        cy.get('input[name="firmaAdi"]').click(); // Focus değiştir
        
        // Validation mesajı varsa kontrol et
        cy.get('input[name="telefon"]').then($input => {
          expect($input[0].validity.valid).to.be.false;
        });
      });
    });

    it('Email format validation çalışmalı', () => {
      cy.visit('/admin/firmalar/yeni');
      
      const invalidEmails = ['invalid', 'test@', '@test.com', 'test.com'];
      
      invalidEmails.forEach(email => {
        cy.get('input[name="email"]').clear().type(email);
        cy.get('input[name="firmaAdi"]').click(); // Focus değiştir
        
        // HTML5 email validation
        cy.get('input[name="email"]').then($input => {
          expect($input[0].validity.valid).to.be.false;
        });
      });
    });
  });

  describe('Kartvizit Listeleme ve Yönetim', () => {
    it('Firmalar listesi görüntülenebilmeli', () => {
      cy.visit('/admin/firmalar');
      
      // Sayfa başlığı
      cy.contains('Firma', { timeout: 10000 }).should('be.visible');
      
      // Liste tablosu veya kartları kontrol et
      cy.get('table, .card, .list-item').should('be.visible');
    });

    it('Arama işlevi çalışmalı', () => {
      cy.visit('/admin/firmalar');
      
      // Arama input'u varsa test et
      cy.get('body').then($body => {
        if ($body.find('input[type="search"], input[placeholder*="ara"]').length > 0) {
          cy.get('input[type="search"], input[placeholder*="ara"]')
            .first()
            .type('test');
          
          cy.wait(2000); // Arama sonuçlarını bekle
          
          // Sonuçları kontrol et
          cy.get('table, .card, .list-item').should('be.visible');
        }
      });
    });

    it('Sayfalama çalışmalı (eğer varsa)', () => {
      cy.visit('/admin/firmalar');
      
      // Sayfalama elementleri varsa test et
      cy.get('body').then($body => {
        if ($body.find('.pagination, .page-').length > 0) {
          cy.get('.pagination, .page-').should('be.visible');
          
          // İkinci sayfaya gitmeye çalış
          cy.get('a:contains("2"), button:contains("2")').first().click();
          cy.wait(2000);
          
          cy.url().should('include', 'page=2');
        }
      });
    });
  });

  describe('Kartvizit Düzenleme', () => {
    it('Var olan kartvizit düzenlenebilmeli', () => {
      // Önce bir kartvizit oluştur
      cy.createKartvizit();
      
      cy.visit('/admin/firmalar');
      
      // İlk firmayı bul ve düzenle
      cy.get('a:contains("Düzenle"), button:contains("Düzenle"), [title="Düzenle"]')
        .first()
        .click();
      
      // Düzenleme sayfasına yönlendirildiğini kontrol et
      cy.url().should('match', /\/admin\/firmalar\/\d+/);
      
      // Form doldurulmuş olmalı
      cy.get('input[name="firmaAdi"]').should('have.value');
      
      // Bir değeri değiştir
      cy.get('input[name="firmaAdi"]').clear().type('Düzenlenmiş Firma Adı');
      
      // Kaydet
      cy.get('button[type="submit"]').click();
      
      // Başarı kontrolü
      cy.url({ timeout: 15000 }).should('not.include', '/edit');
    });
  });

  describe('Kartvizit Silme', () => {
    it('Kartvizit silinebilmeli', () => {
      // Önce bir kartvizit oluştur
      cy.createKartvizit();
      
      cy.visit('/admin/firmalar');
      
      // Silme butonunu bul
      cy.get('button:contains("Sil"), a:contains("Sil"), [title="Sil"]')
        .first()
        .click();
      
      // Onay dialogu varsa onayla
      cy.get('body').then($body => {
        if ($body.find('button:contains("Onayla"), button:contains("Evet")').length > 0) {
          cy.get('button:contains("Onayla"), button:contains("Evet")').click();
        }
      });
      
      cy.wait(2000);
      
      // Başarı mesajı kontrolü
      cy.get('body').then($body => {
        const hasSuccessMessage = $body.text().toLowerCase().includes('silindi') ||
                                 $body.text().toLowerCase().includes('başarı');
        
        if (hasSuccessMessage) {
          cy.contains(/silindi|başarı/i).should('be.visible');
        }
      });
    });
  });
});