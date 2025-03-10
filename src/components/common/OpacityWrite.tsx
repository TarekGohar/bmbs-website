"use client";
import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxSectionProps {
  className?: string;
  description: string;
  textColor: string;
}

export default function OpacityWrite({
  description,
  textColor,
  className, // Add this parameter to the component
}: ParallaxSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Reduce the travel distance for better mobile performance
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

  // Smoother opacity transition
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.7, 1, 1, 0.7]
  );

  // Split by paragraphs first, then by words, to maintain structure
  const paragraphs = useMemo(() => {
    return description.split("\n\n").map((paragraph, pIndex) => {
      // Split each paragraph into words
      return {
        pIndex,
        words: paragraph.split(" ").map((word, wIndex) => ({
          word,
          wIndex,
          // Calculate global word index for more precise timing
          globalIndex: pIndex * 100 + wIndex, // Using 100 as buffer between paragraphs
        })),
      };
    });
  }, [description]);

  // Find the highest global index for normalization
  const maxGlobalIndex = paragraphs.reduce(
    (max, p) => Math.max(max, ...p.words.map((w) => w.globalIndex)),
    0
  );

  return (
    <div
      ref={sectionRef} // You were missing the ref attribute here
      className={`text-white ${className || ""}`}>
      {paragraphs.map((paragraph, pIndex) => {
        return (
          <div
            key={`p-${pIndex}`}
            className={`flex flex-wrap ${pIndex > 0 ? "mt-6" : ""}`}>
            {paragraph.words.map((item) => {
              // Create a more spread out timing sequence
              // Normalize the global index to a 0-1 range for better control
              const normalizedIndex = item.globalIndex / maxGlobalIndex;
              // Create a much wider spread in animation timing (0.1 to 0.7)
              // This gives us 60% of scroll progress to reveal all words sequentially
              const startReveal = 0.2 + normalizedIndex * 0.2;
              // Make each word's reveal happen over a very short scroll distance (0.05)
              // This creates a sharper opacity transition
              const endReveal = startReveal + 0.05;

              return (
                <motion.span
                  key={`word-${pIndex}-${item.wIndex}`}
                  className={`text-${textColor} will-change-opacity`}
                  initial={{ opacity: 0 }}
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [startReveal, endReveal],
                      [0, 0.95],
                      { clamp: true } // Ensure opacity stays clamped between 0-1
                    ),
                  }}>
                  {item.word}
                  {/* Add space after each word except last word in paragraph */}
                  {item.wIndex < paragraph.words.length - 1 && "\u00A0"}
                </motion.span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
