"use strict";
const YouTubeNotifier = require("youtube-notification");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const queryString = require("querystring");

const token = "1110430648:AAGE5Mr8vF0-YFzzRlQgOiw1ikH3uaej_2s";
const bot = new TelegramBot(token, { polling: true });
const youtubeDataUrl = "https://www.googleapis.com/youtube/v3";
const youtubeApiKey = "AIzaSyBE2Md-k8uk4I5OFEoZZJbAc0BvioaNbbs";
const useYoutubePart =
  "id, snippet, brandingSettings, contentDetails, invideoPromotion, statistics, topicDetails";

const notifier = new YouTubeNotifier({
  hubCallback: "http://18.221.54.230/youtube",
  port: 8080,
  secret: "Something",
  path: "/youtube",
});
notifier.setup();

notifier.on("subscribe", (data) => {
  console.log("Subscribed");
  console.log(data);
  // data
  // { type: 'subscribe',
  // channel: 'UChlv4GSd7OQl3js-jkLOnFA',
  // lease_seconds: '432000' }
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
  const chatId = "-1001225087031"; // test_youtuve
  // data
  // { video:
  //   { id: 'xDLZN0Vz-UA',
  //     title: '대가와의 만남(강방천 회장) - 부자되기 프로젝트 LIVE',
  //     link: 'https://www.youtube.com/watch?v=xDLZN0Vz-UA' },
  //  channel:
  //   { id: 'UCP8KMauNQ5YhTL8fzoSYcfQ',
  //     name: '하나TV',
  //     link: 'https://www.youtube.com/channel/UCP8KMauNQ5YhTL8fzoSYcfQ' },
  //  published: 2020-05-19T02:10:16.000Z,
  //  updated: 2020-05-19T02:10:30.256Z }
  try {
    const responseChannel = await axios.get(
      `${youtubeDataUrl}/channels?key=${youtubeApiKey}&part=id,%20snippet,%20brandingSettings,%20contentDetails,%20invideoPromotion,%20statistics,%20topicDetails&id=${data.channel.id}`
    );
    const responseVideo = await axios.get(
      `${youtubeDataUrl}/videos?key=${youtubeApiKey}&part=%20id,%20snippet,%20contentDetails,%20liveStreamingDetails,%20player,%20recordingDetails,%20statistics,%20status,%20topicDetails&id=${data.video.id}`
    );
    // [채널명,구독자 00명] 동영상명(조회수:), 업로드일시, 링크
    bot.sendMessage(
      chatId,
      `
      [${data.channel.name}, ${responseChannel.data.items[0].statistics.subscriberCount}명] ${data.video.title}(조회수:${responseVideo.data.items[0].statistics.viewCount}), ${data.video.title}${responseVideo.data.items[0].snippet.publishedAt}, ${data.video.link}
      `
    );
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
