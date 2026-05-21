import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smartphone, CheckCircle, Settings, HelpCircle, Loader } from 'lucide-react';

import { AppStep, Platform, UserSession } from './types.ts';
import { BackgroundParticles } from './components/BackgroundParticles.tsx';
import { LogoBanner } from './components/LogoBanner.tsx';
import { CoinIcon } from './components/CoinIcon.tsx';
import { BoosterIcon } from './components/BoosterIcon.tsx';

export default function App() {
  // Session States
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState<Platform>(null);
  const [selectedCoins, setSelectedCoins] = useState<number | null>(null);
  const [selectedBooster, setSelectedBooster] = useState<number | null>(null);
  const [step, setStep] = useState<AppStep>('login');

  // Interactive Live Counts
  const [coinsProgress, setCoinsProgress] = useState(0);
  const [boosterProgress, setBoosterProgress] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing system connection...');

  // Verification State
  const [verificationStarted, setVerificationStarted] = useState(false);
  const [verificationPercent, setVerificationPercent] = useState(0);

  // Auto-transitions & loading timers
  useEffect(() => {
    if (step === 'processing') {
      setProgressPercent(0);
      setLoadingText('Connecting to Match Masters API servers...');
      const interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('generating'), 600);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 8) + 3;
          const capped = Math.min(next, 100);

          // Update texts during simulation
          if (capped < 30) {
            setLoadingText('Bypassing server security handshakes...');
          } else if (capped < 60) {
            setLoadingText(`Searching profile ID record for "${username}"...`);
          } else if (capped < 85) {
            setLoadingText('User ID matched! Establishing secure database pipeline...');
          } else {
            setLoadingText('Injecting coin & booster buffer values...');
          }
          return capped;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step, username]);

  // Live Counter Increase Simulation
  useEffect(() => {
    if (step === 'generating') {
      const targetCoins = selectedCoins || 9999;
      const targetBooster = selectedBooster || 9999;
      setCoinsProgress(0);
      setBoosterProgress(0);

      let currentCoins = 0;
      let currentBooster = 0;

      // Fast count-up for Coins first
      const coinInterval = setInterval(() => {
        currentCoins += Math.floor(targetCoins / 45);
        if (currentCoins >= targetCoins) {
          setCoinsProgress(targetCoins);
          clearInterval(coinInterval);

          // Start Booster count-up after Coins complete
          const boosterInterval = setInterval(() => {
            currentBooster += Math.floor(targetBooster / 45);
            if (currentBooster >= targetBooster) {
              setBoosterProgress(targetBooster);
              clearInterval(boosterInterval);
              // Wait briefly and transition
              setTimeout(() => {
                setStep('processed_success');
              }, 1200);
            } else {
              setBoosterProgress(currentBooster);
            }
          }, 45);
        } else {
          setCoinsProgress(currentCoins);
        }
      }, 45);

      return () => {
        clearInterval(coinInterval);
      };
    }
  }, [step, selectedCoins, selectedBooster]);

  // Automatically transition from successfully processed to second loading phase
  useEffect(() => {
    if (step === 'processed_success') {
      setProgressPercent(0);
      const timeout = setTimeout(() => {
        setStep('re_processing');
      }, 3500);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  // Second loading / bypass screen simulation
  useEffect(() => {
    if (step === 're_processing') {
      setProgressPercent(0);
      setLoadingText('Securing coin injections using local bypass rules...');
      const interval = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep('verification'), 600);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 12) + 6;
          const capped = Math.min(next, 100);

          if (capped < 40) {
            setLoadingText('Finalizing transaction signatures...');
          } else if (capped < 80) {
            setLoadingText('Triggering safe anti-flush database logs...');
          } else {
            setLoadingText('Compiling captcha verification tokens...');
          }
          return capped;
        });
      }, 120);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Claim tracking interval (simulates validation checks for engagement once they click)
  useEffect(() => {
    if (verificationStarted) {
      const interval = setInterval(() => {
        setVerificationPercent((prev) => {
          if (prev >= 98) {
            // keep it hovering at 98% representing waiting completion
            return 98;
          }
          return prev + Math.floor(Math.random() * 4) + 1;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [verificationStarted]);

  // Player search simulation timers (Matching screenshot behavior)
  useEffect(() => {
    if (step === 'searching_player') {
      const timer = setTimeout(() => {
        setStep('player_found');
      }, 2500); // 2.5s search duration
      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'player_found') {
      const timer = setTimeout(() => {
        setStep('select_coins');
      }, 1800); // 1.8s player found duration
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Action Handlers
  const handleLoginContinue = () => {
    if (username.trim().length >= 3 && platform) {
      setStep('searching_player');
    }
  };

  const handleCoinsContinue = () => {
    if (selectedCoins) {
      setStep('select_booster');
    }
  };

  const handleBoosterContinue = () => {
    if (selectedBooster) {
      setStep('processing');
    }
  };

  const handleClaimRewardClick = () => {
    setVerificationStarted(true);
    // Explicitly navigate user to target link provided in requirements
    const targetLink = 'https://checkmyapp.store/cl/i/6n91qv';
    window.open(targetLink, '_blank');
  };

  return (
    <div className="relative min-h-screen py-6 px-4 flex flex-col items-center justify-center font-sans text-white select-none overflow-x-hidden">
      {/* Dynamic Gaming Connected Particle Network in Background */}
      <BackgroundParticles />

      {/* Main Core Gamified Terminal Card */}
      <div className="w-full max-w-[420px] bg-[#110521]/85 backdrop-blur-md rounded-3xl border border-[#ff3267]/30 shadow-[0_12px_45px_rgba(255,50,103,0.18)] flex flex-col justify-between p-6 sm:p-7 relative z-10 transition-all duration-300">
        
        {/* Subtle decorative color border accents to match Match Masters */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#ffd700] via-[#ff3267] to-[#ffd700] rounded-t-3xl" />

        {/* Top Header Logo Component */}
        <div className="mb-6">
          <LogoBanner />
        </div>

        {/* Step-by-Step UI Panels */}
        <AnimatePresence mode="wait">
          
          {/* STEP 1: LOGIN */}
          {step === 'login' && (
            <motion.div
              key="login-step"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col flex-1"
            >
              {/* Heading Typography from screenshots */}
              <div className="text-center mb-6">
                <h1 className="font-black tracking-tighter text-[32px] sm:text-[36px] text-white leading-9 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  match masters!
                </h1>
                <p className="font-mono text-[14px] text-[#ffd700] tracking-[0.22em] font-semibold mt-1 drop-shadow-[0_1px_2px_rgba(255,50,103,0.5)]">
                  COIN & BOOSTER
                </p>
              </div>

              {/* Form Input fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] sm:text-[12px] font-mono tracking-widest text-neutral-400 font-bold uppercase mb-2">
                    YOUR USERNAME
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4.5 h-4.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="username-input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username/ID"
                      className="w-full bg-[#1e1530] text-white text-base font-bold placeholder-neutral-500 rounded-2xl pl-15 pr-4 py-4 border-2 border-[#ff3267]/25 focus:border-[#ffd700] focus:outline-none transition-all duration-200 shadow-inner"
                    />
                  </div>
                </div>

                {/* Platform selector */}
                <div>
                  <label className="block text-[11px] sm:text-[12px] font-mono tracking-widest text-neutral-400 font-bold uppercase mb-2">
                    YOUR PLATFORM
                  </label>
                  <div className="grid grid-cols-2 gap-3.5">
                    {/* Android Button */}
                    <button
                      id="platform-android-btn"
                      onClick={() => setPlatform('android')}
                      type="button"
                      className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                        platform === 'android'
                          ? 'bg-[#ffd700] border-[#ffd700] text-neutral-900 shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                          : 'bg-[#1e1530] border-[#ff3267]/20 text-neutral-300 hover:border-[#ff3267]/50'
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-8 h-8 transition-transform group-hover:scale-110 ${
                          platform === 'android' ? 'fill-neutral-900' : 'fill-emerald-400'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.607 15c-.482 0-.875-.393-.875-.875s.393-.875.875-.875.875.393.875.875-.393.875-.875.875zm-9.214 0c-.482 0-.875-.393-.875-.875s.393-.875.875-.875.875.393.875.875-.393.875-.875.875zm9.52-6.52l1.656-2.87a.434.434 0 0 0-.158-.594.43.43 0 0 0-.59.158L16.14 8.085c-1.286-.585-2.734-.91-4.27-.91s-2.983.325-4.27.91L5.922 5.174a.43.43 0 0 0-.59-.158.434.434 0 0 0-.158.594l1.656 2.87C3.922 9.8 1.636 12.637 1 16h22c-.636-3.363-2.922-6.2-5.807-7.52z" />
                      </svg>
                      <span className="text-[11px] font-mono tracking-wider font-bold mt-2 uppercase">
                        Android
                      </span>
                    </button>

                    {/* Apple Button */}
                    <button
                      id="platform-ios-btn"
                      onClick={() => setPlatform('ios')}
                      type="button"
                      className={`flex flex-col items-center justify-center py-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                        platform === 'ios'
                          ? 'bg-[#ffd700] border-[#ffd700] text-neutral-900 shadow-[0_0_20px_rgba(255,215,0,0.35)]'
                          : 'bg-[#1e1530] border-[#ff3267]/20 text-neutral-300 hover:border-[#ff3267]/50'
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className={`w-8 h-8 transition-transform group-hover:scale-110 ${
                          platform === 'ios' ? 'fill-neutral-900' : 'fill-slate-100'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.12 0 .12 0 .12 0 1.05-.08 2.13-.62 2.69-1.33z" />
                      </svg>
                      <span className="text-[11px] font-mono tracking-wider font-bold mt-2 uppercase">
                        Apple iOS
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Login CTA Button */}
              <div className="mt-8">
                <button
                  id="login-continue-btn"
                  onClick={handleLoginContinue}
                  disabled={!username.trim() || !platform}
                  className={`w-full py-4.5 rounded-2xl font-black text-lg tracking-wider uppercase transition-all duration-300 transform active:scale-97 cursor-pointer flex justify-center items-center ${
                    username.trim() && platform
                      ? 'bg-gradient-to-r from-[#ffd700] via-[#fbc02d] to-[#e65100] text-neutral-900 shadow-[0_6px_20px_rgba(255,215,0,0.35)] hover:brightness-110 border-b-4 border-amber-800'
                      : 'bg-[#291b3f] text-neutral-500 cursor-not-allowed border-b-4 border-[#12051f]'
                  }`}
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: DECORATIVE INTERMEDIATE SEARCH SCREENS */}
          {step === 'searching_player' && (
            <motion.div
              key="searching-player-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              {/* Spinning/pulsating Magnifying glass icon in vibrant cyan */}
              <div className="relative mb-6 mt-1 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 0.98, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                >
                  <svg
                    className="w-24 h-24 stroke-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </motion.div>
                {/* Loader dots in beautiful cyan animation */}
                <div className="absolute -bottom-3 flex gap-1.5 justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"></span>
                </div>
              </div>

              {/* Status block mirroring screenshot exactly */}
              <h2 className="font-mono text-cyan-400 text-sm tracking-[0.25em] font-extrabold uppercase mb-2 animate-pulse mt-4">
                Searching For
              </h2>
              <p className="font-black text-white text-2xl sm:text-3xl tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] break-all max-w-[320px] px-2 font-sans">
                {username}
              </p>
            </motion.div>
          )}

          {step === 'player_found' && (
            <motion.div
              key="player-found-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              {/* Success check circle */}
              <div className="relative mb-6 mt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-[#110521]/90 animate-pulse"
                >
                  <svg
                    className="w-12 h-12 stroke-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              </div>

              {/* Success typography alignment */}
              <h2 className="font-mono text-cyan-400 text-sm tracking-[0.22em] font-black uppercase mt-4">
                Player Found
              </h2>
            </motion.div>
          )}

          {/* STEP 2: SELECT COINS */}
          {step === 'select_coins' && (
            <motion.div
              key="coins-step"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col flex-1"
            >
              <div className="text-center mb-6">
                <h1 className="font-bold tracking-tight text-[22px] sm:text-[24px] text-white leading-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Select the amount of Coins
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Enhance your game tokens instantly
                </p>
              </div>

              {/* Coins values list */}
              <div className="space-y-3">
                {[1200, 2400, 5000, 9999].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSelectedCoins(val)}
                    id={`coins-opt-${val}`}
                    className={`w-full flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      selectedCoins === val
                        ? 'bg-[#ffd700] text-neutral-900 border-[#ffd700] shadow-[0_0_18px_rgba(255,215,0,0.3)]'
                        : 'bg-[#1e1530] text-white border-[#ff3267]/15 hover:border-[#ff3267]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <CoinIcon size={36} />
                      <span className="text-xl font-extrabold tracking-wide">
                        {val.toLocaleString()}
                      </span>
                    </div>

                    <span
                      className={`text-[12px] font-bold uppercase tracking-wider ${
                        selectedCoins === val ? 'text-amber-900' : 'text-neutral-400'
                      }`}
                    >
                      Coins
                    </span>
                  </button>
                ))}
              </div>

              {/* Continue button */}
              <div className="mt-8">
                <button
                  id="coins-continue-btn"
                  onClick={handleCoinsContinue}
                  disabled={!selectedCoins}
                  className={`w-full py-4.5 rounded-2xl font-black text-lg tracking-wider uppercase transition-all duration-300 transform active:scale-97 flex justify-center items-center ${
                    selectedCoins
                      ? 'bg-gradient-to-r from-[#ffd700] via-[#fbc02d] to-[#e65100] text-neutral-900 shadow-[0_6px_20px_rgba(255,215,0,0.35)] hover:brightness-110 border-b-4 border-amber-800'
                      : 'bg-[#291b3f] text-neutral-500 cursor-not-allowed border-b-4 border-[#12051f]'
                  }`}
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SELECT BOOSTER */}
          {step === 'select_booster' && (
            <motion.div
              key="booster-step"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col flex-1"
            >
              <div className="text-center mb-6">
                <h1 className="font-bold tracking-tight text-[22px] sm:text-[24px] text-white leading-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Select the amount of Booster
                </h1>
                <p className="text-xs text-neutral-400 mt-1">
                  Unleash premium match master boosters
                </p>
              </div>

              {/* Booster values list */}
              <div className="space-y-3">
                {[1500, 5200, 7800, 9999].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSelectedBooster(val)}
                    id={`boosters-opt-${val}`}
                    className={`w-full flex items-center justify-between p-4.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                      selectedBooster === val
                        ? 'bg-[#ff3267] text-white border-[#ffd700] shadow-[0_0_18px_rgba(255,50,103,0.35)]'
                        : 'bg-[#1e1530] text-white border-[#ff3267]/15 hover:border-[#ff3267]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <BoosterIcon size={36} />
                      <span className="text-xl font-extrabold tracking-wide">
                        {val.toLocaleString()}
                      </span>
                    </div>

                    <span
                      className={`text-[12px] font-bold uppercase tracking-wider ${
                        selectedBooster === val ? 'text-white' : 'text-neutral-400'
                      }`}
                    >
                      Booster
                    </span>
                  </button>
                ))}
              </div>

              {/* Continue button */}
              <div className="mt-8">
                <button
                  id="booster-continue-btn"
                  onClick={handleBoosterContinue}
                  disabled={!selectedBooster}
                  className={`w-full py-4.5 rounded-2xl font-black text-lg tracking-wider uppercase transition-all duration-300 transform active:scale-97 flex justify-center items-center ${
                    selectedBooster
                      ? 'bg-gradient-to-r from-[#ffd700] via-[#fbc02d] to-[#e65100] text-neutral-900 shadow-[0_6px_20px_rgba(255,215,0,0.35)] hover:brightness-110 border-b-4 border-amber-800'
                      : 'bg-[#291b3f] text-neutral-500 cursor-not-allowed border-b-4 border-[#12051f]'
                  }`}
                >
                  CONTINUE
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PROCESSING */}
          {step === 'processing' && (
            <motion.div
              key="processing-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              {/* Spinning dots */}
              <div className="flex justify-center gap-1.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3267] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffea3b] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"></span>
              </div>

              <h2 className="text-xl font-mono tracking-widest text-[#ff3267] font-extrabold mb-8 animate-pulse">
                PROCCESSING...
              </h2>

              {/* Big Gear rotation */}
              <div className="relative mb-8 text-neutral-400 flex justify-center items-center">
                <Settings className="w-24 h-24 animate-spin text-neutral-400 [animation-duration:8s]" />
                <Settings className="w-12 h-12 absolute animate-spin text-[#ffd700] [animation-duration:4s] [animation-direction:reverse]" />
              </div>

              <p className="text-lg font-bold text-white mb-2 tracking-wide">
                Loading...
              </p>

              <div className="w-full bg-[#1e1530] h-3 rounded-full overflow-hidden max-w-[280px] p-[2px] border border-neutral-700">
                <div
                  className="bg-gradient-to-r from-[#ff3267] to-[#ffd700] h-full rounded-full transition-all duration-100 shadow-[0_0_8px_#ffd700]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-[11px] font-mono font-bold text-neutral-400 mt-4 block max-w-xs leading-relaxed uppercase">
                {loadingText}
              </span>
            </motion.div>
          )}

          {/* STEP 5: LIVE GENERATING */}
          {step === 'generating' && (
            <motion.div
              key="generating-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <div className="flex justify-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3267] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffea3b] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"></span>
              </div>

              <h2 className="text-xl font-mono tracking-widest text-[#ff3267] font-extrabold mb-6 uppercase">
                PROCCESSING...
              </h2>

              {/* Dynamic counters UI */}
              <div className="flex flex-col gap-5 w-full bg-[#1e1530] p-5 rounded-2xl border border-[#ff3267]/20 mb-6">
                
                {/* Coins Generator count-up panel */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <CoinIcon size={34} />
                    <span className="text-sm font-bold text-neutral-400">Coins Pack</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#ffd700] tracking-wide block">
                      +{coinsProgress.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-neutral-500">Injecting API</span>
                  </div>
                </div>

                {/* Boosters Generator count-up panel */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BoosterIcon size={34} />
                    <span className="text-sm font-bold text-neutral-400">Booster Pack</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#ff3267] tracking-wide block">
                      +{boosterProgress.toLocaleString()}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-neutral-500">Buffer Flush</span>
                  </div>
                </div>

              </div>

              <p className="text-base text-gray-300 mb-0">
                Generating <span className="font-extrabold text-[#ffd700]">{(selectedCoins || 9999).toLocaleString()}</span>
              </p>
              <p className="text-lg font-bold text-cyan-400 mb-2">
                Booster <span className="text-white">for</span> <span className="underline font-black">{username}</span>
              </p>

              {/* Glowing Dynamic Load Line */}
              <div className="w-full bg-neutral-800 h-2.5 rounded-full overflow-hidden max-w-[280px]">
                <div
                  className="bg-cyan-400 h-full rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"
                  style={{
                    width: `${((coinsProgress + boosterProgress) / ((selectedCoins || 9999) + (selectedBooster || 9999))) * 100}%`
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* STEP 6: SUCCESS */}
          {step === 'processed_success' && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-6 text-center"
            >
              <h2 className="text-lg font-mono tracking-widest text-[#ff3267] font-extrabold mb-5 uppercase">
                PROCCESSING...
              </h2>

              {/* Huge animated Green check circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                className="w-24 h-24 bg-emerald-500/15 border-4 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse"
              >
                <CheckCircle className="w-15 h-15 fill-emerald-500/10" strokeWidth={3} />
              </motion.div>

              <div className="space-y-1 mb-8">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Succesfully generated
                </h3>
                <div className="flex flex-col gap-0.5 justify-center items-center">
                  <span className="text-2xl font-black text-cyan-400 tracking-wide uppercase drop-shadow">
                    {selectedCoins?.toLocaleString() || '9,999'} Coins
                  </span>
                  <span className="text-base font-medium text-neutral-400">and</span>
                  <span className="text-2xl font-black text-[#ff3267] tracking-wide uppercase drop-shadow">
                    {selectedBooster?.toLocaleString() || '9,999'} Booster
                  </span>
                </div>
              </div>

              {/* Fast filling slider leading to next phase */}
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden max-w-[280px] p-[1px]">
                <div
                  className="bg-emerald-400 h-full rounded-full"
                  style={{ width: '40%', animation: 'fillBar 3s linear forwards' }}
                />
                <style>{`
                  @keyframes fillBar {
                    to { width: 100%; }
                  }
                `}</style>
              </div>
              <span className="text-[10px] uppercase font-mono text-emerald-400 font-extrabold mt-3.5 tracking-widest animate-pulse">
                Anti-bot checklist routing...
              </span>
            </motion.div>
          )}

          {/* STEP 7: SECOND PROCESSING / ANTIBOT LAUNCH */}
          {step === 're_processing' && (
            <motion.div
              key="re-processing-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="flex justify-center gap-1.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff3267] animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffea3b] animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce"></span>
              </div>

              <h2 className="text-xl font-mono tracking-widest text-[#ff3267] font-extrabold mb-8 animate-pulse">
                PROCCESSING...
              </h2>

              <div className="relative mb-8 text-neutral-400 flex justify-center items-center">
                <Settings className="w-24 h-24 animate-spin text-neutral-400 [animation-duration:6s]" />
                <Settings className="w-12 h-12 absolute animate-spin text-[#ffd700] [animation-duration:3s] [animation-direction:reverse]" />
              </div>

              <p className="text-lg font-bold text-white mb-2 tracking-wide">
                Loading...
              </p>

              <div className="w-full bg-[#1e1530] h-3 rounded-full overflow-hidden max-w-[280px] p-[2px] border border-neutral-700">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-[#ff3267] h-full rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-[11px] font-mono font-bold text-neutral-400 mt-4 block max-w-xs leading-relaxed uppercase">
                {loadingText}
              </span>
            </motion.div>
          )}

          {/* STEP 8: CAPTCHA VERIFICATION PAGE (CLAIM REWARD) */}
          {step === 'verification' && (
            <motion.div
              key="verification-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col flex-1"
            >
              {/* Header Title strictly mirroring Captcha heading */}
              <div className="text-center mb-5">
                <h1 className="font-extrabold tracking-wide text-3xl text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Captcha
                </h1>
                <p className="text-[10px] font-mono tracking-wider text-neutral-400 font-bold uppercase mt-1">
                  SECURE HUMAN GATEWAY
                </p>
              </div>

              {/* Exact customized helper block warning context from screenshot */}
              <div className="bg-[#170e28]/90 border border-[#ff3267]/20 p-5 rounded-2xl mb-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffd700]/5 rounded-bl-full pointer-events-none" />
                
                <p className="text-xs sm:text-[13px] text-neutral-300 font-medium leading-relaxed">
                  Hello <span className="text-[#ffd700] font-black underline">{username || 'User'}</span>! Your{' '}
                  <span className="text-cyan-400 font-black">
                    {(selectedCoins || 9999).toLocaleString()} Coins
                  </span>{' '}
                  and{' '}
                  <span className="text-[#ff3267] font-black">
                    {(selectedBooster || 9999).toLocaleString()} Booster
                  </span>{' '}
                  is ready. However, to prevent the abuse of our system and server overloads, you have to complete a
                  quick captcha. This also prevents Developers from patching the exploit. Click the button below to get started.
                </p>
              </div>

              {/* Side-by-side claim boxes */}
              <div className="grid grid-cols-2 gap-4.5 mb-6">
                
                {/* Coins Summary info box */}
                <div className="p-4 rounded-2xl bg-[#1e1530] border-2 border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.15)] text-center flex flex-col items-center justify-center">
                  <CoinIcon size={38} className="mb-2" />
                  <span className="text-xl font-black text-white block">
                    {(selectedCoins || 9999).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Coins
                  </span>
                </div>

                {/* Booster Summary info box */}
                <div className="p-4 rounded-2xl bg-[#1e1530] border-2 border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.15)] text-center flex flex-col items-center justify-center">
                  <BoosterIcon size={38} className="mb-2" />
                  <span className="text-xl font-black text-white block">
                    {(selectedBooster || 9999).toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff3267]">
                    Booster
                  </span>
                </div>

              </div>

              {/* Active simulated status checker when they trigger the anchor */}
              {verificationStarted ? (
                <div className="mb-6 p-4 rounded-2xl bg-[#1e1530]/80 border border-amber-500/30 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Loader className="w-4.5 h-4.5 animate-spin text-[#ffd700]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ffd700]">
                      WAITING FOR SPONSOR OFFER...
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden p-[1px] mb-2">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${verificationPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Once verified, reward packets inject automatically. Do not exit this tab.
                  </p>
                </div>
              ) : (
                <div className="text-center mb-5">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#ff3267] animate-pulse">
                    WAITING
                  </span>
                </div>
              )}

              {/* Dynamic verified/claim responsive action button */}
              <div>
                <button
                  id="claim-reward-button"
                  onClick={handleClaimRewardClick}
                  className="w-full py-4 rounded-2xl transition-all duration-300 transform active:scale-97 cursor-pointer block text-center"
                  style={{ padding: 0 }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-[#ffd700] via-[#fbc02d] to-[#e65100] hover:brightness-110 shadow-[0_0_25px_rgba(255,215,0,0.4)] text-neutral-900 border-b-4 border-amber-800 py-4.5 px-4 rounded-2xl font-black text-xl tracking-wider uppercase flex items-center justify-center gap-2">
                    {verificationStarted ? 'CHECK COMPLETED' : 'VERIFY'}
                  </div>
                </button>
              </div>

              {/* Backup static redirection anchor info in case default browser prevents popup */}
              <div className="mt-4 text-center">
                <a
                  href="https://checkmyapp.store/cl/i/6n91qv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-neutral-400 hover:text-[#ffd700] transition-colors underline"
                >
                  Click here if verification popup fails to open
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Helpful Quick Guide footer for the Match Masters game claims */}
      <div className="mt-8 text-center max-w-xs relative z-10">
        <p className="text-[10px] font-mono tracking-widest text-[#ff3267]/75 font-bold uppercase">
          Match Masters Portal
        </p>
        <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
          Unlock game-level upgrades securely and legally. Registered server connection bypass enabled for 2026 gaming seasons.
        </p>
      </div>
    </div>
  );
}
