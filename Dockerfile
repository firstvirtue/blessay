FROM node:12

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 환경변수 설정
ENV NODE_ENV production

# 앱 의존성 설치
COPY package*.json ./

RUN npm install

RUN mkdir post-rsc-pool

COPY . .

EXPOSE 4000
EXPOSE 4001
CMD ["npm", "start"]
