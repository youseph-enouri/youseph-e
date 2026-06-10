import type { KeyboardEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  itemCount: number;
  images?: (string | null)[];
  onClick: () => void;
}

export const SectionCard = ({ title, metric, metricLabel, icon, itemCount, images, onClick }: SectionCardProps) => {
  const Icon = icon;
  const imageCount = images ? Math.min(images.length, 5) : Math.min(itemCount, 5);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      className="group relative h-full cursor-pointer overflow-hidden rounded-[24px] border-white/80 bg-card/95 shadow-[0_12px_35px_-24px_hsl(var(--foreground)/0.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_22px_50px_-24px_hsl(var(--accent)/0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-accent/[0.035] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col p-4 sm:p-5 md:p-4 lg:p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/10 bg-accent/[0.07] text-accent shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105 group-hover:bg-accent group-hover:text-accent-foreground lg:h-11 lg:w-11 lg:rounded-2xl">
            <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
          </div>
          
          {/* Cascaded Images */}
          <div className="flex items-center -space-x-2 sm:-space-x-3">
            {Array.from({ length: imageCount }).map((_, i) => (
              <div
                key={i}
                className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-card bg-secondary shadow-md lg:h-8 lg:w-8"
                style={{ zIndex: imageCount - i }}
              >
                {images && images[i] ? (
                  <img 
                    src={images[i]!} 
                    alt={`${title} ${i + 1}`}
                    className="w-full h-full object-contain bg-accent/10"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/40 to-accent/60 flex items-center justify-center">
                    <span className="text-xs text-accent font-bold">{i + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <h2 className="mb-2 text-lg font-serif font-semibold tracking-[-0.02em] text-foreground lg:text-xl xl:text-[1.35rem]">
          {title}
        </h2>
        
        <div className="mt-auto">
          <div className="space-y-1">
            <div
              className={`font-serif font-bold leading-tight text-primary ${
                title === "Education"
                  ? "whitespace-nowrap text-xl lg:text-2xl"
                  : "text-2xl lg:text-3xl"
              }`}
            >
              {metric}
            </div>

            {!["Education", "Engineering Tools", "Current Focus"].includes(title) && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {metricLabel}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-6 right-6 h-1 origin-left scale-x-0 rounded-t-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </Card>
  );
};
