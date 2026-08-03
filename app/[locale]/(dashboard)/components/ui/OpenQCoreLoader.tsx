import Image from "next/image";

export default function OpenQCoreLoader() {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center p-6">
      <div className="oq-loader-card relative w-full max-w-[400px] overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-[18px]">
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/5" />
        <div className="oq-loader-sheen pointer-events-none absolute inset-0" />

        <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] tracking-[0.02em] text-white/70">
          <span className="oq-loader-badge-dot h-[7px] w-[7px] rounded-full bg-[#ffd24a]" />
          OpenQCore Runtime Active
        </div>

        <div className="relative z-10 mb-4 grid place-items-center">
          <div className="relative grid h-[120px] w-[120px] place-items-center">
            <div className="oq-loader-logo-glow absolute h-[110px] w-[110px] rounded-full" />
            <Image
              src="/engines/corelogo.png"
              alt="OpenQCore logo"
              width={84}
              height={84}
              priority
              className="oq-loader-logo relative z-10 h-[84px] w-[84px] object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 mb-2 text-center text-[11px] uppercase tracking-[0.16em] text-white/40">
          OpenQCore
        </div>

        <div className="relative z-10 mb-2 min-h-[30px] text-center text-[18px] font-semibold tracking-[0.01em] text-white/90">
          Initializing intelligent workspace
        </div>

        <div className="relative z-10 mx-auto mb-[18px] min-h-[58px] max-w-[320px] text-center text-[12px] leading-6 text-white/50">
          Loading context, synchronizing modules, and preparing the OpenQCore environment for your session.
        </div>

        <div className="relative z-10 rounded-2xl border border-white/5 bg-white/[0.025] p-[10px]">
          <div className="relative h-2 overflow-hidden rounded-full border border-white/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
            <div className="oq-loader-scan absolute inset-y-0 left-[-32%] w-[32%] rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,210,74,0.28)_18%,rgba(255,210,74,0.88)_50%,rgba(255,210,74,0.28)_82%,transparent_100%)] shadow-[0_0_20px_rgba(255,210,74,0.48)]" />
            <div className="oq-loader-sweep absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] opacity-50" />
          </div>

          <div className="mt-[10px] flex justify-between gap-[10px] text-[11px] text-white/50">
            <div className="inline-flex items-center gap-[7px]">
              <span className="oq-loader-badge-dot h-[6px] w-[6px] rounded-full bg-[#ffd24a]" />
              Syncing platform context
            </div>
            <div>Secure environment</div>
          </div>
        </div>

        <div className="relative z-10 mt-3 text-center text-[10px] tracking-[0.02em] text-white/35">
          Please wait while OpenQCore becomes ready
        </div>
      </div>

      <style jsx>{`
        .oq-loader-card {
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.44),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(255, 255, 255, 0.02);
          animation: oqLoaderFloat 3.8s ease-in-out infinite;
        }

        .oq-loader-sheen {
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 20%,
            transparent 40%
          );
          transform: translateX(-120%);
          animation: oqLoaderSheen 4.8s linear infinite;
        }

        .oq-loader-logo-glow {
          background: radial-gradient(
            circle,
            rgba(255, 210, 74, 0.22) 0%,
            rgba(255, 210, 74, 0.1) 42%,
            rgba(255, 210, 74, 0.03) 62%,
            transparent 78%
          );
          filter: blur(10px);
          animation: oqLoaderGlow 2.8s ease-in-out infinite;
        }

        .oq-loader-logo {
          filter:
            drop-shadow(0 0 10px rgba(255, 210, 74, 0.32))
            drop-shadow(0 0 22px rgba(255, 210, 74, 0.14));
          animation: oqLoaderLogoPulse 2.2s ease-in-out infinite;
        }

        .oq-loader-badge-dot {
          box-shadow: 0 0 12px rgba(255, 210, 74, 0.55);
          animation: oqLoaderDotPulse 1.8s ease-in-out infinite;
        }

        .oq-loader-scan {
          animation: oqLoaderScan 1.55s ease-in-out infinite;
        }

        .oq-loader-sweep {
          transform: translateX(-100%);
          animation: oqLoaderSweep 2.3s linear infinite;
        }

        @keyframes oqLoaderScan {
          0% {
            left: -32%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes oqLoaderSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(180%);
          }
        }

        @keyframes oqLoaderDotPulse {
          0%,
          100% {
            transform: scale(0.9);
            opacity: 0.65;
          }
          50% {
            transform: scale(1.25);
            opacity: 1;
          }
        }

        @keyframes oqLoaderLogoPulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.92;
          }
          50% {
            transform: scale(1.06);
            opacity: 1;
          }
        }

        @keyframes oqLoaderGlow {
          0%,
          100% {
            transform: scale(0.92);
            opacity: 0.55;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.95;
          }
        }

        @keyframes oqLoaderSheen {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(140%);
          }
        }

        @keyframes oqLoaderFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}