FROM node:20-slim

WORKDIR /app

# שלב 1: העתק את כל המונורפו
COPY ../../ .

# שלב 2: התקנת תלויות כולל dev (בזכות ה־package.json הראשי)
RUN npm install
# שלב 3: התקנת תלויות של השירות הספציפי
RUN npm install --workspace=apps/auth-service

# שלב 4: כניסה לתוך השירות
WORKDIR /app/apps/auth-service

# שלב 5: קומפילציה
RUN npm run build

CMD ["npm", "start"]
