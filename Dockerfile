FROM node:20@sha256:cb7cd40ba6483f37f791e1aace576df449fc5f75332c19ff59e2c6064797160e
# baseline first steps for pupeteer from https://github.com/puppeteer/puppeteer/blob/main/docker/Dockerfile

# Configure default locale (important for chrome-headless-shell). 
ENV LANG en_US.UTF-8

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] https://dl-ssl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 dbus dbus-x11 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*



# my own application stuff
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# base url where to find whisper api
ENV WHISPER_ASR_BASE_URL=http://127.0.0.1:19900

# admin username needed to register whatsapp
ENV ADMIN_USER=admin

# admin password needed to register whatsapp
ENV ADMIN_PASSWORD=WhatsAppAdminPassword!

# max size accepted in body by server 50mb as default
ENV BODY_SIZE_LIMIT=52428800

# port webserver listens to and expose that too
ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "hybrid-server"]