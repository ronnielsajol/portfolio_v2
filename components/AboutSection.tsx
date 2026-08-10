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
			className='bg-paper py-3xl px-page-gutter border-t-2 border-accent'
			aria-labelledby='about-heading'>
			<h2 id='about-heading' className='mono-label text-accent mb-2xl'>
				About
			</h2>

			<div className='flex flex-col gap-lg max-w-page-max'>
				{ASSERTIONS.map(({ label, accentWord, rest }, i) => (
					<p
						key={label}
						ref={(el) => {
							if (el) linesRef.current[i] = el;
						}}
						className='font-display text-lg md:text-display-s uppercase leading-[1.05] tracking-[-0.001em] text-ink m-0 opacity-0'>
						<span
							aria-hidden='true'
							className='font-body text-sm font-bold tracking-widest text-ink-2 inline-block mr-md align-middle'>
							{label}
						</span>
						<span className='text-accent'>{accentWord}</span>
						{rest}
					</p>
				))}
			</div>
		</section>
	);
}
