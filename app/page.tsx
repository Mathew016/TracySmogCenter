"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const BUSINESS = {
  name: "Tracy Smog Center",
  phoneDisplay: "(209) 834-2760",
  phoneHref: "tel:+12098342760",
  address: "10 W Grant Line Rd, Tracy, CA",
  hours: "10:00 AM–4:00 PM",
  directions:
    "https://www.google.com/maps/dir/?api=1&destination=10%20W%20Grant%20Line%20Rd%2C%20Tracy%2C%20CA",
  reviews:
    "https://www.google.com/search?q=Tracy+Smog+Center+reviews",
} as const;

const services = [
  {
    number: "01",
    title: "STAR Certified",
    copy: "A STAR-certified station for customers whose renewal notice requires one.",
  },
  {
    number: "02",
    title: "Test-Only Station",
    copy: "Focused inspections without repair sales or repair scheduling.",
  },
  {
    number: "03",
    title: "All Cars",
    copy: "Smog inspections for cars, including diesel vehicles.",
  },
  {
    number: "04",
    title: "Diesel Smog Checks",
    copy: "Clear confirmation for diesel owners before they make the trip.",
  },
  {
    number: "05",
    title: "Free Retest",
    copy: "A free retest is available, subject to the shop’s approved terms.",
  },
] as const;

const faqs = [
  {
    question: "How much is a smog check?",
    answer:
      "Pricing varies by vehicle. Call (209) 834-2760 for the current price and ask about the $10-off website coupon.",
  },
  {
    question: "How long does a smog check take?",
    answer:
      "The shop is built around fast service, but wait and inspection times vary with customer volume and vehicle requirements. Call ahead for today’s timing.",
  },
  {
    question: "Can my car pass with the check-engine light on?",
    answer:
      "An illuminated check-engine light generally prevents a vehicle from passing a smog inspection. Call if you have questions about your specific situation.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "No. You may call ahead or walk in during business hours. Online booking is not required.",
  },
  {
    question: "Are you STAR certified?",
    answer: "Yes. Tracy Smog Center is a STAR-certified station.",
  },
  {
    question: "Do you inspect diesel vehicles?",
    answer: "Yes. The station smogs diesel vehicles as well as other cars.",
  },
  {
    question: "Do you repair vehicles that fail?",
    answer:
      "No. Tracy Smog Center is a test-only inspection station and does not perform repairs.",
  },
  {
    question: "Do you offer a retest?",
    answer:
      "Yes. Tracy Smog Center offers a free retest, subject to the shop’s final approved terms.",
  },
  {
    question: "What payments do you accept?",
    answer: "Cash, check, and credit card are accepted.",
  },
] as const;

function track(eventName: string, details: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: eventName, ...details });
  window.gtag?.("event", eventName, details);
}

