"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

type LoaderProps = {
	onFinish?: () => void;
};

export default function Loader({ onFinish }: LoaderProps) {
	const [visible, setVisible] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLHeadingElement>(null);
	const textRef2 = useRef<HTMLHeadingElement>(null);
	const circleRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!visible || !textRef.current || !containerRef.current) return;

			const split = new SplitText(textRef.current, { type: "chars" });
			const split2 = new SplitText(textRef2.current, { type: "chars" });

			document.documentElement.classList.add("loading");
			document.body.classList.add("loading");

			gsap.set(textRef.current, { opacity: 1 });
			gsap.set(textRef2.current, { opacity: 1 });

			const tl = gsap.timeline({
				onComplete: () => {
					split.revert();
					split2.revert();
					setVisible(false);
					document.documentElement.classList.remove("loading");
					document.body.classList.remove("loading");
					onFinish?.();
				},
			});

			tl
				.from([...split.chars, ...split2.chars], {
					yPercent: 110,
					duration: 0.85,
					stagger: 0.09,
					ease: "power3.out",
					delay: 1,
				})
				.to({}, { duration: 0.45 })
				.to([...split.chars, ...split2.chars], {
					y: -200,
					stagger: 0.09,
					duration: 0.6,
					ease: "power3.in",
				})
				.to(circleRef.current, {
					scale: 300,
					duration: 0.8,
					ease: "power2.inOut",
				});

			return () => {
				split.revert();
				split2.revert();
				tl.kill();
			};
		},
		{ scope: containerRef, dependencies: [visible] }
	);

	if (!visible) return null;

	return (
		<div ref={containerRef} className='fixed inset-0 z-50 flex flex-col justify-end-safe w-full pb-16 bg-accent'>
			<div ref={circleRef} className='rounded-full bg-black w-2 h-2 absolute left-[50%] top-[50%] scale-0' />
			<div className='overflow-hidden w-fit'>
				<h1
					ref={textRef}
					className='font-podium text-display-xl md:text-[8vw] uppercase text-black leading-none select-none'
					style={{ opacity: 0 }}>
					RON.
				</h1>
			</div>
			<div className='overflow-hidden w-fit'>
				<h1
					ref={textRef2}
					className='font-podium text-display-xl md:text-[8vw] uppercase text-black leading-none select-none'
					style={{ opacity: 0 }}>
					DEV
				</h1>
			</div>
		</div>
	);
}
