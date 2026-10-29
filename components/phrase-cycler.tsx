"use client";

import { useEffect, useRef } from "react";

export const PHRASES = [
  "F#$&, this dude sucks", "Gold star!", "All credit. Zero effort.",
  "Would work with again.", "Hard pass on round two.", "Deadline? Never met her.",
  "Actually gives a damn.", "Big title. Tiny effort.", "The team’s secret weapon.",
  "Great at taking credit.", "Promoted past their talent.", "Carried the whole project.",
  "All meetings. No answers.", "Makes Mondays less awful.", "A walking reply-all.",
] as const;

export function PhraseCycler() {
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slots = [left.current!, right.current!];
    const visible = new Map<HTMLElement, string>();
    const timers = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let deck: string[] = [];
    let disposed = false;

    function nextPhrase() {
      if (!deck.length) {
        deck = [...PHRASES];
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        const displayed = new Set(visible.values());
        for (let i = 0; i < slots.length; i++) {
          if (displayed.has(deck[i])) {
            const swap = deck.findIndex((phrase, index) => index >= slots.length && !displayed.has(phrase));
            [deck[i], deck[swap]] = [deck[swap], deck[i]];
          }
        }
      }
      return deck.shift()!;
    }

    function schedule(slot: HTMLElement, delay: number) {
      clearTimeout(timers.get(slot));
      if (!disposed && !motion.matches && !document.hidden) {
        timers.set(slot, setTimeout(() => showNext(slot), delay));
      }
    }

    function showNext(slot: HTMLElement) {
      if (disposed) return;
      const previous = slot.querySelector(".phrase-layer");
      const direction = slot.dataset.phraseSide === "left" ? 1 : -1;
      if (previous && !motion.matches && typeof previous.animate === "function") {
        const exit = previous.animate([
          { opacity: 1, transform: "translate(0,0)" },
          { opacity: 0, transform: `translate(${-direction * 7}px,-4px)` },
        ], { duration: 260, easing: "ease-out", fill: "forwards" });
        exit.finished.then(() => {
          previous.remove();
          // Leave the slot empty for 0.3s after the fade completes.
          schedule(slot, 300);
        }).catch(() => {});
        return;
      }
      previous?.remove();
      const layer = document.createElement("span");
      layer.className = "phrase-layer";
      layer.textContent = nextPhrase();
      slot.append(layer);
      visible.set(slot, layer.textContent);
      if (!motion.matches && typeof layer.animate === "function") {
        layer.animate([
          { opacity: 0, transform: `translate(${direction * 24}px, 14px) scale(.86)` },
          { opacity: 1, transform: `translate(${-direction * 3}px, -2px) scale(1.035)`, offset: .72 },
          { opacity: 1, transform: "translate(0,0) scale(1)" },
        ], { duration: 360, easing: "cubic-bezier(.2,.75,.25,1)" });
      }
      schedule(slot, 4360);
    }

    function pause() {
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
    }
    function resume() {
      pause();
      slots.forEach((slot, index) => schedule(slot, 4360 + index * 1100));
    }
    document.fonts.ready.then(() => {
      if (disposed) return;
      slots.forEach(showNext);
      resume();
    });
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resume);
    return () => {
      disposed = true;
      pause();
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resume);
      for (const slot of slots) {
        for (const animation of slot.getAnimations({ subtree: true })) animation.cancel();
        slot.replaceChildren();
      }
    };
  }, []);

  return <>
    <div className="phrase-slot phrase-left" data-phrase-side="left" aria-hidden="true" ref={left} />
    <div className="phrase-slot phrase-right" data-phrase-side="right" aria-hidden="true" ref={right} />
  </>;
}
