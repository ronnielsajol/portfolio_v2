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
			style={{
				minHeight: "100svh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				padding: `0 var(--page-gutter) var(--space-xl)`,
				background: "var(--color-paper)",
				position: "relative",
				paddingTop: "3.5rem" /* account for fixed nav */,
			}}>
			{/* Noise Overlay */}
			<div
				aria-hidden='true'
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 0,
					pointerEvents: "none",
					backgroundImage: "url('/nnnoise.svg')",
					backgroundRepeat: "repeat",
					opacity: 0.45,
				}}
			/>

			{/* Accent bar — top-left vertical rule */}
			<div
				ref={accentBarRef}
				aria-hidden='true'
				style={{
					position: "absolute",
					left: "var(--page-gutter)",
					top: "5rem",
					width: "2px",
					height: "3rem",
					background: "var(--color-accent)",
					zIndex: 1,
				}}
			/>

			<h1
				ref={headingRef}
				style={{
					fontFamily: "var(--font-display)",
					textTransform: "uppercase",
					lineHeight: 1.03,
					letterSpacing: "-0.0025em",
					color: "var(--color-ink)",
					opacity: 0,
					margin: 0,
					fontStyle: "normal",
					overflow: "hidden",
				}}
				className='text-(length:--text-display-s) md:text-(length:--text-display) xl:text-(length:--text-display-xl)'>
				<span
					style={{
						display: "block",
						color: "var(--color-accent)",
					}}>
					{HERO_LINE_1}
				</span>
				<span style={{ display: "block" }}>{HERO_LINE_2}</span>
				<span style={{ display: "block" }}>{HERO_LINE_3}</span>
			</h1>

			{/* Scroll indicator */}
			<span
				ref={indicatorRef}
				aria-hidden='true'
				style={{
					fontFamily: "var(--font-body)",
					fontSize: "var(--text-sm)",
					fontWeight: 700,
					letterSpacing: "0.12em",
					textTransform: "uppercase",
					color: "var(--color-ink-2)",
					position: "absolute",
					bottom: "var(--space-xl)",
					right: "var(--page-gutter)",
					opacity: 0,
					transform: "translateY(8px)",
				}}>
				{HERO_SCROLL_LABEL}
			</span>
		</section>
	);
};

export default HeroSection;
