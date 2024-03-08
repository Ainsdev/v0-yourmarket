ALTER TABLE user ADD `oauth_provider` text;--> statement-breakpoint
ALTER TABLE user ADD `oauth_id` text;--> statement-breakpoint
ALTER TABLE user ADD `username` text;--> statement-breakpoint
ALTER TABLE user ADD `avatar` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);