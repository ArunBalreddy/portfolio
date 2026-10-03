import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </>
  );
}
