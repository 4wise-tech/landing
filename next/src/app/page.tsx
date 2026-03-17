import Image from "next/image";
import { Hero } from "@/components/hero/Hero";

export default function Home() {
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
            <a href="#services" className="navLink">Hizmetler</a>
            <a href="#solutions" className="navLink">Çözümler</a>
            <a href="#process" className="navLink">Süreç</a>
            <a href="#cases" className="navLink">Projeler</a>
            <a href="#cta" className="navLink">İletişim</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <section id="services" className="section">
          <div className="sectionInner">
            <p className="eyebrow">HİZMETLER</p>
            <h2 className="h2">AI agent’lardan ölçeklenebilir yazılımlara</h2>
            <p className="lead">
              Teknik derinliği yüksek ekiplerle, kurumsal beklentilere uygun şekilde uçtan uca teslim ederiz.
            </p>

            <div className="grid3">
              <div className="card">
                <div className="cardHead">
                  <span className="dotBlue" aria-hidden />
                  <h3 className="h3">AI Agent &amp; Otomasyon</h3>
                </div>
                <ul className="list">
                  <li>Özel AI agent geliştirme</li>
                  <li>AI destekli iş süreçleri</li>
                  <li>Chatbot ve karar destek sistemleri</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotGreen" aria-hidden />
                  <h3 className="h3">Yazılım Geliştirme</h3>
                </div>
                <ul className="list">
                  <li>Web ve mobil uygulamalar</li>
                  <li>SaaS platformlar</li>
                  <li>API ve sistem entegrasyonları</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotCyan" aria-hidden />
                  <h3 className="h3">Bakım &amp; Destek</h3>
                </div>
                <ul className="list">
                  <li>7/24 sistem izleme</li>
                  <li>DevOps ve altyapı yönetimi</li>
                  <li>Sürekli iyileştirme ve güncellemeler</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="section">
          <div className="sectionInner">
            <p className="eyebrow">ÇÖZÜMLER</p>
            <h2 className="h2">Kuruma özel, ölçülebilir sonuçlar</h2>
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
            <p className="eyebrow">NASIL ÇALIŞIYORUZ</p>
            <h2 className="h2">Hızlı, şeffaf ve ölçülebilir süreç</h2>
            <div className="steps">
              {[
                { s: "Keşfet", d: "Hedefleri, veri kaynaklarını ve riskleri netleştiririz." },
                { s: "Tasarla", d: "Mimari, güvenlik ve agent stratejisini kurgularız." },
                { s: "Geliştir", d: "MVP → pilot → üretim; hızlı iterasyon ve ölçüm." },
                { s: "Ölçekle", d: "Performans, maliyet ve kapsamı kontrollü büyütürüz." },
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
            <p className="eyebrow">NEDEN 4WISE</p>
            <h2 className="h2">Kurumsal güven veren, AI-first ekip</h2>
            <div className="grid2">
              {[
                { t: "AI-first yaklaşım", d: "Agent, eval, guardrail ve telemetry odaklı geliştirme." },
                { t: "Ölçeklenebilir mimari", d: "Modüler servisler, gözlemlenebilirlik, performans planı." },
                { t: "Hızlı ve esnek geliştirme", d: "Önceliklere göre iterasyon; çıktıyı haftalık görünür kılma." },
                { t: "Kurumsal güvenlik standartları", d: "Erişim, audit, veri izolasyonu ve güvenlik pratikleri." },
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
            <p className="eyebrow">PROJE ÖRNEKLERİ</p>
            <h2 className="h2">Sektörler arası uygulama deneyimi</h2>
            <div className="grid3">
              {[
                {
                  t: "Sağlık teknolojileri",
                  tag: "Örnek çalışma",
                  d: "Randevu/triage süreçlerinde otomasyon ve karar destek. Güvenlik, izlenebilirlik ve entegrasyon odaklı teslim.",
                  cta: "Detay iste",
                },
                {
                  t: "AI otomasyon sistemleri",
                  tag: "Örnek çalışma",
                  d: "Departman bazlı agent’lar ile iş akışlarını hızlandırma. Yetki modeli, audit trail ve gözlemlenebilirlik ile production kullanımı.",
                  cta: "Detay iste",
                },
                {
                  t: "SaaS platformlar",
                  tag: "Örnek çalışma",
                  d: "Çok kiracılı mimari, entegrasyon katmanı ve analitik. Performans/maliyet optimizasyonu ve sürdürülebilir geliştirme süreci.",
                  cta: "Detay iste",
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
                <p className="eyebrow">BİR SONRAKİ ADIM</p>
                <h2 className="h2">İşinizi akıllı sistemlerle dönüştürelim</h2>
                <p className="lead">30 dakikalık keşif görüşmesi planlayalım.</p>
              </div>
              <div className="ctaActions">
                <a className="btnSecondary" href="mailto:hello@4wise.ai?subject=%C4%B0leti%C5%9Fim">İletişime Geç</a>
                <a className="btnPrimary" href="mailto:hello@4wise.ai?subject=Demo%20Talebi">Demo Talep Et</a>
              </div>
            </div>

            <footer className="footer">
              <div className="footerTop">
                <div>
                  <Image src="/4wise-logo-white.png" alt="4wise" width={120} height={34} className="logoMark" />
                  <p className="muted">
                    4wise, yapay zeka tabanlı sistemler geliştiren, AI agent’lar oluşturan ve ölçeklenebilir yazılım çözümleri sunan bir teknoloji şirketidir.
                  </p>
                </div>
                <div className="footerCols">
                  <div>
                    <p className="footerTitle">Hizmetler</p>
                    <p className="muted">AI Agent &amp; Otomasyon</p>
                    <p className="muted">Yazılım Geliştirme</p>
                    <p className="muted">Bakım &amp; Destek</p>
                  </div>
                  <div>
                    <p className="footerTitle">İletişim</p>
                    <p className="muted">hello@4wise.ai</p>
                    <p className="muted">İstanbul / Remote</p>
                  </div>
                  <div>
                    <p className="footerTitle">Yasal</p>
                    <p className="muted">Gizlilik</p>
                    <p className="muted">KVKK</p>
                    <p className="muted">Çerez Politikası</p>
                  </div>
                </div>
              </div>
              <p className="mutedSmall">© {new Date().getFullYear()} 4wise. Tüm hakları saklıdır.</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
