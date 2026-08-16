"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Edit your experience here ──────────────────────────────────────
// Each entry: role, company, period, description
// Replace placeholder values with your real experience.
export const EXPERIENCE: {
	role: string;
	company: string;
	period: string;
	desc: string;
}[] = [
	{
		role: "Full Stack Developer",
		company: "Confidential — Government / Public Office",
		period: "July 2025 — Present",
		desc:
			"Building internal tools for team workflows and landing pages for public-facing programs and events, using Next.js, Laravel, and MySQL, under a confidentiality agreement.",
	},
	{
		role: "Freelancer",
		company: "Upwork",
		period: "July 2024 — Present",
		desc:
			"Maintained and updated a Shopify-based e-commerce website for a client, handling front-end tasks and coordinating with developers.",
	},
	{
		role: "Tech Intern",
		company: "FlowerStore.PH",
		period: "July 2023 — June 2024",
		desc: "Assisted on developing web page for business analytics and data presentation.",
	},
	{
		role: "Frontend Developer Intern",
		company: "LexMeet",
		period: "April — July 2023",
		desc: "Translated Figma design to an actual website, and conducted quality checking on every webpage.",
	},
];
// ─────────────────────────────────────────────────────────────────

export default function ExperienceSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			if (!sectionRef.current) return;
			const rows = gsap.utils.toArray(".experience-row");
			rows.forEach((row: any, i) => {
				gsap.fromTo(
					row,
					{ opacity: 0, y: 12 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
						scrollTrigger: {
							trigger: row,
							start: "top 88%",
							toggleActions: "play none none none",
						},
						delay: i * 0.1,
					}
				);
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section
			id='experience'
			ref={sectionRef}
			className='bg-paper-inv py-3xl px-page-gutter border-t-2 border-accent'
			aria-labelledby='experience-heading'>
			<h2 id='experience-heading' className='mono-label text-ink-inv-2 mb-2xl'>
				Experience
			</h2>

			<div className='flex flex-col w-full font-body tabular-nums'>
				{/* Desktop Header */}
				<div className='hidden md:grid md:grid-cols-[2fr_1.5fr_1.5fr_3fr] gap-4 text-left font-bold text-xs tracking-[0.12em] uppercase text-ink-inv-2 pb-sm border-b border-border-inv'>
					<div>Role</div>
					<div>Company</div>
					<div>Period</div>
					<div></div>
				</div>

				{/* Rows */}
				<div className='flex flex-col'>
					{EXPERIENCE.map(({ role, company, period, desc }, i) => (
						<div
							key={i}
							className='experience-row flex flex-col md:grid md:grid-cols-[2fr_1.5fr_1.5fr_3fr] gap-2 md:gap-4 py-lg md:py-md border-b border-border-inv opacity-0'>
							<div className='font-display text-xl md:text-md uppercase tracking-[-0.01em] text-ink-inv font-normal leading-[1.2]'>
								{role}
							</div>
							<div className='font-bold text-lg md:text-base text-accent'>{company}</div>
							<div className='text-sm text-ink-inv-2'>{period}</div>
							<div className='text-base md:text-sm text-ink-inv-2 pt-2 md:pt-0 max-w-[32ch]'>{desc}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
