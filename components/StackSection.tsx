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
			className="bg-paper-inv py-3xl px-page-gutter border-t-2 border-accent"
			aria-labelledby='stack-heading'>

			<h2
				id='stack-heading'
				className="mono-label text-ink-inv-2 mb-2xl">
				Stack
			</h2>

			<ul
				role='list'
				className="flex flex-wrap gap-sm list-none m-0 p-0">
				{STACK.map((skill) => (
					<li key={skill}>
						<span
							className="stack-chip inline-block font-display text-md uppercase tracking-[-0.01em] leading-none text-ink-inv border-2 border-accent py-sm px-md opacity-0">
							{skill}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
