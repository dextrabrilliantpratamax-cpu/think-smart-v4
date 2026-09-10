import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

interface AmbientSkyParticlesProps {
  isFocusedScreen?: boolean;
}

// 1. Vector Leaf Shapes for Cool Mint / Forest (Optimized without heavy SVG drop-shadow filter)
const LeafMintSVG: React.FC<{ color: string; veinColor: string; size: number }> = ({
  color,
  veinColor,
  size,
}) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 28 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Serrated / Organic Mint Leaf Body */}
    <path
      d="M14 2C14 2 4 10 3 19C2 27 8 34 14 34C20 34 26 27 25 19C24 10 14 2 14 2Z"
      fill={color}
    />
    {/* Fresh Shimmer Highlight */}
    <path
      d="M14 4C14 4 7 11 6 18C5.5 22 8 26 11 28"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Leaf Central Vein */}
    <path
      d="M14 34C14 25 14 14 14 4"
      stroke={veinColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    {/* Lateral Leaf Veins */}
    <path
      d="M14 11L19 9M14 17L20 15M14 23L19 21M14 11L9 9M14 17L8 15M14 23L9 21"
      stroke={veinColor}
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

const LeafFernSVG: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg
    width={size * 0.9}
    height={size * 1.5}
    viewBox="0 0 24 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C12 2 3 11 3 22C3 30 8 36 12 36C16 36 21 30 21 22C21 11 12 2 12 2Z"
      fill={color}
    />
    <path
      d="M12 36C12 25 12 14 12 3"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M12 12L17 10M12 18L18 16M12 24L17 22M12 12L7 10M12 18L6 16M12 24L7 22"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
  </svg>
);

// Cool Ice Sparkle Crystal SVG for Cool Mint
const IceCrystalSVG: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 0L14 8L22 12L14 16L12 24L10 16L2 12L10 8L12 0Z"
      fill={color}
    />
    <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
  </svg>
);

