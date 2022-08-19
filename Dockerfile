# Step 1
## base image for Step 1
FROM node:16 AS builder

WORKDIR /app/bulletin
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다

COPY . .

## Nest.js project를 build 한다
RUN npm install
RUN npm run build



# Step 2
## base image for Step 2
FROM node:16-alpine

WORKDIR /app/bulletin
## Step 1의 builder에서 build된 프로젝트를 가져온다

COPY --from=builder /app/bulletin ./

EXPOSE 4000

## application 실행
CMD ["npm", "run", "start:prod"]