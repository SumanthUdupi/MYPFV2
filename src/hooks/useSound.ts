import { useCallback } from 'react';

const useSound = (freq: number = 440, duration: number = 0.05, vol: number = 0.3) => {
  const playSound = useCallback(() => {
    const audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = vol;
    oscillator.frequency.value = freq;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }, [freq, duration, vol]);

  return playSound;
};

export default useSound;