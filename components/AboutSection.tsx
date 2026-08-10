"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Edit manifesto assertions here ────────────────────────────────
const ASSERTIONS: { label: string; accentWord: string; rest: string }[] = [
	{ label: "01", accentWord: "Developer.", rest: " Maker. Builder." },
	{ label: "02", accentWord: "I obsess", rest: " over craft, detail, and impact." },
	{ label: "03", accentWord: "Everything", rest: " I ship is intentional." },
];
// ─────────────────────────────────────────────────────────────────

export default function AboutSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const linesRef = useRef<HTMLParagraphElement[]>([]);

	useGSAP(
		() => {
			linesRef.current.forEach((el, i) => {
				if (!el) return;
				gsap.fromTo(
					el,
					{ xPercent: -6, opacity: 0 },
					{
						xPercent: 0,
						opacity: 1,
						duration: 0.7,
						ease: "power3.out",
						scrollTrigger: {
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none none",
						},
						delay: i * 0.12,
					}
				);
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section
			id='about'
			ref={sectionRef}
			style={{
				background: "var(--color-paper)",
				padding: `var(--space-3xl) var(--page-gutter)`,
				borderTop: "var(--rule-accent)",
			}}
			aria-labelledby='about-heading'>

			<h2
				id='about-heading'
				className='mono-label'
				style={{
					color: "var(--color-accent)",
					marginBottom: "var(--space-2xl)",
				}}>
				About
			</h2>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--space-lg)",
					maxWidth: "var(--page-max)",
				}}>
				{ASSERTIONS.map(({ label, accentWord, rest }, i) => (
					<p
						key={label}
						ref={(el) => {
							if (el) linesRef.current[i] = el;
						}}
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "var(--text-display-s)",
							textTransform: "uppercase",
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
							color: "var(--color-ink)",
							margin: 0,
							opacity: 0,
						}}>
						<span
							aria-hidden='true'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "var(--text-sm)",
								fontWeight: 700,
								letterSpacing: "0.1em",
								color: "var(--color-ink-2)",
								display: "inline-block",
								marginRight: "var(--space-md)",
								verticalAlign: "middle",
							}}>
							{label}
						</span>
						<span style={{ color: "var(--color-accent)" }}>{accentWord}</span>
						{rest}
					</p>
				))}
			</div>
		</section>
	);
}
