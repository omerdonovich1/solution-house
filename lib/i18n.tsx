"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Lightweight bilingual layer (Hebrew / English). Text lives inline next
 * to each component as `{ he, en }` pairs; `useTx()` returns a picker
 * bound to the active language. Switching flips <html> dir + lang (RTL↔LTR)
 * and persists the choice. Rubik covers both Hebrew and Latin, so the
 * typeface stays identical across languages.
 */

export type Lang = "he" | "en";
export type Bi = { he: string; en: string };

interface Ctx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangCtx = createContext<Ctx>({
  lang: "he",
  dir: "rtl",
  setLang: () => {},
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("he");

  // read the saved choice from localStorage (the source of truth) and
  // re-assert dir/lang on <html> — React hydration can reconcile those
  // attributes back to the server-rendered "he"/"rtl", so we can't trust
  // the DOM attribute here and must re-apply after mount.
  useEffect(() => {
    let saved: Lang = "he";
    try {
      if (localStorage.getItem("sh_lang") === "en") saved = "en";
    } catch {
      /* ignore */
    }
    setLangState(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "he" ? "rtl" : "ltr";
  }, []);

  const apply = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    try {
      localStorage.setItem("sh_lang", l);
    } catch {
      /* ignore */
    }
  };

  return (
    <LangCtx.Provider
      value={{
        lang,
        dir: lang === "he" ? "rtl" : "ltr",
        setLang: apply,
        toggle: () => apply(lang === "he" ? "en" : "he"),
      }}
    >
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);

/** Returns a picker: `tx({ he: "שלום", en: "Hello" })`. */
export function useTx() {
  const { lang } = useContext(LangCtx);
  return (s: Bi) => s[lang];
}

/** Inline, render-blocking script — sets dir/lang before first paint to
 *  avoid an RTL flash for returning English visitors. */
export const LANG_INIT_SCRIPT = `(function(){try{var l=localStorage.getItem('sh_lang');if(l==='en'){document.documentElement.lang='en';document.documentElement.dir='ltr';}}catch(e){}})();`;
