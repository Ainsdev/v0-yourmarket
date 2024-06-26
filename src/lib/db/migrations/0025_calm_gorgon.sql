DROP INDEX IF EXISTS `brand_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `size_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `condition_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `category_idx`;--> statement-breakpoint
CREATE UNIQUE INDEX `brand_idx` ON `posts` (`lower("brand")`);--> statement-breakpoint
CREATE UNIQUE INDEX `size_idx` ON `posts` (`lower("size")`);--> statement-breakpoint
CREATE UNIQUE INDEX `condition_idx` ON `posts` (`lower("condition")`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_idx` ON `posts` (`lower("category_id")`);