# 🧾 GenericForm – יכולות טופס דינמי

רכיב `GenericForm` מאפשר בניית טפסים גמישים ודינמיים במערכת בצורה דקלרטיבית, עם תמיכה במבנים מורכבים, ולידציה, ושליטה מלאה על זרימת הטופס.

---

## ✅ יכולות עיקריות

### 🧠 בסיס
- רינדור טופס דינמי לפי `FormSchema`
- תמיכה בשדות מכל סוג: `text`, `number`, `select`, `email`, `date`, `checkbox`
- מבוסס `Formik` עם `Yup` לולידציה

### 📦 מבנה והיררכיה
- תמיכה ב־sections (`variant: vertical | horizontal | grid | collapsible | step | condition`)
- תמיכה בתנאי תצוגה לפי ערך (`condition` על סקשנים)
- תמיכה בסקשנים מתמוטטים (`collapsible`)

### 🧩 ולידציות
- בניית סכמה אוטומטית לפי `setPath`, כולל תמיכה ב־nested paths (`address.street`)
- ולידציות נתמכות:
  - `required`
  - `min`, `max`, `length`
  - `matches`
  - `email`
- ולידציה דינמית לפי טיפוס השדה (`inputType`)

### 🧙 מצב Wizard
- תמיכה במצב `mode: 'wizard'`
- הצגת שלב אחד בלבד בכל זמן
- שליטה במעבר שלבים (`currentStep`)
- מניעת מעבר לשלב הבא אם קיימות שגיאות ולידציה בשלב הנוכחי
- כפתורי ניווט קדימה / אחורה
- שימוש ב־variant: `'step'` להצגת כל שלב

### 🎨 התאמות עיצוב
- תמיכה ב־`containerStyle` מה־schema
- שימוש ב־`styled-components` בלבד (בהתאם ל־guidelines)

---

## 🧪 דוגמה לשימוש

```ts
const formSchema: FormSchema = {
  mode: 'wizard',
  submitLabel: 'שליחה',
  elements: [
    {
      type: 'section',
      title: 'פרטים אישיים',
      variant: 'step',
      children: [
        { type: 'input', setPath: 'firstName', inputType: 'text', required: true, label: 'שם פרטי' },
        { type: 'input', setPath: 'lastName', inputType: 'text', required: true, label: 'שם משפחה' }
      ]
    },
    {
      type: 'section',
      title: 'כתובת',
      variant: 'step',
      children: [
        { type: 'input', setPath: 'address.street', inputType: 'text', required: true, label: 'רחוב' },
        { type: 'input', setPath: 'address.city', inputType: 'text', required: true, label: 'עיר' }
      ]
    }
  ]
};
```

```tsx
<GenericForm
  schema={formSchema}
  initialValues={{ firstName: '', lastName: '', address: { street: '', city: '' } }}
  onSubmit={(values) => console.log(values)}
/>
```

---

## 📌 הערה

אין לכלול סקשנים מסוג `step` בתוך סקשנים מסוג `condition`.