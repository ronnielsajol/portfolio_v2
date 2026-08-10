"use client";

import { useEffect, useRef } from "react";
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
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 40,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 var(--page-gutter)",
				height: "3.5rem",
				background: "var(--color-paper)",
				borderBottom: "var(--rule-accent)",
				opacity: 0,
			}}>
			{/* Wordmark */}
			<a
				href='#'
				aria-label='Ronniel — home'
				style={{
					fontFamily: "var(--font-display)",
					fontSize: "var(--text-lg)",
					color: "var(--color-ink)",
					textTransform: "uppercase",
					letterSpacing: "-0.01em",
					textDecoration: "none",
					lineHeight: 1,
				}}>
				Ronniel
			</a>

			{/* Nav links */}
			<ul
				role='list'
				style={{
					display: "flex",
					gap: "var(--space-xl)",
					listStyle: "none",
					margin: 0,
					padding: 0,
				}}>
				{NAV_LINKS.map(({ label, href }) => (
					<li key={href}>
						<a
							href={href}
							className='nav-link'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "var(--text-sm)",
								fontWeight: 700,
								letterSpacing: "0.14em",
								textTransform: "uppercase",
								color: "var(--color-ink-2)",
								textDecoration: "none",
								transition: `color var(--dur-micro) var(--ease-out)`,
							}}
							onMouseEnter={(e) =>
								((e.currentTarget as HTMLAnchorElement).style.color =
									"var(--color-accent)")
							}
							onMouseLeave={(e) =>
								((e.currentTarget as HTMLAnchorElement).style.color =
									"var(--color-ink-2)")
							}
							onFocus={(e) =>
								((e.currentTarget as HTMLAnchorElement).style.color =
									"var(--color-accent)")
							}
							onBlur={(e) =>
								((e.currentTarget as HTMLAnchorElement).style.color =
									"var(--color-ink-2)")
							}>
							{label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
