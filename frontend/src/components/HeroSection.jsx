import { SignInButton } from "@clerk/clerk-react";
import { ArrowRightIcon, BugPlay, VideoIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="z-10 max-w-7xl mx-auto bg-transparent flex flex-col pt-20 items-center min-h-[80vh]">

      <div className="flex items-center gap-2 rounded-full bg-base-200/60 border border-primary/20 px-4 py-2 text-sm text-linear-content/70 backdrop-blur shadow-primary shadow-md mb-10 w-fit text-primary">
        <BugPlay className="size-4" />
        Level Up Your Code
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight max-w-4xl mx-auto text-center">
        <span className="text-primary">
          Drill Your Coding Skills
        </span>
        <br />
        <span className="text-base-content/80">For Real Interviews</span>
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-base-content/60 text-center">
        Practice DSA, system design, and real-world problems with an experience
        built for developers preparing for top tech interviews.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <SignInButton mode="modal">
          <button className="btn btn-primary rounded-xl px-6 shadow-primary/30">
            Get started free
            <ArrowRightIcon className="size-5" />
          </button>
        </SignInButton>

        <button className="btn btn-outline rounded-xl px-6 border-base-content/20">
          <VideoIcon className="size-5" />
          Watch demo
        </button>
      </div>

      <p className="mt-15 text-sm text-base-content/50 text-center">
        Built for developers preparing for top tech companies
      </p>
    </section>
  );
};
export default HeroSection;
