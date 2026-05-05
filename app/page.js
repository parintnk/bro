'use client';

import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');

    const onMouseMove = (e) => {
      if (!cursor) return;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMouseMove);

    const hoverTargets = document.querySelectorAll(
      'a, .tier, .include-item, .process-step'
    );
    const onEnter = () => cursor && cursor.classList.add('hover');
    const onLeave = () => cursor && cursor.classList.remove('hover');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const reveals = document.querySelectorAll('.reveal');
    const timeouts = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const t = setTimeout(
              () => entry.target.classList.add('visible'),
              i * 100
            );
            timeouts.push(t);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const inlineIconWrap = {
    width: '14px',
    height: '14px',
    marginRight: '7px',
    color: 'var(--gray)',
    verticalAlign: 'middle',
  };
  const inlineIconSvg = {
    width: '14px',
    height: '14px',
    stroke: 'currentColor',
    fill: 'none',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  return (
    <>
      <div className="cursor" id="cursor"></div>

      {/* Header */}
      <header>
        <div className="logo">WEB<span>+</span>PROPOSAL</div>
        <div className="header-tag">Confidential — Prepared for Jason</div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-text">PROPOSAL</div>
        <div className="hero-eyebrow">Project Proposal · 2025</div>
        <h1 className="hero-title">
          <div>Website</div>
          <div className="line2">Design &amp;</div>
          <div className="line3">Development</div>
        </h1>
        <div className="hero-sub">
          <p className="hero-desc">
            A full-scale creative website featuring advanced 3D video production,
            cinematic scroll animations, and premium UI/UX design —
            built to the standard of OFF+BRAND.
          </p>
          <div className="hero-meta">
            <div className="hero-meta-label">Prepared for</div>
            <div className="hero-meta-value">Jason</div>
            <br />
            <div className="hero-meta-label">Prepared by</div>
            <div className="hero-meta-value">Folk 吳禮威</div>
            <br />
            <div className="hero-meta-label">Date</div>
            <div className="hero-meta-value">May 2025</div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker">
          <span className="ticker-item">UX/UI DESIGN</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">3D VIDEO PRODUCTION</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">SCROLL ANIMATIONS</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">CUSTOM DEVELOPMENT</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">MOBILE RESPONSIVE</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">DEPLOYMENT &amp; LAUNCH</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">UX/UI DESIGN</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">3D VIDEO PRODUCTION</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">SCROLL ANIMATIONS</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">CUSTOM DEVELOPMENT</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">MOBILE RESPONSIVE</span><span className="ticker-item ticker-dot">✦</span>
          <span className="ticker-item">DEPLOYMENT &amp; LAUNCH</span><span className="ticker-item ticker-dot">✦</span>
        </div>
      </div>

      {/* Pricing */}
      <section>
        <div className="section-label">01 — Pricing Tiers</div>

        <div className="note-box reveal">
          <div className="note-icon">
            <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <div className="note-text">
            <strong>Important note on pricing:</strong> This website incorporates
            <strong> cinematic rendered 3D video assets</strong> — not static images or simple graphics.
            Each section uses high-quality 3D animation sequences produced by specialized motion designers,
            similar to the visual style of OFF+BRAND.com. This is a key driver of production cost and quality.
            All 3D content is custom-produced for your brand.
          </div>
        </div>

        <div className="tiers-grid reveal">

          {/* Tier 1 */}
          <div className="tier">
            <span className="tier-medal">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" /></svg>
            </span>
            <div className="tier-name">Tier 1</div>
            <div className="tier-title">Landing Page</div>
            <div className="tier-pages">1 – 3 pages</div>
            <div className="tier-price">
              <div className="tier-price-label">Estimated Total</div>
              <div className="tier-price-value">118K <span>– 190K</span></div>
              <div className="tier-price-range">THB (excl. VAT)</div>
            </div>
            <div className="tier-timeline">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              4 – 6 weeks
            </div>
            <div className="line-items">
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </span>
                    UX/UI Design
                  </span>
                  <span className="line-item-price">35K – 55K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full page layout &amp; visual direction</li>
                  <li>Mobile responsive design</li>
                  <li>Component &amp; module design</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </span>
                    Development
                  </span>
                  <span className="line-item-price">50K – 80K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Scroll-based animations (GSAP/Lottie)</li>
                  <li>3D video integration &amp; motion timing</li>
                  <li>Interactive hover effects</li>
                  <li>Mobile optimization</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    </span>
                    3D Video Production
                  </span>
                  <span className="line-item-price">15K – 25K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Rendered 3D video assets (hero + sections)</li>
                  <li>Color grading &amp; export optimization</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </span>
                    Assets &amp; Imagery
                  </span>
                  <span className="line-item-price">10K – 20K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Custom graphics, icons &amp; visual elements</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </span>
                    Launch &amp; Hosting
                  </span>
                  <span className="line-item-price">8K – 10K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Domain config, deployment, performance check</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="tier featured">
            <span className="tier-medal">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" /></svg>
            </span>
            <div className="tier-name">Tier 2</div>
            <div className="tier-title">Standard Site</div>
            <div className="tier-pages">4 – 7 pages</div>
            <div className="tier-price">
              <div className="tier-price-label">Estimated Total</div>
              <div className="tier-price-value">205K <span>– 360K</span></div>
              <div className="tier-price-range">THB (excl. VAT)</div>
            </div>
            <div className="tier-timeline">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              6 – 9 weeks
            </div>
            <div className="line-items">
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </span>
                    UX/UI Design
                  </span>
                  <span className="line-item-price">60K – 100K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Multi-page layout system</li>
                  <li>Design system &amp; component library</li>
                  <li>Micro-interaction specs</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </span>
                    Development
                  </span>
                  <span className="line-item-price">90K – 150K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full scroll animation system</li>
                  <li>3D video scenes per section</li>
                  <li>Page transitions &amp; preloader</li>
                  <li>Cross-browser &amp; mobile optimization</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    </span>
                    3D Video Production
                  </span>
                  <span className="line-item-price">25K – 50K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Multiple rendered 3D video sequences</li>
                  <li>Per-section motion assets</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </span>
                    Assets &amp; Imagery
                  </span>
                  <span className="line-item-price">20K – 45K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Photography direction, custom graphics</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </span>
                    Launch &amp; Hosting
                  </span>
                  <span className="line-item-price">10K – 15K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Staging environment, QA, deployment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="tier">
            <span className="tier-medal">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11" /></svg>
            </span>
            <div className="tier-name">Tier 3</div>
            <div className="tier-title">Full Site</div>
            <div className="tier-pages">8 – 12 pages</div>
            <div className="tier-price">
              <div className="tier-price-label">Estimated Total</div>
              <div className="tier-price-value">340K <span>– 550K</span></div>
              <div className="tier-price-range">THB (excl. VAT)</div>
            </div>
            <div className="tier-timeline">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              8 – 12 weeks
            </div>
            <div className="line-items">
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                    </span>
                    UX/UI Design
                  </span>
                  <span className="line-item-price">90K – 135K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full design system (type, color, spacing)</li>
                  <li>All page templates + unique layouts</li>
                  <li>Prototype &amp; user flow</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </span>
                    Development
                  </span>
                  <span className="line-item-price">150K – 240K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Advanced animation &amp; interaction system</li>
                  <li>3D video per page with scroll sync</li>
                  <li>Custom cursor, preloader, transitions</li>
                  <li>CMS integration (if needed)</li>
                  <li>Performance &amp; SEO optimization</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                    </span>
                    3D Video Production
                  </span>
                  <span className="line-item-price">45K – 80K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full suite of rendered 3D videos</li>
                  <li>Hero, section &amp; background animations</li>
                  <li>Professional color grade &amp; compression</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    </span>
                    Assets &amp; Imagery
                  </span>
                  <span className="line-item-price">40K – 75K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full art direction, custom visuals, icons</li>
                </ul>
              </div>
              <div className="line-item">
                <div className="line-item-header">
                  <span className="line-item-name">
                    <span className="icon" style={inlineIconWrap}>
                      <svg viewBox="0 0 24 24" style={inlineIconSvg}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </span>
                    Launch &amp; Hosting
                  </span>
                  <span className="line-item-price">15K – 20K THB</span>
                </div>
                <ul className="line-item-details">
                  <li>Full QA, staging, deployment &amp; handoff</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What's Included */}
      <section className="includes">
        <div className="section-label">02 — What&apos;s Included in All Tiers</div>
        <div className="includes-grid reveal">
          <div className="include-item">
            <span className="include-icon">
              <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            </span>
            <div className="include-title">Full Design Ownership</div>
            <div className="include-desc">All source files, Figma frames, and design assets handed over to you.</div>
          </div>
          <div className="include-item">
            <span className="include-icon">
              <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            </span>
            <div className="include-title">UI Components &amp; Modules</div>
            <div className="include-desc">Every button, card, section, and interactive module — designed and built.</div>
          </div>
          <div className="include-item">
            <span className="include-icon">
              <svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
            </span>
            <div className="include-title">3D Video Assets</div>
            <div className="include-desc">Custom-rendered 3D video sequences tailored to your brand identity.</div>
          </div>
          <div className="include-item">
            <span className="include-icon">
              <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
            </span>
            <div className="include-title">Mobile Responsive</div>
            <div className="include-desc">Fully optimized across all screen sizes — mobile, tablet, and desktop.</div>
          </div>
          <div className="include-item">
            <span className="include-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </span>
            <div className="include-title">Deployment &amp; Launch</div>
            <div className="include-desc">Live site setup, hosting config, and post-launch quality check included.</div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="section-label">03 — How We Work</div>
        <div className="process-steps reveal">
          <div className="process-step">
            <div className="step-num">01</div>
            <div className="step-title">Discovery &amp; Brief</div>
            <div className="step-desc">We align on your goals, brand identity, target audience, and creative direction before anything else.</div>
            <span className="step-tag">Week 1</span>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <div className="step-title">Design &amp; 3D Production</div>
            <div className="step-desc">UX wireframes, high-fidelity UI design, and 3D video rendering happen in parallel for efficiency.</div>
            <span className="step-tag">Week 2 – 5</span>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <div className="step-title">Development &amp; Animation</div>
            <div className="step-desc">Frontend coded with scroll animations, 3D video integration, and all interactive elements built.</div>
            <span className="step-tag">Week 4 – 9</span>
          </div>
          <div className="process-step">
            <div className="step-num">04</div>
            <div className="step-title">QA &amp; Launch</div>
            <div className="step-desc">Full quality assurance across devices, performance testing, then deployment and handoff.</div>
            <span className="step-tag">Final Week</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-title">
          <div>Let&apos;s</div>
          <div className="accent">Build</div>
          <div className="outline">Together.</div>
        </div>
        <div className="cta-right">
          <p className="cta-sub">Ready to get started? Let us know which tier fits your vision and we&apos;ll tailor a custom quote.</p>
          <div className="cta-contacts">
            <div>
              <div className="cta-contact-label">Contact</div>
              <a className="cta-contact" href="#">Folk 吳禮威</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-copy">© 2025 — Confidential Proposal for Jason</div>
        <div className="footer-note">Prices are estimates and subject to final scope confirmation</div>
      </footer>
    </>
  );
}
