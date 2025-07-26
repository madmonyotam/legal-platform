# שלב 1 – בנייה מתוך המונוריפו
FROM node:20-slim AS builder

WORKDIR /app

# העתק את כל המונוריפו
COPY . .

# התקנת כל התלויות כולל workspaces
RUN npm install

# בניית ה-client דרך workspace
RUN npm run build --workspace=apps/client

# שלב 2 – הגשת ה־dist עם preview של Vite
FROM node:20-slim AS runner

WORKDIR /app

# התקנת vite למצב preview
RUN npm install -g vite

# העתקת קבצי build בלבד מהשלב הקודם
COPY --from=builder /app/apps/client/dist ./dist

EXPOSE 8080

CMD ["serve", "dist", "-l", "8080"]

