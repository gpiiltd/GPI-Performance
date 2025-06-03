import { cn } from "@/lib/utils";

type LoaderProps = {
  text?: string;
  size?: "xs" | "sm" | "md";
  className?: string;
};

export const Loader = ({
  text,
  size = "md",
  className = "bg-black",
}: LoaderProps) => {
  return (
    // <>
    <div
      className={cn(
        { "small h-4": size === "sm" },
        "loader-wrap text-center relative inline-flex flex-col items-center",
      )}
    >
      <div className={cn("sp sp-3balls", className)} />
      {!!text && <div className="mt-8 opacity-70">{text}</div>}
    </div>
    // </>
  );
};
