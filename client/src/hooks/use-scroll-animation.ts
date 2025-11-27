import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Target all section headings and content blocks
    const animateElements = document.querySelectorAll(
      '.section-title, .section-content, .project-card, .skill-item'
    );

    animateElements.forEach(element => {
      // Set initial state - only if it doesn't have other animation classes
      if (!element.classList.contains('skill-item')) {
        element.classList.add('opacity-0');
      }
      observer.observe(element);
    });

    return () => {
      animateElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
} 