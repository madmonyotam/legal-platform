# שלב 1 – בנייה מתוך המונוריפו
FROM node:20-slim AS builder

WORKDIR /app

# הגדרת build arguments
ARG VITE_API_URL
ARG VITE_USE_MOCK=false
ARG VITE_USE_AUTH=true
ARG VITE_DEFAULT_THEME=light
ARG VITE_DEFAULT_LOCALE=en

# הגדרת environment variables לבנייה
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCK=$VITE_USE_MOCK
ENV VITE_USE_AUTH=$VITE_USE_AUTH
ENV VITE_DEFAULT_THEME=$VITE_DEFAULT_THEME
ENV VITE_DEFAULT_LOCALE=$VITE_DEFAULT_LOCALE

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


