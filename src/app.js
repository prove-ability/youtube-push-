// "use strict";
// const express = require("express");
// const YouTubeNotifier = require("youtube-notification");

// const app = express();
// const notifier = new YouTubeNotifier({
//   hubCallback: "https://18.221.54.230/youtube",
//   secret: "Something",
// });

// // https://221.147.81.82/youtube

// //https://www.youtube.com/xml/feeds/videos.xml?channel_id=CHANNEL_ID
// notifier.setup();
// app.use("/youtube", notifier.listener());

// app.get("/", (req, res, next) => {
//   res.send("hello world!");
// });

// app.listen(8080, () => console.log("Express server has started on port 8080"));

// notifier.on("subscribe", (data) => {
//   console.log("Subscribed");
//   console.log(data);
// });

// notifier.on("unsubscribe", (data) => {
//   console.log("Unsubscribed");
//   console.log(data);
// });

// notifier.on("denied", (data) => {
//   console.log("Denied");
//   console.log(data);
// });

// notifier.on("notified", (data) => {
//   console.log("New Video");
//   console.log(data);
// });

// // notifier.subscribe([
// //   "UCP8KMauNQ5YhTL8fzoSYcfQ", // 하나TV
// //   "UC90Y-ClmElcidhXs2-x1EIg", // SK 증권리서치
// //   "UCBM86JVoHLqg9irpR2XKvGw", // 달란트투자
// //   "UChlv4GSd7OQl3js-jkLOnFA", // 삼프로 TV
// //   "UCauZxKRDiGcrWplWUOIN9JQ", // 이리온 스튜디오
// //   "UCsJ6RuBiTVWRX156FVbeaGg", // 슈카월드
// //   "UC045CUnX2NJW6DNjSYezjTw", // TEST(Prove)
// // ]);

// notifier.subscribe("UC045CUnX2NJW6DNjSYezjTw");

const YouTubeNotifier = require("youtube-notification");

const notifier = new YouTubeNotifier({
  hubCallback: "http://18.221.54.230/youtube",
  port: 8080,
  secret: "Something",
  path: "/youtube",
});
notifier.setup();

notifier.on("notified", (data) => {
  console.log("New Video");
  console.log(
    `${data.channel.name} just uploaded a new video titled: ${data.video.title}`
  );
  console.log(data);
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
