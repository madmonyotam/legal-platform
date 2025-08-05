FROM node:20-slim

WORKDIR /app

# שלב 1: העתק את כל המונורפו
COPY ../../ .

RUN npm install

# שלב 4: כניסה לתוך השירות
WORKDIR /app/apps/clients-service

# שלב 5: קומפילציה
RUN npm run build

CMD ["npm", "start"]
