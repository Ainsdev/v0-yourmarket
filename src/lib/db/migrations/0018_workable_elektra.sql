ALTER TABLE posts ADD `region` text NOT NULL;--> statement-breakpoint
ALTER TABLE posts ADD `contact` text NOT NULL;--> statement-breakpoint
ALTER TABLE `posts` DROP COLUMN `range_price`;