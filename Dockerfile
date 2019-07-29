# stage: 1
FROM node:10 as react-build
WORKDIR /app
COPY package.json package-lock.json ./
# RUN yarn install
# RUN yarn build
RUN npm install

COPY . ./
RUN npm run build

# stage: 2 — the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env/env.sh .
COPY ./env/.env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh


# CMD ["nginx", "-g", "daemon off;"]
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]