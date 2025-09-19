import { useEffect, useState } from 'react';

export interface GestureState {
  isSwipeEnabled: boolean;
  swipeDirection: 'left' | 'right' | null;
  touchStart: { x: number; y: number } | null;
  touchEnd: { x: number; y: number } | null;
}

export function useGestures(onSwipeLeft?: () => void, onSwipeRight?: () => void) {
  const [gestureState, setGestureState] = useState<GestureState>({
    isSwipeEnabled: true,
    swipeDirection: null,
    touchStart: null,
    touchEnd: null,
  });

  const minSwipeDistance = 50; // Minimum distance for a swipe

  const handleTouchStart = (e: TouchEvent) => {
    if (!gestureState.isSwipeEnabled) return;
    
    const touch = e.touches[0];
    setGestureState(prev => ({
      ...prev,
      touchStart: { x: touch.clientX, y: touch.clientY },
      touchEnd: null,
      swipeDirection: null,
    }));
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!gestureState.touchStart) return;
    
    const touch = e.touches[0];
    setGestureState(prev => ({
      ...prev,
      touchEnd: { x: touch.clientX, y: touch.clientY }
    }));
  };

  const handleTouchEnd = () => {
    if (!gestureState.touchStart || !gestureState.touchEnd) return;

    const distanceX = gestureState.touchStart.x - gestureState.touchEnd.x;
    const distanceY = gestureState.touchStart.y - gestureState.touchEnd.y;
    
    // Check if this is primarily a horizontal swipe
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      // Check if swipe distance is sufficient
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          // Swipe left
          setGestureState(prev => ({ ...prev, swipeDirection: 'left' }));
          onSwipeLeft?.();
        } else {
          // Swipe right
          setGestureState(prev => ({ ...prev, swipeDirection: 'right' }));
          onSwipeRight?.();
        }
      }
    }

    // Reset touch states
    setGestureState(prev => ({
      ...prev,
      touchStart: null,
      touchEnd: null,
    }));
  };

  useEffect(() => {
    // Only enable gestures on touch devices
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [gestureState.touchStart, gestureState.touchEnd]);

  const enableGestures = () => {
    setGestureState(prev => ({ ...prev, isSwipeEnabled: true }));
  };

  const disableGestures = () => {
    setGestureState(prev => ({ ...prev, isSwipeEnabled: false }));
  };

  return {
    gestureState,
    enableGestures,
    disableGestures,
  };
}