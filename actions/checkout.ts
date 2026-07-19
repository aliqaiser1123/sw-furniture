"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

interface CheckoutData {
  address: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    quantity: number;
    price: number;
    salePrice?: number | null;
  }[];
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export async function createOrder(data: CheckoutData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { error: "You must be logged in to place an order." };
    }

    if (!data.items || data.items.length === 0) {
      return { error: "Your cart is empty." };
    }

    const userId = session.user.id;

    // Generate unique order number (e.g., ORD-20260718-XXXX)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `ORD-${dateStr}-${randomStr}`;

    // Execute within a transaction to ensure atomic operations (stock deduction + order creation)
    const result = await db.$transaction(async (tx) => {
      
      // 1. Verify stock for all items
      for (const item of data.items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
          select: { stock: true, name: true }
        });
        
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}. Only ${product.stock} available.`);
        }
      }

      // 2. Create Address
      const address = await tx.address.create({
        data: {
          userId,
          fullName: data.address.fullName,
          phone: data.address.phone,
          address: data.address.address,
          city: data.address.city,
          province: data.address.province,
          postalCode: data.address.postalCode,
          country: data.address.country,
        }
      });

      // 3. Create Order & Items
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          addressId: address.id,
          subtotal: data.subtotal,
          tax: data.tax,
          shipping: data.shipping,
          total: data.total,
          orderStatus: "PENDING",
          paymentStatus: "PENDING",
          items: {
            create: data.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.salePrice || item.price,
            }))
          },
          payments: {
            create: {
              paymentMethod: data.paymentMethod,
              amount: data.total,
              paymentStatus: "PENDING"
            }
          }
        }
      });

      // 4. Deduct Stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return order;
    });

    return { success: true, orderId: result.id, orderNumber: result.orderNumber };
  } catch (error: any) {
    console.error("Checkout error:", error);
    return { error: error.message || "Failed to place order." };
  }
}
