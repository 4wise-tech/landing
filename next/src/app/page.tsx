import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { MobileMenu } from "@/components/nav/MobileMenu";

export default function Home() {
  const menuItems = [
    { href: "#services", label: "Services" },
    { href: "#solutions", label: "Solutions" },
    { href: "#process", label: "Process" },
    { href: "#cases", label: "Cases" },
    { href: "#cta", label: "Contact" },
  ] as const;

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
            <a href="#services" className="navLink">Services</a>
            <a href="#solutions" className="navLink">Solutions</a>
            <a href="#process" className="navLink">Process</a>
            <a href="#cases" className="navLink">Cases</a>
            <a href="#cta" className="navLink">Contact</a>
          </nav>
          <MobileMenu items={menuItems} />
        </div>
      </header>

      <main>
        <Hero />
        <section id="services" className="section">
          <div className="sectionInner">
            <p className="eyebrow">SERVICES</p>
            <h2 className="h2">
              From AI agents to scalable software
            </h2>
            <p className="lead">
              We deliver end‑to‑end with technically strong teams, aligned with enterprise expectations.
            </p>

            <div className="grid3">
              <div className="card">
                <div className="cardHead">
                  <span className="dotBlue" aria-hidden />
                  <h3 className="h3">AI Agents &amp; Automation</h3>
                </div>
                <ul className="list">
                  <li>Custom AI agent development</li>
                  <li>AI‑augmented business processes</li>
                  <li>Chatbots and decision support systems</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotGreen" aria-hidden />
                  <h3 className="h3">Software Engineering</h3>
                </div>
                <ul className="list">
                  <li>Web and mobile applications</li>
                  <li>SaaS platforms</li>
                  <li>APIs and system integrations</li>
                </ul>
              </div>
              <div className="card">
                <div className="cardHead">
                  <span className="dotCyan" aria-hidden />
                  <h3 className="h3">Run &amp; Support</h3>
                </div>
                <ul className="list">
                  <li>24/7 system monitoring</li>
                  <li>DevOps and infrastructure management</li>
                  <li>Continuous improvement and updates</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="section">
          <div className="sectionInner">
            <p className="eyebrow">SOLUTIONS</p>
            <h2 className="h2">
              Tailored, measurable outcomes
            </h2>
            <p className="lead">
              We bring AI to production with security, observability, and performance—beyond demos.
            </p>

            <div className="grid2">
              {[
                { t: "AI workforce", d: "Department-level agents that automate tasks and accelerate execution." },
                { t: "Custom enterprise AI", d: "Agents tailored to your data, access model, and processes." },
                { t: "Data & automation systems", d: "ETL, event-driven automation, and an integration layer." },
                { t: "Operational efficiency", d: "Direct impact on cost, quality, and delivery time." },
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
            <p className="eyebrow">HOW WE WORK</p>
            <h2 className="h2">
              Fast, transparent and measurable
            </h2>
            <div className="steps">
              {[
                {
                  s: "Discover",
                  d: "We clarify goals, data sources, and risks.",
                },
                {
                  s: "Design",
                  d: "We shape the architecture, security, and agent strategy.",
                },
                {
                  s: "Build",
                  d: "MVP → pilot → production with fast iteration and measurement.",
                },
                {
                  s: "Scale",
                  d: "We grow performance, scope, and cost efficiency in a controlled way.",
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
            <p className="eyebrow">WHY 4WISE</p>
            <h2 className="h2">
              AI‑first team with enterprise trust
            </h2>
            <div className="grid2">
              {[
                {
                  t: "AI‑first approach",
                  d: "Development centered on agents, evals, guardrails and telemetry.",
                },
                {
                  t: "Scalable architecture",
                  d: "Modular services, observability and performance planning.",
                },
                {
                  t: "Fast and flexible delivery",
                  d: "Iteration based on priorities; visible output week by week.",
                },
                {
                  t: "Enterprise‑grade security",
                  d: "Access control, audit, data isolation and security practices.",
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
            <p className="eyebrow">CASE STUDIES</p>
            <h2 className="h2">
              Experience across industries
            </h2>
            <div className="grid3">
              {[
                {
                  t: "Healthtech",
                  tag: "Sample case",
                  d: "Automation and decision support in appointment/triage flows. Delivered with security, observability and integrations.",
                  cta: "Request details",
                },
                {
                  t: "AI automation systems",
                  tag: "Sample case",
                  d: "Department‑level agents accelerating workflows. Permission model, audit trail and observability for production use.",
                  cta: "Request details",
                },
                {
                  t: "SaaS platforms",
                  tag: "Sample case",
                  d: "Multi‑tenant architecture, integration layer and analytics. Performance/cost optimization and sustainable delivery.",
                  cta: "Request details",
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
            <p className="eyebrow">NEXT STEP</p>
            <h2 className="h2">
              Let’s transform your business with intelligent systems
            </h2>
            <p className="lead">
              Let’s schedule a 30‑minute discovery call.
            </p>
              </div>
              <div className="ctaActions">
                <a className="btnSecondary" href="mailto:hello@4wise.ai?subject=%C4%B0leti%C5%9Fim">
                  Get in touch
                </a>
                <a className="btnPrimary" href="mailto:hello@4wise.ai?subject=Demo%20Talebi">
                  Request a demo
                </a>
              </div>
            </div>

            <footer className="footer">
              <div className="footerTop">
                <div>
                  <Image src="/4wise-logo-white.png" alt="4wise" width={120} height={34} className="logoMark" />
                  <p className="muted">
                    4wise is a technology company building AI‑driven systems, AI agents, and scalable software solutions.
                  </p>
                  <div className="companyBlock">
                    <p className="footerTitle">COMPANY</p>
                    <p className="muted companyLine"><strong>4wise Tech OÜ</strong></p>
                    <p className="muted companyLine">
                      Harju maakond, Tallinn, Kesklinna linnaosa, Veskiposti tn 2-1002, 10138, Estonia
                    </p>
                    <p className="muted companyLine">Registry No: 17445723</p>
                  </div>
                </div>
                <div className="footerCols">
                  <div>
                    <p className="footerTitle">SERVICES</p>
                    <p className="muted">AI Agents &amp; Automation</p>
                    <p className="muted">Software Engineering</p>
                    <p className="muted">Run &amp; Support</p>
                  </div>
                  <div>
                    <p className="footerTitle">CONTACT</p>
                    <p className="muted">hello@4wise.ai</p>
                    <p className="muted">Istanbul / Remote</p>
                  </div>
                  <div>
                    <p className="footerTitle">LEGAL</p>
                    <Link className="muted footerLink" href="/privacy">Privacy Policy</Link>
                    <Link className="muted footerLink" href="/cookies">Cookie Policy</Link>
                    <Link className="muted footerLink" href="/terms">Terms of Service</Link>
                  </div>
                </div>
              </div>
              <p className="mutedSmall">
                © {new Date().getFullYear()} 4wise.{" "}
                All rights reserved.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
