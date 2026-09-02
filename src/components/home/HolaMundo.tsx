"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const HolaMundo = () => (
  <main className="hero-surface relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
    <div className="absolute inset-x-6 top-8 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[var(--muted)] sm:inset-x-10">
      <span>Panthercode</span>
      <span>v0.1.0 / TS</span>
    </div>

    <motion.section
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.22, delayChildren: 0.2 }}
      className="relative w-full max-w-4xl text-center"
    >
      <motion.p variants={reveal} transition={{ duration: 0.6 }} className="mb-7 text-sm uppercase tracking-[0.38em] text-[var(--green)]">
        Sistema en línea
      </motion.p>
      <motion.h1 variants={reveal} transition={{ duration: 0.8 }} className="text-[clamp(4rem,13vw,10rem)] font-semibold leading-[0.82] tracking-[-0.04em] text-[var(--ink)]">
        Hola
        <br />
        <span className="text-[var(--green)]">Mundo</span>
      </motion.h1>
      <motion.div variants={reveal} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto my-9 h-px w-24 bg-[var(--ink)]/30" />
      <motion.p variants={reveal} transition={{ duration: 0.5 }} className="mx-auto max-w-md text-lg leading-relaxed text-[var(--muted)]">
        Una base fullstack TypeScript, lista para crecer con intención.
      </motion.p>
      <motion.div variants={reveal} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--green)]/25 bg-white/40 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[var(--green)]">
        <span className="h-2 w-2 rounded-full bg-[var(--green)]" aria-hidden="true" />
        API saludable
      </motion.div>
    </motion.section>
  </main>
);
