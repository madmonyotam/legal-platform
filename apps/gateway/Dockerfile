FROM node:20-slim

WORKDIR /app

# שלב 1: העתק את כל המונורפו
COPY ../../ .

RUN npm install
# שלב 3: התקנת תלויות של השירות הספציפי
RUN npm install --workspace=apps/gateway

# שלב 4: כניסה לתוך השירות
WORKDIR /app/apps/gateway

# שלב 5: קומפילציה
RUN npm run build

CMD ["npm", "start"]


