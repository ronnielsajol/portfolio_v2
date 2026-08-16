"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CONTACT_EMAIL = "sajolronniel28@gmail.com";
const CONTACT_GITHUB = "https://github.com/ronnielsajol";
const CONTACT_LINKEDIN = "https://www.linkedin.com/in/ronnielwebdev/";
const MARQUEE_TEXT = "Ronniel · 2026 · Available for hire ·";
const MARQUEE_SPEED_SECONDS = 28;

const SOCIAL_LINKS = [
	{ label: "GitHub", href: CONTACT_GITHUB },
	{ label: "LinkedIn", href: CONTACT_LINKEDIN },
	{ label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

const COPIES = 6;

export default function Footer() {
	const containerRef = useRef<HTMLElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);
	const marqueeRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!innerRef.current || !containerRef.current) return;
			gsap.fromTo(
				innerRef.current,
				{ yPercent: -150 },
				{
					yPercent: 0,
					ease: "none",
					scrollTrigger: {
						trigger: containerRef.current,
						start: "top bottom",
						end: "bottom bottom",
						scrub: true,
					},
				}
			);
			gsap.fromTo(
				marqueeRef.current,
				{ yPercent: 100 },
				{
					yPercent: 0,
					ease: "none",
					delay: 0.5,
					scrollTrigger: {
						trigger: innerRef.current,
						start: "bottom bottom",
						toggleActions: "play none none reverse",
					},
				}
			);
		},
		{ scope: containerRef }
	);

	return (
		<footer
			id='footer'
			ref={containerRef}
			aria-label='Site footer'
			className='bg-accent overflow-hidden relative min-h-screen'>
			<div ref={innerRef} className='flex flex-col min-h-screen will-change-transform'>
				<section
					id='contact'
					className='bg-accent py-3xl px-page-gutter border-t-4 border-accent-dim flex flex-col items-start justify-center gap-2xl grow'
					aria-labelledby='contact-heading'>
					<h2
						id='contact-heading'
						className='font-anton text-display uppercase leading-[1.03] tracking-[-0.03em] text-paper m-0 not-italic'>
						Let's Build Something.
					</h2>

					<a
						id='contact-cta'
						href={`mailto:${CONTACT_EMAIL}`}
						className='inline-block font-display text-lg uppercase tracking-[0.02em] leading-none text-accent bg-paper py-md px-xl no-underline transition-all duration-[var(--animate-dur-micro)] ease-out hover:bg-paper-2 focus:outline-2 focus:outline-paper focus:outline-offset-4 outline-none'>
						Get In Touch
					</a>

					<ul role='list' className='flex flex-wrap gap-xl list-none m-0 p-0'>
						{SOCIAL_LINKS.map(({ label, href }) => (
							<li key={label}>
								<a
									href={href}
									target={href.startsWith("http") ? "_blank" : undefined}
									rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
									aria-label={`Open ${label}`}
									className='font-body text-sm font-bold tracking-[0.1em] uppercase text-paper no-underline border-b border-accent-dim pb-[2px] transition-colors duration-[var(--animate-dur-micro)] ease-out hover:border-paper focus:outline-2 focus:outline-paper focus:outline-offset-4 outline-none'>
									{label}
								</a>
							</li>
						))}
					</ul>
				</section>
			</div>
			{/* --- Marquee Section --- */}
			<div className='bg-paper pt-xl relative' ref={marqueeRef}>
				<div
					aria-hidden='true'
					className='flex w-max'
					style={{ animation: `marquee ${MARQUEE_SPEED_SECONDS}s linear infinite` }}>
					{Array.from({ length: COPIES }).map((_, i) => (
						<span
							key={i}
							className='font-display text-2xl uppercase tracking-[-0.01em] leading-[1.1] text-accent pr-2xl whitespace-nowrap'>
							{MARQUEE_TEXT}
						</span>
					))}
				</div>

				<p className='absolute w-px h-px overflow-hidden whitespace-nowrap [clip:rect(0_0_0_0)] [clip-path:inset(50%)]'>
					Ronniel · 2026 · Available for hire
				</p>

				<p className='font-body text-xs text-ink-2 tracking-[0.06em] uppercase mt-md mx-page-gutter mb-0 text-right'>
					&copy; {new Date().getFullYear()} Ronniel. All rights reserved.
				</p>
			</div>
			<style>{`
				@keyframes marquee {
					from { transform: translateX(0); }
					to   { transform: translateX(-${100 / COPIES}%); }
				}
				@media (prefers-reduced-motion: reduce) {
					@keyframes marquee {
						from { opacity: 1; }
						to   { opacity: 1; }
					}
				}
			`}</style>
		</footer>
	);
}
