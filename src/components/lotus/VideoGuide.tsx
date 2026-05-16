export function VideoGuide() {
  return (
    <section id="video-guide" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-3">
            Video hướng dẫn sơn giả gỗ Lotus
          </h2>
          <p className="text-muted-foreground">
            Xem nhanh quy trình thi công sơn giả gỗ Lotus trên tấm xi măng — đơn
            giản, dễ làm tại nhà.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[360px]">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-elegant bg-black" style={{ aspectRatio: "9 / 16" }}>
            <iframe
              src="https://www.youtube.com/embed/H-vZW1c7epg?rel=0&modestbranding=1"
              title="Video hướng dẫn sơn giả gỗ Lotus"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
