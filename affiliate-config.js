/**
 * ====================================================================
 * BLOCKBUSTER DEALS - CONFIGURATION & DEALS DATABASE
 * ====================================================================
 * 
 * 📌 HOW TO CUSTOMIZE:
 * 1. Change `amazonTag` to your official Amazon Associates Store ID.
 * 2. Add or update deals in the `products` list with originalPrice, dealPrice,
 *    store, and categories (amazon-deals, branded-deals, clothing,
 *    electronics, furniture, household-and-kitchen, kids, shoes).
 * 3. Update `heroBanners` with promotional banners or deals.
 */

const AFFILIATE_CONFIG = {
  // Amazon Associate ID
  amazonTag: "smartnest-20",

  siteName: "DealNest",
  tagline: "America’s Best Deals, Codes and Coupons",
  disclaimer: "We may get paid by brands for deals, including promoted items",

  // Promotional Hero Banners for Carousel (Rich Visual Layout)
  heroBanners: [
    {
      id: "banner-1",
      badge: "⚡ FLASH DROP • ENDS TODAY",
      title: "Today's Lightning Deals & Instant Coupons",
      subtitle: "Save up to 60% on top-rated electronics, audio gear & home upgrades.",
      coupon: "DEALNEST20",
      perks: ["Amazon Prime 1-Day", "Instant Discount"],
      ctaText: "Shop Lightning Deals",
      url: "https://www.amazon.com/s?k=lightning+deals",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=350&q=80",
      image2: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=350&q=80",
      floatingTag: "🔥 Up to 60% OFF",
      bgGradient: "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 40%, #FFEDD5 100%)",
      accentColor: "#C2410C"
    },
    {
      id: "banner-2",
      badge: "📦 PRIME EXCLUSIVE BARGAINS",
      title: "Handpicked Amazon Finds Under $25",
      subtitle: "Everyday essentials, viral skincare & kitchen gadgets tested by our editors.",
      coupon: "PRIMEBEST",
      perks: ["Lowest 30-Day Price", "4.8★ Verified"],
      ctaText: "Explore Under $25",
      url: "https://www.amazon.com/s?k=deals+under+25",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=350&q=80",
      image2: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=350&q=80",
      floatingTag: "✨ From $6.99",
      bgGradient: "linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 40%, #DCFCE7 100%)",
      accentColor: "#15803D"
    },
    {
      id: "banner-3",
      badge: "🏷️ BRANDED CLEARANCE & OUTLET",
      title: "Branded Mega Savings: Woot & Outlet",
      subtitle: "Authentic luxury perfumes, running sneakers & designer accessories.",
      coupon: "BRAND15",
      perks: ["100% Authentic", "Limited Stock"],
      ctaText: "Shop Brand Outlets",
      url: "https://www.amazon.com/s?k=brand+deals",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=350&q=80",
      image2: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=350&q=80",
      floatingTag: "💥 40% - 70% OFF",
      bgGradient: "linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 40%, #DBEAFE 100%)",
      accentColor: "#1D4ED8"
    }
  ],

  // Categories list matching Blockbuster Deals
  categories: [
    { id: "all", name: "All", icon: "✨" },
    { id: "amazon-deals", name: "Amazon Deals", icon: "📦" },
    { id: "branded-deals", name: "Branded Deals", icon: "🏷️" },
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "electronics", name: "Electronics", icon: "🎧" },
    { id: "furniture", name: "Furniture", icon: "🛋️" },
    { id: "household-and-kitchen", name: "Household and Kitchen", icon: "🍳" },
    { id: "kids", name: "Kids", icon: "🧸" },
    { id: "shoes", name: "Shoes", icon: "👟" }
  ],

  // Products & Deals matching the exact Blockbuster Deals model
  products: []
};

if (typeof window !== "undefined") {
  window.AFFILIATE_CONFIG = AFFILIATE_CONFIG;
}
