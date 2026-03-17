"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Hero, type Lang } from "@/components/hero/Hero";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "tr") {
      setLang(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  const isEn = lang === "en";

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="navShell">
        <div className="navPill">
          <div className="navBrand">
            <Image
              src="/4wise-logo-white.png"
              alt="4wise"
              width={112}
              height={32}
              priority
              className="logoMark"
            />
          </div>
          <nav className="navLinks">
            <a href="#services" className="navLink">{isEn ? "Services" : "Hizmetler"}</a>
            <a href="#solutions" className="navLink">{isEn ? "Solutions" : "Çözümler"}</a>
            <a href="#process" className="navLink">{isEn ? "Process" : "Süreç"}</a>
            <a href="#cases" className="navLink">{isEn ? "Cases" : "Projeler"}</a>
            <a href="#cta" className="navLink">{isEn ? "Contact" : "İletişim"}</a>
          </nav>
          <div className="navLinks">
            <button
              type="button"
              className="navLink"
              style={{ opacity: isEn ? 1 : 0.6, textDecoration: isEn ? "underline" : "none" }}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <span className="navLink" style={{ opacity: 0.45 }}>·</span>
            <button
              type="button"
              className="navLink"
              style={{ opacity: !isEn ? 1 : 0.6, textDecoration: !isEn ? "underline" : "none" }}
              onClick={() => setLang("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero lang={lang} />
        <section id="services" className="section">
          <div className="sectionInner">
            <p className="eyebrow">{isEn ? "SERVICES" : "HİZMETLER"}</p>
            <h2 className="h2">
              {isEn
                ? "From AI agents to scalable software"
                : "AI agent’lardan ölçeklenebilir yazılımlara"}
            </h2>
            <p className="lead">
              {isEn
                ? "We deliver end‑to‑end with technically strong teams, aligned with enterprise expectations."
                : "Teknik derinliği yüksek ekiplerle, kurumsal beklentilere uygun şekilde uçtan uca teslim ederiz."}
            </p>

            <div className="grid3">
              <div className="card">
                <div className="cardHead">
                  <span className="dotBlue" aria-hidden />
                  <h3 className="h3">{isEn ? "AI Agents & Automation" : "AI Agent & Otomasyon"}</h3>
                </div>
                <ul className="list">
                  <li>{isEn ? "Custom AI agent development" : "Özel AI agent geliştirme"}</li>
                  <li>{isEn ? "AI‑augmented business processes" : "AI destekli iş süreçleri"}</li>
                  <li>{isEn ? "Chatbots and decision support systems" : "Chatbot ve karar destek sistemleri"}</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotGreen" aria-hidden />
                  <h3 className="h3">{isEn ? "Software Engineering" : "Yazılım Geliştirme"}</h3>
                </div>
                <ul className="list">
                  <li>{isEn ? "Web and mobile applications" : "Web ve mobil uygulamalar"}</li>
                  <li>{isEn ? "SaaS platforms" : "SaaS platformlar"}</li>
                  <li>{isEn ? "APIs and system integrations" : "API ve sistem entegrasyonları"}</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotCyan" aria-hidden />
                  <h3 className="h3">{isEn ? "Run & Support" : "Bakım & Destek"}</h3>
                </div>
                <ul className="list">
                  <li>{isEn ? "24/7 system monitoring" : "7/24 sistem izleme"}</li>
                  <li>{isEn ? "DevOps and infrastructure management" : "DevOps ve altyapı yönetimi"}</li>
                  <li>{isEn ? "Continuous improvement and updates" : "Sürekli iyileştirme ve güncellemeler"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="section">
          <div className="sectionInner">
            <p className="eyebrow">{isEn ? "SOLUTIONS" : "ÇÖZÜMLER"}</p>
            <h2 className="h2">
              {isEn ? "Tailored, measurable outcomes" : "Kuruma özel, ölçülebilir sonuçlar"}
            </h2>
            <p className="lead">
              AI’ı yalnızca demo değil; güvenlik, izlenebilirlik ve performansla production’da çalıştırırız.
            </p>

            <div className="grid2">
              {[
                { t: "AI workforce (AI çalışan sistemleri)", d: "Departman bazlı agent’lar ile görev otomasyonu ve hız." },
                { t: "Kuruma özel AI çözümleri", d: "Veri, erişim ve süreçlerinize göre özelleştirilmiş agent’lar." },
                { t: "Veri ve otomasyon sistemleri", d: "ETL, event-driven otomasyon, entegrasyon katmanı." },
                { t: "Operasyonel verimlilik", d: "Maliyet, kalite ve süre metriklerine doğrudan etki." },
              ].map((x) => (
                <div key={x.t} className="card">
                  <h3 className="h3">{x.t}</h3>
                  <p className="muted">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section">
          <div className="sectionInner">
            <p className="eyebrow">{isEn ? "HOW WE WORK" : "NASIL ÇALIŞIYORUZ"}</p>
            <h2 className="h2">
              {isEn ? "Fast, transparent and measurable" : "Hızlı, şeffaf ve ölçülebilir süreç"}
            </h2>
            <div className="steps">
              {[
                {
                  s: isEn ? "Discover" : "Keşfet",
                  d: isEn
                    ? "We clarify goals, data sources, and risks."
                    : "Hedefleri, veri kaynaklarını ve riskleri netleştiririz.",
                },
                {
                  s: isEn ? "Design" : "Tasarla",
                  d: isEn
                    ? "We shape the architecture, security, and agent strategy."
                    : "Mimari, güvenlik ve agent stratejisini kurgularız.",
                },
                {
                  s: isEn ? "Build" : "Geliştir",
                  d: isEn
                    ? "MVP → pilot → production with fast iteration and measurement."
                    : "MVP → pilot → üretim; hızlı iterasyon ve ölçüm.",
                },
                {
                  s: isEn ? "Scale" : "Ölçekle",
                  d: isEn
                    ? "We grow performance, scope, and cost efficiency in a controlled way."
                    : "Performans, maliyet ve kapsamı kontrollü büyütürüz.",
                },
              ].map((x, idx) => (
                <div key={x.s} className="card">
                  <div className="cardHead">
                    <span className="stepNo">{idx + 1}</span>
                    <h3 className="h3">{x.s}</h3>
                  </div>
                  <p className="muted">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="section">
          <div className="sectionInner">
            <p className="eyebrow">{isEn ? "WHY 4WISE" : "NEDEN 4WISE"}</p>
            <h2 className="h2">
              {isEn ? "AI‑first team with enterprise trust" : "Kurumsal güven veren, AI-first ekip"}
            </h2>
            <div className="grid2">
              {[
                {
                  t: isEn ? "AI‑first approach" : "AI-first yaklaşım",
                  d: isEn
                    ? "Development centered on agents, evals, guardrails and telemetry."
                    : "Agent, eval, guardrail ve telemetry odaklı geliştirme.",
                },
                {
                  t: isEn ? "Scalable architecture" : "Ölçeklenebilir mimari",
                  d: isEn
                    ? "Modular services, observability and performance planning."
                    : "Modüler servisler, gözlemlenebilirlik, performans planı.",
                },
                {
                  t: isEn ? "Fast and flexible delivery" : "Hızlı ve esnek geliştirme",
                  d: isEn
                    ? "Iteration based on priorities; visible output week by week."
                    : "Önceliklere göre iterasyon; çıktıyı haftalık görünür kılma.",
                },
                {
                  t: isEn ? "Enterprise‑grade security" : "Kurumsal güvenlik standartları",
                  d: isEn
                    ? "Access control, audit, data isolation and security practices."
                    : "Erişim, audit, veri izolasyonu ve güvenlik pratikleri.",
                },
              ].map((x) => (
                <div key={x.t} className="card">
                  <h3 className="h3">{x.t}</h3>
                  <p className="muted">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="section">
          <div className="sectionInner">
            <p className="eyebrow">{isEn ? "CASE STUDIES" : "PROJE ÖRNEKLERİ"}</p>
            <h2 className="h2">
              {isEn ? "Experience across industries" : "Sektörler arası uygulama deneyimi"}
            </h2>
            <div className="grid3">
              {[
                {
                  t: isEn ? "Healthtech" : "Sağlık teknolojileri",
                  tag: isEn ? "Sample case" : "Örnek çalışma",
                  d: isEn
                    ? "Automation and decision support in appointment/triage flows. Delivered with security, observability and integrations."
                    : "Randevu/triage süreçlerinde otomasyon ve karar destek. Güvenlik, izlenebilirlik ve entegrasyon odaklı teslim.",
                  cta: isEn ? "Request details" : "Detay iste",
                },
                {
                  t: isEn ? "AI automation systems" : "AI otomasyon sistemleri",
                  tag: isEn ? "Sample case" : "Örnek çalışma",
                  d: isEn
                    ? "Department‑level agents accelerating workflows. Permission model, audit trail and observability for production use."
                    : "Departman bazlı agent’lar ile iş akışlarını hızlandırma. Yetki modeli, audit trail ve gözlemlenebilirlik ile production kullanımı.",
                  cta: isEn ? "Request details" : "Detay iste",
                },
                {
                  t: isEn ? "SaaS platforms" : "SaaS platformlar",
                  tag: isEn ? "Sample case" : "Örnek çalışma",
                  d: isEn
                    ? "Multi‑tenant architecture, integration layer and analytics. Performance/cost optimization and sustainable delivery."
                    : "Çok kiracılı mimari, entegrasyon katmanı ve analitik. Performans/maliyet optimizasyonu ve sürdürülebilir geliştirme süreci.",
                  cta: isEn ? "Request details" : "Detay iste",
                },
              ].map((x) => (
                <div key={x.t} className="card">
                  <p className="tag">{x.tag}</p>
                  <h3 className="h3">{x.t}</h3>
                  <p className="muted">{x.d}</p>
                  <a className="cardCta" href={`mailto:hello@4wise.ai?subject=${encodeURIComponent(`Proje detayı: ${x.t}`)}`}>
                    {x.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="section">
          <div className="sectionInner">
            <div className="ctaCard">
              <div>
            <p className="eyebrow">{isEn ? "NEXT STEP" : "BİR SONRAKİ ADIM"}</p>
            <h2 className="h2">
              {isEn ? "Let’s transform your business with intelligent systems" : "İşinizi akıllı sistemlerle dönüştürelim"}
            </h2>
            <p className="lead">
              {isEn
                ? "Let’s schedule a 30‑minute discovery call."
                : "30 dakikalık keşif görüşmesi planlayalım."}
            </p>
              </div>
              <div className="ctaActions">
                <a className="btnSecondary" href="mailto:hello@4wise.ai?subject=%C4%B0leti%C5%9Fim">
                  {isEn ? "Get in touch" : "İletişime Geç"}
                </a>
                <a className="btnPrimary" href="mailto:hello@4wise.ai?subject=Demo%20Talebi">
                  {isEn ? "Request a demo" : "Demo Talep Et"}
                </a>
              </div>
            </div>

            <footer className="footer">
              <div className="footerTop">
                <div>
                  <Image src="/4wise-logo-white.png" alt="4wise" width={120} height={34} className="logoMark" />
                  <p className="muted">
                    {isEn
                      ? "4wise is a technology company building AI‑driven systems, AI agents, and scalable software solutions."
                      : "4wise, yapay zeka tabanlı sistemler geliştiren, AI agent’lar oluşturan ve ölçeklenebilir yazılım çözümleri sunan bir teknoloji şirketidir."}
                  </p>
                </div>
                <div className="footerCols">
                  <div>
                    <p className="footerTitle">{isEn ? "SERVICES" : "HİZMETLER"}</p>
                    <p className="muted">
                      {isEn ? "AI Agents & Automation" : "AI Agent & Otomasyon"}
                    </p>
                    <p className="muted">
                      {isEn ? "Software Engineering" : "Yazılım Geliştirme"}
                    </p>
                    <p className="muted">
                      {isEn ? "Run & Support" : "Bakım & Destek"}
                    </p>
                  </div>
                  <div>
                    <p className="footerTitle">{isEn ? "CONTACT" : "İLETİŞİM"}</p>
                    <p className="muted">hello@4wise.ai</p>
                    <p className="muted">
                      {isEn ? "Istanbul / Remote" : "İstanbul / Remote"}
                    </p>
                  </div>
                  <div>
                    <p className="footerTitle">{isEn ? "LEGAL" : "YASAL"}</p>
                    <p className="muted">
                      {isEn ? "Privacy" : "Gizlilik"}
                    </p>
                    <p className="muted">KVKK</p>
                    <p className="muted">
                      {isEn ? "Cookie Policy" : "Çerez Politikası"}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mutedSmall">
                © {new Date().getFullYear()} 4wise.{" "}
                {isEn ? "All rights reserved." : "Tüm hakları saklıdır."}
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
