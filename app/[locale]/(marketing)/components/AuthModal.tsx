"use client";

import React, {
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { useRouter } from "next/navigation";

import {
    AnimatePresence,
    motion,
} from "framer-motion";

import Image from "next/image";

import {
    X,
} from "lucide-react";

import {
    createPortal,
} from "react-dom";

import {
    useAuth,
} from "../../../context/AuthContext";

import {
    ensureWorkspaceLoaded,
    getStoredWorkspace,
    setStoredContext,
} from "../../../lib/api/core/qxtClient";

/* =========================================================
   TYPES
========================================================= */

type AuthMode =
    | "signin"
    | "signup";

type Props = {
    open: boolean;

    onClose: () => void;
};

/* =========================================================
   COMPONENT
========================================================= */

export default function WorkspaceModal({
    open,
    onClose,
}: Props) {
    const router = useRouter();

    const {
        login,
        register,
        loadingUser,
    } = useAuth();

    /* =====================================================
       STATE
    ===================================================== */

    const [mode, setMode] =
        useState<AuthMode>(
            "signin"
        );

    const isSignin =
        mode === "signin";

    const [fullName, setFullName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [
        passwordConfirm,
        setPasswordConfirm,
    ] = useState("");

    const [submitting, setSubmitting] =
        useState(false);

    const [errorMsg, setErrorMsg] =
        useState<string | null>(
            null
        );

    const isMounted =
        useRef(true);

    /* =====================================================
       BODY LOCK
    ===================================================== */

    useEffect(() => {
        if (!open) {
            return;
        }

        document.body.style.overflow =
            "hidden";

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [open]);

    /* =====================================================
       ESC CLOSE
    ===================================================== */

    useEffect(() => {
        if (!open) {
            return;
        }

        function handleKey(
            e: KeyboardEvent
        ) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener(
            "keydown",
            handleKey
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKey
            );
        };
    }, [
        open,
        onClose,
    ]);

    /* =====================================================
       UNMOUNT
    ===================================================== */

    useEffect(() => {
        return () => {
            isMounted.current =
                false;
        };
    }, []);

    /* =====================================================
       RESET
    ===================================================== */

    useEffect(() => {
        if (!open) {
            setSubmitting(false);

            setErrorMsg(null);
        }
    }, [open]);

    /* =====================================================
       AUTH SUBMIT
    ===================================================== */

    async function handleSubmit(
        e: FormEvent
    ) {
        e.preventDefault();

        if (
            loadingUser ||
            submitting
        ) {
            return;
        }

        setErrorMsg(null);

        const cleanEmail =
            email
                .trim()
                .toLowerCase();

        const cleanPass =
            password;

        if (
            !cleanEmail ||
            !cleanPass
        ) {
            setErrorMsg(
                "Please enter email and password."
            );

            return;
        }

        if (!isSignin) {
            if (
                cleanPass.length < 8
            ) {
                setErrorMsg(
                    "Password must be at least 8 characters."
                );

                return;
            }

            if (
                cleanPass !==
                passwordConfirm
            ) {
                setErrorMsg(
                    "Passwords do not match."
                );

                return;
            }
        }

        try {
            setSubmitting(true);

            // =================================================
            // AUTH
            // =================================================

            if (isSignin) {
                await login(
                    cleanEmail,
                    cleanPass
                );
            } else {
                await register(
                    cleanEmail,
                    cleanPass
                );
            }

            // =================================================
            // LOAD ACTIVE WORKSPACE
            // =================================================

            const workspaceId =
                await ensureWorkspaceLoaded();

            // =================================================
            // RESTORE CONTEXT
            // =================================================

            if (workspaceId) {
                setStoredContext({
                    workspaceId,
                    environment:
                        "workspace",
                });
            } else {
                setStoredContext({
                    workspaceId:
                        null,

                    companyId:
                        null,

                    environment:
                        "personal",
                });
            }

            // fallback restore
            const storedWorkspace =
                getStoredWorkspace();

            if (
                storedWorkspace
            ) {
                setStoredContext({
                    workspaceId:
                        storedWorkspace,

                    environment:
                        "workspace",
                });
            }

            if (
                !isMounted.current
            ) {
                return;
            }

            // =================================================
            // RESET FORM
            // =================================================

            setEmail("");

            setPassword("");

            setPasswordConfirm(
                ""
            );

            setFullName("");

            // =================================================
            // CLOSE
            // =================================================

            onClose();

            // =================================================
            // ROUTE
            // IMPORTANT:
            // NEVER FORCE WORKSPACE PAGE
            // =================================================

            router.push(
                "/dashboard"
            );

            router.refresh();
        } catch (err: any) {
            if (
                !isMounted.current
            ) {
                return;
            }

            console.error(
                "Auth failed:",
                err
            );

            setErrorMsg(
                err?.response?.data
                    ?.detail
                    ?.message ||
                err?.message ||
                "Authentication failed."
            );
        } finally {
            if (
                isMounted.current
            ) {
                setSubmitting(
                    false
                );
            }
        }
    }

    /* =====================================================
       OAUTH
    ===================================================== */

    function startOAuth(
        provider:
            | "google"
            | "outlook"
    ) {
        if (
            typeof window ===
            "undefined"
        ) {
            return;
        }

        const baseURL =
            process.env
                .NEXT_PUBLIC_QXT_API_BASE_URL ||
            "http://127.0.0.1:8000";

        const redirectUri =
            `${window.location.origin}/auth/callback`;

        const path =
            provider ===
                "google"
                ? "/api/v1/auth/oauth/google/start"
                : "/api/v1/auth/oauth/outlook/start";

        window.location.assign(
            `${baseURL}${path}?redirect_uri=${encodeURIComponent(
                redirectUri
            )}`
        );
    }

    /* =====================================================
       SSR GUARD
    ===================================================== */

    if (
        typeof window ===
        "undefined"
    ) {
        return null;
    }

    /* =====================================================
       RENDER
    ===================================================== */

    return createPortal(
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={
                            onClose
                        }
                        className="
                            fixed inset-0 z-40
                            bg-[#101826]/95
                            backdrop-blur-md
                        "
                    />

                    <div
                        className="
                            fixed inset-0 z-50
                            flex items-start justify-center
                            overflow-y-auto
                            px-4
                            pt-28
                            pb-10
                        "
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 40,
                                scale: 0.96,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: 24,
                                scale: 0.98,
                            }}
                            transition={{
                                duration:
                                    0.32,
                                ease: [
                                    0.16,
                                    1,
                                    0.3,
                                    1,
                                ],
                            }}
                            onClick={(
                                e
                            ) =>
                                e.stopPropagation()
                            }
                            className="
                                relative
                                grid grid-cols-[0.95fr_1.05fr]
                                w-full
                                max-w-[980px]
                                min-h-[580px]
                                rounded-[32px]
                                overflow-hidden
                                border border-white/10
                                bg-gradient-to-br
                                from-[#161d2a]
                                via-[#1b2230]
                                to-[#12161f]
                                shadow-[0_0_80px_rgba(212,175,55,0.08)]
                            "
                        >
                            {/* LEFT */}
                            <aside
                                className="
                                    relative
                                    flex flex-col justify-center
                                    px-14 py-14
                                    bg-[#0f1725]
                                    border-r border-white/5
                                "
                            >
                                <div
                                    className="
                                        flex flex-col
                                        items-center
                                        gap-4
                                        w-full
                                    "
                                >
                                    <Image
                                        src="/opq-logo.png"
                                        alt="OpenQCore"
                                        width={
                                            85
                                        }
                                        height={
                                            85
                                        }
                                        priority
                                        className="mx-auto"
                                    />

                                    <h2
                                        className="
                                            font-extrabold
                                            text-[22px]
                                            text-center
                                            text-white
                                            tracking-tight
                                        "
                                    >
                                        OpenQCore{" "}
                                        <span className="text-[#d4af37]">
                                            AI
                                        </span>
                                    </h2>

                                    <div
                                        className="
                                            mt-6
                                            flex flex-col
                                            w-full
                                            gap-3
                                        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                startOAuth(
                                                    "google"
                                                )
                                            }
                                            className="
                                                flex items-center justify-center
                                                w-full rounded-xl
                                                bg-white hover:bg-[#f7e9c7]
                                                py-2.5 gap-2 transition
                                                border border-white/20
                                                text-sm font-semibold
                                                text-[#161d2a]
                                            "
                                        >
                                            <Image
                                                src="/google.gif"
                                                alt="Google"
                                                width={
                                                    40
                                                }
                                                height={
                                                    40
                                                }
                                            />

                                            Sign
                                            in
                                            with
                                            Google
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                startOAuth(
                                                    "outlook"
                                                )
                                            }
                                            className="
                                                flex items-center justify-center
                                                w-full rounded-xl
                                                bg-[#222945] hover:bg-[#2d365e]
                                                py-2.5 gap-2 transition
                                                border border-white/20
                                                text-sm font-semibold text-white
                                            "
                                        >
                                            <Image
                                                src="/outlook.gif"
                                                alt="Outlook"
                                                width={
                                                    40
                                                }
                                                height={
                                                    40
                                                }
                                            />

                                            Sign
                                            in
                                            with
                                            Outlook
                                        </button>
                                    </div>
                                </div>
                            </aside>

                            {/* RIGHT */}
                            <div
                                className="
                                    relative
                                    flex flex-col
                                    justify-center
                                    px-16 py-14
                                "
                            >
                                <button
                                    onClick={
                                        onClose
                                    }
                                    aria-label="Close"
                                    className="
                                        absolute
                                        top-5 right-7
                                        p-2
                                        rounded-full
                                        bg-black/30
                                        hover:bg-white/10
                                        text-neutral-300
                                        hover:text-white
                                        border border-white/20
                                    "
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* FORM CONTINUES */}

                                <div className="w-full max-w-xs">
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        {isSignin
                                            ? "Sign in to your account"
                                            : "Create your account"}
                                    </h3>

                                    <form
                                        className="space-y-3"
                                        onSubmit={handleSubmit}
                                        autoComplete="off"
                                    >
                                        {!isSignin && (
                                            <div>
                                                <label
                                                    className="
                        text-xs
                        text-neutral-400
                        font-medium
                        mb-2
                        block
                    "
                                                >
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    autoComplete="name"
                                                    value={fullName}
                                                    onChange={(e) =>
                                                        setFullName(e.target.value)
                                                    }
                                                    placeholder="Your Name"
                                                    required
                                                    className="
                        w-full
                        h-11
                        px-4
                        rounded-xl
                        outline-none
                        border border-white/10
                        bg-white/5
                        text-white
                        text-[15px]
                        font-medium
                        focus:border-[#d4af37]
                        transition
                    "
                                                />
                                            </div>
                                        )}

                                        <div>
                                            <label
                                                className="
                    text-xs
                    text-neutral-400
                    font-medium
                    mb-2
                    block
                "
                                            >
                                                Email
                                            </label>

                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                placeholder="you@company.com"
                                                required
                                                className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    outline-none
                    border border-white/10
                    bg-white/5
                    text-white
                    text-[15px]
                    font-medium
                    focus:border-[#d4af37]
                    transition
                "
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="
                    text-xs
                    text-neutral-400
                    font-medium
                    mb-2
                    block
                "
                                            >
                                                Password
                                            </label>

                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                placeholder="********"
                                                autoComplete={
                                                    isSignin
                                                        ? "current-password"
                                                        : "new-password"
                                                }
                                                required
                                                className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    outline-none
                    border border-white/10
                    bg-white/5
                    text-white
                    text-[15px]
                    font-medium
                    focus:border-[#d4af37]
                    transition
                "
                                            />
                                        </div>

                                        {!isSignin && (
                                            <div>
                                                <label
                                                    className="
                        text-xs
                        text-neutral-400
                        font-medium
                        mb-2
                        block
                    "
                                                >
                                                    Confirm Password
                                                </label>

                                                <input
                                                    type="password"
                                                    value={passwordConfirm}
                                                    onChange={(e) =>
                                                        setPasswordConfirm(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="********"
                                                    autoComplete="new-password"
                                                    required
                                                    className="
                        w-full
                        h-11
                        px-4
                        rounded-xl
                        outline-none
                        border border-white/10
                        bg-white/5
                        text-white
                        text-[15px]
                        font-medium
                        focus:border-[#d4af37]
                        transition
                    "
                                                />
                                            </div>
                                        )}

                                        {errorMsg && (
                                            <div
                                                className="
                    border border-red-400/30
                    bg-red-500/10
                    rounded-xl
                    text-red-200
                    px-4 py-3
                    text-xs
                "
                                            >
                                                {errorMsg}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={
                                                submitting ||
                                                loadingUser
                                            }
                                            className="
                h-11
                w-full
                rounded-xl
                bg-gradient-to-r
                from-[#d4af37]
                via-[#ffe89e]
                to-[#ffd466]
                text-base
                font-bold
                text-[#161d2a]
                shadow
                transition
                hover:opacity-90
                disabled:opacity-50
                border border-white/10
            "
                                        >
                                            {submitting
                                                ? "Please wait..."
                                                : isSignin
                                                    ? "Sign in"
                                                    : "Create account"}
                                        </button>
                                    </form>

                                    <div
                                        className="
            flex justify-center
            gap-2
            mt-6
            text-xs
            text-neutral-400
            font-medium
        "
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMode("signin")
                                            }
                                            className={`
                px-2 py-1 rounded
                ${isSignin
                                                    ? "font-bold bg-[#d4af37] text-[#191d28]"
                                                    : "hover:text-white"
                                                }
            `}
                                        >
                                            Sign in
                                        </button>

                                        <span className="mx-1">
                                            /
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMode("signup")
                                            }
                                            className={`
                px-2 py-1 rounded
                ${!isSignin
                                                    ? "font-bold bg-[#d4af37] text-[#191d28]"
                                                    : "hover:text-white"
                                                }
            `}
                                        >
                                            Create account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}