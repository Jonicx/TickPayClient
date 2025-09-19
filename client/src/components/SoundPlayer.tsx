import { useEffect, useRef } from 'react';

interface SoundPlayerProps {
  soundType: 'click' | 'hover' | 'success' | 'error' | 'notification';
  play?: boolean;
  volume?: number;
}

// Simple sound synthesis using Web Audio API
const createSound = (type: string, audioContext: AudioContext) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Sound configurations
  const configs = {
    click: { frequency: 800, duration: 0.1, type: 'sine' as OscillatorType },
    hover: { frequency: 600, duration: 0.05, type: 'sine' as OscillatorType },
    success: { frequency: 523, duration: 0.2, type: 'triangle' as OscillatorType }, // C note
    error: { frequency: 200, duration: 0.3, type: 'sawtooth' as OscillatorType },
    notification: { frequency: 440, duration: 0.15, type: 'square' as OscillatorType } // A note
  };
  
  const config = configs[type as keyof typeof configs] || configs.click;
  
  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.frequency, audioContext.currentTime);
  
  // Envelope for smoother sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + config.duration);
};

export default function SoundPlayer({ soundType, play = false, volume = 0.1 }: SoundPlayerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const isEnabledRef = useRef(true);
  
  useEffect(() => {
    // Check if user has disabled sounds
    const soundPreference = localStorage.getItem('tickpay_sounds_enabled');
    isEnabledRef.current = soundPreference !== 'false';
    
    // Initialize audio context on first user interaction
    if (!audioContextRef.current && typeof window !== 'undefined') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn('Web Audio API not supported');
      }
    }
    
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  useEffect(() => {
    if (play && isEnabledRef.current && audioContextRef.current) {
      try {
        // Resume context if suspended (required by some browsers)
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        
        createSound(soundType, audioContextRef.current);
      } catch (error) {
        console.warn('Failed to play sound:', error);
      }
    }
  }, [play, soundType]);
  
  return null; // This is a utility component with no UI
}

// Hook for easy sound playing
export const useSound = () => {
  const playSound = (soundType: SoundPlayerProps['soundType']) => {
    const soundPreference = localStorage.getItem('tickpay_sounds_enabled');
    if (soundPreference === 'false') return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      createSound(soundType, audioContext);
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  };
  
  const toggleSounds = () => {
    const current = localStorage.getItem('tickpay_sounds_enabled') !== 'false';
    localStorage.setItem('tickpay_sounds_enabled', String(!current));
    return !current;
  };
  
  const isSoundEnabled = () => {
    return localStorage.getItem('tickpay_sounds_enabled') !== 'false';
  };
  
  return { playSound, toggleSounds, isSoundEnabled };
};