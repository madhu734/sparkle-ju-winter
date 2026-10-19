import {
  PB_URL,
  PB_PRODUCTS_COLLECTION,
  PB_HOODIES_COLLECTION,
  PB_ORDERS_COLLECTION,
  DEFAULT_UNIT_PRICE,
  JACKET_SIZES,
  HOODIE_SIZES
} from '../config/storeConfig';

/**
 * Fetch dynamic products & hoodies with multiple photos from PocketBase collections.
 * Supports multiple images (model photos, real fabric, inner lining, details).
 */
export async function fetchPocketBaseProducts() {
  if (!PB_URL || PB_URL.includes('your-coolify-domain.com')) return null;

  try {
    const cleanUrl = PB_URL.replace(/\/$/, '');

    // Fetch jackets and hoodies in parallel
    const [jacketsRes, hoodiesRes] = await Promise.allSettled([
      fetch(`${cleanUrl}/api/collections/${PB_PRODUCTS_COLLECTION}/records?perPage=50`),
      fetch(`${cleanUrl}/api/collections/${PB_HOODIES_COLLECTION}/records?perPage=50`)
    ]);

    const allItems = [];

    // Parse Jackets
    if (jacketsRes.status === 'fulfilled' && jacketsRes.value.ok) {
      const jacketsData = await jacketsRes.value.json();
      if (jacketsData?.items?.length > 0) {
        jacketsData.items.forEach((rec) => {
          const imagesList = [];
          if (Array.isArray(rec.images) && rec.images.length > 0) {
            rec.images.forEach((img) => {
              if (img) imagesList.push(`${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${img}`);
            });
          }
          if (imagesList.length === 0) {
            if (rec.back_image) imagesList.push(`${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.back_image}`);
            if (rec.front_image) imagesList.push(`${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.front_image}`);
          }

          allItems.push({
            id: rec.id,
            category: 'jacket',
            colorId: rec.jacket_color || 'Black',
            designId: rec.design_variant || 'design_01',
            stockType: rec.stock_type || 'regular_order',
            badgeEn: rec.badge_en || '',
            badgeBn: rec.badge_bn || '',
            availableSizes:
              Array.isArray(rec.available_sizes) && rec.available_sizes.length > 0
                ? rec.available_sizes
                : JACKET_SIZES,
            price: typeof rec.price === 'number' ? rec.price : DEFAULT_UNIT_PRICE,
            images: imagesList,
            primaryImage: imagesList[0] || '',
            back_image_url: rec.back_image
              ? `${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.back_image}`
              : (imagesList[0] || ''),
            front_image_url: rec.front_image
              ? `${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${rec.front_image}`
              : (imagesList[1] || imagesList[0] || '')
          });
        });
      }
    }

    // Parse Hoodies
    if (hoodiesRes.status === 'fulfilled' && hoodiesRes.value.ok) {
      const hoodiesData = await hoodiesRes.value.json();
      if (hoodiesData?.items?.length > 0) {
        hoodiesData.items.forEach((rec) => {
          const imagesList = [];
          if (Array.isArray(rec.images) && rec.images.length > 0) {
            rec.images.forEach((img) => {
              if (img) imagesList.push(`${cleanUrl}/api/files/${rec.collectionId}/${rec.id}/${img}`);
            });
          }

          allItems.push({
            id: rec.id,
            category: 'hoodie',
            colorId: rec.hoodie_color || 'Black',
            designId: rec.design_variant || 'design_01',
            stockType: rec.stock_type || 'regular_order',
            badgeEn: rec.badge_en || 'Hoodie',
            badgeBn: rec.badge_bn || 'হুডি',
            availableSizes:
              Array.isArray(rec.available_sizes) && rec.available_sizes.length > 0
                ? rec.available_sizes
                : HOODIE_SIZES,
            price: typeof rec.price === 'number' ? rec.price : DEFAULT_UNIT_PRICE,
            images: imagesList,
            primaryImage: imagesList[0] || '',
            back_image_url: imagesList[0] || '',
            front_image_url: imagesList[1] || imagesList[0] || ''
          });
        });
      }
    }

    if (allItems.length > 0) {
      return allItems;
    }
  } catch (error) {
    console.warn('PocketBase offline or unreachable. Using fallback catalog.', error);
  }
  return null;
}

/**
 * Submit an order to the PocketBase `orders` collection.
 * Returns true if successfully saved, false otherwise.
 */
export async function submitPocketBaseOrder(orderPayload) {
  if (!PB_URL || PB_URL.includes('your-coolify-domain.com')) {
    return false;
  }

  try {
    const payload = {
      ...orderPayload,
      item_type: orderPayload.category || orderPayload.item_type || 'jacket'
    };

    const res = await fetch(
      `${PB_URL.replace(/\/$/, '')}/api/collections/${PB_ORDERS_COLLECTION}/records`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    return res.ok;
  } catch (error) {
    console.error('Failed to submit order to PocketBase:', error);
    return false;
  }
}
