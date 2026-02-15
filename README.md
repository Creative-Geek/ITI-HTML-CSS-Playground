# ByteShop - Tech Store Website

A little tech store website I built as part of my ITI course — mostly to get my hands dirty with JavaScript and DOM manipulation. It ended up being way more than I initially planned.

## So, What Is This?

This started as a straightforward frontend project for the ITI program: build a tech store, make it look decent, call it a day. But as I got more comfortable with JavaScript, I kept tacking things on — a library management system, a grade calculator, a todo list app — just to see how far I could push what I'd learned. It's not perfect, but I'm genuinely proud of how it turned out.

## Project Structure

```text
├─ index.html              # Homepage
├─ about.html              # About page with team section
├─ products.html           # Product catalog
├─ contact.html            # Contact form
├─ libManagementSystem.html # Library management app
├─ todoList.html           # Todo list app
├─ miniApps.html           # Mini apps collection
├─ script.js               # Main JavaScript file
├─ styles.css              # Custom styles
├─ bytestorelogo.svg       # Logo
├─ images/                 # Product & team photos
    ├─ about/
    ├─ products/
    │   ├─ laptops/
    │   ├─ smartphones/
    │   └─ accessories/
    └─ team/
```

## What's Inside

### The Main Store

- **Homepage** — Hero section with a scroll effect I'm pretty happy with, product categories, featured items
- **About** — A made-up company story, team members, values — the usual
- **Products** — Catalog split into laptops, smartphones, and accessories
- **Contact** — A contact form with business info

### Library Management System

This one was fun to build. It's a standalone app for managing a book collection — you can get to it through the "Library System" button in the nav.

**What you can do:**

- Add books (title, author, number of copies)
- Borrow and return them
- Keep track of what's available vs. what's checked out
- Pull up stats and reports
- Everything saves to localStorage, so your data sticks around

**A couple of things worth noting:**

- Book titles are case-insensitive, so searching "harry potter" will find "Harry Potter" just fine
- If you try to add a book that already exists, it'll just bump up the copy count instead of creating a duplicate

### Student Grade Calculator

This one's more bare-bones — it runs through `prompt()` dialogs. Hit "Student Management" in the nav to fire it up.

**The flow:**

1. Enter a student's name and age
2. Punch in at least 3 grades (0–100)
3. It spits back the average, highest/lowest grades, and a pass/fail status
4. You can add as many students as you want, then get a summary report at the end

**Grading scale:**

- 90+ → Excellent
- 80+ → Very Good
- 70+ → Good
- 60+ → Pass
- Below 60 → Fail

### Todo List App

A simple yet functional task management app accessible via "Todo List" in the nav. Features include adding, editing, and deleting tasks with localStorage persistence.

### Mini Apps

A collection of small utility apps bundled together — check it out via "Mini Apps" in the navigation.

## Stuff I'm Proud Of Technically

### Page Transitions

I went down a rabbit hole with the View Transitions API (needs Chrome 126+) and honestly it was worth it. Pages slide and scale like a native mobile app — navigating deeper pushes the current page back, and going back pops it forward. It's a small touch but it makes the whole thing feel _way_ more polished.

### The Dark Theme

I built a custom dark theme using CSS variables with cyan accents. Bootstrap 5.3 handles the layout, but I ended up overriding a lot of it to get the look I wanted.

### Hero Scroll Effect

The hero image on the homepage reacts as you scroll — it scales up, darkens, and picks up a slight blur. Simple concept, but getting it to feel smooth took some tweaking.

### Login Modal

A sleek login modal that pops up over the page — no separate login page needed. It's integrated directly into the main store experience.

## Running It

Just open `index.html` in your browser. No installs, no build tools, no server — just open and go.

Use Chrome 126+ if you want to see the page transitions in action.

## Built With

- HTML5
- CSS3 (custom properties, flexbox, grid)
- JavaScript (ES6+)
- Bootstrap 5.3
- View Transitions API
- localStorage

---

Built during ITI's HTML/CSS/JS prerequisite course. Learned a ton.
