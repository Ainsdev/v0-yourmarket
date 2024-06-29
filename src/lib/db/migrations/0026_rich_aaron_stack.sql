DROP INDEX IF EXISTS `brand_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `size_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `category_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `city_idx`;--> statement-breakpoint
CREATE INDEX `condition_idx` ON `posts` (`condition`);--> statement-breakpoint
CREATE INDEX `brand_idx` ON `posts` (`brand`);--> statement-breakpoint
CREATE INDEX `size_idx` ON `posts` (`size`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `posts` (`category_id`);--> statement-breakpoint
CREATE INDEX `city_idx` ON `stores` (`city`);