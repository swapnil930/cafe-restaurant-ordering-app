import { Coffee, Sparkles } from 'lucide-react';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-4 animate-scale-in">

        <div className="relative">
          <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-40 animate-pulse"></div>

          <div className="relative bg-orange-500 p-5 rounded-full">
            <Coffee className="w-10 h-10 text-white animate-bounce-slow" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin-slow" />
          </div>
        </div>

        <p className="text-gray-700 font-semibold text-sm">
          {text}
        </p>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 1.8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-scale-in {
          animation: scale-in 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
