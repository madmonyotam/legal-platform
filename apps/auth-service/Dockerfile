# 🧱 בסיס: נוד מינימלי
FROM node:20-slim

# 🏗 שלב 1: יצירת תיקיית עבודה
WORKDIR /app

# 📦 העתקת כל קבצי הפרויקט (כולל libs, apps, package.json וכו׳)
COPY ../../ .

# 🧪 התקנת OpenSSL עבור Prisma
RUN apt-get update && apt-get install -y openssl

# 📦 התקנת תלויות כלליות (root + workspace)
RUN npm install
RUN npm install --workspace=apps/auth-service

# 🎯 הגדרת workdir לשירות עצמו
WORKDIR /app/apps/auth-service

# 🔧 הרצת Prisma generate עם schema יחסי
RUN npx prisma generate --schema=../../libs/db/src/prisma/schema.prisma

# 🏗 קומפילציה
RUN npm run build

# 🚀 הרצת השירות
CMD ["npm", "start"]
