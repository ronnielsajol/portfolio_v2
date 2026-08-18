"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const STACK: string[] = ["React", "Next.js", "TypeScript", "Node.js", "GSAP", "Lenis", "PostgreSQL", "Tailwind"];

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

			const cleanups: (() => void)[] = [];

			chips.forEach((chip) => {
				const li = chip.closest("li");
				const topEl = chip.querySelector<HTMLElement>(".chip-text-top");
				const bottomEl = chip.querySelector<HTMLElement>(".chip-text-bottom");
				const stackBg = li?.querySelector<HTMLElement>(".stack-bg");
				if (!topEl || !bottomEl || !stackBg) return;

				const splitTop = new SplitText(topEl, { type: "chars" });
				const splitBottom = new SplitText(bottomEl, { type: "chars" });

				gsap.set(splitBottom.chars, { yPercent: 100 });
				gsap.set(stackBg, { yPercent: 100 });

				const onEnter = () => {
					gsap.killTweensOf(stackBg);
					gsap.to(splitTop.chars, {
						yPercent: -100,
						ease: "power2.inOut",
						stagger: 0.03,
						duration: 0.4,
					});
					gsap.to(splitBottom.chars, {
						yPercent: 0,
						ease: "power2.inOut",
						stagger: 0.03,
						duration: 0.4,
					});
					gsap.fromTo(
						stackBg,
						{
							yPercent: 100,
						},
						{
							yPercent: 0,
							duration: 0.4,
							ease: "power2.out",
						}
					);
				};

				const onLeave = () => {
					gsap.to(splitTop.chars, {
						yPercent: 0,
						ease: "power2.inOut",
						stagger: 0.03,
						duration: 0.4,
					});
					gsap.to(splitBottom.chars, {
						yPercent: 100,
						ease: "power2.inOut",
						stagger: 0.03,
						duration: 0.4,
					});
					gsap.to(stackBg, {
						yPercent: -100,
						duration: 0.4,
						ease: "power2.out",
						onComplete: () => {
							gsap.set(stackBg, { yPercent: 100 });
						},
					});
				};

				chip.addEventListener("mouseenter", onEnter);
				chip.addEventListener("mouseleave", onLeave);

				cleanups.push(() => {
					chip.removeEventListener("mouseenter", onEnter);
					chip.removeEventListener("mouseleave", onLeave);
					splitTop.revert();
					splitBottom.revert();
				});
			});

			return () => cleanups.forEach((fn) => fn());
		},
		{ scope: sectionRef }
	);

	return (
		<section
			id='stack'
			ref={sectionRef}
			className='bg-paper-inv py-3xl px-page-gutter border-t-2 border-accent'
			aria-labelledby='stack-heading'>
			<h2 id='stack-heading' className='mono-label text-ink-inv-2 mb-2xl'>
				Stack
			</h2>

			<ul role='list' className='flex flex-wrap gap-sm list-none m-0 p-0'>
				{STACK.map((skill) => (
					<li className='relative overflow-hidden' key={skill}>
						<span className='stack-bg bg-accent absolute left-0 top-0 w-full h-full z-0' />
						<span className='stack-chip inline-block font-display text-md uppercase tracking-[-0.01em] text-ink-inv border-2 border-accent py-sm px-md opacity-0 cursor-default z-20'>
							<span className='chip-mask relative overflow-hidden block leading-none'>
								<span className='chip-text-top block relative z-20'>{skill}</span>
								<span className='chip-text-bottom absolute left-0 top-0 z-10 text-ink'>{skill}</span>
							</span>
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
