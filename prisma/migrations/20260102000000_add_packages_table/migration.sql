-- CreateTable
CREATE TABLE IF NOT EXISTS "packages" (
    "id" SERIAL NOT NULL,
    "package_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "card_count" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "features" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "packages_package_key_key" ON "packages"("package_key");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "packages_display_order_idx" ON "packages"("display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "packages_active_idx" ON "packages"("active");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "packages_package_key_idx" ON "packages"("package_key");
