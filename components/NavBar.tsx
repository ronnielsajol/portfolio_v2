"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type NavBarProps = {
	visible: boolean;
};

const NAV_LINKS = [
	{ label: "Work", href: "#work" },
	{ label: "About", href: "#about" },
	{ label: "Contact", href: "#contact" },
];

export default function NavBar({ visible }: NavBarProps) {
	const navRef = useRef<HTMLElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useGSAP(
		() => {
			if (!navRef.current) return;
			if (visible) {
				gsap.fromTo(
					navRef.current,
					{ yPercent: -100, opacity: 0 },
					{ yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 }
				);
			}
		},
		{ scope: navRef, dependencies: [visible] }
	);

	if (!visible) return null;

	return (
		<nav
			ref={navRef}
			id='site-nav'
			aria-label='Main navigation'
			className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-page-gutter h-14 bg-paper border-b-2 border-accent opacity-0'>
			{/* Wordmark */}
			<a
				href='#'
				aria-label='Ronniel — home'
				className='relative z-50 font-display text-md md:text-lg text-ink uppercase tracking-[-0.01em] no-underline leading-none'>
				RON.DEV
			</a>

			{/* Desktop Nav links */}
			<ul role='list' className='hidden md:flex gap-xl list-none m-0 p-0'>
				{NAV_LINKS.map(({ label, href }) => (
					<li key={href}>
						<a
							href={href}
							className='nav-link font-body text-sm font-bold tracking-[0.14em] uppercase text-ink-2 no-underline transition-colors duration-(--animate-dur-micro) ease-out hover:text-accent focus:text-accent outline-none'>
							{label}
						</a>
					</li>
				))}
			</ul>

			{/* Mobile Hamburger Button */}
			<button
				className='relative z-50 md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8 focus:outline-none'
				onClick={() => setIsOpen(!isOpen)}
				aria-label='Toggle menu'
				aria-expanded={isOpen}>
				<div className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
				<div className={`w-6 h-0.5 bg-ink transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
				<div className={`w-6 h-0.5 bg-ink transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
			</button>

			{/* Mobile Menu Overlay */}
			<div
				className={`transition-opacity duration-500 fixed inset-0 z-40 flex h-dvh w-screen flex-col items-center justify-center bg-paper backdrop-blur-md md:hidden ${
					isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}>
				<ul role='list' className='flex flex-col items-center justify-center gap-xl list-none m-0 p-0'>
					{NAV_LINKS.map(({ label, href }) => (
						<li key={href}>
							<a
								href={href}
								onClick={() => setIsOpen(false)}
								className='font-anton text-6xl uppercase tracking-normal text-ink no-underline hover:text-accent focus:text-accent outline-none transition-colors duration-300'>
								{label}
							</a>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
