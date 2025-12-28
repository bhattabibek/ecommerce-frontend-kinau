🛍️ Kinau — E‑Commerce Frontend
A modern, responsive e‑commerce frontend built with React, Redux Toolkit, and Tailwind CSS supporting full shopping experiences like browsing, product details, cart & checkout.
---

## ⚡ Features

- **User Authentication** – Login, Registration, JWT-based sessions.  
- **Product Browsing** – Detailed product pages with variants (color & size) and image galleries.  
- **Cart & Checkout** – Add/remove items, adjust quantities, and complete orders.  
- **Analytics & Charts** – Track stats with interactive chart components.  
- **Notifications** – Real-time feedback using **React Hot Toast**.  
- **Elegant UI** – Tailwind CSS + **Shadcn UI components** for professional design.  

---
🔧 Tech Stack
Feature	Technology
UI Library	React
State Management	Redux Toolkit + Async Thunks
API Calls	Redux Thunk (async), Axios
Styling	Tailwind CSS + Shadcn Components
Toasts & Alerts	react‑hot‑toast
Optional UI Helpers	Icons, Charts

Async API requests and global state actions are handled via Redux Toolkit’s createAsyncThunk for scalable async logic.

📦 Project Structure

📍 src/ — Main source code

src/
├── api/              # API services & axios setup
├── app/              # Redux store, rootReducer
├── assets/           # Images, fonts, static assets
├── components/       # Reusable UI components
├── features/         # Redux slices (cart, products, user, etc)
├── hooks/            # Custom React hooks
├── layout/           # Navbar, Footer, Layout wrappers
├── pages/            # Page components (Home, Product, Cart, Admin)
├── redux/            # Redux logic (slices & thunks)
├── utils/            # Helpers & utils
├── index.tsx         # App entry
└── routes/           # App route definitions


(Adjust the above tree if necessary with real paths from your repo — this is a professional standard)

🚀 Features


Product catalog with filtering and sorting

Product detail page with dynamic variants, color & size selectors

Image gallery with thumbnails

Discount & pricing breakdown

Add to Cart & Wishlist

Dynamic price updates with variants

🛒 Cart & Checkout

Cart with quantity management

Order summary Subtotal, Shipping, Total

Teal gradient checkout button for emphasis

🎨 UI & Design

Tailwind utility classes for flexible layouts

Elegant card and form styling with Shadcn components

Responsive design throughout

🔔 Instant Feedback

Toast notifications using react‑hot‑toast

🛠 Installation
git clone https://github.com/Deepakstha/ecommerce‑frontend‑kinau.git
cd ecommerce‑frontend‑kinau
npm install
npm start

📌 Notes

Axios + Redux Thunks handle all API calls asynchronous actions — making state predictable and scalable.

Redux Toolkit simplifies reducers, middleware, and store configuration.

Styling uses Tailwind CSS, supplemented with Shadcn UI components for polished interfaces.

Interactive feedback and notifications are delivered with react‑hot‑toast.
