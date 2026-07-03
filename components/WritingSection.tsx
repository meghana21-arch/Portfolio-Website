"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Article {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  tags: string[];
}

// ────────────────────────────────────────────────────────────
// Edit your articles here
// ────────────────────────────────────────────────────────────
const ARTICLES: Article[] = [
  {
    title: "Why Agent Loops Need Durable Execution",
    slug: "agent-loops-durable-execution",
    date: "Jun 2025",
    readTime: "8 min",
    tags: ["AI Agents", "Architecture"],
  },
  {
    title: "Building an AI Agent Marketplace",
    slug: "ai-agent-marketplace",
    date: "May 2025",
    readTime: "6 min",
    tags: ["Marketplace", "Next.js"],
  },
  {
    title: "How LLM Evals Work in Production",
    slug: "llm-evals-production",
    date: "Apr 2025",
    readTime: "10 min",
    tags: ["LLM Evals", "Observability"],
  },
  {
    title: "Quad Trees in Location-Based System Design",
    slug: "quad-trees-location-systems",
    date: "Mar 2025",
    readTime: "7 min",
    tags: ["System Design", "Algorithms"],
  },
];

interface ArticleCardProps {
  article: Article;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.a
      ref={ref}
      href={`/writing/${article.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className="group block py-7 border-t border-[#1E1E1E] hover:border-[#C8A97E] transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-base md:text-lg text-[#D0CBB8] group-hover:text-[#F5F0EA] transition-colors duration-300 font-light leading-snug mb-3">
            {article.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] rounded-full border border-[#252525] text-[#4A4A4A] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs text-[#4A4A4A] font-mono">{article.date}</p>
          <p className="text-xs text-[#3A3A3A] font-mono mt-1">{article.readTime}</p>
        </div>
      </div>
    </motion.a>
  );
}

export default function WritingSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="writing" className="px-6 md:px-10 py-12 md:py-20 max-w-screen-xl mx-auto">
      <div ref={headerRef} className="flex items-end justify-between mb-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.15em] text-[#6B6B6B]"
        >
          Writing
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          href="/writing"
          data-cursor="hover"
          className="text-xs text-[#6B6B6B] hover:text-[#F5F0EA] transition-colors duration-300 underline underline-offset-4"
        >
          All posts →
        </motion.a>
      </div>

      <div>
        {ARTICLES.map((article, i) => (
          <ArticleCard key={article.slug} article={article} index={i} />
        ))}
        <div className="border-t border-[#1E1E1E]" />
      </div>
    </section>
  );
}
