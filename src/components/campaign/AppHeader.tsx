import { Link } from "@tanstack/react-router";
import { Bag, CaretLeft, Sun, Moon } from "@phosphor-icons/react";
import { useCampaign } from "@/state/campaign";

export function AppHeader({
  title,
  back,
  onBack,
}: {
  title: string;
  back?: string;
  onBack?: () => void;
}) {
  const { state, toggleTheme } = useCampaign();

  return (
    <header className="relative z-20 border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        {back || onBack ? (
          back ? (
            <Link
              to={back}
              className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
            >
              <CaretLeft className="size-6 text-foreground" />
            </Link>
          ) : (
            <button
              onClick={onBack}
              className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
            >
              <CaretLeft className="size-6 text-foreground" />
            </button>
          )
        ) : (
          <span
            className="cursor-default select-none text-lg font-black tracking-tight text-harveys"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            HARVEY'S
          </span>
        )}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
          >
            {state.theme === "dark" ? (
              <Sun className="size-6" />
            ) : (
              <Moon className="size-6" />
            )}
          </button>
          <button
            aria-label="Bag"
            className="flex size-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
          >
            <Bag className="size-6 text-harveys" />
          </button>
        </div>
      </div>
    </header>
  );
}
