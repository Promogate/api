/*
  Warnings:

  - You are about to drop the column `resources_analytics_id` on the `offer_clicks` table. All the data in the column will be lost.
  - You are about to drop the column `api_key_id` on the `resources` table. All the data in the column will be lost.
  - Added the required column `analytics_id` to the `offer_clicks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "offer_clicks" DROP CONSTRAINT "offer_clicks_resources_analytics_id_fkey";

-- DropForeignKey
ALTER TABLE "resources" DROP CONSTRAINT "resources_api_key_id_fkey";

-- DropIndex
DROP INDEX "resources_api_key_id_key";

-- AlterTable
ALTER TABLE "offer_clicks" DROP COLUMN "resources_analytics_id",
ADD COLUMN     "analytics_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "resources" DROP COLUMN "api_key_id";

-- AddForeignKey
ALTER TABLE "offer_clicks" ADD CONSTRAINT "offer_clicks_analytics_id_fkey" FOREIGN KEY ("analytics_id") REFERENCES "analytics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
