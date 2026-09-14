import type { Metadata } from "next";
import TerminalAbout from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return <TerminalAbout />;
}
