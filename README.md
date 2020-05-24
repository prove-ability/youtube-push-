```sh
yarn install
```

```sh
yarn start
```

### PubSubHubbub(websub) 에 callback url 등록

- https://pubsubhubbub.appspot.com/
- webhook

### youtube-notification 사용

- PubSubHubbub 에서 보내온 요청을 받는다
- subscribe, unsubscribe, denied, notified 4가지 요청을 받을 수 있음

### Telegram bot module 사용

- Telegram API

PubSubHubbub에서 등록한 유튜버의 새로운 업로드를 youtube-notification 로 받고 telegram bot 을 사용해서 전달
