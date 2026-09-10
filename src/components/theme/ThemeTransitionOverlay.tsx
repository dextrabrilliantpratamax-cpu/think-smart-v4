import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeTransitionOverlay: React.FC = () => {
  const { activeTransition } = useTheme();

  return (
    <AnimatePresence>
      {activeTransition && (
        <motion.div
          key={activeTransition.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 pointer-events-none z-[35] overflow-hidden"
          style={{ isolation: 'isolate' }}
        >
          {/* Radial shockwave expanding from click origin via GPU scale */}
          <motion.div
            initial={{
              scale: 0.05,
              opacity: 0.85,
            }}
            animate={{
              scale: 30,
              opacity: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 w-32 h-32"
            style={{
              left: activeTransition.x,
              top: activeTransition.y,
              background:
                activeTransition.targetTheme === 'dark'
                  ? 'radial-gradient(circle, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.6) 45%, rgba(76, 29, 149, 0) 70%)'
                  : 'radial-gradient(circle, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.6) 45%, rgba(217, 119, 6, 0) 70%)',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          />

          {/* Flash pulse ring */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-48 h-48"
            style={{
              left: activeTransition.x,
              top: activeTransition.y,
              borderColor: activeTransition.targetTheme === 'dark' ? '#818CF8' : '#F59E0B',
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
