export default function HomePage() {
  return (
    <div className="relative">

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-32 md:pt-36 md:pb-40">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-[#d4af37]/10 blur-3xl" />
        </div>

        <div className="container-app">

          {/* Badge */}
          <div className="mb-6 flex justify-center">
            <div
              className="
    glass gold-border
    px-5 py-2.5
    text-sm text-slate-300
    tracking-wide
    backdrop-blur-xl
  "
            >
              Next-generation AI infrastructure platform
            </div>
          </div>

          {/* Heading */}
          <div className="mx-auto max-w-4xl text-center">

            <h1 className="
              text-5xl
              md:text-7xl
              font-bold
              tracking-[-0.06em]
              leading-[0.9]
              mb-8
            ">
              Build the future with{" "}
              <span className="text-accent-gradient">
                OpenQCore
              </span>
            </h1>

            <p className="
              max-w-2xl
              mx-auto
              text-lg
              md:text-xl
              text-slate-300/80
              leading-8
            ">
              Enterprise-grade AI infrastructure designed for
              intelligent systems, multimodal agents, voice,
              orchestration, and next-generation AI experiences.
            </p>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">

              <a
                href="/signup"
                className="
                  btn btn-primary
                  text-base
                  px-7
                  py-4
                "
              >
                Get Started
              </a>

              <a
                href="/docs"
                className="
                  btn btn-secondary
                  text-base
                  px-7
                  py-4
                "
              >
                Documentation
              </a>

            </div>

          </div>

          {/* Terminal / Preview */}
          <div className="mt-24 mx-auto max-w-6xl">

            <div
              className="
    glass gold-glow
    border border-white/10
    bg-white/[0.03]
    shadow-2xl
  "
            >

              {/* Terminal Header */}
              <div className="
                flex items-center gap-2
                border-b border-white/5
                px-5 py-4
                bg-white/[0.02]
              ">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />

                <div className="ml-4 text-sm text-slate-500">
                  openqcore.engine.ts
                </div>
              </div>

              {/* Terminal Body */}
              <div className="
                p-6
                md:p-10
                font-mono
                text-sm
                md:text-base
                text-slate-300
                overflow-x-auto
              ">
                <div className="space-y-4">

                  <div>
                    <span className="text-[#d4af37]">
                      const
                    </span>{" "}
                    engine = new{" "}
                    <span className="text-white">
                      PulseEngine
                    </span>
                    ();
                  </div>

                  <div>
                    engine.enableVoice();
                  </div>

                  <div>
                    engine.enableMemory();
                  </div>

                  <div>
                    engine.enableMultimodal();
                  </div>

                  <div className="text-slate-500">
                    // AI orchestration initialized
                  </div>

                  <div className="text-emerald-400">
                    ✓ System online
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="pb-32">

        <div className="container-app">

          <div className="mb-14 text-center">
            <h2 className="text-4xl font-bold tracking-[-0.04em]">
              Designed for modern AI systems
            </h2>

            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              Everything required to build scalable,
              production-ready AI platforms.
            </p>
          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          ">

            {[
              {
                title: "Multimodal AI",
                desc: "Text, image, audio, and video orchestration in one engine."
              },
              {
                title: "Voice Infrastructure",
                desc: "Streaming STT, TTS, realtime voice pipelines, and interruption handling."
              },
              {
                title: "Memory Engine",
                desc: "Persistent contextual memory with adaptive recall systems."
              },
              {
                title: "Enterprise Ready",
                desc: "Scalable architecture built for modern production environments."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="
                  glass glass-hover
                  p-7
                "
              >
                <h3 className="text-xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}