"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Edit contact and marquee info here ─────────────────────────────
const CONTACT_EMAIL = "your@email.com"; // replace with your email
const CONTACT_GITHUB = "https://github.com/your-username"; // replace with your GitHub
const CONTACT_LINKEDIN = "https://linkedin.com/in/your-username"; // replace with your LinkedIn
const MARQUEE_TEXT = "Ronniel · 2026 · Available for hire ·";
const MARQUEE_SPEED_SECONDS = 28; // reduce to speed up, increase to slow down
// ─────────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
	{ label: "GitHub", href: CONTACT_GITHUB },
	{ label: "LinkedIn", href: CONTACT_LINKEDIN },
	{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

const COPIES = 6;

export default function Footer() {
	const containerRef = useRef<HTMLElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!innerRef.current || !containerRef.current) return;

			// Parallax reveal effect for the entire footer block
			// It moves down inside the wrapper when off-screen, and catches up to 0 as it scrolls in
			gsap.fromTo(
				innerRef.current,
				{ yPercent: -30 },
				{
					yPercent: 0,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom", // when the top of the footer hits the bottom of the viewport
						end: "bottom bottom", // when the bottom of the footer hits the bottom of the viewport
						scrub: true,
					},
				}
			);
		},
		{ scope: containerRef }
	);

	return (
		<footer
			id='footer'
			ref={containerRef}
			aria-label='Site footer'
			style={{
				overflow: "hidden", // Required for the parallax clipping effect
				position: "relative",
				minHeight: "100vh",
			}}>
			<div
				ref={innerRef}
				style={{
					willChange: "transform",
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}>
				{/* --- Contact Section --- */}
				<section
					id='contact'
					style={{
						background: "var(--color-accent)",
						padding: `var(--space-3xl) var(--page-gutter)`,
						borderTop: `4px solid oklch(38% 0.16 25)`,
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						justifyContent: "center",
						gap: "var(--space-2xl)",
						flexGrow: 1,
					}}
					aria-labelledby='contact-heading'>
					<h2
						id='contact-heading'
						style={{
							fontFamily: "var(--font-anton)",
							fontSize: "var(--text-display)",
							textTransform: "uppercase",
							lineHeight: 1.03,
							letterSpacing: "-0.03em",
							color: "var(--color-paper)",
							margin: 0,
							fontStyle: "normal",
						}}>
						Let's Build Something.
					</h2>

					<a
						id='contact-cta'
						href={`mailto:${CONTACT_EMAIL}`}
						style={{
							display: "inline-block",
							fontFamily: "var(--font-display)",
							fontSize: "var(--text-lg)",
							textTransform: "uppercase",
							letterSpacing: "0.02em",
							lineHeight: 1,
							color: "var(--color-accent)",
							background: "var(--color-paper)",
							padding: `var(--space-md) var(--space-xl)`,
							textDecoration: "none",
							transition: `background var(--dur-micro) var(--ease-out),
										 color var(--dur-micro) var(--ease-out),
										 outline-offset var(--dur-micro) var(--ease-out)`,
						}}
						onMouseEnter={(e) => {
							const el = e.currentTarget as HTMLAnchorElement;
							el.style.background = "oklch(13% 0 0)";
							el.style.color = "var(--color-accent)";
						}}
						onMouseLeave={(e) => {
							const el = e.currentTarget as HTMLAnchorElement;
							el.style.background = "var(--color-paper)";
							el.style.color = "var(--color-accent)";
						}}
						onFocus={(e) => {
							(e.currentTarget as HTMLAnchorElement).style.outline = "2px solid var(--color-paper)";
							(e.currentTarget as HTMLAnchorElement).style.outlineOffset = "4px";
						}}
						onBlur={(e) => {
							(e.currentTarget as HTMLAnchorElement).style.outline = "none";
						}}>
						Get In Touch
					</a>

					<ul
						role='list'
						style={{
							display: "flex",
							flexWrap: "wrap",
							gap: "var(--space-xl)",
							listStyle: "none",
							margin: 0,
							padding: 0,
						}}>
						{SOCIAL_LINKS.map(({ label, href }) => (
							<li key={label}>
								<a
									href={href}
									target={href.startsWith("http") ? "_blank" : undefined}
									rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
									aria-label={`Open ${label}`}
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "var(--text-sm)",
										fontWeight: 700,
										letterSpacing: "0.1em",
										textTransform: "uppercase",
										color: "var(--color-paper)",
										textDecoration: "none",
										borderBottom: `1px solid oklch(38% 0.16 25)`,
										paddingBottom: "2px",
										transition: `border-color var(--dur-micro) var(--ease-out),
													 color var(--dur-micro) var(--ease-out)`,
									}}
									onMouseEnter={(e) => {
										const el = e.currentTarget as HTMLAnchorElement;
										el.style.borderColor = "var(--color-paper)";
									}}
									onMouseLeave={(e) => {
										const el = e.currentTarget as HTMLAnchorElement;
										el.style.borderColor = "oklch(38% 0.16 25)";
									}}
									onFocus={(e) => {
										(e.currentTarget as HTMLAnchorElement).style.outline = "2px solid var(--color-paper)";
										(e.currentTarget as HTMLAnchorElement).style.outlineOffset = "4px";
									}}
									onBlur={(e) => {
										(e.currentTarget as HTMLAnchorElement).style.outline = "none";
									}}>
									{label}
								</a>
							</li>
						))}
					</ul>
				</section>

				{/* --- Marquee Section --- */}
				<div
					style={{
						background: "var(--color-paper)",
						borderTop: "var(--rule-accent)",
						paddingTop: `var(--space-xl)`,
						position: "relative",
					}}>
					<div
						aria-hidden='true'
						style={{
							display: "flex",
							width: "max-content",
							animation: `marquee ${MARQUEE_SPEED_SECONDS}s linear infinite`,
						}}>
						{Array.from({ length: COPIES }).map((_, i) => (
							<span
								key={i}
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "var(--text-2xl)",
									textTransform: "uppercase",
									letterSpacing: "-0.01em",
									lineHeight: 1.1,
									color: "var(--color-accent)",
									paddingRight: "var(--space-2xl)",
									whiteSpace: "nowrap",
								}}>
								{MARQUEE_TEXT}
							</span>
						))}
					</div>

					<p
						style={{
							position: "absolute",
							width: "1px",
							height: "1px",
							overflow: "hidden",
							clip: "rect(0 0 0 0)",
							clipPath: "inset(50%)",
							whiteSpace: "nowrap",
						}}>
						Ronniel · 2026 · Available for hire
					</p>

					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "var(--text-xs)",
							color: "var(--color-ink-2)",
							letterSpacing: "0.06em",
							textTransform: "uppercase",
							margin: `var(--space-md) var(--page-gutter) 0`,
							textAlign: "right",
						}}>
						&copy; {new Date().getFullYear()} Ronniel. All rights reserved.
					</p>
				</div>
			</div>

			<style>{`
				@keyframes marquee {
					from { transform: translateX(0); }
					to   { transform: translateX(-${100 / COPIES}%); }
				}
				@media (prefers-reduced-motion: reduce) {
					@keyframes marquee {
						from { opacity: 1; }
						to   { opacity: 1; }
					}
				}
			`}</style>
		</footer>
	);
}
