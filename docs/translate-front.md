# 🌐 Extracting Translations – i18n Tooling

המערכת תומכת בריבוי שפות באמצעות `react-i18next`, עם קבצי JSON לשפות כמו `en` ו־`he`.

---

## 🧰 סקריפט אוטומטי – הפקת מפתחות תרגום

בפרונט (תיקיית `apps/client`) קיים סקריפט שמבצע:

1. סריקה של כל קבצי `.tsx` בתיקיית `src`
2. איתור שימושים ב־`t('...')`, `t("...")`, `t(`...`)`
3. יצירת אובייקט JSON מקונן מהמפתחות
4. מיזוג עם קובץ תרגום קיים – ללא דריסה של ערכים קיימים

---

## 📁 מיקום הקבצים

| רכיב                     | מיקום                                               |
|--------------------------|------------------------------------------------------|
| סקריפט                   | `apps/client/scripts/extract-translations.ts`       |
| קבצי תרגום               | `apps/client/src/locales/en.json` / `he.json`       |

---

## 🚀 הרצה

ניתן להריץ ישירות לפי שפה:

```bash
npm run extract-en --workspace=apps/client
npm run extract-he --workspace=apps/client
```

## 📦 תוצאת הפלט

- כל מפתח חדש שזוהה יתווסף לקובץ הקיים
- ערכים קיימים לא יימחקו או ידרסו
- ערך ברירת מחדל הוא אות ראשונה גדולה (למשל `"home": "Home"`)

---

## 🧪 דוגמה

בקוד:

```tsx
<Link>{t('nav.profile')}</Link>
```

בקובץ he.json יווצר:

```tsx
{
  "nav": {
    "profile": "Profile"
  }
}
```

## ⏭ שיפורים עתידיים
- הצגת רשימת מפתחות שנוספו

- תמיכה בתרגום אוטומטי דרך API (למשל Google Translate)