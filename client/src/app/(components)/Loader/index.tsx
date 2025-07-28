"use client";
import React, { useState, useEffect } from "react";

const PremiumLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isClient, setIsClient] = useState(false);

  // Deterministic random function based on seed
  const deterministicRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const loadingSteps = [
    { text: "Initializing...", duration: 200 },
    { text: "Loading preferences...", duration: 300 },
    { text: "Setting up workspace...", duration: 400 },
    { text: "Almost ready...", duration: 300 },
  ];

  useEffect(() => {
    setIsClient(true);

    let currentStep = 0;
    let currentProgress = 0;

    const updateProgress = () => {
      const totalSteps = loadingSteps.length;
      const progressIncrement = 100 / totalSteps;

      if (currentStep < totalSteps) {
        setLoadingText(loadingSteps[currentStep].text);

        const stepProgress = progressIncrement * (currentStep + 1);
        const animateProgress = () => {
          if (currentProgress < stepProgress) {
            currentProgress += 2;
            setProgress(Math.min(currentProgress, stepProgress));
            requestAnimationFrame(animateProgress);
          }
        };
        animateProgress();

        setTimeout(() => {
          currentStep++;
          updateProgress();
        }, loadingSteps[currentStep]?.duration || 300);
      }
    };

    updateProgress();
  }, []);

  // Pre-calculate particle styles for consistency
  const particleStyles = Array.from({ length: 12 }).map((_, i) => {
    const seed = i * 10;
    return {
      left: `${deterministicRandom(seed) * 100}%`,
      top: `${deterministicRandom(seed + 1) * 100}%`,
      animationDelay: `${deterministicRandom(seed + 2) * 3}s`,
      animationDuration: `${3 + deterministicRandom(seed + 3) * 2}s`,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full animate-pulse"></div>
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-500/5 to-pink-500/5 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* Floating particles */}
        {isClient &&
          particleStyles.map((style, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/20 dark:bg-blue-400/30 rounded-full animate-float"
              style={style}
            />
          ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 p-8">
        {/* Logo/Brand area */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-2xl shadow-2xl shadow-blue-500/25 dark:shadow-blue-400/25 flex items-center justify-center transform rotate-6 animate-bounce">
            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center transform -rotate-6">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded"></div>
            </div>
          </div>

          {/* Rotating rings */}
          <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
          <div className="absolute inset-1 w-18 h-18 border-2 border-transparent border-b-purple-500 dark:border-b-purple-400 rounded-full animate-spin-reverse"></div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Getting Things Ready
          </h2>
          <div className="h-6 flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">
              {loadingText}
            </span>
            <span className="ml-1 w-0.5 h-5 bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm space-y-3">
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-shimmer"></div>
            <div
              className="relative h-full bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumLoadingScreen;
