describe('Admin Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Admin Login Process', () => {
    it('Admin paneline erişim için login sayfasına yönlendirilmeli', () => {
      cy.visit('/admin');
      cy.url().should('include', '/login');
      cy.contains('Giriş').should('be.visible');
    });

    it('Başarılı admin girişi yapabilmeli', () => {
      cy.visit('/login');
      
      // Form elementlerinin varlığını kontrol et
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
      
      // Geçerli credentials ile giriş yap
      cy.get('input[name="username"]').type(Cypress.env('ADMIN_USERNAME'));
      cy.get('input[name="password"]').type(Cypress.env('ADMIN_PASSWORD'));
      cy.get('button[type="submit"]').click();
      
      // Admin paneline yönlendirildiğini doğrula
      cy.url().should('include', '/admin');
      cy.contains('Admin Panel', { timeout: 10000 }).should('be.visible');
    });

    it('Hatalı kullanıcı adı ile giriş yapamamalı', () => {
      cy.visit('/login');
      
      cy.get('input[name="username"]').type('wronguser');
      cy.get('input[name="password"]').type(Cypress.env('ADMIN_PASSWORD'));
      cy.get('button[type="submit"]').click();
      
      // Hata mesajı görünmeli
      cy.contains('hata', { matchCase: false, timeout: 5000 }).should('be.visible');
      cy.url().should('include', '/login');
    });

    it('Hatalı şifre ile giriş yapamamalı', () => {
      cy.visit('/login');
      
      cy.get('input[name="username"]').type(Cypress.env('ADMIN_USERNAME'));
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      
      // Hata mesajı görünmeli
      cy.contains('hata', { matchCase: false, timeout: 5000 }).should('be.visible');
      cy.url().should('include', '/login');
    });

    it('Boş form ile giriş yapamamalı', () => {
      cy.visit('/login');
      
      cy.get('button[type="submit"]').click();
      
      // Form validation çalışmalı
      cy.get('input[name="username"]:invalid').should('exist');
      cy.url().should('include', '/login');
    });

    it('Session persistence kontrol edilmeli', () => {
      // Önce giriş yap
      cy.adminLogin();
      
      // Admin paneline git
      cy.visit('/admin');
      cy.url().should('include', '/admin');
      cy.contains('Admin Panel').should('be.visible');
      
      // Sayfa yenile ve session devam etmeli
      cy.reload();
      cy.url().should('include', '/admin');
      cy.contains('Admin Panel').should('be.visible');
    });

    it('Çıkış işlemi çalışmalı', () => {
      // Giriş yap
      cy.adminLogin();
      cy.visit('/admin');
      
      // Çıkış butonunu bul ve tıkla
      cy.get('button:contains("Çık"), a:contains("Çık"), [data-testid="logout"]')
        .first()
        .click();
      
      // Login sayfasına yönlendirilmeli
      cy.url().should('include', '/login');
      
      // Admin paneline erişmeye çalış
      cy.visit('/admin');
      cy.url().should('include', '/login');
    });
  });

  describe('Admin Panel Navigation', () => {
    beforeEach(() => {
      cy.adminLogin();
    });

    it('Admin panel ana sayfası yüklenmeli', () => {
      cy.visit('/admin');
      
      // Dashboard elementleri kontrol et
      cy.contains('Admin Panel', { timeout: 10000 }).should('be.visible');
      cy.get('nav, .navigation, .sidebar').should('be.visible');
    });

    it('Admin panel menü linkleri çalışmalı', () => {
      cy.visit('/admin');
      
      // Firmalar linkini kontrol et
      cy.get('a[href*="/admin/firmalar"], a:contains("Firma")').should('be.visible');
      
      // Ayarlar linkini kontrol et (varsa)
      cy.get('body').then($body => {
        if ($body.find('a[href*="/admin/ayarlar"], a:contains("Ayar")').length > 0) {
          cy.get('a[href*="/admin/ayarlar"], a:contains("Ayar")').should('be.visible');
        }
      });
    });
  });

  describe('Security Tests', () => {
    it('Giriş yapmadan admin sayfalarına erişim engellenmelidir', () => {
      const adminRoutes = [
        '/admin',
        '/admin/firmalar',
        '/admin/firmalar/yeni',
        '/admin/ayarlar'
      ];

      adminRoutes.forEach(route => {
        cy.visit(route);
        cy.url().should('include', '/login');
      });
    });

    it('SQL injection saldırılarına karşı korunmalı', () => {
      cy.visit('/login');
      
      const sqlInjectionPayloads = [
        "admin'; DROP TABLE users; --",
        "' OR '1'='1",
        "admin' OR 1=1#"
      ];

      sqlInjectionPayloads.forEach(payload => {
        cy.get('input[name="username"]').clear().type(payload);
        cy.get('input[name="password"]').clear().type('password');
        cy.get('button[type="submit"]').click();
        
        // Hala login sayfasında olmalı
        cy.url().should('include', '/login');
        cy.wait(1000);
      });
    });
  });
});