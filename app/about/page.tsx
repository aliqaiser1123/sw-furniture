import type { Metadata } from "next";
import { CheckCircle, Leaf, Award, Heart } from "lucide-react";
import { PageBanner } from "@/components/common/PageBanner";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FeatureCard } from "@/components/common/FeatureCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Craftsmanship",
  description:
    "Discover the story behind Shesham Wood Furniture. 15+ years of crafting premium Sheesham wood furniture with passion, tradition, and excellence.",
  openGraph: {
    title: "About Shesham Wood Furniture",
    description: "15+ years of handcrafted Sheesham wood furniture excellence.",
    url: `${siteConfig.url}/about`,
  },
  alternates: { canonical: `${siteConfig.url}/about` },
};

const milestones = [
  { year: "2008", event: "Founded with a single workshop in Lahore" },
  { year: "2012", event: "Expanded to 3 showrooms across Punjab" },
  { year: "2015", event: "Launched online catalog and nationwide delivery" },
  { year: "2018", event: "Introduced the Royal Collection — sold out in 6 weeks" },
  { year: "2021", event: "Reached 5,000 satisfied customers milestone" },
  { year: "2024", event: "Launched flagship e-commerce platform" },
  { year: "2026", event: "Introducing AI-powered room design tools" },
];

const values = [
  { icon: Leaf, title: "Sustainability", description: "We source Sheesham wood responsibly from managed forests, minimizing environmental impact while maximizing natural beauty." },
  { icon: Award, title: "Excellence", description: "Every piece undergoes a rigorous 17-point quality inspection before leaving our workshop." },
  { icon: Heart, title: "Passion", description: "Our artisans bring decades of learned skill and deep personal pride to every joint, curve, and finish." },
  { icon: CheckCircle, title: "Integrity", description: "Transparent pricing, honest materials, genuine craftsmanship. No shortcuts, no imitations." },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Shesham Wood Furniture",
  url: `${siteConfig.url}/about`,
  description: "The story, mission, and craftsmanship behind Shesham Wood Furniture.",
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    foundingDate: "2008",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 50 },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <PageBanner
        title="Our Story"
        subtitle="Born from a passion for wood and a respect for tradition — Shesham Wood Furniture has been crafting homes since 2008."
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Story Section */}
      <section className="section-padding" aria-labelledby="story-heading">
        <div className="container-default">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <SectionHeader
                label="Our Story"
                title="Where Tradition Meets Modern Excellence"
                align="left"
                className="mb-7"
              />
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  It began in 2008 with a small workshop in Lahore, a handful of skilled craftsmen, and an unwavering belief that Pakistani furniture could rival the world&apos;s finest. Our founder, raised among the workshops of skilled artisans, saw untapped potential in the Sheesham wood that grows abundantly across the Punjab plains.
                </p>
                <p>
                  Sheesham — known internationally as Indian Rosewood — is renowned for its exceptional hardness, beautiful grain patterns, and natural resistance to decay. In the hands of skilled craftsmen, it becomes something extraordinary.
                </p>
                <p>
                  Today, Shesham Wood Furniture employs over 50 master craftsmen and has delivered premium furniture to more than 10,000 homes across Pakistan. Our mission remains unchanged: to create furniture that outlives trends, outlasts generations, and brings lasting joy to every home.
                </p>
              </div>
            </div>
            {/* Placeholder for a workshop image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-secondary via-muted to-secondary/60 overflow-hidden shadow-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground/30 p-10">
                  <div className="text-7xl mb-4 select-none" aria-hidden="true">🪵</div>
                  <p className="text-sm tracking-wider uppercase font-medium">Workshop Photography</p>
                </div>
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl p-5 shadow-xl border border-border/40">
                <div className="font-heading text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years of Craft</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary/30" aria-labelledby="mission-heading">
        <div className="container-default">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: "mission-heading",
                label: "Our Mission",
                title: "Craft for Life",
                body: "To deliver beautifully crafted Sheesham wood furniture through a digital experience that combines transparency, quality, technology, and outstanding customer service. Every product should communicate craftsmanship. Every page should communicate trust.",
              },
              {
                id: "vision-heading",
                label: "Our Vision",
                title: "Inspiring Living Spaces",
                body: "To become Pakistan&apos;s most inspiring premium furniture platform where technology enhances craftsmanship and every customer enjoys an exceptional purchasing experience — from discovery to delivery and beyond.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl border border-border/60 p-8 md:p-10 shadow-sm"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/80 bg-primary/8 px-3 py-1 rounded-full">
                  {item.label}
                </span>
                <h2
                  id={item.id}
                  className="font-heading text-3xl font-semibold text-foreground mt-5 mb-4"
                >
                  {item.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: item.body }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sheesham */}
      <section className="section-padding" aria-labelledby="sheesham-heading">
        <div className="container-default">
          <SectionHeader
            label="The Wood"
            title="Why Sheesham?"
            subtitle="Not all wood is created equal. Sheesham's unique properties make it the undisputed choice for heirloom-quality furniture."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Exceptional Hardness", desc: "Janka hardness of 1660 lbf — harder than oak, teak, and maple. Built to last for generations." },
              { title: "Stunning Grain", desc: "Each piece of Sheesham has unique grain patterns ranging from straight to interlocked — no two pieces are alike." },
              { title: "Natural Durability", desc: "Naturally resistant to rot, decay, and insects. Sheesham thrives without chemical treatments." },
              { title: "Ages Beautifully", desc: "Unlike many woods that fade, Sheesham deepens in color and character with age — becoming more beautiful over time." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-secondary/20" aria-labelledby="values-heading">
        <div className="container-default">
          <SectionHeader
            label="Our Values"
            title="What We Stand For"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <FeatureCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
                variant="bordered"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" aria-labelledby="journey-heading">
        <div className="container-default">
          <SectionHeader
            label="Our Journey"
            title="Milestones That Matter"
            className="mb-14"
          />

          <ol className="relative border-l-2 border-primary/20 ml-4 md:ml-8" aria-label="Company timeline">
            {milestones.map((m, i) => (
              <li key={m.year} className="mb-8 ml-6 md:ml-8 last:mb-0">
                <span className="absolute -left-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary ring-4 ring-background shadow" aria-hidden="true">
                  <span className="text-primary-foreground text-[10px] font-bold">{i + 1}</span>
                </span>
                <time
                  dateTime={m.year}
                  className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2"
                >
                  {m.year}
                </time>
                <p className="text-base text-foreground font-medium">{m.event}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
