"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Edit your projects here ────────────────────────────────────────
// Add/remove items as needed. url is optional.
export const PROJECTS: {
	title: string;
	tag: string;
	desc: string;
	url?: string;
	year: string;
}[] = [
	{
		title: "Project Alpha",
		tag: "Web App",
		desc: "A full-stack application built for — to confirm. Focused on performance and UX.",
		url: "#",
		year: "2025",
	},
	{
		title: "Project Beta",
		tag: "Tool",
		desc: "Open-source developer tool for — to confirm. Built with Node.js and TypeScript.",
		url: "#",
		year: "2024",
	},
	{
		title: "Project Gamma",
		tag: "Dashboard",
		desc: "Data visualisation dashboard for — to confirm. React, D3, real-time updates.",
		url: "#",
		year: "2024",
	},
	{
		title: "Project Delta",
		tag: "UI Library",
		desc: "Accessible component library for — to confirm. Shipped to production at scale.",
		url: "#",
		year: "2023",
	},
];
// ─────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".project-card");
			if (!cards) return;
			cards.forEach((card, i) => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.55,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 88%",
							toggleActions: "play none none none",
						},
						delay: (i % 2) * 0.12,
					}
				);
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section
			id='work'
			ref={sectionRef}
			style={{
				background: "var(--color-paper)",
				padding: `var(--space-3xl) var(--page-gutter)`,
				borderTop: "var(--rule-accent)",
			}}
			aria-labelledby='work-heading'>

			<h2
				id='work-heading'
				className='mono-label'
				style={{
					color: "var(--color-accent)",
					marginBottom: "var(--space-2xl)",
				}}>
				Selected Work
			</h2>

			<ul
				role='list'
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 28rem), 1fr))",
					gap: "var(--space-md)",
					listStyle: "none",
					margin: 0,
					padding: 0,
				}}>
				{PROJECTS.map(({ title, tag, desc, url, year }) => (
					<li key={title}>
						<a
							href={url ?? "#"}
							className='project-card'
							aria-label={`${title} — ${tag}`}
							style={{
								display: "block",
								background: "var(--color-paper-2)",
								border: "1px solid var(--color-border)",
								borderTop: "var(--rule-accent)",
								padding: "var(--space-lg)",
								textDecoration: "none",
								color: "inherit",
								opacity: 0,
								transition: `box-shadow var(--dur-short) var(--ease-out),
								             border-color var(--dur-short) var(--ease-out)`,
							}}
							onMouseEnter={(e) => {
								const el = e.currentTarget as HTMLAnchorElement;
								el.style.boxShadow = "4px 4px 0 var(--color-accent)";
								el.style.borderColor = "var(--color-accent)";
							}}
							onMouseLeave={(e) => {
								const el = e.currentTarget as HTMLAnchorElement;
								el.style.boxShadow = "none";
								el.style.borderColor = "var(--color-border)";
							}}
							onFocus={(e) => {
								const el = e.currentTarget as HTMLAnchorElement;
								el.style.outline = `2px solid var(--color-focus)`;
								el.style.outlineOffset = "2px";
							}}
							onBlur={(e) => {
								const el = e.currentTarget as HTMLAnchorElement;
								el.style.outline = "none";
							}}>

							{/* Card header */}
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-start",
									marginBottom: "var(--space-md)",
								}}>
								<span
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "var(--text-xs)",
										fontWeight: 700,
										letterSpacing: "0.12em",
										textTransform: "uppercase",
										color: "var(--color-accent)",
									}}>
									{tag}
								</span>
								<span
									style={{
										fontFamily: "var(--font-body)",
										fontSize: "var(--text-xs)",
										color: "var(--color-ink-2)",
										fontVariantNumeric: "tabular-nums",
									}}>
									{year}
								</span>
							</div>

							{/* Title */}
							<p
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "var(--text-2xl)",
									textTransform: "uppercase",
									letterSpacing: "-0.02em",
									lineHeight: 1.05,
									color: "var(--color-ink)",
									margin: "0 0 var(--space-sm)",
								}}>
								{title}
							</p>

							{/* Description */}
							<p
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "var(--text-sm)",
									lineHeight: 1.6,
									color: "var(--color-ink-2)",
									margin: "0 0 var(--space-lg)",
									maxWidth: "48ch",
								}}>
								{desc}
							</p>

							{/* CTA */}
							<span
								aria-hidden='true'
								style={{
									fontFamily: "var(--font-body)",
									fontSize: "var(--text-sm)",
									fontWeight: 700,
									letterSpacing: "0.08em",
									textTransform: "uppercase",
									color: "var(--color-accent)",
								}}>
								View →
							</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
