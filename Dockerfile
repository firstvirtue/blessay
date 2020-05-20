FROM node:12

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
