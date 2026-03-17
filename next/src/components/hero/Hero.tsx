"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Hyperspeed = dynamic(() => import("@/components/hyperspeed/Hyperspeed"), { ssr: false });

export type Lang = "en" | "tr";

export function Hero({ lang }: { lang: Lang }) {
  const hyperspeedOptions = useMemo(
    () => ({
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: [60, 80] as [number, number],
      movingCloserSpeed: [-120, -160] as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3,
      },
    }),
    []
  );

  return (
    <section className="heroSection">
      <div className="heroFrame heroFrameFull">
        <div className="heroCanvas">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>

        <div className="heroVignette" aria-hidden />

        <div className="heroOverlay">
          <div className="heroInner">
            <div className="heroBadge">
              <span className="heroDot" aria-hidden />
              <span>
                {lang === "en"
                  ? "Click & hold to see the real magic"
                  : "Basılı tut, gerçek sihri gör"}
              </span>
            </div>

            <h1 className="heroTitle">
              {lang === "en" ? "We build the intelligent systems of " : "Geleceğin akıllı sistemlerini "}
              <span className="heroGradient">
                {lang === "en" ? "tomorrow" : "inşa ediyoruz"}
              </span>
            </h1>

            <p className="heroSubtitle">
              {lang === "en"
                ? "AI agents, scalable software, and enterprise AI solutions. From discovery to production, end‑to‑end delivery."
                : "AI Agent’lar, ölçeklenebilir yazılımlar ve kurumsal çözümler. Keşiften üretime kadar uçtan uca teslim."}
            </p>

            <div className="heroActions">
              <a className="btnPrimary" href="mailto:hello@4wise.ai?subject=Demo%20Talebi">
                {lang === "en" ? "Request a demo" : "Demo Talep Et"}
              </a>
              <a className="btnSecondary" href="#next">
                {lang === "en" ? "Explore solutions" : "Çözümleri Keşfet"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="next" />
    </section>
  );
}

