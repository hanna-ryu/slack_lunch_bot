const Slack = require('slack-node');
const express = require('express');
const bodyParser = require('body-parser');
const { App } = require('@slack/bolt');
require('dotenv').config();

// 서버 실행
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('서버실행');
})();
// 랜덤으로 맛집 추천 함수
const getRandomRestaurant = () => {
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  const restaurant = restaurants[randomIndex];
  return {
    title: `🍴 오늘의 맛집: *${restaurant.name}*!`,
    menu: `✨ 대표 메뉴: ${restaurant.menu}`,
    comment: [
      '배고픔은 이제 안녕~! 🥳',
      '맛있는 점심으로 힘내세요! 💪',
      '이 맛집, 믿고 가볼까요? 😋',
      '어쩌면 오늘의 운명...? 🤔',
      '오늘은 이 맛집으로 go go! 🏃‍♀️',
      '배부른 하루 되세요~ 😍',
      '이 메뉴는 찐 맛집 각! 🔥',
      '다이어트는 내일부터! 🍔',
      '여긴 맛 없으면 이상한 집입니다. 🙌',
      '지금 바로 출발~ 🚗💨',
      '점심도 즐거운 하루 되세요! 🐣',
      '좋은 메뉴로 기분 좋은 하루! 🌟',
      '입맛이 절로 춤을 출 거예요! 💃',
      '오늘 점심은 내가 쏜다! (농담 🤣)',
      '혼밥도 좋고, 같이 먹어도 좋은 메뉴! 👫',
    ][Math.floor(Math.random() * 15)], // 랜덤 코멘트
  };
};

// "/점메추" 명령어 처리
app.command('/점메추', async ({ command, ack, say }) => {
  await ack();
  const { title, menu, comment } = getRandomRestaurant();
  await say(
    `안녕하세요, <@${command.user_id}>님! 점심 고민 끝! 🎉\n\n${title}\n${menu}\n\n💡 ${comment}`,
  );
});

// 맛집 목록 (JSON 형식)
const restaurants = [
  { name: '김밥천국', menu: '김밥, 라면, 돈까스' },
  { name: '한솥도시락', menu: '도시락, 카레' },
  { name: '엽기떡볶이', menu: '떡볶이, 튀김' },
];
