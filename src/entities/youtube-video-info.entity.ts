import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@Entity({ schema: "scrap" })
export class YoutubeVideoInfo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @CreateDateColumn({
    name: "published_at",
    type: "timestamp without time zone",
    nullable: false,
  })
  publishedAt: Date;

  @Column("numeric", { name: "view_count", nullable: false })
  viewCount: number;

  @Column("numeric", { name: "subscriber_count", nullable: false })
  subscriberCount: number;

  @Column("character varying", { name: "video_title", nullable: false })
  videoTitle: string;

  @Column("character varying", { name: "video_id", nullable: false })
  videoId: string;

  @Column("character varying", { name: "thumbnail", nullable: false })
  thumbnail: string;

  @Column("character varying", { name: "channel_title", nullable: false })
  channelTitle: string;

  @Column("numeric", { name: "like_count", nullable: false })
  likeCount: number;

  @Column("character varying", { name: "channel_id", nullable: false })
  channelId: string;

  @Column("character varying", { name: "channel_profile", nullable: false })
  channelProfile: string;
}
