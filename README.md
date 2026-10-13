# ShopVerse – Multi-Vendor E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=flat&logo=cloudinary)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat&logo=vercel)](https://vercel.com/)

<br />

# 🛍️ ShopVerse
### Modern, Feature-Rich Multi-Vendor E-Commerce Platform

**ShopVerse** is a comprehensive, production-grade multi-vendor e-commerce web application where users can seamlessly search, compare, and purchase products across diverse categories like apparel, electronics, accessories, and jewelry. 

Vendors can effortlessly register stores, manage inventory, and track sales performance through a dedicated analytics dashboard, while administrators retain full oversight over platform users, categories, and catalog listings.

---

# 💡 Overview

Building a modern e-commerce platform requires robust multi-role management, high-performance UI rendering, and scalable backend architecture. ShopVerse bridges this gap by offering dedicated portals for customers, vendors, and administrators powered by a unified full-stack architecture.

* **Multi-Vendor Ecosystem**: Enable independent merchants to onboard, list products, and scale their digital storefronts.
* **Advanced User Experience**: Side-by-side product comparisons, real-time price tracking, wishlists, and lightning-fast search filters.
* **Role-Based Control**: Granular access control protecting admin tools, vendor inventories, and customer checkouts.
* **Immersive UI/UX**: Crafted with modern component libraries (Aceternity UI, Magic UI, React Bits) and animated navigation headers.

---

# ✨ Features

### 🛍️ For Customers
* **Advanced Filtering & Search**: Filter thousands of products by category, price range, ratings, and brands.
* **Side-by-Side Product Comparison**: Compare specifications and pricing across multiple items simultaneously.
* **Wishlist & Cart Management**: Save favorite items for later and enjoy a streamlined checkout flow.
* **Responsive Design**: Fully optimized UI across mobile, tablet, and desktop viewports.

### 🏪 For Vendors
* **Store Registration**: Onboard and set up a custom storefront within minutes.
* **Inventory Control**: Add, update, and manage product listings and stock availability in real time.
* **Dedicated Vendor Analytics**: Gain insights into monthly sales figures, annual revenue trends, and order reports.

### 🛠️ For Administrators
* **User & Vendor Management**: Review, approve, or suspend user and merchant accounts.
* **Catalog Moderation**: Control and inspect all product listings across the platform.
* **Platform Analytics**: Comprehensive dashboards tracking system-wide sales graphs, order tracking, and user activity metrics.

---

# 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router), React |
| **Styling & UI** | Tailwind CSS, Aceternity UI, Magic UI, React Bits |
| **Backend API** | Next.js API Routes, Node.js, Express.js |
| **Database & ORM** | MongoDB |
| **Authentication & Validation** | Role-Based Access Control (RBAC), Zod Validation |
| **Media & Storage** | Cloudinary (Image Upload & Optimization) |
| **Deployment** | Vercel |

---

# 📂 Architecture & Directory Structure

```text
ShopVerse/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components (Navbar, Cards, Modals)
├── pages/                # Legacy or supporting page routes
├── server/               # Backend controllers, middleware, and routes
├── models/               # MongoDB Mongoose schemas & data models
├── hooks/                # Custom React hooks
├── utils/                # Helper functions and validators
├── public/               # Static assets, icons, and branding images
├── styles/               # Global CSS and animation configurations
└── README.md
```
⚙️ Getting Started
Follow these steps to set up and run ShopVerse locally on your machine.

Prerequisites
Ensure you have the following installed:

Node.js (v18.x or later)

npm, pnpm, or yarn

A running MongoDB instance (local or MongoDB Atlas cluster)

A Cloudinary account for media uploads

Installation & Setup
Clone the Repository

Bash
git clone https://github.com/Aryan-Makhija/ShopVerse.git
cd shopverse
Install Dependencies

Bash
npm install
Configure Environment Variables
Create a .env.local file in the root directory and add your credentials:

Code snippet
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication & Secrets
JWT_SECRET=your_jwt_secret_key
Run the Development Server

Bash
npm run dev
Open http://localhost:3000 in your browser to view the application.

Build for Production

Bash
npm run build
npm start
📌 Dashboards & UI Highlights
Analytics Dashboards: Interactive graphs displaying monthly and yearly sales performance statistics.

Product Comparison Matrix: Dynamic side-by-side comparison tables for informed customer decisions.

Storefront Portals: Clean, modern merchant panels for seamless order processing and inventory updates.

🤝 Contributing
Contributions, bug reports, and feature suggestions are always welcome!

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

💬 Support
For questions, feedback, or collaboration opportunities, feel free to open an issue on the repository or reach out directly.
