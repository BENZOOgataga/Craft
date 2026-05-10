import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { sectionReveal, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  noPadding?: boolean;
}

export function SectionWrapper({
  id,
  children,
  className,
  stagger = false,
  noPadding = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger ? staggerContainer : sectionReveal}
      className={cn(!noPadding && "section-gap", className)}
    >
      {children}
    </motion.section>
  );
}
