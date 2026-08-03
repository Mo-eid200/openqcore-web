"use client";

import * as React from "react";

import * as PopoverPrimitive
from "@radix-ui/react-popover";

import clsx from "clsx";

const Popover =
    PopoverPrimitive.Root;

const PopoverTrigger =
    PopoverPrimitive.Trigger;

const PopoverContent =
    React.forwardRef<
        React.ElementRef<
            typeof PopoverPrimitive.Content
        >,
        React.ComponentPropsWithoutRef<
            typeof PopoverPrimitive.Content
        >
    >(

        (
            {
                className,
                align = "start",
                sideOffset = 8,
                ...props
            },
            ref
        ) => (

            <PopoverPrimitive.Portal>

                <PopoverPrimitive.Content

                    ref={ref}

                    align={align}

                    sideOffset={sideOffset}

                    className={clsx(
                        `
                        z-50

                        w-72

                        rounded-2xl

                        border
                        border-white/10

                        bg-[#0f0c09]

                        p-2

                        text-white

                        shadow-2xl

                        outline-none

                        animate-in
                        fade-in-0
                        zoom-in-95
                    `,
                        className
                    )}

                    {...props}
                />

            </PopoverPrimitive.Portal>
        )
    );

PopoverContent.displayName =
    "PopoverContent";

export {

    Popover,

    PopoverTrigger,

    PopoverContent,
};