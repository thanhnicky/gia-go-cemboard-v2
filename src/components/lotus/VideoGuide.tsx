import { useState } from "react";

export function VideoGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section id="video-guide" className="py-12 lg:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2">
              Video hướng dẫn thi công
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Xem quy trình sơn giả gỗ Lotus trên tấm xi măng
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-2.5 text-sm font-semibold text-[var(--brand-foreground)] shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Xem video hướng dẫn
            </button>
          </div>
        </div>
      </section>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-[360px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: "9 / 16" }}>
              <iframe
                src="https://www.youtube.com/embed/H-vZW1c7epg?rel=0&modestbranding=1&autoplay=1"
                title="Video hướng dẫn sơn giả gỗ Lotus"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
