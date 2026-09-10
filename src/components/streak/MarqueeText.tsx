import React, { useState, useEffect, useRef } from 'react';

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: 'normal' | 'slow' | 'fast';
  alwaysScroll?: boolean;
  pauseOnHover?: boolean;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({
  text,
  className = '',
  speed = 'normal',
  alwaysScroll = false,
  pauseOnHover = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const textWidth = textRef.current.scrollWidth;
        setIsOverflowing(textWidth > containerWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [text]);

  const shouldAnimate = alwaysScroll || isOverflowing;

  const animationClass =
    speed === 'slow'
      ? 'animate-marquee-slow'
      : speed === 'fast'
      ? 'animate-marquee'
      : 'animate-marquee';

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden whitespace-nowrap select-none max-w-full ${className}`}
      title={text}
    >
      {shouldAnimate ? (
        <div
          className={`${animationClass} ${
            pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
          }`}
        >
          <span className="inline-block pr-6">{text}</span>
          <span className="inline-block pr-6">{text}</span>
        </div>
      ) : (
        <span ref={textRef} className="inline-block w-full">
          {text}
        </span>
      )}
    </div>
  );
};
