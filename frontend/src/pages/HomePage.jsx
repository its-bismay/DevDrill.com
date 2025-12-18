import { Link } from "react-router";
import {
  ArrowRightIcon,
  BugPlay,
  SquareTerminal,
  VideoIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import HeroSection from "../components/HeroSection";
import { useParallax } from "../hooks/usePrallax";

export default function HomePage() {
  const slow = useParallax(20);
  const fast = useParallax(40);
  return (
    <div className="relative bg-transparent">
      {/* ================= FIXED BLINKING BACKGROUND ================= */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          style={{
            transform: `translate3d(${slow.x}px, ${slow.y}px, 0)`,
          }}
          className="
            absolute -top-[25%] left-1/2 -translate-x-1/2
            w-[900px] h-[900px] rounded-full
            bg-primary/25 blur-[180px]
            transition-transform duration-300 ease-out
          "
        />

        <div
          style={{
            transform: `translate3d(${fast.x}px, ${fast.y}px, 0)`,
          }}
          className="
            absolute top-[10%] left-1/2 -translate-x-1/2
            w-[700px] h-[400px]
            bg-secondary/25 blur-[140px]
            transition-transform duration-300 ease-out
          "
        />
        <div
          style={{
            transform: `translate3d(${slow.x * 0.3}px, ${slow.y * 0.3}px, 0)`,
          }}
          className="
            absolute inset-0 opacity-20
            [mask-image:linear-gradient(to_bottom,black,transparent_75%)]
            bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]
            bg-[size:60px_60px]
            transition-transform duration-500 ease-out
          "
        />
      </div>

      {/* ================= NAVBAR ================= */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl
        bg-linear-to-b from-base-100/70 to-base-100/20
        border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
              <SquareTerminal className="text-white size-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent font-mono tracking-wider">
                DevDrill
              </span>
              <span className="text-xs text-base-content/60">
                Code with Purpose
              </span>
            </div>
          </Link>

          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-primary rounded-xl text-white text-sm font-semibold shadow-lg hover:scale-105 transition">
              Let’s begin
              <ArrowRightIcon className="inline ml-2 size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* ================= HERO ================= */}
      <HeroSection />
      {/* ================= HERO → FEATURES TRANSITION ================= */}

      {/* ================= FEATURES ================= */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-transparent from-base-100 via-base-100 to-base-200/40">
        {/* divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex rounded-full bg-base-200/60 border border-primary/20 px-4 py-2 text-sm text-base-content/70 backdrop-blur mb-6">
            Take Full Control of Your Practice
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
            <span className="text-base-content">Developer</span>{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-base-content/60">
            Everything you need to practice smarter, track progress, and prepare
            confidently for real-world interviews.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Real Interview Problems",
                desc: "Hand-picked coding questions inspired by real interviews.",
                icon: "</>",
                color: "primary",
              },
              {
                title: "Progress Tracking",
                desc: "Track accuracy, speed, and consistency with clear insights.",
                icon: "📊",
                color: "secondary",
              },
              {
                title: "Focused Practice Paths",
                desc: "Structured DSA, system design, and language-specific paths.",
                icon: "🎯",
                color: "accent",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl
                bg-linear-to-b from-base-200/60 to-base-300/30
                border border-white/15
                backdrop-blur-xl p-8 transition-all
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-${f.color}/20 text-${f.color}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-base-content">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm text-base-content/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
