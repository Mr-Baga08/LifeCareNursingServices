// client/src/styles/animations.js

// Framer Motion animation variants for reuse throughout the application

// Fade in animation
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Fade in up animation
  export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Fade in down animation
  export const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Fade in left animation
  export const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Fade in right animation
  export const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Scale animation
  export const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Container variant for staggered children animations
  export const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2
      }
    }
  };
  
  // Item variant for children of staggered containers
  export const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };
  
  // Hover animations
  export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3 }
  };
  
  // Page transition variants
  export const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };
  
  // Float animation for images and cards
  export const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };
  
  // Pulse animation for buttons
  export const pulseAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 4px 10px rgba(0, 0, 0, 0.1)",
      "0 8px 20px rgba(0, 0, 0, 0.15)",
      "0 4px 10px rgba(0, 0, 0, 0.1)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };