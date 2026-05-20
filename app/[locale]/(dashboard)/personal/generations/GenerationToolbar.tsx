"use client";
import React from "react";

export default function GenerationToolbar({ onCreate }: { onCreate?: () => void }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-2 pb-4">
            <div>
                <h1 className="text-xl font-bold text-white">Your Generations</h1>
                <p className="text-xs text-amber-100/70 mt-1">
                    Explore, create, and manage your AI-generated completions.
                </p>
            </div>
            <button
                className="
          h-8 px-4 rounded-lg
          bg-amber-400
          text-black
          font-semibold text-xs
          shadow-sm
          hover:bg-amber-300
          transition
        "
                onClick={onCreate}
            >
                + New Generation
            </button>
        </div>
    );
}