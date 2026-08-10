"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Edit your stack here ──────────────────────────────────────────
// Add, remove, or reorder skills as needed.
export const STACK: string[] = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"GSAP",
	"Lenis",
	"PostgreSQL",
	"Tailwind",
];
// ─────────────────────────────────────────────────────────────────

export default function StackSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const chips = sectionRef.current?.querySelectorAll<HTMLElement>(".stack-chip");
			if (!chips) return;
			gsap.fromTo(
				chips,
				{ opacity: 0, y: 10 },
				{
					opacity: 1,
					y: 0,
					duration: 0.45,
					ease: "power2.out",
					stagger: 0.06,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 85%",
						toggleActions: "play none none none",
					},
				}
			);
		},
		{ scope: sectionRef }
	);

	return (
		<section
			id='stack'
			ref={sectionRef}
			style={{
				background: "var(--color-paper-inv)",
				padding: `var(--space-3xl) var(--page-gutter)`,
				borderTop: "var(--rule-accent)",
			}}
			aria-labelledby='stack-heading'>

			<h2
				id='stack-heading'
				className='mono-label'
				style={{
					color: "var(--color-ink-inv-2)",
					marginBottom: "var(--space-2xl)",
				}}>
				Stack
			</h2>

			<ul
				role='list'
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "var(--space-sm)",
					listStyle: "none",
					margin: 0,
					padding: 0,
				}}>
				{STACK.map((skill) => (
					<li key={skill}>
						<span
							className='stack-chip'
							style={{
								display: "inline-block",
								fontFamily: "var(--font-display)",
								fontSize: "var(--text-md)",
								textTransform: "uppercase",
								letterSpacing: "-0.01em",
								lineHeight: 1,
								color: "var(--color-ink-inv)",
								border: "var(--rule-accent)",
								padding: `var(--space-sm) var(--space-md)`,
								opacity: 0,
							}}>
							{skill}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
