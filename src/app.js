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
  console.log("New Video");
  console.log(
    `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
  );
  try {
    const response = await axios.get(
      `${youtubeDataUrl}/channels/?key=${youtubeApiKey}&part=id,%20snippet,%20brandingSettings,%20contentDetails,%20invideoPromotion,%20statistics,%20topicDetails&id=${data.channel.id}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  bot.sendMessage(
    chatId,
    `${data.channel.name}님이 "${data.video.title}" 영상을 업로드했습니다.`
  );
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
