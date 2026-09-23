/**
 * ====================================================================
 * SUPABASE CLIENT & CLOUD SYNC FOR DEALNEST / SMARTNEST
 * ====================================================================
 * Manages cloud database connectivity, real-time fetching, and
 * saving referral links & settings so live site updates for all users.
 */

const SUPABASE_STORAGE_KEY = 'dealnest_supabase_config';

// Default static config (Can be overridden via admin panel or direct edit)
window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: '',
  anonKey: ''
};

// Retrieve active credentials from localStorage or static config
function getActiveSupabaseConfig() {
  try {
    const cached = localStorage.getItem(SUPABASE_STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse cached Supabase config', e);
  }
  return window.SUPABASE_CONFIG;
}

let _supabaseInstance = null;

// Initialize or return existing Supabase client
function getSupabaseClient() {
  if (_supabaseInstance) return _supabaseInstance;

  const cfg = getActiveSupabaseConfig();
  if (!cfg.url || !cfg.anonKey) {
    return null;
  }

  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      _supabaseInstance = window.supabase.createClient(cfg.url, cfg.anonKey);
      return _supabaseInstance;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      return null;
    }
  } else {
    console.warn('Supabase JS library (@supabase/supabase-js) is not loaded.');
    return null;
  }
}

// Check if Supabase credentials are configured
function isSupabaseConfigured() {
  const cfg = getActiveSupabaseConfig();
  return Boolean(cfg.url && cfg.anonKey && cfg.url.startsWith('https://'));
}

// Save credentials (used by admin panel)
function saveSupabaseCredentials(url, anonKey) {
  const cleanUrl = (url || '').trim().replace(/\/+$/, '');
  const cleanKey = (anonKey || '').trim();

  const cfg = { url: cleanUrl, anonKey: cleanKey };
  localStorage.setItem(SUPABASE_STORAGE_KEY, JSON.stringify(cfg));
  window.SUPABASE_CONFIG = cfg;
  _supabaseInstance = null; // Reset instance so it re-initializes
  return getSupabaseClient();
}

// Fetch all deals from Supabase
async function fetchDealsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('deals')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.warn('Supabase fetchDeals error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      // Map DB column names to frontend product structure
      return data.map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        store: row.store || 'Amazon',
        originalPrice: row.original_price,
        dealPrice: row.deal_price,
        discount: row.discount,
        rating: row.rating || '4.8',
        reviewsCount: row.reviews_count || '1,000+',
        badge: row.badge || '🔥 Top Deal',
        image: row.image,
        affiliateUrl: row.affiliate_url || '',
        isTopPick: Boolean(row.is_top_pick),
        sortOrder: row.sort_order || 0
      }));
    }
    return [];
  } catch (err) {
    console.error('Unexpected error fetching deals from Supabase:', err);
    return null;
  }
}

// Fetch site settings (amazonTag, siteName, etc.)
async function fetchSettingsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('site_settings').select('*');
    if (error) {
      console.warn('Supabase fetchSettings error:', error.message);
      return null;
    }
    const settings = {};
    if (data) {
      data.forEach(item => {
        settings[item.key] = item.value;
      });
    }
    return settings;
  } catch (err) {
    console.error('Error fetching settings from Supabase:', err);
    return null;
  }
}

// Save or update an individual deal
async function saveDealToSupabase(deal) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase not connected' };

  try {
    const row = {
      id: deal.id,
      title: deal.title,
      category: deal.category || 'amazon-deals',
      store: deal.store || 'Amazon',
      original_price: deal.originalPrice || '',
      deal_price: deal.dealPrice || '',
      discount: deal.discount || '',
      rating: deal.rating || '4.8',
      reviews_count: deal.reviewsCount || '1,000+',
      badge: deal.badge || '🔥 Top Deal',
      image: deal.image || '',
      affiliate_url: deal.affiliateUrl || '',
      is_top_pick: Boolean(deal.isTopPick),
      sort_order: deal.sortOrder !== undefined ? deal.sortOrder : 0,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await client
      .from('deals')
      .upsert(row, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to save deal to Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Save or update a site setting
async function saveSettingToSupabase(key, value) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase not connected' };

  try {
    const { data, error } = await client
      .from('site_settings')
      .upsert(
        { key, value: String(value), updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      );

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error(`Failed to save setting ${key} to Supabase:`, err);
    return { success: false, error: err.message };
  }
}

// Batch sync all default products & settings to Supabase
async function syncAllDealsToSupabase(products, amazonTag) {
  const client = getSupabaseClient();
  if (!client) return { success: false, error: 'Supabase not connected' };

  try {
    // 1. Save amazonTag
    if (amazonTag) {
      await saveSettingToSupabase('amazon_tag', amazonTag);
    }

    // 2. Format products
    const rows = products.map((deal, idx) => ({
      id: deal.id,
      title: deal.title,
      category: deal.category || 'amazon-deals',
      store: deal.store || 'Amazon',
      original_price: deal.originalPrice || '',
      deal_price: deal.dealPrice || '',
      discount: deal.discount || '',
      rating: deal.rating || '4.8',
      reviews_count: deal.reviewsCount || '1,000+',
      badge: deal.badge || '🔥 Top Deal',
      image: deal.image || '',
      affiliate_url: deal.affiliateUrl || '',
      is_top_pick: Boolean(deal.isTopPick),
      sort_order: idx,
      updated_at: new Date().toISOString()
    }));

    const { data, error } = await client
      .from('deals')
      .upsert(rows, { onConflict: 'id' });

    if (error) throw error;
    return { success: true, count: rows.length };
  } catch (err) {
    console.error('Error syncing all deals to Supabase:', err);
    return { success: false, error: err.message };
  }
}

// Export functions to window for global access
window.DealNestDB = {
  isConfigured: isSupabaseConfigured,
  getClient: getSupabaseClient,
  getActiveConfig: getActiveSupabaseConfig,
  saveCredentials: saveSupabaseCredentials,
  fetchDeals: fetchDealsFromSupabase,
  fetchSettings: fetchSettingsFromSupabase,
  saveDeal: saveDealToSupabase,
  saveSetting: saveSettingToSupabase,
  syncAllDeals: syncAllDealsToSupabase
};
