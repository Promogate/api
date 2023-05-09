/*
  Warnings:

  - You are about to drop the column `user_id` on the `analytics` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `api_key` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `resources` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_profile_id]` on the table `analytics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_profile_id]` on the table `api_key` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_profile_id]` on the table `resources` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_profile_id` to the `analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `api_key` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_profile_id` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "analytics" DROP CONSTRAINT "analytics_user_id_fkey";

-- DropForeignKey
ALTER TABLE "api_key" DROP CONSTRAINT "api_key_user_id_fkey";

-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_user_id_fkey";

-- DropIndex
DROP INDEX "analytics_user_id_key";

-- DropIndex
DROP INDEX "api_key_user_id_key";

-- DropIndex
DROP INDEX "resources_user_id_key";

-- AlterTable
ALTER TABLE "analytics" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "api_key" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "user_id",
ADD COLUMN     "user_profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "user_profile" (
    "id" TEXT NOT NULL,
    "store_image" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FREE',
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_store_name_key" ON "user_profile"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_user_profile_id_key" ON "analytics"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_user_profile_id_key" ON "api_key"("user_profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "resources_user_profile_id_key" ON "resources"("user_profile_id");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analytics" ADD CONSTRAINT "analytics_user_profile_id_fkey" FOREIGN KEY ("user_profile_id") REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
