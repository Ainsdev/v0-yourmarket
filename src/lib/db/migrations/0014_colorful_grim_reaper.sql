ALTER TABLE posts ADD `range_price` text;--> statement-breakpoint
ALTER TABLE posts ADD `category_id` integer NOT NULL;--> statement-breakpoint
ALTER TABLE posts ADD `subcategory` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `size_idx` ON `posts` (`size`);