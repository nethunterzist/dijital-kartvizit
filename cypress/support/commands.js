// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Admin login custom command
Cypress.Commands.add('adminLogin', (username = Cypress.env('ADMIN_USERNAME'), password = Cypress.env('ADMIN_PASSWORD')) => {
  cy.session([username, password], () => {
    cy.visit('/login');
    
    // Login form'u doldur
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    
    // Login butonuna tıkla
    cy.get('button[type="submit"]').click();
    
    // Admin paneline yönlendirildiğini doğrula
    cy.url().should('include', '/admin');
  });
});

// Kartvizit oluşturma custom command
Cypress.Commands.add('createKartvizit', (firmaBilgileri) => {
  const defaultFirma = {
    firmaAdi: 'Test Firma',
    yetkiliAdi: 'Test Yetkili',
    telefon: '05551234567',
    email: 'test@example.com',
    adres: 'Test Adres',
    il: 'İstanbul',
    ilce: 'Kadıköy',
    sektor: 'Teknoloji',
    kategori: 'Yazılım',
    aciklama: 'Test açıklaması',
    ...firmaBilgileri
  };

  // Admin paneline git
  cy.visit('/admin/firmalar/yeni');
  
  // Form alanlarını doldur
  cy.get('input[name="firmaAdi"]').type(defaultFirma.firmaAdi);
  cy.get('input[name="yetkiliAdi"]').type(defaultFirma.yetkiliAdi);
  cy.get('input[name="telefon"]').type(defaultFirma.telefon);
  cy.get('input[name="email"]').type(defaultFirma.email);
  cy.get('textarea[name="adres"]').type(defaultFirma.adres);
  
  // Dropdownları seç
  cy.get('select[name="il"]').select(defaultFirma.il);
  cy.get('select[name="ilce"]').select(defaultFirma.ilce);
  cy.get('select[name="sektor"]').select(defaultFirma.sektor);
  cy.get('select[name="kategori"]').select(defaultFirma.kategori);
  
  // Açıklama ekle
  cy.get('textarea[name="aciklama"]').type(defaultFirma.aciklama);
  
  // Formu gönder
  cy.get('button[type="submit"]').click();
  
  // Başarı mesajını bekle
  cy.contains('başarıyla', { timeout: 10000 }).should('be.visible');
  
  return cy.wrap(defaultFirma);
});

// VCard download test command
Cypress.Commands.add('testVCardDownload', () => {
  cy.get('[data-testid="vcard-button"], button:contains("Rehbere Ekle"), a:contains("Rehbere Ekle")')
    .should('be.visible')
    .click();
    
  // Download işlemini bekle (dosya indirme popup'ı veya success mesajı)
  cy.wait(2000);
});

// QR Code test command
Cypress.Commands.add('testQRCode', () => {
  cy.get('[data-testid="qr-button"], button:contains("QR"), a:contains("QR")')
    .should('be.visible')
    .click();
    
  // QR kod modalının açıldığını doğrula
  cy.get('[data-testid="qr-modal"], .modal, [role="dialog"]')
    .should('be.visible');
    
  // QR kod görselinin yüklendiğini doğrula
  cy.get('img[alt*="QR"], canvas, svg')
    .should('be.visible');
});

// Element varlığını kontrol etme
Cypress.Commands.add('shouldExist', { prevSubject: true }, (subject) => {
  expect(subject).to.exist;
  return cy.wrap(subject);
});

// Loading durumunu bekle
Cypress.Commands.add('waitForLoading', () => {
  cy.get('[data-testid="loading"], .loading, .spinner', { timeout: 1000 })
    .should('not.exist');
});

// Responsive test helper
Cypress.Commands.add('testResponsive', (selector) => {
  const sizes = [
    [375, 667],   // iPhone SE
    [768, 1024],  // iPad
    [1280, 720]   // Desktop
  ];
  
  sizes.forEach(size => {
    cy.viewport(size[0], size[1]);
    cy.get(selector).should('be.visible');
    cy.wait(500);
  });
});

// Console error yakalama
Cypress.Commands.add('checkConsoleErrors', () => {
  cy.window().then((win) => {
    const errors = [];
    const originalError = win.console.error;
    
    win.console.error = (...args) => {
      errors.push(args.join(' '));
      originalError.apply(win.console, args);
    };
    
    return cy.wrap(errors);
  });
});

// Network isteklerini bekle
Cypress.Commands.add('waitForApi', (alias) => {
  cy.intercept('GET', '/api/**').as(alias);
  cy.wait(`@${alias}`);
});