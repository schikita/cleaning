"use client";

type SkelProps = {
  className?: string;
  tone?: "dark" | "light";
};

function Skel({ className = "", tone = "dark" }: SkelProps) {
  const shimmerToneClass =
    tone === "light"
      ? "skeleton-shimmer skeleton-shimmer--light"
      : "skeleton-shimmer skeleton-shimmer--dark";

  return (
    <div className={`relative overflow-hidden skeleton-base ${className}`}>
      <div
        className={`pointer-events-none absolute inset-0 ${shimmerToneClass}`}
      />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div
      className="min-h-screen bg-[#060a14]"
      aria-hidden="true"
      aria-busy="true"
    >
      {/* ── Hero Skeleton ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-[#00d2ff]/[0.035] blur-[130px] skeleton-float" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[640px] h-[640px] rounded-full bg-[#7253df]/[0.035] blur-[140px] skeleton-float2" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-20">
          <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
            <Skel
              tone="dark"
              className="h-10 w-64 rounded-full bg-white/[0.05] mb-10"
            />

            <Skel
              tone="dark"
              className="h-16 sm:h-20 md:h-24 w-[320px] sm:w-[440px] md:w-[560px] rounded-2xl bg-white/[0.05] mb-6"
            />

            <Skel
              tone="dark"
              className="h-7 w-[280px] sm:w-[380px] rounded-xl bg-white/[0.04] mb-4"
            />

            <div className="space-y-2.5 mb-12 flex flex-col items-center">
              <Skel
                tone="dark"
                className="h-5 w-[340px] sm:w-[480px] rounded-lg bg-white/[0.035]"
              />
              <Skel
                tone="dark"
                className="h-5 w-[260px] sm:w-[360px] rounded-lg bg-white/[0.035]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Skel
                tone="dark"
                className="h-14 w-52 rounded-2xl bg-[#00d2ff]/[0.10]"
              />
              <Skel
                tone="dark"
                className="h-14 w-52 rounded-2xl bg-white/[0.05] border border-white/[0.08]"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 w-full max-w-3xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skel
                    tone="dark"
                    className="h-9 w-20 rounded-lg bg-white/[0.05]"
                  />
                  <Skel
                    tone="dark"
                    className="h-4 w-28 rounded bg-white/[0.035]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Skeleton ─────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center mb-16">
            <Skel tone="light" className="h-4 w-16 rounded bg-slate-200 mb-4" />
            <Skel
              tone="light"
              className="h-10 w-72 sm:w-96 rounded-xl bg-slate-200 mb-5"
            />
            <Skel
              tone="light"
              className="h-5 w-80 sm:w-[420px] rounded-lg bg-slate-100"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
              >
                <Skel
                  tone="light"
                  className="w-14 h-14 rounded-xl bg-slate-100 mb-5"
                />
                <Skel
                  tone="light"
                  className="h-6 w-36 rounded-lg bg-slate-100 mb-3"
                />
                <div className="space-y-2 mb-5">
                  <Skel
                    tone="light"
                    className="h-4 w-full rounded bg-slate-50"
                  />
                  <Skel
                    tone="light"
                    className="h-4 w-4/5 rounded bg-slate-50"
                  />
                </div>
                <Skel tone="light" className="h-4 w-24 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works Skeleton ─────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center mb-16 sm:mb-20">
            <Skel tone="light" className="h-4 w-28 rounded bg-slate-200 mb-4" />
            <Skel
              tone="light"
              className="h-10 w-72 sm:w-96 rounded-xl bg-slate-200 mb-5"
            />
            <Skel tone="light" className="h-5 w-64 rounded-lg bg-slate-100" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skel
                  tone="light"
                  className="w-[104px] h-[104px] rounded-3xl bg-slate-100 mb-7"
                />
                <Skel
                  tone="light"
                  className="h-7 w-40 rounded-lg bg-slate-100 mb-3"
                />
                <div className="space-y-2 flex flex-col items-center">
                  <Skel tone="light" className="h-4 w-52 rounded bg-slate-50" />
                  <Skel tone="light" className="h-4 w-40 rounded bg-slate-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Skeleton ────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#060a14]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
            <div>
              <Skel
                tone="dark"
                className="h-4 w-20 rounded bg-white/[0.07] mb-4"
              />
              <Skel
                tone="dark"
                className="h-12 w-80 rounded-xl bg-white/[0.05] mb-3"
              />
              <Skel
                tone="dark"
                className="h-12 w-64 rounded-xl bg-white/[0.05] mb-5"
              />
              <Skel
                tone="dark"
                className="h-5 w-72 rounded-lg bg-white/[0.04] mb-10"
              />

              <div className="space-y-5">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <Skel
                      tone="dark"
                      className="w-10 h-10 rounded-xl bg-white/[0.05] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <Skel
                        tone="dark"
                        className="h-5 w-44 rounded bg-white/[0.05] mb-2"
                      />
                      <Skel
                        tone="dark"
                        className="h-4 w-full rounded bg-white/[0.035]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d1525] rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-4 mb-6">
                <Skel
                  tone="dark"
                  className="w-12 h-12 rounded-full bg-white/[0.07]"
                />
                <div className="flex-1">
                  <Skel
                    tone="dark"
                    className="h-5 w-24 rounded bg-white/[0.07] mb-1.5"
                  />
                  <Skel
                    tone="dark"
                    className="h-3.5 w-32 rounded bg-white/[0.04]"
                  />
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Skel
                      key={i}
                      tone="dark"
                      className="w-4 h-4 rounded bg-white/[0.07]"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 mb-6">
                <Skel
                  tone="dark"
                  className="h-4 w-full rounded bg-white/[0.04]"
                />
                <Skel
                  tone="dark"
                  className="h-4 w-full rounded bg-white/[0.04]"
                />
                <Skel
                  tone="dark"
                  className="h-4 w-3/4 rounded bg-white/[0.04]"
                />
              </div>

              <Skel
                tone="dark"
                className="h-8 w-64 rounded-lg bg-white/[0.04]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Geography Skeleton ────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-[#f8f9fb]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center mb-14">
            <Skel tone="light" className="h-4 w-20 rounded bg-slate-200 mb-4" />
            <Skel
              tone="light"
              className="h-10 w-80 sm:w-[420px] rounded-xl bg-slate-200 mb-5"
            />
            <Skel
              tone="light"
              className="h-5 w-72 sm:w-[380px] rounded-lg bg-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.06)] flex flex-col items-center"
              >
                <Skel
                  tone="light"
                  className="h-5 w-20 rounded bg-slate-100 mb-2"
                />
                <Skel tone="light" className="h-3.5 w-24 rounded bg-slate-50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Skeleton ──────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-[#060a14] rounded-[2rem] p-10 sm:p-14 md:p-16 flex flex-col items-center shadow-[0_30px_90px_rgba(0,0,0,0.25)] border border-white/[0.06]">
            <Skel
              tone="dark"
              className="h-10 sm:h-12 w-72 sm:w-96 rounded-xl bg-white/[0.05] mb-5"
            />
            <Skel
              tone="dark"
              className="h-5 w-64 sm:w-80 rounded-lg bg-white/[0.035] mb-10"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <Skel
                tone="dark"
                className="h-14 w-48 rounded-2xl bg-[#00d2ff]/[0.10]"
              />
              <Skel
                tone="dark"
                className="h-14 w-48 rounded-2xl bg-white/[0.05] border border-white/[0.08]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Skeleton ───────────────────────────────── */}
      <footer className="bg-[#060a14] border-t border-white/[0.06] py-14 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2 md:col-span-1">
              <Skel
                tone="dark"
                className="h-7 w-28 rounded bg-white/[0.07] mb-4"
              />
              <Skel tone="dark" className="h-4 w-40 rounded bg-white/[0.04]" />
            </div>

            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skel
                  tone="dark"
                  className="h-4 w-16 rounded bg-white/[0.07] mb-4"
                />
                <div className="space-y-2.5">
                  {[...Array(4 + (i % 2))].map((_, j) => (
                    <Skel
                      key={j}
                      tone="dark"
                      className="h-3.5 w-28 rounded bg-white/[0.035]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex justify-between">
            <Skel tone="dark" className="h-4 w-52 rounded bg-white/[0.035]" />
            <div className="flex gap-6">
              <Skel tone="dark" className="h-4 w-16 rounded bg-white/[0.035]" />
              <Skel tone="dark" className="h-4 w-28 rounded bg-white/[0.035]" />
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .skeleton-base {
          animation: skeletonPulse 2.6s ease-in-out infinite;
        }

        .skeleton-shimmer {
          width: 55%;
          height: 100%;
          transform: translateX(-120%);
          animation: skeletonShimmer 1.45s ease-in-out infinite;
          filter: blur(0px);
        }

        .skeleton-shimmer--dark {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
        }

        .skeleton-shimmer--light {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.75),
            transparent
          );
          opacity: 0.65;
        }

        @keyframes skeletonShimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(240%); }
        }

        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.93; }
        }

        .skeleton-float {
          animation: skeletonFloat 12s ease-in-out infinite;
        }

        .skeleton-float2 {
          animation: skeletonFloat2 14s ease-in-out infinite;
        }

        @keyframes skeletonFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, 18px, 0); }
        }

        @keyframes skeletonFloat2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -16px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton-base,
          .skeleton-shimmer,
          .skeleton-float,
          .skeleton-float2 {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
