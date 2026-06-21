/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoContent {
  id: string;
  sellerName: string;
  sellerHandle: string;
  verifyStatus: string;
  videoUrl: string;
  views: string;
  likes: string;
  pinnedProductName: string;
  pinnedProductPrice: number;
  pinnedProductOriginalPrice: number;
}

export interface OrderItem {
  id: string;
  buyerHandle: string;
  productName: string;
  amount: number;
  status: 'In Escrow' | 'Refunded' | 'Completed';
  createdDaysAgo: number;
}

export interface SellerStore {
  id: string;
  shopName: string;
  ownerName: string;
  handle: string;
  verifyStatus: 'None' | 'Blue' | 'Purple' | 'Green';
  isLocked: boolean;
  category: string;
  catalogCount: number;
  gstType?: 'company' | 'custom';
  gstNumber?: string;
  gstUpdated?: boolean;
  contactPhone?: string;
  address?: string;
  bio?: string;
  upiId?: string;
  bankDetails?: string;
  whatsappEnabled?: boolean;
  customAttributes?: Array<{ key: string, value: string }>;
}
