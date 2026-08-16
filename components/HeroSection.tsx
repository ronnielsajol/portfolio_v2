"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

type HeroSectionProps = {
	startAnimation: boolean;
};

// ── Edit hero copy here ────────────────────────────────────────────
const HERO_LINE_1 = "Building";
const HERO_LINE_2 = "Things";
const HERO_LINE_3 = "That Matter.";
const HERO_SCROLL_LABEL = "Scroll ↓";
// ──────────────────────────────────────────────────────────────────

const HeroSection = ({ startAnimation }: HeroSectionProps) => {
	const sectionRef = useRef<HTMLElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const indicatorRef = useRef<HTMLSpanElement>(null);
	const accentBarRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!headingRef.current) return;

			if (!startAnimation) {
				gsap.set([headingRef.current, indicatorRef.current], { opacity: 0 });
				return;
			}

			const split = new SplitText(headingRef.current, {
				type: "lines",
				linesClass: "line",
			});

			split.lines.forEach((line) => {
				gsap.set(line, {
					display: "block",
					overflow: "hidden",
					paddingTop: "0.08em",
					paddingBottom: "0.08em",
					marginTop: "-0.08em",
					marginBottom: "-0.08em",
				});
			});

			const charSplit = new SplitText(split.lines, { type: "chars" });

			gsap.set(headingRef.current, { opacity: 1 });

			const tl = gsap.timeline();

			charSplit.chars.forEach((char, index) => {
				tl.from(
					char,
					{
						yPercent: index % 2 === 0 ? 150 : -150,
						duration: 0.28,
						ease: "power3.out",
					},
					index === 0 ? 0 : "<0.018"
				);
			});

			tl.to(
				indicatorRef.current,
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
					ease: "power2.out",
				},
				"-=0.1"
			);

			// Blinking accent bar (terminal cursor effect)
			if (accentBarRef.current) {
				gsap.to(accentBarRef.current, {
					opacity: 0,
					ease: "steps(1)",
					repeat: -1,
					yoyo: true,
					duration: 0.5,
				});
			}

			gsap.fromTo(
				indicatorRef.current,
				{ yPercent: -50 }, // start with the second copy already shifted into place
				{
					yPercent: 0, // animate down to reveal the first copy
					duration: 1.2,
					ease: "power2.inOut",
					repeat: -1,
					repeatDelay: 0.6,
					delay: tl.duration() + 0.3,
				}
			);

			return () => {
				charSplit.revert();
				split.revert();
				tl.kill();
			};
		},
		{ scope: sectionRef, dependencies: [startAnimation] }
	);

	return (
		<section
			id='hero'
			ref={sectionRef}
			className='min-h-svh flex flex-col justify-end px-page-gutter pb-xl bg-paper relative pt-14'>
			{/* Noise Overlay */}
			<div
				aria-hidden='true'
				className="absolute inset-0 z-0 pointer-events-none bg-[url('/nnnoise.svg')] bg-repeat opacity-45"
			/>

			{/* Accent bar — top-left vertical rule */}
			<div ref={accentBarRef} aria-hidden='true' className='absolute left-page-gutter top-20 w-0.5 h-[3rem] bg-accent z-10' />

			<h1
				ref={headingRef}
				className='font-display uppercase leading-[1.03] tracking-[-0.0025em] text-ink opacity-0 m-0 not-italic overflow-hidden text-display-s md:text-display-xl'>
				<span className='block text-accent'>{HERO_LINE_1}</span>
				<span className='block'>{HERO_LINE_2}</span>
				<span className='block'>{HERO_LINE_3}</span>
			</h1>

			{/* Scroll indicator */}
			<span aria-hidden='true' className='absolute right-page-gutter bottom-md overflow-hidden inline-block h-[1.2em]'>
				<span
					ref={indicatorRef}
					className='font-body text-sm font-bold tracking-[0.12em] uppercase text-ink-2 flex flex-col opacity-0 translate-y-2'>
					<span>{HERO_SCROLL_LABEL}</span>
					<span>{HERO_SCROLL_LABEL}</span>
				</span>
			</span>
		</section>
	);
};

export default HeroSection;
