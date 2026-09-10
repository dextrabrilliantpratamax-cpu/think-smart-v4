import React, { useState, useEffect, useRef } from 'react';

interface SidebarMarqueeTextProps {
  text: string;
  className?: string;
  speedSec?: number; // duration in seconds
  animate?: boolean; // only animate if true (e.g., when active)
  pauseOnHover?: boolean;
  repeatGap?: number; // space between repeats in px
}

export const SidebarMarqueeText: React.FC<SidebarMarqueeTextProps> = ({
  text,
  className = '',
  speedSec,
  animate = true,
  pauseOnHover = false,
  repeatGap = 28,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && measureRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const textWidth = measureRef.current.scrollWidth;
        // Overflow if text is wider than container by at least 2px
        setIsOverflowing(textWidth > containerWidth + 2);
      }
    };

    // Run check initially
    checkOverflow();

    // Check on window resize & layout changes
    const observer = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text]);

  // Calculate dynamic duration based on text length if not provided
  const duration = speedSec || Math.max(5, Math.round(text.length * 0.3));

  const shouldAnimate = animate && isOverflowing;

  return (
    <div
      ref={containerRef}
      title={text}
      className="relative overflow-hidden w-full select-none"
      style={{
        maskImage: shouldAnimate
          ? 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 10px), transparent 100%)'
          : undefined,
        WebkitMaskImage: shouldAnimate
          ? 'linear-gradient(to right, transparent 0%, black 8px, black calc(100% - 10px), transparent 100%)'
          : undefined,
      }}
    >
      {/* Invisible text element to measure true unconstrained width */}
      <span
        ref={measureRef}
        className="absolute top-0 left-0 opacity-0 pointer-events-none whitespace-nowrap inline-block font-inherit"
        aria-hidden="true"
      >
        {text}
      </span>

      {shouldAnimate ? (
        <div
          className={`flex items-center whitespace-nowrap w-max ${
            pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
          }`}
          style={{
            animation: `sidebarMarqueeScroll ${duration}s linear infinite`,
          }}
        >
          <span className={`inline-block whitespace-nowrap ${className}`} style={{ paddingRight: `${repeatGap}px` }}>
            {text}
          </span>
          <span className={`inline-block whitespace-nowrap ${className}`} style={{ paddingRight: `${repeatGap}px` }} aria-hidden="true">
            {text}
          </span>
        </div>
      ) : (
        <span className={`block whitespace-nowrap overflow-hidden ${className}`}>
          {text}
        </span>
      )}
    </div>
  );
};

export default SidebarMarqueeText;
