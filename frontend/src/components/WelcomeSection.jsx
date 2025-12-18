import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="text-center">
              <h1 className="text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>

            <p className="text-lg text-base-content/60 mt-2">
              Ready to level up your coding skills?
            </p>
          </div>
          <button
            onClick={onCreateSession}
            className="group px-4 py-2.5 bg-accent rounded-lg transition-all duration-200 hover:opacity-90"
          >
            <div className="flex items-center gap-3 text-white font-medium text-lg">
              <ZapIcon className="size-4" />
              <span>Create Session</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;