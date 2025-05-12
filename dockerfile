# Budowa aplikacji
FROM node:18-alpine AS builder
WORKDIR /app

#Kopiowanie plików .json oddzielnie
COPY package*.json ./

#Instalacja jedynie niezbędnych zależności
RUN npm install --omit=dev

#Kopiowanie kodu zrodlowego aplikacji
COPY . .

# Drugi etap budowania aplikacji
FROM node:18-alpine
WORKDIR /app

#dodanie curl aby healthcheck dizałał
RUN apk add --no-cache --update curl

# Kopiowanie artefaktów z etapu buildera
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./
COPY --from=builder /app/index.html ./

#zmienna na klucz ze strony https://home.openweathermap.org/
ENV ENV OPENWEATHER_KEY

# Ustawienie portu
EXPOSE 3000

# Healthcheck sprawdzajcy czy aplikacja działa
HEALTHCHECK --interval=5s --timeout=3s CMD curl -f http://localhost:3000/ || exit 1

# info o autorze
LABEL org.opencontainers.image.authors="Szymon Ciechonski <s97578@pollub.edu.pl>"

# Uruchomienie aplikacji Node.js
CMD [ "node", "server.js" ]