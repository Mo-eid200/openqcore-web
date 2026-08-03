"use client";

import * as React from "react";

import { Command as CommandPrimitive }
from "cmdk";

import clsx from "clsx";

const Command =
    React.forwardRef<
        React.ElementRef<
            typeof CommandPrimitive
        >,
        React.ComponentPropsWithoutRef<
            typeof CommandPrimitive
        >
    >((
        {
            className,
            ...props
        },
        ref
    ) => (

        <CommandPrimitive

            ref={ref}

            className={clsx(
                `
                flex
                h-full
                w-full
                flex-col

                overflow-hidden

                rounded-2xl

                bg-[#0f0c09]

                text-white
            `,
                className
            )}

            {...props}
        />
    ));

Command.displayName =
    CommandPrimitive.displayName;

function CommandInput({
    className,
    ...props
}: React.ComponentProps<
    typeof CommandPrimitive.Input
>) {

    return (

        <div
            className="
                border-b
                border-white/10

                px-3
            "
        >

            <CommandPrimitive.Input

                className={clsx(
                    `
                    flex
                    h-11
                    w-full

                    bg-transparent

                    text-sm
                    text-white

                    outline-none

                    placeholder:text-white/30
                `,
                    className
                )}

                {...props}
            />

        </div>
    );
}

function CommandList({
    className,
    ...props
}: React.ComponentProps<
    typeof CommandPrimitive.List
>) {

    return (

        <CommandPrimitive.List

            className={clsx(
                `
                max-h-[320px]

                overflow-y-auto
                overflow-x-hidden
            `,
                className
            )}

            {...props}
        />
    );
}

function CommandEmpty(
    props: React.ComponentProps<
        typeof CommandPrimitive.Empty
    >
) {

    return (

        <CommandPrimitive.Empty

            className="
                py-8

                text-center
                text-sm

                text-white/40
            "

            {...props}
        />
    );
}

function CommandGroup({
    className,
    ...props
}: React.ComponentProps<
    typeof CommandPrimitive.Group
>) {

    return (

        <CommandPrimitive.Group

            className={clsx(
                `
                overflow-hidden

                p-2

                text-white
            `,
                className
            )}

            {...props}
        />
    );
}

function CommandItem({
    className,
    ...props
}: React.ComponentProps<
    typeof CommandPrimitive.Item
>) {

    return (

        <CommandPrimitive.Item

            className={clsx(
                `
                relative

                flex
                cursor-pointer
                select-none
                items-center

                rounded-xl

                px-3
                py-3

                text-sm

                outline-none

                transition-all

                data-[selected=true]:bg-white/10
            `,
                className
            )}

            {...props}
        />
    );
}

export {

    Command,

    CommandInput,

    CommandList,

    CommandEmpty,

    CommandGroup,

    CommandItem,
};