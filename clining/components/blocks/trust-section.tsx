"use client";

import { AnimateOnScroll } from "./animate-on-scroll";

const FEATURES = [
  {
    title: "Проверенные специалисты",
    desc: "Каждый клинер проходит верификацию документов и проверку навыков перед допуском к заказам",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Безопасная оплата",
    desc: "Деньги списываются только после приёмки работы. Полный возврат при нарушении условий",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Гарантия качества",
    desc: "Если уборка не соответствует стандарту — бесплатная переработка или возврат средств",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    title: "Прозрачные цены",
    desc: "Никаких скрытых комиссий. Вы видите конечную стоимость до подтверждения заказа",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
] as const;

const TESTIMONIAL = {
  name: "Анна М.",
  role: "Заказчик из Минска",
  rating: 5,
  text: "Нашла отличную клининговую компанию за 10 минут. Квартира сияет! Оплата через сервис дала уверенность, что всё будет сделано качественно.",
  detail: "Генеральная уборка 3-комнатной квартиры",
};

export function TrustSection() {
  return (
    <section
      className="py-24 sm:py-32 relative overflow-hidden"
      id="advantages"
      aria-label="Преимущества"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#060a14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,210,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(114,83,223,0.06),transparent_60%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left: Features */}
          <div>
            <AnimateOnScroll direction="left">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#00d2ff] mb-4">
                Почему мы
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                Почему выбирают <span className="text-[#00d2ff]">Pro</span>
                <span className="text-[#7253df]">Чисто</span>
              </h2>
              <p className="text-lg text-white/40 mb-10">
                Безопасная платформа, где качество услуг гарантировано,
                а&nbsp;каждая сделка защищена
              </p>
            </AnimateOnScroll>

            <div className="space-y-5">
              {FEATURES.map((feature, idx) => (
                <AnimateOnScroll key={idx} delay={idx * 0.1} direction="left">
                  <div className="flex gap-4 items-start group">
                    <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/[0.08] border border-[#00d2ff]/[0.12] flex items-center justify-center flex-shrink-0 text-[#00d2ff] group-hover:bg-[#00d2ff]/[0.15] group-hover:border-[#00d2ff]/[0.25] transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[17px] text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-white/40 text-[15px] leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Right: Testimonial */}
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="relative">
              {/* Decorative tilted card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d2ff]/20 to-[#7253df]/20 rounded-3xl transform rotate-2 blur-sm" />

              <div className="relative bg-[#0d1525] rounded-3xl p-8 sm:p-10 border border-white/[0.06]">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#7253df] flex items-center justify-center text-white font-bold text-lg">
                    {TESTIMONIAL.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">
                      {TESTIMONIAL.name}
                    </div>
                    <div className="text-sm text-white/40">
                      {TESTIMONIAL.role}
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(TESTIMONIAL.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-white/70 text-[17px] leading-relaxed mb-6 italic">
                  &ldquo;{TESTIMONIAL.text}&rdquo;
                </blockquote>

                {/* Service tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/35 text-sm">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {TESTIMONIAL.detail}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
