# 🧩 Cloud Run to Cloud SQL – חיבור עדכני דרך Prisma

## ✅ מבנה החיבור הנוכחי

שירות `auth-service` ב־Cloud Run מתקשר למסד הנתונים PostgreSQL ב־Cloud SQL דרך IP ציבורי.

### 🎯 רכיבי התקשורת:

- **Cloud Run**: ללא VPC Connector (`--clear-vpc-connector`)
- **Cloud SQL**: מאפשר חיבורים מ־`0.0.0.0/0` (כל כתובת ציבורית)
- **Prisma**: מתחבר דרך משתנה סביבה `DATABASE_URL`
- **DATABASE_URL**: מוגדר כך:
  ```env
  postgresql://admin:<encoded-password>@35.195.33.117:5432/legal?schema=public&sslmode=require
  ```
- **SSL**: נדרש ומופעל דרך `sslmode=require`
- **התחברות מצליחה**: Cloud Run יוצא דרך כתובת IPv4 דינמית ומתחבר ישירות

---

## ⚠️ מגבלות / סיכונים

- Cloud SQL פתוח לכולם (`0.0.0.0/0`) → חשיפה לא רצויה אם לא מאובטח כראוי
- ה־IP שדרכו Cloud Run יוצא הוא **דינמי** → קשה להגביל ספציפית
- אין שכבת הפרדה או גישה פרטית (כגון IP פרטי או VPC)

---

## 🛠️ המלצות להמשך

1. ✅ **לשימוש מיידי** – להשאיר כך בסביבת פיתוח / בדיקות בלבד
2. 🔒 **לפרודקשן**:
   - להחזיר את השימוש ב־VPC Connector (`--vpc-connector`) עם NAT
   - לשנות את Cloud SQL ל־**IP פרטי בלבד**
   - להשתמש ב־`cloud-sql-connector` עם `authType: PASSWORD` או IAM
   - להסיר `0.0.0.0/0` ולהוסיף רק את טווח ה־egress או NAT IP
3. 🧪 בעתיד – לשקול שימוש ב־`cloud-sql-proxy` כ־sidecar או container נפרד

---

## 🗂️ קבצים מעורבים

- `DATABASE_URL` נשמר כסוד ב־GCP Secret Manager
- `userMeta.service.ts` משתמש ב־Prisma רגיל

