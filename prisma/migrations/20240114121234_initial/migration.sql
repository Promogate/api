-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER', 'FREE', 'PREMIUM');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agree_with_policies" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" TEXT NOT NULL,
    "store_image" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_name_display" TEXT NOT NULL,
    "lomadee_source_id" TEXT,
    "admitad_verification" TEXT,
    "payment_customer_id" TEXT,
    "role" "Role" NOT NULL DEFAULT 'FREE',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_social_media" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "whatsapp" TEXT,
    "instagram" TEXT,
    "telegram" TEXT,
    "twitter" TEXT,
    "user_profile_id" TEXT NOT NULL,

    CONSTRAINT "user_social_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_key" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration_date" TIMESTAMP(3) NOT NULL,
    "user_profile_id" TEXT NOT NULL,

    CONSTRAINT "api_key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_profile_id" TEXT NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "old_price" TEXT,
    "price" TEXT NOT NULL,
    "destination_link" TEXT NOT NULL,
    "store_image" TEXT,
    "store_name" TEXT NOT NULL,
    "description" TEXT,
    "expiration_date" TEXT,
    "short_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_on_showcase" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_free_shipping" BOOLEAN NOT NULL DEFAULT false,
    "resources_id" TEXT NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "resources_id" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnOffer" (
    "offer_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "resource_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CategoriesOnOffer_pkey" PRIMARY KEY ("offer_id","category_id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics" (
    "id" TEXT NOT NULL,
    "resources_id" TEXT NOT NULL,
    "user_profile_id" TEXT NOT NULL,

    CONSTRAINT "analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_clicks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analytics_id" TEXT NOT NULL,
    "offer_id" TEXT NOT NULL,

    CONSTRAINT "offer_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "destination_clicks" (
    "id" TEXT NOT NULL,
    "destination_link" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analytics_id" TEXT NOT NULL,
    "offer_id" TEXT NOT NULL,

    CONSTRAINT "destination_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirectors" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "redirectorLink" TEXT NOT NULL,
    "timesClicked" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'sequential',
    "currentGroup" INTEGER NOT NULL DEFAULT 0,
    "redirectorStatus" TEXT NOT NULL DEFAULT 'started',
    "resources_id" TEXT NOT NULL,

    CONSTRAINT "redirectors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "destination_link" TEXT NOT NULL,
    "members" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 1024,
    "redirector_id" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_store_name_key" ON "user_profile"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_social_media_user_profile_id_key" ON "user_social_media"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_key_key" ON "api_key"("key");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_user_profile_id_key" ON "api_key"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "resources_user_profile_id_key" ON "resources"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_resources_id_key" ON "analytics"("resources_id");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_user_profile_id_key" ON "analytics"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "redirectors_redirectorLink_key" ON "redirectors"("redirectorLink");

-- CreateIndex
CREATE UNIQUE INDEX "redirectors_resources_id_key" ON "redirectors"("resources_id");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_social_media" ADD CONSTRAINT "user_social_media_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_resources_id_fkey" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_resources_id_fkey" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnOffer" ADD CONSTRAINT "CategoriesOnOffer_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnOffer" ADD CONSTRAINT "CategoriesOnOffer_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_resources_id_fkey" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_clicks" ADD CONSTRAINT "offer_clicks_analytics_id_fkey" FOREIGN KEY ("analytics_id") REFERENCES "analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_clicks" ADD CONSTRAINT "offer_clicks_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_clicks" ADD CONSTRAINT "destination_clicks_analytics_id_fkey" FOREIGN KEY ("analytics_id") REFERENCES "analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination_clicks" ADD CONSTRAINT "destination_clicks_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "redirectors" ADD CONSTRAINT "redirectors_resources_id_fkey" FOREIGN KEY ("resources_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_redirector_id_fkey" FOREIGN KEY ("redirector_id") REFERENCES "redirectors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