// 2. Fire Spark Star SVG for Night Amber
const FireSparkSVG: React.FC<{ color: string; size: number }> = ({ color, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 0L16.5 10.5L27 14L16.5 17.5L14 28L11.5 17.5L1 14L11.5 10.5L14 0Z"
      fill={color}
    />
    <circle cx="14" cy="14" r="3.5" fill="#FFFDE7" />
  </svg>
);

export const AmbientSkyParticles: React.FC<AmbientSkyParticlesProps> = () => {
  const { theme, ambiance, ambientParticlesEnabled, particleIntensity } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect system prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Determine active style flags per ambiance
  const isCoolMintDownpour = particleIntensity === 'downpour' || particleIntensity === 'rain';
  const isNightAmberBlaze =
    particleIntensity === 'blaze' ||
    particleIntensity === 'vibrant' ||
    particleIntensity === 'rain';
  const isStandardVibrant =
    particleIntensity === 'vibrant' ||
    particleIntensity === 'blaze' ||
    particleIntensity === 'downpour';

  // =========================================================================
  // NIGHT AMBER: Lightweight Embers & Flame Sparks
  // =========================================================================
  const nightAmberParticles = useMemo(() => {
    if (ambiance !== 'night_amber') return [];

    // Optimized count for high framerate
    const count = isNightAmberBlaze ? 22 : 12;

    return Array.from({ length: count }).map((_, i) => {
      const isSpark = isNightAmberBlaze ? i % 2 === 0 : i % 4 === 0;
      const isLargeEmber = i % 3 === 0;
      const size = isSpark
        ? (isNightAmberBlaze ? 16 + (i % 3) * 4 : 12 + (i % 2) * 3)
        : isLargeEmber
        ? 10 + (i % 3) * 2
        : 6 + (i % 2) * 2;

      const duration = isNightAmberBlaze
        ? 2.8 + (i % 5) * 0.8
        : 5.5 + (i % 5) * 1.2;

      const delay = (i * 0.4) % 5;
      const startX = (i * 17 + 5) % 94 + 3;
      const driftX = ((i % 5) - 2) * (isNightAmberBlaze ? 30 : 16);

      const emberColors = isNightAmberBlaze
        ? [
            '#FF2A00',
            '#FF6D00',
            '#FFAB00',
            '#FFD600',
            '#FFE57F',
            '#FF3D00',
          ]
        : [
            '#FF9800',
            '#FFA726',
            '#FFB74D',
            '#FF7043',
            '#FFE082',
          ];

      const color = emberColors[i % emberColors.length];

      return {
        id: i,
        startX,
        driftX,
        size,
        duration,
        delay,
        color,
        isSpark,
        isLargeEmber,
      };
    });
  }, [ambiance, isNightAmberBlaze]);

  // =========================================================================
  // COOL MINT: Optimized Floating Mint Leaves
  // =========================================================================
  const coolMintLeaves = useMemo(() => {
    if (ambiance !== 'cool_mint') return [];

    const count = isCoolMintDownpour ? 18 : 12;

    return Array.from({ length: count }).map((_, i) => {
      const itemType = i % 4; // 0: Mint Leaf, 1: Fern Leaf, 2: Cool Ice Crystal, 3: Soft Dew
      const size = itemType === 2 ? 14 + (i % 3) * 4 : 22 + (i % 3) * 4;

      const duration = isCoolMintDownpour
        ? 4.0 + (i % 4) * 0.8
        : 6.5 + (i % 4) * 1.2;

      const delay = (i * 0.5) % 6;
      const startX = (i * 15 + 7) % 94 + 3;
      const driftX = ((i % 5) - 2) * (isCoolMintDownpour ? 25 : 45);
      const rotationDeg = (i % 2 === 0 ? 1 : -1) * (180 + (i % 3) * 60);

      const leafColors = [
        { primary: 'rgba(16, 185, 129, 0.85)', secondary: 'rgba(5, 150, 105, 0.9)' },
        { primary: 'rgba(52, 211, 153, 0.85)', secondary: 'rgba(16, 185, 129, 0.95)' },
        { primary: 'rgba(5, 150, 105, 0.8)', secondary: 'rgba(4, 120, 87, 0.9)' },
        { primary: 'rgba(110, 231, 183, 0.85)', secondary: 'rgba(16, 185, 129, 0.9)' },
      ];

      return {
        id: i,
        itemType,
        size,
        duration,
        delay,
        startX,
        driftX,
        rotationDeg,
        colorScheme: leafColors[i % leafColors.length],
      };
    });
  }, [ambiance, isCoolMintDownpour]);

  // Rain drizzle streaks for Cool Mint Downpour
  const coolMintRainDrops = useMemo(() => {
    if (ambiance !== 'cool_mint' || !isCoolMintDownpour) return [];

    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: (i * 6.2 + 2) % 98,
      delay: (i * 0.12) % 1.5,
      duration: 0.75 + (i % 3) * 0.15,
      length: 28 + (i % 3) * 14,
    }));
  }, [ambiance, isCoolMintDownpour]);

  // Disabled when user switches toggle off or system requests reduced motion
  if (!ambientParticlesEnabled || prefersReducedMotion) {
    return null;
  }

  // =========================================================================
  // 1. NIGHT AMBER
  // =========================================================================
  if (ambiance === 'night_amber') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ transform: 'translateZ(0)' }}>
        {/* Soft Hearth Bottom Glow */}
        <div
          className={`absolute -bottom-16 left-0 right-0 h-44 bg-gradient-to-t pointer-events-none ${
            isNightAmberBlaze
              ? 'from-orange-600/25 via-amber-500/15 to-transparent'
              : 'from-amber-700/20 via-amber-600/10 to-transparent'
          }`}
        />

        {/* Floating & Rising Fire Embers */}
        <div className="w-full h-full relative">
          {nightAmberParticles.map((p) => {
            if (p.isSpark) {
              return (
                <motion.div
                  key={`amber-spark-${p.id}`}
                  initial={{
                    y: '105vh',
                    x: `${p.startX}vw`,
                    opacity: 0,
                    scale: 0.4,
                    rotate: 0,
                  }}
                  animate={{
                    y: ['105vh', '50vh', '-10vh'],
                    x: [
                      `${p.startX}vw`,
                      `${p.startX + p.driftX * 0.5}vw`,
                      `${p.startX + p.driftX}vw`,
                    ],
                    opacity: [0, 0.85, 0.4, 0],
                    scale: [0.4, 1.1, 0.7, 0.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: 'linear',
                  }}
                  className="absolute"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                  <FireSparkSVG color={p.color} size={p.size} />
                </motion.div>
              );
            }

            return (
              <motion.div
                key={`amber-ember-${p.id}`}
                initial={{
                  y: '105vh',
                  x: `${p.startX}vw`,
                  opacity: 0,
                  scale: 0.6,
                }}
                animate={{
                  y: ['105vh', '50vh', '-10vh'],
                  x: [
                    `${p.startX}vw`,
                    `${p.startX + p.driftX * 0.5}vw`,
                    `${p.startX + p.driftX}vw`,
                  ],
                  opacity: [0, 0.8, 0.3, 0],
                  scale: [0.6, 1.1, 0.8, 0.3],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 8px ${p.color}`,
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. COOL MINT / FOREST
  // =========================================================================
  if (ambiance === 'cool_mint') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ transform: 'translateZ(0)' }}>
        {/* Soft Ambient Cool Mist */}
        <div className="absolute inset-0 bg-radial from-emerald-500/6 via-teal-900/10 to-transparent" />

        {/* Rain streaks for Downpour mode */}
        {coolMintRainDrops.map((r) => (
          <motion.div
            key={`mint-rain-${r.id}`}
            initial={{ y: '-10vh', x: `${r.x}vw`, opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: r.duration,
              repeat: Infinity,
              delay: r.delay,
              ease: 'linear',
            }}
            className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-300/60 to-emerald-300/20 rotate-[12deg]"
            style={{ height: `${r.length}px`, willChange: 'transform', transform: 'translateZ(0)' }}
          />
        ))}

        {/* Falling Mint Leaves & Ice Crystals */}
        <div className="w-full h-full relative">
          {coolMintLeaves.map((leaf) => (
            <motion.div
              key={`mint-leaf-${leaf.id}`}
              initial={{
                y: '-12vh',
                x: `${leaf.startX}vw`,
                rotate: 0,
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                y: ['-12vh', '50vh', '112vh'],
                x: [
                  `${leaf.startX}vw`,
                  `${leaf.startX + leaf.driftX}vw`,
                  `${leaf.startX + leaf.driftX * 0.4}vw`,
                ],
                rotate: [0, leaf.rotationDeg * 0.5, leaf.rotationDeg],
                opacity: [0, 0.85, 0.75, 0],
                scale: [0.8, 1.05, 0.9],
              }}
              transition={{
                duration: leaf.duration,
                repeat: Infinity,
                delay: leaf.delay,
                ease: 'easeInOut',
              }}
              className="absolute"
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
            >
              {leaf.itemType === 0 ? (
                <LeafMintSVG
                  color={leaf.colorScheme.primary}
                  veinColor={leaf.colorScheme.secondary}
                  size={leaf.size}
                />
              ) : leaf.itemType === 1 ? (
                <LeafFernSVG color={leaf.colorScheme.primary} size={leaf.size} />
              ) : leaf.itemType === 2 ? (
                <IceCrystalSVG color={leaf.colorScheme.primary} size={leaf.size} />
              ) : (
                <div
                  className="rounded-full"
                  style={{
                    width: `${leaf.size * 0.5}px`,
                    height: `${leaf.size * 0.5}px`,
                    backgroundColor: leaf.colorScheme.primary,
                    boxShadow: `0 0 8px ${leaf.colorScheme.primary}`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. DEFAULT MODE
  // =========================================================================
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ transform: 'translateZ(0)' }}>
      {theme === 'dark' ? (
        // Dark Mode: Twinkling Constellations
        <div className="w-full h-full relative">
          {Array.from({ length: isStandardVibrant ? 18 : 10 }).map((_, i) => {
            const size = (i % 3) * 2 + 4;
            const x = (i * 17 + 23) % 94 + 3;
            const y = (i * 29 + 11) % 88 + 6;
            const isDiamond = i % 3 === 0;
            return (
              <motion.div
                key={`cosmic-star-${i}`}
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2.8 + (i % 3) * 1.0,
                  repeat: Infinity,
                  delay: (i * 0.3) % 3,
                  ease: 'easeInOut',
                }}
                className={`absolute ${
                  isDiamond
                    ? 'rotate-45 bg-indigo-100 shadow-[0_0_8px_#818CF8]'
                    : 'rounded-full bg-amber-100 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
              />
            );
          })}
        </div>
      ) : (
        // Light Mode: Warm Solar Dust
        <div className="w-full h-full relative">
          {Array.from({ length: isStandardVibrant ? 14 : 8 }).map((_, i) => {
            const size = (i % 3) * 2 + 5;
            const x = (i * 19 + 7) % 94 + 3;
            const y = (i * 23 + 13) % 88 + 6;
            return (
              <motion.div
                key={`sun-dust-${i}`}
                initial={{ opacity: 0.15, y: 0 }}
                animate={{
                  opacity: [0.15, 0.6, 0.15],
                  y: [-8, 10, -8],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 4.5 + (i % 3) * 1.2,
                  repeat: Infinity,
                  delay: (i * 0.4) % 4,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full bg-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  willChange: 'transform, opacity',
                  transform: 'translateZ(0)',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