export default function Home() {
  const couponRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const coupon = couponRef.current;
    if (!coupon || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          track("coupon_view");
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(coupon);
    return () => observer.disconnect();
  }, []);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: BUSINESS.name,
    telephone: "+1-209-834-2760",
    address: {
      "@type": "PostalAddress",
      streetAddress: "10 W Grant Line Rd",
      addressLocality: "Tracy",
      addressRegion: "CA",
      addressCountry: "US",
    },
    openingHours: "Mo-Su 10:00-16:00",
    paymentAccepted: "Cash, Check, Credit Card",
    areaServed: ["Tracy", "Manteca", "Lathrop", "Stockton", "Livermore", "Ripon"],
    description:
      "STAR-certified, test-only smog inspection station serving all cars, including diesel vehicles.",
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="utility-bar no-print">
        <div className="site-shell utility-inner">
          <p>
            <span className="open-dot" aria-hidden="true" /> Open today {BUSINESS.hours} · Walk-ins welcome
          </p>
          <a
            href={BUSINESS.phoneHref}
            onClick={() => track("call_click", { placement: "utility" })}
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="site-header no-print">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="Tracy Smog Center home">
            <img
              className="brand-logo"
              src="/tracy-smog-center-logo.png"
              alt="Tracy Smog Center"
              width="150"
              height="150"
            />
          </a>
          <nav aria-label="Main navigation">
            <a href="#services">Services</a>
            <a href="#coupon">Coupon</a>
            <a href="#faq">FAQ</a>
            <a href="#visit">Visit</a>
          </nav>
          <a
            className="button button-primary header-call"
            href={BUSINESS.phoneHref}
            onClick={() => track("call_click", { placement: "header" })}
          >
            Call Now
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Tracy, California · Local smog inspection</p>
              <h1 id="hero-title">Fast STAR Smog Checks in Tracy, CA</h1>
              <p className="hero-lead">
                Walk in or call ahead. We inspect all cars, including diesel vehicles, and offer a free retest.
              </p>
              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href={BUSINESS.phoneHref}
                  onClick={() => track("call_click", { placement: "hero" })}
                >
                  Call Now
                </a>
                <a
                  className="button button-secondary"
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("directions_click", { placement: "hero" })}
                >
                  Get Directions
                </a>
              </div>
              <p className="walk-in-note">
                <span aria-hidden="true" /> Walk-ins welcome. Call ahead if you prefer.
              </p>
            </div>

            <aside className="service-board" aria-label="Inspection facts">
              <div className="board-heading">
                <div>
                  <p>Shop service board</p>
                  <h2>Inspection Facts</h2>
                </div>
                <span aria-hidden="true">01</span>
              </div>
              <div className="board-primary">
                <div>
                  <small>Certification</small>
                  <strong>STAR Certified</strong>
                </div>
                <div>
                  <small>Station type</small>
                  <strong>Test-Only Station</strong>
                </div>
              </div>
              <ul className="board-list">
                <li><span>01</span> All Cars</li>
                <li><span>02</span> Diesel Smog Checks</li>
                <li><span>03</span> Free Retest</li>
                <li><span>04</span> Walk-Ins Welcome</li>
              </ul>
              <div className="board-hours">
                <strong>Open today</strong>
                <span>{BUSINESS.hours}</span>
              </div>
            </aside>
          </div>
        </section>

        <section className="proof-strip no-print" aria-label="Service highlights">
          <div className="site-shell proof-grid">
            {services.map((service) => (
              <div className="proof-item" key={service.number}>
                <span>{service.number}</span>
                <strong>{service.title}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="coupon-wrap" id="coupon" ref={couponRef} aria-labelledby="coupon-title">
          <div className="site-shell">
            <article className="coupon">
              <div className="coupon-value" aria-label="Ten dollars off">$10 OFF</div>
              <div className="coupon-copy">
                <p>Website coupon</p>
                <h2 id="coupon-title">Save on your next smog check</h2>
                <span>
                  Present this coupon on your phone before service. Final eligibility, exclusions, expiration, and stacking terms are subject to shop approval.
                </span>
              </div>
              <div className="coupon-actions no-print">
                <button
                  type="button"
                  className="button button-outline-red"
                  onClick={() => {
                    track("coupon_print_or_save", { action: "print" });
                    window.print();
                  }}
                >
                  Print Coupon
                </button>
                <a
                  href={BUSINESS.phoneHref}
                  onClick={() => track("call_click", { placement: "coupon" })}
                >
                  Call to confirm
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="section services-section no-print" id="services" aria-labelledby="services-title">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Straightforward service</p>
                <h2 id="services-title">Everything you need. Nothing you don’t.</h2>
              </div>
              <p>
                A focused inspection station for Tracy-area drivers—no repair sales, no online account, and no unnecessary steps.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <span>{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section how-section no-print" aria-labelledby="how-title">
          <div className="site-shell">
            <div className="section-heading">
              <p className="eyebrow">How it works</p>
              <h2 id="how-title">A simple stop from arrival to result</h2>
            </div>
            <ol className="steps">
              <li>
                <span>1</span>
                <div>
                  <h3>Call or walk in</h3>
                  <p>No appointment is required. Call ahead if you want today’s current timing.</p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Complete the inspection</h3>
                  <p>Bring your vehicle and registration paperwork to the test-only station.</p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>Get your result</h3>
                  <p>Receive the inspection result, with a free retest when applicable under shop terms.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="section faq-section no-print" id="faq" aria-labelledby="faq-title">
          <div className="site-shell faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">Before you visit</p>
              <h2 id="faq-title">Common smog-check questions</h2>
              <p>Need a quick answer about your vehicle? Call the shop and we’ll point you in the right direction.</p>
              <a
                className="text-link"
                href={BUSINESS.phoneHref}
                onClick={() => track("call_click", { placement: "faq" })}
              >
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  onToggle={(event) => {
                    if (event.currentTarget.open) {
                      track("faq_expand", { question: faq.question });
                    }
                  }}
                >
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {faq.question}
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews-band no-print" aria-labelledby="reviews-title">
          <div className="site-shell reviews-inner">
            <div>
              <p className="eyebrow">Reputation matters</p>
              <h2 id="reviews-title">See what local drivers are saying</h2>
              <p>Read current, verified customer feedback directly on Google.</p>
            </div>
            <a
              className="button button-secondary"
              href={BUSINESS.reviews}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("reviews_click")}
            >
              Read Google Reviews
            </a>
          </div>
        </section>

        <section className="section visit-section no-print" id="visit" aria-labelledby="visit-title">
          <div className="site-shell visit-grid">
            <div className="visit-details">
              <p className="eyebrow">Plan your visit</p>
              <h2 id="visit-title">Call ahead or walk in</h2>
              <dl>
                <div>
                  <dt>Address</dt>
                  <dd>{BUSINESS.address}</dd>
                </div>
                <div>
                  <dt>Current hours</dt>
                  <dd>{BUSINESS.hours}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a></dd>
                </div>
                <div>
                  <dt>Payments</dt>
                  <dd>Cash, check, and credit card</dd>
                </div>
              </dl>
              <div className="visit-actions">
                <a
                  className="button button-primary"
                  href={BUSINESS.phoneHref}
                  onClick={() => track("call_click", { placement: "location" })}
                >
                  Call Now
                </a>
                <a
                  className="button button-secondary"
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("directions_click", { placement: "location" })}
                >
                  Get Directions
                </a>
              </div>
              <p className="service-area">
                Serving drivers from Tracy, Manteca, Lathrop, Stockton, Livermore, and Ripon.
              </p>
            </div>
            <div className="map-wrap">
              <iframe
                title="Map showing Tracy Smog Center at 10 W Grant Line Road in Tracy, California"
                src="https://www.google.com/maps?q=10+W+Grant+Line+Rd+Tracy+CA&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-address">
                <strong>Tracy Smog Center</strong>
                <span>{BUSINESS.address}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="privacy-note no-print" id="privacy" aria-labelledby="privacy-title">
          <div className="site-shell">
            <h2 id="privacy-title">Privacy</h2>
            <p>
              This site may record basic interaction events for calls, directions, coupon use, reviews, and FAQ activity. The embedded map is provided by Google and may follow Google’s own privacy practices.
            </p>
          </div>
        </section>
      </main>

      <footer className="site-footer no-print">
        <div className="site-shell footer-grid">
          <div>
            <img
              className="footer-logo"
              src="/tracy-smog-center-logo.png"
              alt="Tracy Smog Center"
              width="150"
              height="150"
            />
            <p>STAR-certified, test-only smog inspections for all cars, including diesel vehicles.</p>
          </div>
          <div>
            <p>{BUSINESS.address}</p>
            <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            <p>{BUSINESS.hours}</p>
          </div>
          <div>
            <a href="#privacy">Privacy</a>
            <a href="#faq">Frequently Asked Questions</a>
            <a href="#coupon">Website Coupon</a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Tracy Smog Center</p>
        </div>
      </footer>

      <div className="mobile-call-bar no-print">
        <a
          href={BUSINESS.phoneHref}
          onClick={() => track("call_click", { placement: "mobile_sticky" })}
        >
          Call Now · {BUSINESS.phoneDisplay}
        </a>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
