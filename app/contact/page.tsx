"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { PageBanner } from "@/components/common/PageBanner";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+1 (800) 123-4567", href: "tel:+18001234567" },
  { icon: Mail, label: "Email", value: "support@sheshamwood.com", href: "mailto:support@sheshamwood.com" },
  { icon: MapPin, label: "Address", value: "123 Furniture Avenue, Design District, NY 10001", href: "#map" },
  { icon: Clock, label: "Business Hours", value: "Mon–Sat: 9 AM – 8 PM, Sunday: Closed", href: undefined },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="We'd love to hear from you. Whether it's a product question, feedback, or a custom order — our team is here to help."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="section-padding" aria-labelledby="contact-heading">
        <div className="container-default">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <SectionHeader
                label="Get in Touch"
                title="Send Us a Message"
                subtitle="Fill out the form below and we'll get back to you within 24 hours."
                align="left"
                className="mb-8"
              />

              {submitted ? (
                <div className="bg-card border border-border/60 rounded-2xl p-10 text-center shadow-sm">
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <Input id="contact-name" type="text" placeholder="Your full name" required className="h-11" aria-required="true" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
                      <Input id="contact-email" type="email" placeholder="you@example.com" required className="h-11" aria-required="true" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                      <Input id="contact-phone" type="tel" placeholder="+92 300 1234567" className="h-11" />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                      <select id="contact-subject" required className="w-full h-11 border border-input bg-background rounded-md px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" aria-required="true">
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="order-status">Order Status</option>
                        <option value="custom-order">Custom Order</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help…"
                      required
                      className="w-full border border-input bg-background rounded-md px-3 py-2.5 text-sm text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-required="true"
                    />
                  </div>
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8">
                    <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact cards */}
              <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm space-y-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">Contact Information</h3>
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors focus-brand rounded">{item.value}</a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/18001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-2xl p-5 hover:shadow-md transition-shadow focus-brand"
                aria-label="Chat with us on WhatsApp"
              >
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Chat on WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Get instant replies. Available Mon–Sat.</p>
                </div>
              </a>

              {/* Map placeholder */}
              <div id="map" className="rounded-2xl overflow-hidden border border-border/60 bg-muted aspect-[4/3] flex items-center justify-center shadow-sm">
                <div className="text-center text-muted-foreground/40 p-6">
                  <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" aria-hidden="true" />
                  <p className="text-sm font-medium">Google Maps Embed</p>
                  <p className="text-xs mt-1">Will be integrated with live map</p>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm">
                <p className="text-sm font-semibold text-foreground mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {["Facebook", "Instagram", "YouTube", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="flex-1 py-2 text-center text-xs font-medium rounded-lg border border-border/60 hover:bg-primary/5 hover:border-primary/40 transition-all focus-brand text-muted-foreground hover:text-foreground"
                      aria-label={`Follow us on ${social}`}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
