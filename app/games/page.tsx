import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — Green Air Cannabis | Mississauga",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at Green Air Cannabis.",
  alternates: {
    canonical: "https://greenaircannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
