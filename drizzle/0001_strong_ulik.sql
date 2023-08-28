CREATE TABLE `foodCards` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`description` text,
	`date` text DEFAULT CURRENT_DATE
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`id` integer PRIMARY KEY NOT NULL,
	`foodCardId` integer,
	`mealName` text,
	`date` text DEFAULT CURRENT_DATE,
	FOREIGN KEY (`foodCardId`) REFERENCES `foodCards`(`id`) ON UPDATE no action ON DELETE no action
);
