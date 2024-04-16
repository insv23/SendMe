# 基于Node.js官方镜像
FROM node

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 使用nginx作为web服务器
FROM nginx:alpine

# 将构建的文件从上一个阶段复制到nginx的服务目录
COPY --from=0 /app/dist /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]