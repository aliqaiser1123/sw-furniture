/**
 * Email Provider Abstraction
 * Decoupled from any specific email vendor.
 * Swap implementation by changing the active provider below.
 * Supported: Resend, SendGrid, Postmark (all future — stubs now)
 */

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ─────────────────────────────────────────────────────────────
// Provider Interface
// ─────────────────────────────────────────────────────────────

interface EmailProvider {
  send(payload: EmailPayload): Promise<EmailResult>;
}

// ─────────────────────────────────────────────────────────────
// Console Provider (Development / Stub)
// ─────────────────────────────────────────────────────────────

const consoleProvider: EmailProvider = {
  async send(payload) {
    console.info("[EMAIL STUB] Would send email:", {
      to: payload.to,
      subject: payload.subject,
    });
    return { success: true, messageId: `stub-${Date.now()}` };
  },
};

// ─────────────────────────────────────────────────────────────
// Resend Provider (Uncomment when RESEND_API_KEY is available)
// ─────────────────────────────────────────────────────────────
/*
import { Resend } from "resend";
const resendClient = new Resend(process.env.RESEND_API_KEY);

const resendProvider: EmailProvider = {
  async send(payload) {
    try {
      const { data, error } = await resendClient.emails.send({
        from: payload.from || "Shesham Wood <noreply@sheshamwood.com>",
        to: Array.isArray(payload.to) ? payload.to : [payload.to],
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });
      if (error) return { success: false, error: error.message };
      return { success: true, messageId: data?.id };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
*/

// ─────────────────────────────────────────────────────────────
// Active Provider
// ─────────────────────────────────────────────────────────────

const activeProvider: EmailProvider = consoleProvider;
// When ready: const activeProvider = resendProvider;

export const email = {
  send: (payload: EmailPayload) => activeProvider.send(payload),
};

// ─────────────────────────────────────────────────────────────
// Templates
// ─────────────────────────────────────────────────────────────

export function orderConfirmationTemplate(data: {
  customerName: string;
  orderNumber: string;
  orderTotal: number;
  items: { name: string; quantity: number; unitPrice: number }[];
}) {
  const itemRows = data.items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${i.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">Rs. ${(i.unitPrice * i.quantity).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  return {
    subject: `Order Confirmed — ${data.orderNumber} | Shesham Wood Furniture`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#222;">
        <div style="background:#3c3530;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Shesham Wood Furniture</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2>Order Confirmed!</h2>
          <p>Hi ${data.customerName}, thank you for your order.</p>
          <p><strong>Order Number:</strong> ${data.orderNumber}</p>
          <table style="width:100%;border-collapse:collapse;margin:24px 0;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:8px;text-align:left;">Product</th>
                <th style="padding:8px;text-align:center;">Qty</th>
                <th style="padding:8px;text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding:12px 8px;text-align:right;font-weight:bold;">Grand Total:</td>
                <td style="padding:12px 8px;text-align:right;font-weight:bold;">Rs. ${data.orderTotal.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
          <p>We will notify you when your order is shipped.</p>
          <p style="color:#888;font-size:12px;">© ${new Date().getFullYear()} Shesham Wood Furniture. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Order Confirmed — ${data.orderNumber}. Total: Rs. ${data.orderTotal.toLocaleString()}`,
  };
}
