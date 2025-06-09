import React, { useState, useEffect } from 'react';
import { FONT_BODY } from '../constants';

interface LoadingOverlayProps {
  message?: string;
  done?: boolean;
}

const TOTAL_DURATION = 5 * 60; // 5 minutos

const getProgressMessage = (elapsed: number): string => {
  if (elapsed < 10) return 'Recebendo seu PDF...';
  if (elapsed < 30) return 'Analisando estrutura e conteúdo do documento...';
  if (elapsed < 60) return 'Extraindo textos e dados relevantes...';
  if (elapsed < 90) return 'Convertendo para formato web interativo...';
  if (elapsed < 120) return 'Otimizando visual e responsividade...';
  if (elapsed < 180) return 'Adicionando toques interativos...';
  return 'Quase lá! Preparando a mágica final...';
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message, done }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);

  useEffect(() => {
    if (done) {
        // Ensure timers are cleared if component is told it's "done"
        // although App.tsx unmounts it, this is good practice.
        return;
    }

    setTimeLeft(TOTAL_DURATION);
    setElapsedTime(0);
    setShowTimeoutMessage(false);

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId); // Stop this timer
          setShowTimeoutMessage(true);
          return 0;
        }
        return prev - 1;
      });
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [message, done]); // Effect reruns if message changes (new stage) or if 'done' status changes

  if (done) return null; // Don't render if loading is marked as done

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const progressPercent = Math.min(((TOTAL_DURATION - timeLeft) / TOTAL_DURATION) * 100, 100);

  return (
    <div 
      className="fixed inset-0 bg-slate-900 bg-opacity-80 dark:bg-opacity-85 backdrop-blur-lg flex flex-col items-center justify-center z-50 p-6 transition-opacity duration-300"
      role="alertdialog"
      aria-live="assertive"
      aria-labelledby="loading-message"
      aria-describedby="loading-details"
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 border-4 border-accent-blue dark:border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-sm text-white font-semibold ${FONT_BODY}">
          {formatTime(timeLeft)}
        </div>
      </div>

      <p id="loading-message" className={`text-white text-xl md:text-2xl font-semibold text-center mb-2 ${FONT_BODY}`}>
        {message || 'Transformando seu PDF em uma experiência interativa...'}
      </p>

      <p className="text-slate-300 dark:text-slate-400 text-sm md:text-base text-center mt-1 mb-5 px-4 max-w-md">
        {getProgressMessage(elapsedTime)}
      </p>

      <div className="w-full max-w-md mt-2">
        <div className="h-2.5 bg-slate-600 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-accent-blue dark:bg-sky-500 transition-all duration-500 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
            aria-label="Progresso do carregamento"
          ></div>
        </div>
      </div>

      <div id="loading-details" className="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
        {showTimeoutMessage ? (
          <p>Este PDF é bastante denso! Continuamos trabalhando nisso, por favor, aguarde mais um pouco.</p>
        ) : (
          TOTAL_DURATION > 0 && <p>Tempo estimado restante: {formatTime(timeLeft)}</p>
        )}
      </div>
    </div>
  );
};
