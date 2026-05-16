import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/lotus/Header";
import { Hero } from "@/components/lotus/Hero";
import { TrustBar } from "@/components/lotus/TrustBar";
import { Applications } from "@/components/lotus/Applications";
import { Systems } from "@/components/lotus/Systems";
import { ColorPicker } from "@/components/lotus/ColorPicker";
import { Combos } from "@/components/lotus/Combos";
import { OrderForm } from "@/components/lotus/OrderForm";
import { ZaloCTA } from "@/components/lotus/ZaloCTA";
import { BeforeAfter } from "@/components/lotus/BeforeAfter";
import { VideoGuide } from "@/components/lotus/VideoGuide";
import { FAQ } from "@/components/lotus/FAQ";
import { FinalCTA } from "@/components/lotus/FinalCTA";
import { Footer } from "@/components/lotus/Footer";
import { StickyMobileCTA } from "@/components/lotus/StickyMobileCTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sơn giả gỗ Lotus | Hệ sơn vân gỗ cho Cemboard, Fiber Cement" },
      {
        name: "description",
        content:
          "Lotus — hệ sơn giả gỗ chuyên dụng cho tấm xi măng, Smartwood, Conwood, Cemboard, Fiber Cement. Tư vấn đúng hệ cho từng hạng mục, đặt hàng nhanh hoặc nhắn Zalo.",
      },
      { property: "og:title", content: "Sơn giả gỗ Lotus cho tấm xi măng" },
      {
        property: "og:description",
        content:
          "Biến tấm xi măng thành bề mặt đẹp như gỗ thật. Đặt hàng nhanh hoặc nhắn Zalo để được tư vấn đúng hệ sơn.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <TrustBar />
        <Applications />
        <Systems />
        <ColorPicker />
        <Combos />
        <OrderForm />
        <ZaloCTA />
        <BeforeAfter />
        <VideoGuide />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
