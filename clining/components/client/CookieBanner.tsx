 "use client";

 import { useEffect, useState } from "react";
 import Link from "next/link";
 import { Button } from "@/components/ui/button";

 const STORAGE_KEY = "clining-cookie-consent";
 const ANIM_DURATION_MS = 300;

 export function CookieBanner() {
   const [show, setShow] = useState(false);
   const [entered, setEntered] = useState(false);
   const [isExiting, setIsExiting] = useState(false);

   useEffect(() => {
     if (typeof window === "undefined") return;
     try {
       const stored = window.localStorage.getItem(STORAGE_KEY);
       if (stored !== "accepted") setShow(true);
     } catch {
       setShow(true);
     }
   }, []);

   useEffect(() => {
     if (!show || entered) return;
     const id = requestAnimationFrame(() => {
       requestAnimationFrame(() => setEntered(true));
     });
     return () => cancelAnimationFrame(id);
   }, [show, entered]);

   if (!show) return null;

   const accept = () => {
     try {
       window.localStorage.setItem(STORAGE_KEY, "accepted");
       document.cookie = `${STORAGE_KEY}=accepted; path=/; max-age=${60 * 60 * 24 * 365}`;
     } catch {
       // ignore
     }
     setIsExiting(true);
     setTimeout(() => setShow(false), ANIM_DURATION_MS);
   };

   const animClass = isExiting
     ? "translate-y-full opacity-0"
     : entered
       ? "translate-y-0 opacity-100"
       : "translate-y-full opacity-0";

   return (
     <div
       className={`fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4 pointer-events-none transition-all duration-300 ease-out ${animClass}`}
     >
       <div className={`container mx-auto max-w-4xl ${isExiting ? "pointer-events-none" : "pointer-events-auto"}`}>
         <div className="rounded-2xl bg-slate-900/95 text-slate-50 backdrop-blur shadow-lg border border-slate-700 px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3">
           <div className="flex-1 text-sm leading-relaxed">
             Мы используем файлы cookie, чтобы сайт работал стабильно, а также для
             аналитики и улучшения сервиса. Продолжая пользоваться сайтом, вы
             соглашаетесь с{" "}
             <Link href="/cookies" className="underline underline-offset-2">
               политикой использования cookie
             </Link>{" "}
             и{" "}
             <Link href="/privacy" className="underline underline-offset-2">
               политикой конфиденциальности
             </Link>
             .
           </div>
           <div className="flex gap-2 justify-end shrink-0">
             <Button
               type="button"
               size="sm"
               variant="outline"
               className="border-slate-600 bg-transparent text-slate-50 hover:bg-slate-800"
               onClick={accept}
             >
               Понятно
             </Button>
           </div>
         </div>
       </div>
     </div>
   );
 }

