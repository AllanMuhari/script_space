/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LikedBlog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "LikedBlog" DROP CONSTRAINT "LikedBlog_blogId_fkey";

-- DropForeignKey
ALTER TABLE "LikedBlog" DROP CONSTRAINT "LikedBlog_userId_fkey";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "LikedBlog";

-- CreateTable
CREATE TABLE "blog_table" (
    "blogId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "likedByCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "blog_table_pkey" PRIMARY KEY ("blogId")
);

-- CreateTable
CREATE TABLE "liked_blog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "liked_blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "liked_blog_userId_blogId_key" ON "liked_blog"("userId", "blogId");

-- AddForeignKey
ALTER TABLE "blog_table" ADD CONSTRAINT "blog_table_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_blog" ADD CONSTRAINT "liked_blog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_blog" ADD CONSTRAINT "liked_blog_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blog_table"("blogId") ON DELETE RESTRICT ON UPDATE CASCADE;
