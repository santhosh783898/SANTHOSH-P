import React from 'react';

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showGrade?: boolean;
}

export const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  showGrade = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 85) return { stroke: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', text: 'text-emerald-400', grade: 'A+' };
    if (val >= 75) return { stroke: '#3B82F6', bg: 'rgba(59, 130, 246, 0.15)', text: 'text-blue-400', grade: 'B+' };
    if (val >= 60) return { stroke: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', text: 'text-amber-400', grade: 'C' };
    return { stroke: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)', text: 'text-rose-400', grade: 'D' };
  };

  const color = getColor(clampedScore);

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-slate-800"
          />
          {/* Animated Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <div className="flex items-baseline justify-center">
            <span className={`font-extrabold tracking-tight ${size > 120 ? 'text-3xl sm:text-4xl' : 'text-xl'} ${color.text}`}>
              {clampedScore}
            </span>
            <span className="text-xs font-semibold text-slate-400 ml-0.5">/100</span>
          </div>

          {showGrade && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full mt-0.5 bg-slate-800 text-slate-300 border border-slate-700">
              Grade {color.grade}
            </span>
          )}

          {sublabel && (
            <span className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-medium">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-medium text-slate-300 text-center">
          {label}
        </span>
      )}
    </div>
  );
};
