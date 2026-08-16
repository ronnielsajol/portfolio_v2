import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
export const metadata: Metadata = {
	title: "Ronniel — Developer & Maker",
	description:
		"Hi, I'm Ronniel — a developer who builds things that matter. Take a look at my experience, projects, and get in touch.",
};

import { Anton } from "next/font/google";

const anton = Anton({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-anton",
});

const podiumSharp = localFont({
	src: "./fonts/podiumsharp-9.13.otf",
	variable: "--font-podium-local",
});

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`h-full antialiased ${podiumSharp.variable} ${anton.variable} ${podiumSharp.className}`}>
			<body className='min-h-full flex flex-col'>
				<LenisProvider>{children}</LenisProvider>
			</body>
		</html>
	);
}
