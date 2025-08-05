# 🩺 Health & Readiness Checks – Legal Platform

## ✅ מטרת הבדיקות

| סוג בדיקה     | מטרה                            | דוגמה                   |
|---------------|----------------------------------|--------------------------|
| `/health`     | לוודא שהשירות חי                | `GET /health` מחזיר `ok` |
| `/ready`      | לוודא שהשירות מוכן לקבל בקשות  | `GET /ready` בודק DB/API |

---

## ⚙️ מימוש בפועל

- יצרנו פונקציה כללית `setupHealthRoutes` ב־`@legal/shared-utils`
- כל שירות משתמש כך:
```ts
setupHealthRoutes(app, {
  checkReadiness: async () => {
    await prisma.$queryRaw`SELECT 1`;
  }
});
```

- שירותים ללא גישה ל־DB פשוט כותבים:
```ts
setupHealthRoutes(app);
```

---

## 🧱 מבנה מומלץ לכל שירות

- `src/db/prisma.ts` – יצוא של `PrismaClient`
- `src/db/health.ts` – פונקציית `checkDbReady`
- שימוש ב־`setupHealthRoutes` ב־`index.ts`

---

## 📡 מה קורה בגוגל קלאוד?

| תרחיש                            | האם רץ אוטומטית? |
|----------------------------------|------------------|
| Cloud Run (ללא Load Balancer)    | ❌ לא |
| Cloud Run עם Load Balancer       | ✅ אם הגדרת Health Check |
| Monitoring > Uptime Checks       | ❌ לא אוטומטי, אבל מומלץ |
| Cloud Logging (`logger.debug`)   | ✅ אם תוסיף לוג |

---

## 📌 המלצות להמשך

1. ✅ להוסיף **Uptime Checks** בגוגל ל־`/health`
2. ✅ להוסיף `logger.debug()` בבדיקות (לניטור)
3. ✅ לתעד את מטרת כל בדיקה בקוד
4. ⏭️ אם תעבור ל־Load Balancer – להגדיר Health Check על `/ready`