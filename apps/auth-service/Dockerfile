FROM node:20-slim

WORKDIR /app

# העתק קבצים חיוניים
COPY ../../package*.json ../../tsconfig.json ./

# התקנה כולל devDependencies (כדי לכלול typescript ו־tsc)
RUN npm install --include=dev
RUN npm install --workspace=apps/auth-service

# העתקה של כל קוד המונורפו
COPY ../../ .

# מעבר לספריית השירות
WORKDIR /app/apps/auth-service

# קומפילציה
RUN npm run build

CMD ["npm", "start"]
