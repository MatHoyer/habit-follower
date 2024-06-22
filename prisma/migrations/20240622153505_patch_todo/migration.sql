/*
  Warnings:

  - You are about to drop the `dailytodo` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,ownerId]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `dailytodo` DROP FOREIGN KEY `DailyTodo_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `dailytodo` DROP FOREIGN KEY `DailyTodo_todoId_fkey`;

-- DropIndex
DROP INDEX `Todo_name_key` ON `todo`;

-- DropTable
DROP TABLE `dailytodo`;

-- CreateTable
CREATE TABLE `Valid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `todoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Todo_name_ownerId_key` ON `Todo`(`name`, `ownerId`);

-- AddForeignKey
ALTER TABLE `Valid` ADD CONSTRAINT `Valid_todoId_fkey` FOREIGN KEY (`todoId`) REFERENCES `Todo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
