FROM node:lts@sha256:ab71b9da5ba19445dc5bb76bf99c218941db2c4d70ff4de4e0d9ec90920bfe3f

RUN apt-get update && apt-get install -y chromium && apt-get clean

RUN mkdir -p /var/www
WORKDIR /var/www

COPY . .

RUN chown -R www-data:www-data .
USER www-data:www-data

RUN npm ci && npm run build-all && npm ci --omit dev

CMD [ "npm", "run", "test" ]
