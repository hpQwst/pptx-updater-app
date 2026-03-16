CREATE TABLE `file_uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileType` enum('excel','pptx') NOT NULL,
	`fileUrl` text NOT NULL,
	`fileSize` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `file_uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mappings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`updateId` int NOT NULL,
	`slideNumber` int NOT NULL,
	`elementType` enum('table','chart','text') NOT NULL,
	`elementName` varchar(255) NOT NULL,
	`excelSheet` varchar(50) NOT NULL,
	`excelRange` varchar(50) NOT NULL,
	`transformationType` enum('direct_copy','series_update','calculation','text_replace') NOT NULL,
	`description` text,
	`status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mappings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `updates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`excelFileId` int NOT NULL,
	`pptxFileId` int NOT NULL,
	`excelFileName` varchar(255) NOT NULL,
	`pptxFileName` varchar(255) NOT NULL,
	`status` enum('processing','completed','failed') NOT NULL DEFAULT 'processing',
	`mappingsCount` int DEFAULT 0,
	`elementsUpdated` int DEFAULT 0,
	`outputFileUrl` text,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `updates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `file_uploads` ADD CONSTRAINT `file_uploads_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `updates` ADD CONSTRAINT `updates_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `updates` ADD CONSTRAINT `updates_excelFileId_file_uploads_id_fk` FOREIGN KEY (`excelFileId`) REFERENCES `file_uploads`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `updates` ADD CONSTRAINT `updates_pptxFileId_file_uploads_id_fk` FOREIGN KEY (`pptxFileId`) REFERENCES `file_uploads`(`id`) ON DELETE no action ON UPDATE no action;