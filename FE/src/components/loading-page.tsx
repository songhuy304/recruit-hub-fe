"use client";
import { MorphingInfinity } from "./ui/morphing-infinity";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <MorphingInfinity className="size-24 text-primary" />
      </div>
    </div>
  );
};

export { LoadingPage };
