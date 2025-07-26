# שלב 1 – בנייה מתוך המונוריפו
FROM node:20-slim AS builder

WORKDIR /app

# העתק את כל המונוריפו
COPY . .

# התקנת כל התלויות כולל workspaces
RUN npm install

# בניית ה-client דרך workspace
RUN npm run build --workspace=apps/client

# שלב 2 – הגשה עם static server
FROM node:20-slim AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/apps/client/dist ./dist

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]


