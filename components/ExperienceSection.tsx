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
		role: "Software Engineer",
		company: "— to confirm",
		period: "2024 — Present",
		desc: "Full-stack product work. Feature development, architecture, shipping.",
	},
	{
		role: "Frontend Developer",
		company: "— to confirm",
		period: "2022 — 2024",
		desc: "Built responsive interfaces and component libraries at scale.",
	},
	{
		role: "Junior Developer",
		company: "— to confirm",
		period: "2021 — 2022",
		desc: "Learned fast. Shipped faster.",
	},
];
// ─────────────────────────────────────────────────────────────────

export default function ExperienceSection() {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const rows = sectionRef.current?.querySelectorAll<HTMLTableRowElement>("tbody tr");
			if (!rows) return;
			rows.forEach((row, i) => {
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
			style={{
				background: "var(--color-paper-inv)",
				padding: `var(--space-3xl) var(--page-gutter)`,
				borderTop: "var(--rule-accent)",
			}}
			aria-labelledby='experience-heading'>

			<h2
				id='experience-heading'
				className='mono-label'
				style={{
					color: "var(--color-ink-inv-2)",
					marginBottom: "var(--space-2xl)",
				}}>
				Experience
			</h2>

			<div style={{ overflowX: "auto" }}>
				<table
					style={{
						width: "100%",
						borderCollapse: "collapse",
						fontFamily: "var(--font-body)",
						fontVariantNumeric: "tabular-nums",
					}}
					aria-label='Work experience'>
					<thead>
						<tr>
							{["Role", "Company", "Period", ""].map((h) => (
								<th
									key={h}
									scope='col'
									style={{
										textAlign: "left",
										fontWeight: 700,
										fontSize: "var(--text-xs)",
										letterSpacing: "0.12em",
										textTransform: "uppercase",
										color: "var(--color-ink-inv-2)",
										paddingBottom: "var(--space-sm)",
										borderBottom: `1px solid var(--color-border-inv)`,
									}}>
									{h}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{EXPERIENCE.map(({ role, company, period, desc }, i) => (
							<tr
								key={i}
								style={{
									borderBottom: `1px solid var(--color-border-inv)`,
									opacity: 0,
								}}>
								<td
									style={{
										padding: `var(--space-md) var(--space-sm) var(--space-md) 0`,
										fontFamily: "var(--font-display)",
										fontSize: "var(--text-md)",
										textTransform: "uppercase",
										letterSpacing: "-0.01em",
										color: "var(--color-ink-inv)",
										fontWeight: 400,
										lineHeight: 1.2,
										whiteSpace: "nowrap",
									}}>
									{role}
								</td>
								<td
									style={{
										padding: `var(--space-md) var(--space-sm)`,
										fontWeight: 700,
										fontSize: "var(--text-base)",
										color: "var(--color-accent)",
										whiteSpace: "nowrap",
									}}>
									{company}
								</td>
								<td
									style={{
										padding: `var(--space-md) var(--space-sm)`,
										fontSize: "var(--text-sm)",
										color: "var(--color-ink-inv-2)",
										whiteSpace: "nowrap",
									}}>
									{period}
								</td>
								<td
									style={{
										padding: `var(--space-md) 0 var(--space-md) var(--space-sm)`,
										fontSize: "var(--text-sm)",
										color: "var(--color-ink-inv-2)",
										maxWidth: "32ch",
									}}>
									{desc}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
