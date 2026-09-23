# SmartNest Guide — Amazon Affiliate Hub

A modern, mobile-friendly Amazon affiliate landing page and link hub designed for Instagram and social media sharing.

---

## 🎨 Design System & Colors
Built strictly with the custom curated palette:
- **Ivory (`#FAF9F6`)**: Background & serene canvas
- **Deep Green (`#174C3C`)**: Main brand color, headings, high-contrast actions
- **Sage (`#E8F0EA`)**: Pill buttons, soft badges, card accents
- **Warm Orange (`#F4A340`)**: Primary CTA highlights, stars, deal indicators
- **White (`#FFFFFF`)**: Clean card surfaces and content cards

---

## 🚀 How to Run Locally

You can open `index.html` directly in your web browser, or serve it locally:

```bash
# Using Node.js http-server
npx -y http-server . -p 8089
```
- **User Website**: `http://localhost:8089/index.html`
- **Admin Dashboard**: `http://localhost:8089/admin.html`

---

## ⚡ Admin Dashboard (`admin.html`)

You do NOT need to touch any code! Simply open **[`admin.html`](file:///c:/Users/shame/Amazon/admin.html)** in your browser:

1. **Top Flash Deal Promo Banner**:
   - Paste any Amazon affiliate link (e.g. `https://amzn.to/...`) and write your offer headline (e.g. *"Limited Time: 40% Off Home Finds"*).
   - Click **“⚡ Publish Flash Banner”** — it lights up immediately across the top of your live website!
2. **Product Links**:
   - View every product card and simply paste your affiliate link next to it. Click **Save** and it updates the "Shop Now" button on the live site.
3. **Amazon Banners & Ads**:
   - Paste raw Amazon banner iframe codes or Amazon Native Shopping Ads into the designated slot boxes.
4. **Amazon Tag**:
   - Enter your `yourtag-20` ID once to apply it across search buttons.

### 1. Set Your Amazon Associates Tracking ID
Open `affiliate-config.js` and edit line 14:
```javascript
amazonTag: "yourtag-20",
```
This tracking ID is automatically applied to search buttons and fallback Amazon URLs.

### 2. Add / Edit Products
In `affiliate-config.js`, modify the `products` array. Each item has:
```javascript
{
  id: "unique-id",
  category: "trending", // "trending", "home", "tech", or "gifts"
  title: "Product Name",
  subtitle: "Short description / feature",
  priceEst: "$29.99",
  rating: "4.8",
  reviewsCount: "3,400",
  badge: "Best Seller", // Optional badge
  badgeType: "orange",  // "orange" or "green"
  image: "https://images.unsplash.com/...", // Product or lifestyle image URL
  affiliateUrl: "https://www.amazon.com/dp/B0XXXXX?tag=yourtag-20", // Direct affiliate link
  isTrending: true
}
```

### 3. Add Amazon Banners & Native Shopping Widgets
In `affiliate-config.js`, under `bannerSlots`:
- `featuredDealsBanner`: Large widget slot in the Featured Deals section.
- `homeBanner`: Banner slot under Home & Lifestyle.
- `techBanner`: Banner slot under Tech & Gadgets.
- `giftsBanner`: Banner slot under Gift Ideas.

Simply paste the HTML embed snippet or iframe from your Amazon Associates dashboard into these slots.

---

## 📱 Social Media & Instagram Bio Optimization
- **Mobile First**: Features horizontal touch-friendly category scrolling pills, fast responsive search, and bottom sticky quick-navigation for mobile devices.
- **In-App Modals**: Privacy Policy, Terms of Service, About, and Affiliate Disclosure open in smooth modal overlays so Instagram users do not navigate away or lose their place.
- **Compliant Disclosures**: Includes the required statement:
  > *“As an Amazon Associate I earn from qualifying purchases.”*
  along with `rel="sponsored noopener nofollow"` attributes on all affiliate links.

---

## 🌐 Free Hosting Options for Your Instagram Bio
1. **GitHub Pages**: Push this folder to a GitHub repository and turn on GitHub Pages in repository settings.
2. **Netlify / Vercel**: Drag and drop this folder onto [netlify.com/drop](https://app.netlify.com/drop) or deploy via Vercel for free instant SSL and custom domain support.
