# 🔐 רישום, התחברות והזמנה – סיכום זרימת משתמשים

מסמך זה מתאר את הזרימה של רישום, התחברות והזמנת משתמשים כפי שמיושם בפועל במערכת.

---

## 🧾 `/auth/register` – רישום משתמש חדש

### קלט:
- `email`
- `password`

### שלבים:
1. נוצרת ישות משתמש ב־**Firebase**: `firebaseAuth.createUser`
2. נוצרת ישות `userMeta` במסד PostgreSQL עם:
   - `uid` מתוך Firebase
   - `role: "owner"`
   - `officeId: office-<uuid>` (נוצר בשרת)
   - `invitedBy: null`
   - `createdAt`, `updatedAt`

### פלט:
```json
{
  "uid": "<firebase uid>",
  "email": "<email>",
  "userMeta": { ... }
}
```

---

## 🔐 `/auth/login` – התחברות

### קלט:
- `email`
- `password`

### שלבים:
1. קריאה ל־Firebase Identity Toolkit (`signInWithPassword`) עם Firebase API Key
2. מתקבל `idToken` + `localId` (שזה `uid` של המשתמש)
3. נשלף `userMeta` ממסד הנתונים לפי `uid`
   - אם לא קיים – נזרקת שגיאה

### פלט:
```json
{
  "token": "<idToken>",
  "userMeta": { ... }
}
```

---

## 📧 `/auth/invite` – הזמנת משתמש

### קלט:
- `email`
- `password`
- `role` (חייב להיות אחד מ־[`lawyer`, `admin`, `intern`])
- `officeId`

### שלבים:
1. נדרש header בשם `x-user-meta` המכיל JSON של `AuthUser`
2. מפוענח שדה `invitedBy` מתוך אותו header
3. נוצרת ישות משתמש ב־Firebase (`createUser`)
4. נוצר `userMeta` עם:
   - `uid`, `role`, `officeId`, `invitedBy`
   - `createdAt`, `updatedAt`

### פלט:
```json
{
  "userMeta": { ... }
}
```

---

## 📌 הערות משלימות

- 🔑 Firebase מטפל ב־Authentication בפועל
- 🗂️ Prisma משמש לאחסון metadata של המשתמש (`userMeta`)
- ❗ כל הפעולות מוודאות קלט מלא ותקני (כולל תפקידים מוגדרים מראש)
- 🧪 אימות מבוסס Firebase token דרך middleware

