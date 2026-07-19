import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Download, Package, Truck, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
  }

  const order = await db.order.findUnique({
    where: { 
      id: resolvedParams.id,
      userId: session.user.id 
    },
    include: {
      address: true,
      items: {
        include: { product: true }
      },
      payments: true
    }
  });

  if (!order) {
    notFound();
  }

  // Simplified Status Tracker Logic
  const getStatusStep = (status: string) => {
    switch(status) {
      case "PENDING": return 1;
      case "PROCESSING": return 2;
      case "SHIPPED": return 3;
      case "DELIVERED": return 4;
      default: return 1;
    }
  };
  const currentStep = getStatusStep(order.orderStatus);

  return (
    <div className="container-default py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order <span className="font-medium text-foreground">{order.orderNumber}</span> has been received.
          </p>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-card border rounded-2xl p-6 md:p-10 mb-8 overflow-x-auto">
          <h2 className="text-lg font-heading mb-8">Order Status</h2>
          <div className="flex items-center min-w-[500px]">
            <div className={`flex flex-col items-center gap-2 flex-1 relative z-10 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <Receipt className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Order Placed</span>
            </div>
            <div className={`flex-1 h-1 -ml-6 -mr-6 z-0 ${currentStep >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
            
            <div className={`flex flex-col items-center gap-2 flex-1 relative z-10 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <Package className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div className={`flex-1 h-1 -ml-6 -mr-6 z-0 ${currentStep >= 3 ? 'bg-primary' : 'bg-secondary'}`} />
            
            <div className={`flex flex-col items-center gap-2 flex-1 relative z-10 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Shipped</span>
            </div>
            <div className={`flex-1 h-1 -ml-6 -mr-6 z-0 ${currentStep >= 4 ? 'bg-primary' : 'bg-secondary'}`} />
            
            <div className={`flex flex-col items-center gap-2 flex-1 relative z-10 ${currentStep >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Delivered</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="bg-card border rounded-2xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-heading">Order Summary</h2>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Download className="w-4 h-4 mr-2" /> Invoice
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">{item.quantity}x</span>
                    <span className="font-medium">{item.product?.name || "Unknown Product"}</span>
                  </div>
                  <span>Rs. {(item.unitPrice * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>Rs. {order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Rs. {order.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3 border-t text-foreground">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading mb-4">Shipping Address</h2>
              {order.address ? (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">{order.address.fullName}</p>
                  <p>{order.address.address}</p>
                  <p>{order.address.city}, {order.address.province} {order.address.postalCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No address provided.</p>
              )}
            </div>

            <div className="bg-card border rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading mb-4">Payment Method</h2>
              {order.payments[0] ? (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground capitalize">{order.payments[0].paymentMethod.replace("_", " ")}</p>
                  <p>Status: <span className="font-medium">{order.payments[0].paymentStatus}</span></p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No payment record found.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
