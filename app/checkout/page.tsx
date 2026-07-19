"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { createOrder } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronRight, Loader2, CreditCard, Landmark, Wallet } from "lucide-react";

export default function CheckoutPage() {
  const { data: session, isPending } = authClient.useSession();
  const { items, getSubtotal, clearCart } = useCartStore();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Address Form State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  const subtotal = getSubtotal();
  const tax = subtotal * 0.05;
  const shipping = 1500; // Flat rate for now
  const total = subtotal + tax + shipping;

  // Auth Guard
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login?callbackUrl=/checkout");
    }
    if (!isPending && session && items.length === 0 && step === 1) {
      router.push("/cart");
    }
  }, [session, isPending, router, items, step]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await createOrder({
        address,
        items,
        paymentMethod,
        subtotal,
        tax,
        shipping,
        total,
      });

      if (result.error) {
        setError(result.error);
      } else if (result.orderId) {
        clearCart();
        router.push(`/order/${result.orderId}`);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-default py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading mb-8">Secure Checkout</h1>

        {/* Progress Tracker */}
        <div className="flex items-center gap-2 mb-12 text-sm font-medium overflow-x-auto pb-4">
          <div className={`flex items-center gap-2 shrink-0 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">1</span>
            Shipping
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className={`flex items-center gap-2 shrink-0 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary/10' : 'bg-secondary'}`}>2</span>
            Payment
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          <div className={`flex items-center gap-2 shrink-0 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary/10' : 'bg-secondary'}`}>3</span>
            Review
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Form Area */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* STEP 1: SHIPPING ADDRESS */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="space-y-6 bg-card p-6 rounded-2xl border">
                <h2 className="text-xl font-heading border-b pb-4">Shipping Address</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input required type="tel" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} placeholder="0300 1234567" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Street Address</label>
                  <Input required value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})} placeholder="House 123, Street 4, Phase 5" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} placeholder="Lahore" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Province</label>
                    <Input required value={address.province} onChange={(e) => setAddress({...address, province: e.target.value})} placeholder="Punjab" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Postal Code</label>
                    <Input required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} placeholder="54000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Input required disabled value={address.country} />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-4">Continue to Payment</Button>
              </form>
            )}

            {/* STEP 2: PAYMENT METHOD */}
            {step === 2 && (
              <div className="space-y-6 bg-card p-6 rounded-2xl border">
                <h2 className="text-xl font-heading border-b pb-4">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="bank_transfer" checked={paymentMethod === 'bank_transfer'} onChange={() => setPaymentMethod('bank_transfer')} className="w-4 h-4 text-primary" />
                        <Landmark className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Direct Bank Transfer</span>
                      </div>
                    </div>
                  </label>

                  <label className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === 'jazzcash' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="jazzcash" checked={paymentMethod === 'jazzcash'} onChange={() => setPaymentMethod('jazzcash')} className="w-4 h-4 text-primary" />
                        <Wallet className="w-5 h-5 text-red-600" />
                        <span className="font-medium">JazzCash Mobile Wallet</span>
                      </div>
                    </div>
                  </label>

                  <label className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === 'easypaisa' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="easypaisa" checked={paymentMethod === 'easypaisa'} onChange={() => setPaymentMethod('easypaisa')} className="w-4 h-4 text-primary" />
                        <Wallet className="w-5 h-5 text-green-600" />
                        <span className="font-medium">EasyPaisa Mobile Wallet</span>
                      </div>
                    </div>
                  </label>

                  <label className={`block cursor-pointer border rounded-xl p-4 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:border-muted-foreground'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-primary" />
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Credit / Debit Card</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button size="lg" onClick={() => setStep(3)} className="flex-1">Review Order</Button>
                </div>
              </div>
            )}

            {/* STEP 3: REVIEW */}
            {step === 3 && (
              <div className="space-y-6 bg-card p-6 rounded-2xl border">
                <h2 className="text-xl font-heading border-b pb-4">Review Your Order</h2>
                
                {error && (
                  <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6 bg-secondary/30 p-4 rounded-xl">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Shipping To:</h3>
                    <p className="font-medium">{address.fullName}</p>
                    <p className="text-sm">{address.address}, {address.city}</p>
                    <p className="text-sm">{address.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-1">Payment Method:</h3>
                    <p className="font-medium capitalize">{paymentMethod.replace("_", " ")}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" size="lg" onClick={() => setStep(2)} disabled={isSubmitting}>Back</Button>
                  <Button size="lg" onClick={handleSubmitOrder} disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
                    Confirm & Place Order
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Sticky Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-2xl border p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-heading mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.productId} className="flex gap-4">
                    <div className="w-16 h-16 bg-secondary/30 rounded-md overflow-hidden relative shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-right">
                      Rs. {((item.salePrice || item.price) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (Flat Rate)</span>
                  <span className="font-medium">Rs. {shipping.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
