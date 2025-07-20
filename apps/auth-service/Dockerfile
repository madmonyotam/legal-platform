FROM node:20-slim

WORKDIR /app

# העתק קבצי השורש (כולל tsconfig.json ו־package.json root)
COPY ../../package*.json ../../tsconfig.json ./

# התקנת תלויות root
RUN npm install

# העתקת כל המונורפו (כדי לגשת גם ל־libs ו־apps אחרים)
COPY ../../ .

# הגדר את הספרייה של השירות
WORKDIR /app/apps/auth-service

# בנייה
RUN npm run build

CMD ["npm", "start"]
