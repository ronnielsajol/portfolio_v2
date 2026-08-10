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
			className='bg-paper py-3xl px-page-gutter border-t-2 border-accent'
			aria-labelledby='work-heading'>
			<h2 id='work-heading' className='mono-label text-accent mb-2xl'>
				Selected Work
			</h2>

			<ul role='list' className='grid grid-cols-[repeat(auto-fill,minmax(min(100%,28rem),1fr))] gap-md list-none m-0 p-0'>
				{PROJECTS.map(({ title, tag, desc, url, year }) => (
					<li key={title}>
						<a
							href={url ?? "#"}
							className='project-card block bg-paper-2 border border-border border-t-2 border-t-accent p-lg no-underline text-inherit opacity-0 transition-all duration-[var(--animate-dur-short)] ease-out hover:shadow-[4px_4px_0_var(--color-accent)] hover:border-accent focus:outline-2 focus:outline-focus focus:outline-offset-2 outline-none'
							aria-label={`${title} — ${tag}`}>
							{/* Card header */}
							<div className='flex justify-between items-start mb-md'>
								<span className='font-body text-xs font-bold tracking-[0.12em] uppercase text-accent'>{tag}</span>
								<span className='font-body text-xs text-ink-2 tabular-nums'>{year}</span>
							</div>

							{/* Title */}
							<p className='font-display text-lg md:text-2xl uppercase tracking-[-0.02em] leading-[1.05] text-ink m-0 mb-sm'>
								{title}
							</p>

							{/* Description */}
							<p className='font-body text-sm leading-[1.6] text-ink-2 m-0 mb-lg max-w-[48ch]'>{desc}</p>

							{/* CTA */}
							<span aria-hidden='true' className='font-body text-sm font-bold tracking-[0.08em] uppercase text-accent'>
								View →
							</span>
						</a>
					</li>
				))}
			</ul>
		</section>
	);
}
