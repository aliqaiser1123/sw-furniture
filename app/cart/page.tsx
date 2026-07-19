"use client";

import { useCartStore } from "@/lib/store/cart";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const subtotal = getSubtotal();
  const tax = subtotal * 0.05; // 5% mock tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-default py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-heading mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you haven't added any premium furniture to your cart yet. Discover our latest collections.
        </p>
        <Link href="/shop" className="btn-primary">
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-default py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-heading mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-8">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center py-4 border-b">
                {/* Product Info */}
                <div className="col-span-1 md:col-span-6 flex gap-4">
                  <div className="relative w-24 h-24 bg-secondary/30 rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <Link href={`/product/${item.productId}`} className="font-heading text-lg hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">Status: {item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-destructive mt-2 flex items-center gap-1 w-fit hover:opacity-80 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>

                {/* Mobile Price Row (Hidden on Desktop) */}
                <div className="flex md:hidden justify-between items-center w-full mt-4">
                  <span className="font-medium text-muted-foreground">Rs. {item.salePrice || item.price}</span>
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-2 hover:bg-secondary transition-colors"
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden md:block col-span-2 text-right text-muted-foreground">
                  Rs. {(item.salePrice || item.price).toLocaleString()}
                </div>

                {/* Total */}
                <div className="col-span-1 md:col-span-2 text-right font-medium text-lg">
                  Rs. {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[380px] shrink-0">
          <div className="bg-card rounded-2xl border p-6 sticky top-24 shadow-sm">
            <h2 className="text-xl font-heading mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax (5%)</span>
                <span className="font-medium">Rs. {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">Rs. {total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground text-right">Taxes included</p>
            </div>

            <Button onClick={handleCheckout} className="w-full h-14 text-base" size="lg">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {!session && (
              <p className="text-xs text-center text-muted-foreground mt-4">
                You will be asked to log in or create an account to securely save your order.
              </p>
            )}

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Secure 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
