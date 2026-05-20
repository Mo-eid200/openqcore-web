"use client";
import React from "react";

export default function KnowledgeToolbar({ onUpload }: { onUpload?: () => void }) {
    return (
        <div className="flex flex-wrap items-end justify-between gap-2 pb-4">
            <div>
                <h1 className="text-xl font-bold text-white">Knowledge Vault</h1>
                <p className="text-xs text-amber-100/70 mt-1">
                    Upload, manage, or search your personal knowledge files.
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
                onClick={onUpload}
            >
                + Upload Knowledge
            </button>
        </div>
    );
}