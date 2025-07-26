-- CreateTable
CREATE TABLE "admins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "firmalar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firma_adi" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "profil_foto" TEXT,
    "vcard_dosya" TEXT,
    "yetkili_adi" TEXT,
    "yetkili_pozisyon" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goruntulenme" INTEGER NOT NULL DEFAULT 0,
    "katalog" TEXT,
    "firma_hakkinda" TEXT,
    "firma_hakkinda_baslik" TEXT DEFAULT 'Hakkımızda',
    "firma_unvan" TEXT,
    "firma_vergi_no" TEXT,
    "vergi_dairesi" TEXT,
    "sektor_id" INTEGER,
    "kategori_id" INTEGER,
    "il_id" INTEGER,
    "ilce_id" INTEGER,
    "onay" BOOLEAN NOT NULL DEFAULT false,
    "tip" TEXT,
    "firma_logo" TEXT,
    "template_id" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "firmalar_sektor_id_fkey" FOREIGN KEY ("sektor_id") REFERENCES "sektorler" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "firmalar_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategoriler" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "firmalar_il_id_fkey" FOREIGN KEY ("il_id") REFERENCES "iller" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "firmalar_ilce_id_fkey" FOREIGN KEY ("ilce_id") REFERENCES "ilceler" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IletisimBilgisi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firma_id" INTEGER NOT NULL,
    "tip" TEXT NOT NULL,
    "deger" TEXT NOT NULL,
    "etiket" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IletisimBilgisi_firma_id_fkey" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SosyalMedyaHesabi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firma_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "etiket" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SosyalMedyaHesabi_firma_id_fkey" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankaHesabi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firma_id" INTEGER NOT NULL,
    "banka_adi" TEXT NOT NULL,
    "banka_kodu" TEXT,
    "banka_logo" TEXT,
    "hesap_sahibi" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BankaHesabi_firma_id_fkey" FOREIGN KEY ("firma_id") REFERENCES "firmalar" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BankaHesapDetay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "banka_hesabi_id" INTEGER NOT NULL,
    "iban" TEXT NOT NULL,
    "para_birimi" TEXT NOT NULL DEFAULT 'TRY',
    "hesap_turu" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BankaHesapDetay_banka_hesabi_id_fkey" FOREIGN KEY ("banka_hesabi_id") REFERENCES "BankaHesabi" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "priority" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "sektorler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "kategoriler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "iller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ilceler" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ad" TEXT NOT NULL,
    "il_id" INTEGER NOT NULL,
    CONSTRAINT "ilceler_il_id_fkey" FOREIGN KEY ("il_id") REFERENCES "iller" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");

-- CreateIndex
CREATE UNIQUE INDEX "firmalar_slug_key" ON "firmalar"("slug");

-- CreateIndex
CREATE INDEX "IletisimBilgisi_firma_id_idx" ON "IletisimBilgisi"("firma_id");

-- CreateIndex
CREATE INDEX "IletisimBilgisi_tip_idx" ON "IletisimBilgisi"("tip");

-- CreateIndex
CREATE INDEX "SosyalMedyaHesabi_firma_id_idx" ON "SosyalMedyaHesabi"("firma_id");

-- CreateIndex
CREATE INDEX "SosyalMedyaHesabi_platform_idx" ON "SosyalMedyaHesabi"("platform");

-- CreateIndex
CREATE INDEX "BankaHesabi_firma_id_idx" ON "BankaHesabi"("firma_id");

-- CreateIndex
CREATE INDEX "BankaHesapDetay_banka_hesabi_id_idx" ON "BankaHesapDetay"("banka_hesabi_id");

-- CreateIndex
CREATE INDEX "BankaHesapDetay_iban_idx" ON "BankaHesapDetay"("iban");

-- CreateIndex
CREATE INDEX "ilceler_il_id_idx" ON "ilceler"("il_id");
