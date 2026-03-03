/*
  Warnings:

  - You are about to drop the column `platformName` on the `PlatformLink` table. All the data in the column will be lost.
  - You are about to drop the `_PlaylistTracks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[platform,externalId]` on the table `PlatformLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `PlatformLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformName" AS ENUM ('SPOTIFY', 'DEEZER', 'APPLE_MUSIC', 'SOUNDCLOUD', 'YOUTUBE_MUSIC');

-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistTracks" DROP CONSTRAINT "_PlaylistTracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlaylistTracks" DROP CONSTRAINT "_PlaylistTracks_B_fkey";

-- DropIndex
DROP INDEX "PlatformLink_platformName_externalId_key";

-- AlterTable
ALTER TABLE "PlatformLink" DROP COLUMN "platformName",
ADD COLUMN     "platform" "PlatformName" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "_PlaylistTracks";

-- CreateTable
CREATE TABLE "TrackInPlaylist" (
    "playlistId" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrackInPlaylist_pkey" PRIMARY KEY ("playlistId","trackId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformLink_platform_externalId_key" ON "PlatformLink"("platform", "externalId");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackInPlaylist" ADD CONSTRAINT "TrackInPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackInPlaylist" ADD CONSTRAINT "TrackInPlaylist_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
