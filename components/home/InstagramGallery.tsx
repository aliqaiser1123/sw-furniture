import { Camera } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";

const galleryItems = [
  { id: 1, caption: "Royal Bedroom Set", aspectClass: "aspect-square" },
  { id: 2, caption: "Modern Living Room", aspectClass: "aspect-[4/5]" },
  { id: 3, caption: "Dining Room Elegance", aspectClass: "aspect-square" },
  { id: 4, caption: "Executive Office", aspectClass: "aspect-[3/4]" },
  { id: 5, caption: "Coffee Table Detail", aspectClass: "aspect-square" },
  { id: 6, caption: "Wardrobe Craftsmanship", aspectClass: "aspect-[4/5]" },
];

export function InstagramGallery() {
  return (
    <section className="section-padding" aria-labelledby="gallery-heading">
      <div className="container-default">
        <SectionHeader
          label="@SheshamWood"
          title="Follow Our Story"
          subtitle="See our furniture in real homes. Follow us on Instagram for daily inspiration."
          className="mb-12"
        />

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <a
              key={item.id}
              href="https://instagram.com/sheshamwood"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-xl bg-muted ${
                i === 0 ? "md:row-span-2" : ""
              } focus-brand`}
              aria-label={`View ${item.caption} on Instagram`}
            >
              <div
                className={`relative ${
                  i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full min-h-[200px]" : item.aspectClass
                } bg-gradient-to-br from-secondary via-muted to-secondary/60`}
              >
                {/* Placeholder content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl mb-2 opacity-20 select-none" aria-hidden="true">📷</span>
                  <span className="text-xs text-muted-foreground/40 text-center px-3">{item.caption}</span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/70 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                    <Camera className="w-8 h-8" aria-hidden="true" />
                    <span className="text-xs font-medium tracking-wide">View Post</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com/sheshamwood"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors focus-brand rounded-md"
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            Follow @SheshamWood on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
