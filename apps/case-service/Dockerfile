FROM node:20-slim

WORKDIR /app

# העתק את כל המונוריפו (כולל libs, apps, package.json וכו')
COPY . .

# התקנת כל ה־workspaces במכה אחת
RUN npm install

# בנייה של השירות הספציפי (כולל תלויות פנימיות דרך tsc --build)
RUN npm run build --workspace=apps/case-service

# הגדרת תיקייה נוכחית להרצה
WORKDIR /app/apps/case-service

CMD ["npm", "start"]
