import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Flame, Crown } from 'lucide-react';
import { StreakTier, getStreakTier, getNextStreakTier } from './streakTiers';
import { playFeedbackSound } from '../../utils/feedbackSound';
import confetti from 'canvas-confetti';

interface StreakFlameAnimationProps {
  streakDays: number;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
  interactive?: boolean;
  variant?: 'pill' | 'standalone';
  showRankBadge?: boolean;
  speedMultiplier?: number;
  onClick?: () => void;
  className?: string;
}

export const StreakFlameAnimation: React.FC<StreakFlameAnimationProps> = React.memo(({
  streakDays,
  size = 'md',
  showLabel = true,
  interactive = true,
  variant = 'pill',
  showRankBadge = false,
  speedMultiplier = 1,
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const tier: StreakTier = getStreakTier(streakDays);
  const isIridescent = tier.id === 'iridescent-apex';

  // Calculate subtle progress scaling within current tier (1.0 to 1.12)
  const currentTierMin = tier.minDays;
  const currentTierMax = tier.maxDays === Infinity ? 900 : tier.maxDays;
  const tierSpan = Math.max(1, currentTierMax - currentTierMin + 1);
  const progressRatio = Math.min(1, Math.max(0, (streakDays - currentTierMin) / tierSpan));
  const dynamicScaleMultiplier = 1 + progressRatio * 0.08;

  // Dimension mapping
  const dimensions = {
    sm: { flame: 'w-5 h-5', text: 'text-xs', padding: 'px-2 py-1', pill: 'h-7', rank: 'text-[9px]' },
    md: { flame: 'w-5 h-5 sm:w-6 sm:h-6', text: 'text-xs', padding: 'px-1.5 sm:px-2.5 py-1 sm:py-1.5', pill: 'h-8 sm:h-9', rank: 'text-[10px]' },
    lg: { flame: 'w-8 h-8', text: 'text-sm', padding: 'px-3 py-2', pill: 'h-10', rank: 'text-xs' },
    hero: { flame: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-2xl sm:text-3xl', padding: 'p-4', pill: 'h-auto', rank: 'text-sm' },
  }[size];

  const durationScale = isHovered ? 0.75 / speedMultiplier : 1 / speedMultiplier;

  const triggerSparkles = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Play tier specific ignition sound
    const soundKey = `tier_${tier.rankLevel}` as const;
    playFeedbackSound(soundKey in ['tier_1', 'tier_2', 'tier_3', 'tier_4', 'tier_5', 'tier_6', 'tier_7', 'tier_apex'] ? (soundKey as any) : 'flame_ignite');

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: isIridescent ? 50 : 32,
        spread: 75,
        origin: { x, y },
        colors: tier.particleColors,
        ticks: 180,
        gravity: 1.1,
        scalar: 0.85,
        shapes: ['circle', 'star'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    if (onClick) {
      onClick();
    }
  };

  /**
   * Renders the distinct, ultra-aesthetic SVG Flame geometry and layered plumes for each of the 8 tiers
   */
  const renderMorphologyFlame = () => {
    switch (tier.morphology) {
      // ==========================================
      // TIER I: EMBER SPARK (Api Bara Oranye)
      // Soft, warm organic teardrop flame with gentle flickering tips & glowing heart
      // ==========================================
      case 'ember-spark':
        return (
          <g id="flame-tier-1-ember">
            {/* Outer Flame Plume */}
            <motion.path
              d="M20 3 C27 11 35 21 33 32 C31 41 25 45 20 45 C15 45 9 41 7 32 C5 21 13 11 20 3 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              animate={{
                scaleY: [1, 1.05, 0.98, 1],
                scaleX: [1, 0.97, 1.03, 1],
              }}
              transition={{ duration: 1.5 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_45px]"
            />

            {/* Mid Flame Tongue */}
            <motion.path
              d="M20 11 C24 17 29 24 28 34 C27 40 23 43 20 43 C17 43 13 40 12 34 C11 24 16 17 20 11 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              opacity="0.9"
              animate={{
                scaleY: [0.96, 1.07, 0.96],
                skewX: [-1.5, 1.5, -1.5],
              }}
              transition={{ duration: 1.2 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_43px]"
            />

            {/* Inner Golden Hearth Core */}
            <motion.path
              d="M20 21 C22 25 24 30 24 35 C24 39 22 41 20 41 C18 41 16 39 16 35 C16 30 18 25 20 21 Z"
              fill="#FFFFFF"
              animate={{
                scale: [0.9, 1.15, 0.9],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 0.9 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_35px]"
            />
          </g>
        );

      // ==========================================
      // TIER II: SOLAR FLARE (Api Surya Emas)
      // Radiant double-crested solar flame with glowing solar halo corona & sunburst gems
      // ==========================================
      case 'solar-flare':
        return (
          <g id="flame-tier-2-solar">
            {/* Orbiting Solar Halo Corona */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 12 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_25px]"
            >
              <circle
                cx="20"
                cy="25"
                r="16.5"
                stroke="#FEF08A"
                strokeWidth="0.9"
                strokeDasharray="3 3.5"
                opacity="0.65"
                fill="none"
              />
              <polygon points="20,7 21.5,9.5 18.5,9.5" fill="#FDE047" />
              <polygon points="38,25 35.5,26.5 35.5,23.5" fill="#FDE047" />
              <polygon points="20,43 18.5,40.5 21.5,40.5" fill="#FDE047" />
              <polygon points="2,25 4.5,23.5 4.5,26.5" fill="#FDE047" />
            </motion.g>

            {/* Outer Solar Flame Silhouette */}
            <motion.path
              d="M20 2 C25 8 35 16 33 28 C31 35 34 38 31 44 C27 46 22 46 20 46 C18 46 13 46 9 44 C6 38 9 35 7 28 C5 16 15 8 20 2 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              animate={{
                scaleY: [1, 1.06, 0.97, 1],
                scaleX: [1, 0.96, 1.04, 1],
              }}
              transition={{ duration: 1.3 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Dancing Twin Solar Crest */}
            <motion.path
              d="M23 6 C28 13 30 19 28 28 C26 35 22 41 20 41 C18 41 14 35 12 28 C10 19 12 13 17 6 C19 10 21 10 23 6 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              animate={{
                scaleY: [0.94, 1.08, 0.94],
                skewX: [2, -2, 2],
              }}
              transition={{ duration: 1.1 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_41px]"
            />

            {/* Luminous Radiant Solar Core */}
            <motion.ellipse
              cx="20"
              cy="31"
              rx="4"
              ry="5.5"
              fill="#FFFFFF"
              animate={{
                scale: [0.88, 1.22, 0.88],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 0.85 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_31px]"
            />
          </g>
        );

      // ==========================================
      // TIER III: CRIMSON INFERNO (Api Merah Delima)
      // Fierce triple-tongued roaring inferno flame with intense volcanic magma heart
      // ==========================================
      case 'crimson-inferno':
        return (
          <g id="flame-tier-3-crimson">
            {/* Outer Roaring Triple-Tongue Flame */}
            <motion.path
              d="M20 1 C23 7 28 13 31 16 C35 14 37 18 36 24 C38 27 38 34 34 41 C30 46 25 46 20 46 C15 46 10 46 6 41 C2 34 2 27 4 24 C3 18 5 14 9 16 C12 13 17 7 20 1 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              animate={{
                scaleY: [1, 1.07, 0.96, 1],
                scaleX: [1, 0.95, 1.05, 1],
              }}
              transition={{ duration: 1.0 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Left Flared Spur */}
            <motion.path
              d="M9 16 C5 21 5 28 9 33 C11 36 14 38 17 39 C14 34 13 27 12 22 Z"
              fill="#BE123C"
              opacity="0.8"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 0.9 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[17px_39px]"
            />

            {/* Right Flared Spur */}
            <motion.path
              d="M31 16 C35 21 35 28 31 33 C29 36 26 38 23 39 C26 34 27 27 28 22 Z"
              fill="#BE123C"
              opacity="0.8"
              animate={{ rotate: [3, -3, 3] }}
              transition={{ duration: 0.9 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[23px_39px]"
            />

            {/* Mid Roaring Core Tongue */}
            <motion.path
              d="M20 7 C23 13 27 18 29 22 C32 24 31 30 28 36 C25 41 22 43 20 43 C18 43 15 41 12 36 C9 30 8 24 11 22 C13 18 17 13 20 7 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              animate={{
                scaleY: [0.93, 1.1, 0.93],
                skewX: [-2, 2, -2],
              }}
              transition={{ duration: 0.8 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_43px]"
            />

            {/* Volcanic Magma Core */}
            <motion.circle
              cx="20"
              cy="32"
              r="4.5"
              fill="#FFFFFF"
              animate={{
                scale: [0.85, 1.25, 0.85],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 0.7 * durationScale, repeat: Infinity }}
            />
          </g>
        );

      // ==========================================
      // TIER IV: MYSTIC VIOLET (Api Ungu Mistik)
      // Ethereal cosmic nebula spiral flame with orbiting elliptical rings & radiant astral star
      // ==========================================
      case 'mystic-violet':
        return (
          <g id="flame-tier-4-mystic">
            {/* Orbiting Cosmic Ellipse Ring */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 9 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_25px]"
            >
              <ellipse
                cx="20"
                cy="25"
                rx="18"
                ry="8"
                stroke="#E9D5FF"
                strokeWidth="0.9"
                strokeDasharray="3 3.5"
                opacity="0.65"
                fill="none"
              />
              <circle cx="38" cy="25" r="1.3" fill="#E879F9" />
              <circle cx="2" cy="25" r="1.3" fill="#E879F9" />
            </motion.g>

            {/* Outer Cosmic Helical Flame */}
            <motion.path
              d="M20 2 C26 8 32 14 30 23 C28 27 34 32 32 39 C30 45 25 46 20 46 C15 46 10 45 8 39 C6 32 12 27 10 23 C8 14 14 8 20 2 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              animate={{
                scaleY: [1, 1.05, 0.98, 1],
                scaleX: [1, 0.96, 1.03, 1],
              }}
              transition={{ duration: 1.4 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Twisting Ethereal Swirl */}
            <motion.path
              d="M20 9 C24 14 27 19 25 26 C23 32 26 36 24 41 C22 43 20 43 19 43 C16 43 14 39 15 34 C16 29 13 24 16 18 C18 14 19 11 20 9 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              animate={{
                skewX: [-3, 3, -3],
                scaleY: [0.95, 1.06, 0.95],
              }}
              transition={{ duration: 1.2 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_43px]"
            />

            {/* 4-Point Rotating Astral Starlight Diamond in Core */}
            <motion.path
              d="M20 25 L21.5 29 L25.5 30.5 L21.5 32 L20 36 L18.5 32 L14.5 30.5 L18.5 29 Z"
              fill="#FFFFFF"
              animate={{
                rotate: 360,
                scale: [0.85, 1.3, 0.85],
              }}
              transition={{ duration: 4 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_30.5px]"
            />
          </g>
        );

      // ==========================================
      // TIER V: AZURE PLASMA (Api Biru Plasma)
      // Sleek high-tech plasma spearhead flame with electric discharges & luminous beam
      // ==========================================
      case 'azure-plasma':
        return (
          <g id="flame-tier-5-plasma">
            {/* Crackling High-Voltage Electrical Arcs */}
            <motion.path
              d="M6 22 L2 17 M34 22 L38 17 M14 9 L10 4 M26 9 L30 4"
              stroke="#CFFAFE"
              strokeWidth="1.2"
              strokeLinecap="round"
              animate={{ opacity: [0, 1, 0.2, 1, 0] }}
              transition={{ duration: 0.35 * durationScale, repeat: Infinity }}
            />

            {/* Aerodynamic High-Tech Plasma Spearhead */}
            <motion.path
              d="M20 1 L25 10 L28 14 L33 22 L31 29 L35 37 L30 44 L25 46 L20 46 L15 46 L10 44 L5 37 L9 29 L7 22 L12 14 L15 10 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              stroke="#0891B2"
              strokeWidth="0.8"
              animate={{
                scaleY: [1, 1.06, 0.97, 1.03, 1],
                scaleX: [1, 0.95, 1.04, 0.97, 1],
              }}
              transition={{ duration: 0.6 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_46px]"
            />

            {/* Superconducting Plasma Core Beam */}
            <motion.path
              d="M20 6 L23 15 L24 26 L22 38 L20 42 L18 38 L16 26 L17 15 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              stroke="#CFFAFE"
              strokeWidth="0.5"
              animate={{
                scaleY: [0.92, 1.12, 0.92],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 0.45 * durationScale, repeat: Infinity }}
              className="origin-[20px_42px]"
            />

            {/* Brilliant White Plasma Core */}
            <motion.ellipse
              cx="20"
              cy="31"
              rx="3"
              ry="5"
              fill="#FFFFFF"
              animate={{ scale: [0.85, 1.25, 0.85] }}
              transition={{ duration: 0.5 * durationScale, repeat: Infinity }}
            />
          </g>
        );

      // ==========================================
      // TIER VI: EMERALD PHOENIX (Api Zamrud Phoenix)
      // Immortal phoenix wing flame plumes flanking central emerald spire with sacred soul pearl
      // ==========================================
      case 'emerald-phoenix':
        return (
          <g id="flame-tier-6-emerald">
            {/* Outer Phoenix Wing Flame Silhouette */}
            <motion.path
              d="M20 2 C23 8 27 13 32 12 C35 15 36 21 34 26 C37 29 38 35 34 41 C29 46 24 46 20 46 C16 46 11 46 6 41 C2 35 3 29 6 26 C4 21 5 15 8 12 C13 13 17 8 20 2 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              animate={{
                scaleY: [1, 1.05, 0.97, 1],
                scaleX: [1, 0.97, 1.03, 1],
              }}
              transition={{ duration: 1.2 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Flowing Emerald Feather Silk Lines */}
            <path
              d="M12 20 C16 23 20 24 24 20 M9 27 C14 31 20 32 26 27 M8 34 C13 37 20 38 27 34"
              stroke="#A7F3D0"
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />

            {/* Mid Wing Plume */}
            <motion.path
              d="M20 8 C23 14 26 19 28 24 C30 29 27 35 24 40 C22 43 20 43 19 43 C16 43 13 39 12 34 C11 28 14 22 16 17 C18 13 19 10 20 8 Z"
              fill={`url(#flame-grad-inner-${tier.id})`}
              animate={{
                scaleY: [0.95, 1.08, 0.95],
                skewX: [-2, 2, -2],
              }}
              transition={{ duration: 1.0 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_43px]"
            />

            {/* Sacred Emerald Soul Pearl Heart */}
            <motion.circle
              cx="20"
              cy="31"
              r="4.5"
              fill="#FFFFFF"
              animate={{
                scale: [0.88, 1.22, 0.88],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{ duration: 0.9 * durationScale, repeat: Infinity }}
            />
          </g>
        );

      // ==========================================
      // TIER VII: DIAMOND RADIANCE (Api Kristal Berlian)
      // Transcendent geometric diamond faceted crystal flame with pure refraction lines & starlight flare
      // ==========================================
      case 'diamond-radiance':
        return (
          <g id="flame-tier-7-diamond">
            {/* Outer Geometric Faceted Diamond Flame */}
            <motion.path
              d="M20 1 L26 9 L32 14 L35 24 L31 34 L33 41 L27 45 L20 46 L13 45 L7 41 L9 34 L5 24 L8 14 L14 9 Z"
              fill={`url(#flame-grad-outer-${tier.id})`}
              stroke="#FFFFFF"
              strokeWidth="0.8"
              animate={{
                scaleY: [1, 1.04, 0.98, 1],
                scaleX: [1, 0.98, 1.03, 1],
              }}
              transition={{ duration: 1.3 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Internal Diamond Refraction Creases */}
            <path
              d="M20 1 L20 46 M26 9 L14 9 M32 14 L8 14 M35 24 L5 24 M31 34 L9 34 M20 1 L31 34 L20 46 L9 34 Z"
              stroke="#FFFFFF"
              strokeWidth="0.65"
              opacity="0.8"
              fill="none"
            />

            {/* Inner Prismatic Crystal Plume */}
            <motion.polygon
              points="20,8 26,20 24,36 20,42 16,36 14,20"
              fill={`url(#flame-grad-inner-${tier.id})`}
              opacity="0.9"
              animate={{ scaleY: [0.94, 1.07, 0.94] }}
              transition={{ duration: 1.1 * durationScale, repeat: Infinity }}
              className="origin-[20px_42px]"
            />

            {/* 4-Point Pulsating Diamond Starlight Sparkle */}
            <motion.path
              d="M20 22 L21.5 27 L26.5 28.5 L21.5 30 L20 35 L18.5 30 L13.5 28.5 L18.5 27 Z"
              fill="#FFFFFF"
              animate={{
                scale: [0.8, 1.4, 0.8],
                rotate: 180,
              }}
              transition={{ duration: 1.6 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_28.5px]"
            />
          </g>
        );

      // ==========================================
      // TIER VIII (APEX): IRIDESCENT SUPERNOVA (Api Pelangi Supernova)
      // Supreme multi-layer rainbow supernova flame with dual revolving 3D cosmic gyroscope rings
      // ==========================================
      case 'iridescent-supernova':
      default:
        return (
          <g id="flame-tier-8-apex">
            {/* Multi-Axis Orbiting Cosmic Gyro Ring 1 */}
            <motion.ellipse
              cx="20"
              cy="25"
              rx="19"
              ry="8"
              stroke="url(#iridescent-outer-flame)"
              strokeWidth="1.3"
              fill="none"
              opacity="0.85"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 6 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_25px]"
            />

            {/* Multi-Axis Orbiting Cosmic Gyro Ring 2 */}
            <motion.ellipse
              cx="20"
              cy="25"
              rx="17"
              ry="7"
              stroke="#CFFAFE"
              strokeWidth="1.0"
              strokeDasharray="3 2"
              fill="none"
              opacity="0.8"
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 7 * durationScale, repeat: Infinity, ease: 'linear' }}
              className="origin-[20px_25px]"
            />

            {/* Supreme 5-Crown Apex Flame Geometry */}
            <motion.path
              d="M20 0 C24 7 29 11 34 10 C37 15 37 21 35 26 C38 30 38 36 34 42 C29 46 24 46 20 46 C16 46 11 46 6 42 C2 36 2 30 5 26 C3 21 3 15 6 10 C11 11 16 7 20 0 Z"
              fill="url(#iridescent-outer-flame)"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              animate={{
                scaleY: [1, 1.06, 0.96, 1],
                scaleX: [1, 0.95, 1.05, 1],
              }}
              transition={{ duration: 0.95 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_46px]"
            />

            {/* Inner Iridescent Aurora Flame */}
            <motion.path
              d="M20 6 C23 12 26 17 28 22 C30 26 29 32 26 37 C23 41 21 42 20 42 C19 42 17 41 14 37 C11 32 10 26 12 22 C14 17 17 12 20 6 Z"
              fill="url(#iridescent-inner-flame)"
              animate={{
                scaleY: [0.93, 1.1, 0.93],
                skewX: [-2.5, 2.5, -2.5],
              }}
              transition={{ duration: 0.85 * durationScale, repeat: Infinity, ease: 'easeInOut' }}
              className="origin-[20px_42px]"
            />

            {/* Cosmic Supernova Radiant Stellar Core */}
            <motion.circle
              cx="20"
              cy="30"
              r="5"
              fill="#FFFFFF"
              animate={{
                scale: [0.85, 1.35, 0.85],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{ duration: 0.8 * durationScale, repeat: Infinity }}
            />
          </g>
        );
    }
  };

  /**
   * Floating ember particles calibrated per morphology with organic sine sway
   */
  const renderParticles = () => {
    return (
      <g id="flame-particles" opacity="0.95">
        <motion.circle
          cx="17"
          cy="12"
          r="1.4"
          fill={tier.particleColors[0] || '#F97316'}
          animate={{
            cy: [15, -4],
            cx: [17, 13],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: (isIridescent ? 1.0 : 1.3) * durationScale,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.1,
          }}
        />
        <motion.circle
          cx="23"
          cy="13"
          r="1.2"
          fill={tier.particleColors[1] || '#FBBF24'}
          animate={{
            cy: [16, -5],
            cx: [23, 27],
            opacity: [1, 0],
            scale: [1, 0.2],
          }}
          transition={{
            duration: (isIridescent ? 1.1 : 1.45) * durationScale,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.45,
          }}
        />
        <motion.circle
          cx="20"
          cy="8"
          r="1.5"
          fill={tier.particleColors[2] || '#FFFFFF'}
          animate={{
            cy: [9, -6],
            cx: [20, 20.5],
            opacity: [1, 0],
            scale: [1.2, 0.4],
          }}
          transition={{
            duration: 1.1 * durationScale,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.8,
          }}
        />
      </g>
    );
  };

  // Pure SVG Flame Viewport
  const flameSvg = (
    <div
      className={`relative ${dimensions.flame} flex items-center justify-center shrink-0`}
      style={{ transform: `scale(${dynamicScaleMultiplier}) translateZ(0)` }}
    >
      {/* Flame Ambient Pulsing Glow Aura */}
      <motion.div
        animate={{
          scale: isIridescent ? [0.9, 1.15, 0.9] : [0.9, 1.1, 0.9],
          opacity: isIridescent ? [0.3, 0.6, 0.3] : [0.2, 0.45, 0.2],
        }}
        transition={{
          duration: 2.0 * durationScale,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full blur-[2px] pointer-events-none"
        style={{
          backgroundColor: tier.primaryColor,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* SVG Multi-Layered Morphing Flame */}
      <svg
        viewBox="0 0 40 48"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'translateZ(0)' }}
      >
        <defs>
          {/* Main Outer Flame Gradient */}
          <linearGradient
            id={`flame-grad-outer-${tier.id}`}
            x1="20"
            y1="45"
            x2="20"
            y2="2"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={tier.secondaryColor} />
            <stop offset="55%" stopColor={tier.primaryColor} />
            <stop offset="100%" stopColor={tier.coreColor} />
          </linearGradient>

          {/* Inner Tongue Gradient */}
          <linearGradient
            id={`flame-grad-inner-${tier.id}`}
            x1="20"
            y1="40"
            x2="20"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={tier.primaryColor} />
            <stop offset="50%" stopColor={tier.coreColor} />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Iridescent Prismatic Rainbow Outer Gradient */}
          <linearGradient id="iridescent-outer-flame" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="20%" stopColor="#8B5CF6" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="60%" stopColor="#06B6D4" />
            <stop offset="80%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#FDE047" />
          </linearGradient>

          {/* Iridescent Inner Flame Gradient */}
          <linearGradient id="iridescent-inner-flame" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="35%" stopColor="#06B6D4" />
            <stop offset="70%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {renderMorphologyFlame()}
        {renderParticles()}
      </svg>

      {/* Orbiting Sparkles on Tier 1+ Milestones (7+ Days) */}
      {streakDays >= 7 && (
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: (isIridescent ? 3.5 : 6.0) * durationScale,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -inset-1 pointer-events-none"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        >
          <Sparkles
            className="w-2.5 h-2.5 absolute top-0 right-0 opacity-80"
            style={{ color: isIridescent ? '#F472B6' : tier.primaryColor }}
          />
        </motion.div>
      )}
    </div>
  );

  // Standalone Icon Mode (used in modal avatars, cards, etc. with ZERO outer button clipping)
  if (variant === 'standalone' || (!showLabel && !interactive)) {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {flameSvg}
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Outer Radial Glow Aura */}
      <motion.div
        animate={{
          opacity: isIridescent ? [0.35, 0.65, 0.35] : [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: isIridescent ? 2.5 : 2.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -inset-1 rounded-2xl blur-xs pointer-events-none ${
          isIridescent ? 'animate-iridescent-glow' : ''
        }`}
        style={{
          background: isIridescent
            ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.45), rgba(168, 85, 247, 0.45), rgba(6, 182, 212, 0.45), rgba(16, 185, 129, 0.45), rgba(245, 158, 11, 0.45))'
            : tier.glowColor,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Main Interactive Badge Button */}
      <motion.button
        type="button"
        whileHover={interactive ? { scale: 1.04, y: -1 } : {}}
        whileTap={interactive ? { scale: 0.96 } : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={triggerSparkles}
        title={`${tier.rankRoman} · ${tier.name} (${streakDays} ${streakDays === 1 ? 'Day' : 'Days'}) — Klik untuk buka Galeri Evolusi Api & Peringkat!`}
        className={`relative z-10 flex items-center gap-1.5 sm:gap-2 rounded-2xl border ${tier.badgeBorder} ${tier.badgeBg} ${dimensions.padding} ${dimensions.pill} shadow-xs transition-all backdrop-blur-xs ${
          isIridescent ? 'animate-iridescent-border ring-1 ring-pink-400/40' : ''
        } ${interactive ? 'cursor-pointer hover:shadow-md' : ''}`}
        style={{
          boxShadow: isHovered ? `0 4px 14px ${tier.glowColor}` : undefined,
          transform: 'translateZ(0)',
        }}
      >
        {flameSvg}

        {/* Streak Number & Label */}
        {showLabel && (
          <div className="flex items-center gap-1">
            <span
              key={streakDays}
              className={`font-black tracking-tight ${dimensions.text} ${tier.textColor}`}
            >
              {streakDays}
            </span>
            <span className={`font-bold text-[11px] sm:text-xs ${tier.textColor} opacity-90 hidden sm:inline`}>
              {streakDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        )}

        {/* Rank Roman Insignia Tag */}
        {showRankBadge && (
          <span
            className={`px-1.5 py-0.2 rounded-md font-black ${dimensions.rank} text-white shadow-2xs`}
            style={{ backgroundColor: tier.accentHex }}
          >
            {tier.rankRoman}
          </span>
        )}

        {/* Tier Milestone Upgrade Indicator Pip */}
        {streakDays > 0 && ([7, 30, 90, 180, 360, 540, 720, 900].includes(streakDays) || streakDays % 30 === 0) && (
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: tier.accentHex }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: tier.accentHex }}
            />
          </span>
        )}
      </motion.button>
    </div>
  );
});
