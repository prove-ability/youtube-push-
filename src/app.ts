import YouTubeNotifier from "youtube-notification";
import axios from "axios";
import moment from "moment";
import { getRepository } from "typeorm";
import { YoutubeVideoInfo } from "./entities/youtube-video-info.entity";

const youtubeDataUrl = "https://www.googleapis.com/youtube/v3";

// const youtubeApiKey = "AIzaSyBE2Md-k8uk4I5OFEoZZJbAc0BvioaNbbs";

// staging-key
const youtubeApiKey = "AIzaSyBEHJ8S_3ZwFNrW-QUvvjYYWDydkFwz2Lo";

const notifier = new YouTubeNotifier({
  hubCallback: "http://3.35.10.35/youtube",
  port: 8080,
  secret: "Something",
  path: "/youtube",
});
notifier.setup();

notifier.on("subscribe", (data) => {
  console.log("Subscribed");
  console.log(data);
});

notifier.on("unsubscribe", (data) => {
  console.log("Unsubscribed");
  console.log(data);
});

notifier.on("denied", (data) => {
  console.log("Denied");
  console.log(data);
});

notifier.on("notified", async (data) => {
  const {
    video: { id: videoId, title: videoTitle },
    channel: { id: channelId, name: channelTitle },
    published: publishedAt,
  } = data;
  console.log(videoTitle);
  try {
    const {
      data: { items: videoInfo },
    } = await axios.get(
      `${youtubeDataUrl}/videos?key=${youtubeApiKey}&part=statistics,snippet&id=${videoId}`
    );
    const {
      statistics: { viewCount, likeCount },
      snippet: {
        liveBroadcastContent,
        thumbnails: {
          medium: { url: thumbnail },
        },
      },
    } = videoInfo[0];
    if (liveBroadcastContent !== "none") return null;
    const {
      data: { items: channelInfo },
    } = await axios.get(
      `${youtubeDataUrl}/channels?key=${youtubeApiKey}&part=statistics,snippet&id=${channelId}`
    );
    const {
      statistics: { subscriberCount },
      snippet: {
        thumbnails: {
          default: { url: channelProfile },
        },
      },
    } = channelInfo[0];
    const youtubeVideoInfo = {
      publishedAt: moment(publishedAt).add(9, "hour"),
      videoTitle,
      thumbnail,
      channelTitle,
      viewCount,
      subscriberCount,
      videoId,
      likeCount,
      channelId,
      channelProfile,
    };
    console.log(youtubeVideoInfo);
    // const list = await getRepository(YoutubeVideoInfo);
    const video = new YoutubeVideoInfo();
    video.publishedAt = moment(publishedAt).add(9, "hour").toDate();
    video.videoTitle = videoTitle;
    video.thumbnail = thumbnail;
    video.channelTitle = channelTitle;
    video.viewCount = viewCount;
    video.subscriberCount = subscriberCount;
    video.videoId = videoId;
    video.likeCount = likeCount;
    video.channelId = channelId;
    video.channelProfile = channelProfile;
    video.save();
  } catch (error) {
    console.error(error);
  }
});

notifier.subscribe([
  "UCP8KMauNQ5YhTL8fzoSYcfQ", // 하나TV
  "UC90Y-ClmElcidhXs2-x1EIg", // SK 증권리서치
  "UCBM86JVoHLqg9irpR2XKvGw", // 달란트투자
  "UChlv4GSd7OQl3js-jkLOnFA", // 삼프로 TV
  "UCauZxKRDiGcrWplWUOIN9JQ", // 이리온 스튜디오
  "UCsJ6RuBiTVWRX156FVbeaGg", // 슈카월드
  "UC045CUnX2NJW6DNjSYezjTw", // TEST(Prove)
  "UC4PsAeGE4Hu1qakUnalUAAw", // TEST2(Prove.ability)
]);
