import { Creator, MerchProduct, InstagramMediaItem, FanSubmission, RevenueBreakdown } from './types';
import { MOCK_CREATORS, MOCK_PRODUCTS, MOCK_INSTAGRAM_MEDIA, MOCK_FAN_SUBMISSIONS } from './mockData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchCreators(): Promise<Creator[]> {
  try {
    const res = await fetch(`${API_BASE}/creators`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("Backend API not reachable, using mock creators", err);
  }
  return MOCK_CREATORS;
}

export async function fetchCreatorByUsername(username: string): Promise<Creator | null> {
  try {
    const res = await fetch(`${API_BASE}/creators/${username}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend API not reachable, finding mock creator for ${username}`);
  }
  const found = MOCK_CREATORS.find(c => c.username.toLowerCase() === username.toLowerCase());
  return found || null;
}

export async function fetchProducts(creatorId?: string): Promise<MerchProduct[]> {
  try {
    const url = creatorId ? `${API_BASE}/products?creatorId=${creatorId}` : `${API_BASE}/products`;
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API not reachable, using mock products");
  }
  if (creatorId) {
    return MOCK_PRODUCTS.filter(p => p.creatorId === creatorId);
  }
  return MOCK_PRODUCTS;
}

export async function fetchProductById(id: string): Promise<MerchProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend API not reachable, finding mock product");
  }
  return MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
}

export async function calculateRevenueBreakdown(
  price: number,
  creatorSplit: number = 70.0,
  isFanSubmission: boolean = false
): Promise<RevenueBreakdown> {
  try {
    const res = await fetch(`${API_BASE}/revenue/preview?price=${price}&creatorSplit=${creatorSplit}&isFanSubmission=${isFanSubmission}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // fallback client-side calculation matching backend formula
  }

  const baseCost = 350; // ₹350
  const gatewayFee = Math.round((price * 0.02 + 3) * 100) / 100;
  const directCosts = baseCost + gatewayFee;
  const grossMargin = Math.max(0, price - directCosts);
  const platformFee = Math.round(grossMargin * 0.12 * 100) / 100;
  const netPool = Math.max(0, grossMargin - platformFee);
  const fanShare = isFanSubmission ? Math.round(netPool * 0.15 * 100) / 100 : 0;
  const creatorProfit = Math.round((netPool - fanShare) * (creatorSplit / 100) * 100) / 100;

  return {
    retailPrice: price,
    baseProductionCost: baseCost,
    paymentGatewayFee: gatewayFee,
    platformFee: platformFee,
    grossMargin: grossMargin,
    creatorProfit: creatorProfit,
    fanCoCreatorShare: fanShare,
    currency: "INR"
  };
}

export async function submitOrder(orderData: any) {
  try {
    const res = await fetch(`${API_BASE}/orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn("Using offline simulated order checkout");
  }

  return {
    success: true,
    orderNumber: `WG-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(1000 + Math.random() * 9000)}`,
    podJobId: `POD_GELATO_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
    trackingUrl: `https://tracking.weargram.dev/track`,
    revenueBreakdown: await calculateRevenueBreakdown(orderData.totalAmount || 799)
  };
}

export async function submitFanDesign(data: any) {
  try {
    const res = await fetch(`${API_BASE}/fan-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Using offline mock fan submission");
  }
  return { success: true, submissionId: `fs_${Date.now()}` };
}
