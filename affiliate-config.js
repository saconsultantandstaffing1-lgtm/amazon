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
  products: [
    {
      id: "bb-1",
      category: "household-and-kitchen",
      title: "La Roche-Posay Toleriane Purifying Foaming Facial Cleanser with Niacinamide",
      originalPrice: "$19.00",
      dealPrice: "$14.00",
      discount: "26% OFF",
      store: "Amazon",
      badge: "New",
      badgeType: "new",
      rating: "4.8",
      reviewsCount: "18,420",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=la+roche+posay+toleriane+purifying+foaming+cleanser",
      isTopPick: true
    },
    {
      id: "bb-2",
      category: "branded-deals",
      title: "Marc Jacobs Perfect Women EDP Spray, 100-mL",
      originalPrice: "$160.00",
      dealPrice: "$62.00",
      discount: "61% OFF",
      store: "Woot",
      badge: "Hot Deal",
      badgeType: "hot",
      rating: "4.7",
      reviewsCount: "2,150",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=marc+jacobs+perfect+edp+spray",
      isTopPick: true
    },
    {
      id: "bb-3",
      category: "kids",
      title: "Montessori Busy Book, 8-Page Sensory Activity Toy for Toddlers",
      originalPrice: "$19.00",
      dealPrice: "$9.00",
      discount: "53% OFF",
      store: "Amazon",
      badge: "New",
      badgeType: "new",
      rating: "4.9",
      reviewsCount: "3,890",
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=montessori+busy+book+sensory+toy",
      isTopPick: true
    },
    {
      id: "bb-4",
      category: "household-and-kitchen",
      title: "Aveeno Daily Moisturizing Face Lotion, Fragrance-Free, 5 oz",
      originalPrice: "$11.00",
      dealPrice: "$7.00",
      discount: "36% OFF",
      store: "Amazon",
      badge: "Popular",
      badgeType: "deal",
      rating: "4.7",
      reviewsCount: "14,200",
      image: "https://images.unsplash.com/photo-1608248597359-57e0549c4d29?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=aveeno+daily+moisturizing+face+lotion",
      isTopPick: false
    },
    {
      id: "bb-5",
      category: "shoes",
      title: "Saucony Shadow Original Unisex Heritage Running Shoes",
      originalPrice: "$100.00",
      dealPrice: "$39.00",
      discount: "61% OFF",
      store: "Woot",
      badge: "61% OFF",
      badgeType: "hot",
      rating: "4.6",
      reviewsCount: "4,320",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=saucony+shadow+original+shoes",
      isTopPick: true
    },
    {
      id: "bb-6",
      category: "household-and-kitchen",
      title: "Medicube Zero Pore Capsule Foam Cleanser & Purifying Wash",
      originalPrice: "$20.00",
      dealPrice: "$12.00",
      discount: "40% OFF",
      store: "Amazon",
      badge: "New",
      badgeType: "new",
      rating: "4.8",
      reviewsCount: "1,870",
      image: "https://images.unsplash.com/photo-1556228722-d0b719468962?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=medicube+zero+pore+foam+cleanser",
      isTopPick: false
    },
    {
      id: "bb-7",
      category: "furniture",
      title: "Greaton 0.75-Inch Vertical Solid Wooden Bunkie Board/Bed Slats, King, Grey",
      originalPrice: "$119.00",
      dealPrice: "$54.00",
      discount: "55% OFF",
      store: "Woot",
      badge: "55% OFF",
      badgeType: "hot",
      rating: "4.5",
      reviewsCount: "920",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=wooden+bunkie+board+bed+slats+king",
      isTopPick: false
    },
    {
      id: "bb-8",
      category: "branded-deals",
      title: "Coach Love Eau de Parfum Natural Spray 1.0 oz for Women",
      originalPrice: "$80.00",
      dealPrice: "$42.00",
      discount: "48% OFF",
      store: "Woot",
      badge: "Hot Deal",
      badgeType: "hot",
      rating: "4.8",
      reviewsCount: "1,240",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=coach+love+edp+spray+women",
      isTopPick: true
    },
    {
      id: "bb-9",
      category: "clothing",
      title: "Ekouaer Pajamas for Women Set Long Sleeve Lounge Set Soft Button Down PJs",
      originalPrice: "$42.00",
      dealPrice: "$13.00",
      discount: "69% OFF",
      store: "Amazon",
      badge: "New",
      badgeType: "new",
      rating: "4.7",
      reviewsCount: "8,950",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=ekouaer+pajamas+for+women+set+long+sleeve",
      isTopPick: true
    },
    {
      id: "bb-10",
      category: "electronics",
      title: "3-in-1 Foldable Fast Travel Wireless Charger for iPhone & Apple Watch",
      originalPrice: "$45.00",
      dealPrice: "$18.00",
      discount: "60% OFF",
      store: "Amazon",
      badge: "60% OFF",
      badgeType: "hot",
      rating: "4.8",
      reviewsCount: "7,430",
      image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=3+in+1+foldable+wireless+charging+station",
      isTopPick: true
    },
    {
      id: "bb-11",
      category: "electronics",
      title: "Active Noise-Cancelling Over-Ear Bluetooth Wireless Headphones with 50H Playtime",
      originalPrice: "$79.99",
      dealPrice: "$39.99",
      discount: "50% OFF",
      store: "Amazon",
      badge: "Top Pick",
      badgeType: "deal",
      rating: "4.8",
      reviewsCount: "11,200",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=active+noise+cancelling+headphones+over+ear",
      isTopPick: false
    },
    {
      id: "bb-12",
      category: "amazon-deals",
      title: "Minimalist Borosilicate Glass Cold Brew Pitcher with Removable Mesh Filter",
      originalPrice: "$35.00",
      dealPrice: "$16.50",
      discount: "53% OFF",
      store: "Amazon",
      badge: "Amazon Choice",
      badgeType: "deal",
      rating: "4.8",
      reviewsCount: "4,820",
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=cold+brew+maker+glass+pitcher",
      isTopPick: false
    },
    {
      id: "bb-13",
      category: "clothing",
      title: "Premium Fleece Lined Oversized Hoodie Sweatshirt with Front Pocket",
      originalPrice: "$48.00",
      dealPrice: "$22.00",
      discount: "54% OFF",
      store: "Amazon",
      badge: "Trending",
      badgeType: "new",
      rating: "4.6",
      reviewsCount: "5,310",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=oversized+fleece+hoodie+sweatshirt",
      isTopPick: false
    },
    {
      id: "bb-14",
      category: "shoes",
      title: "Cloud-Comfort Memory Foam Lightweight Walking Sneakers",
      originalPrice: "$65.00",
      dealPrice: "$28.00",
      discount: "57% OFF",
      store: "Amazon",
      badge: "57% OFF",
      badgeType: "hot",
      rating: "4.7",
      reviewsCount: "9,600",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=memory+foam+walking+sneakers",
      isTopPick: false
    },
    {
      id: "bb-15",
      category: "amazon-deals",
      title: "Smart Ambient Sunset Lamp Projector with 16 RGB Mood Colors",
      originalPrice: "$32.00",
      dealPrice: "$14.99",
      discount: "53% OFF",
      store: "Amazon",
      badge: "Viral Deal",
      badgeType: "new",
      rating: "4.8",
      reviewsCount: "6,200",
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80",
      affiliateUrl: "https://www.amazon.com/s?k=sunset+lamp+app+control",
      isTopPick: true
    }
  ]
};

if (typeof window !== "undefined") {
  window.AFFILIATE_CONFIG = AFFILIATE_CONFIG;
}
