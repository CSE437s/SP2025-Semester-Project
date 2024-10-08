-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT;

-- CreateTable
CREATE TABLE "furniture_listing" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "condition" VARCHAR(20) NOT NULL,
    "colors" JSONB,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "furniture_listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_user" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "business_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_listing" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "description" TEXT,
    "availability" TEXT NOT NULL,
    "policies" TEXT,
    "pics" BYTEA[],
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,

    CONSTRAINT "apartment_listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "furniture_listing" ADD CONSTRAINT "furniture_listing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_user" ADD CONSTRAINT "business_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_listing" ADD CONSTRAINT "apartment_listing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
