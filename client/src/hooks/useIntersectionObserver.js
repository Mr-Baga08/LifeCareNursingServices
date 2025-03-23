// client/src/hooks/useIntersectionObserver.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook that observes when an element intersects the viewport
 * @param {Object} options - IntersectionObserver options
 * @param {Boolean} options.triggerOnce - Whether to disconnect observer after first intersection
 * @param {Number} options.threshold - Intersection threshold value (0-1)
 * @param {String} options.rootMargin - Margin around root element
 * @returns {Array} [ref, isIntersecting, entry]
 */
function useIntersectionObserver({
  triggerOnce = false,
  threshold = 0,
  rootMargin = '0px',
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);

        // Disconnect after first intersection if triggerOnce is true
        if (entry.isIntersecting && triggerOnce && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    // Observe target element
    const currentRef = ref.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [triggerOnce, threshold, rootMargin]);

  return [ref, isIntersecting, entry];
}

export default useIntersectionObserver;