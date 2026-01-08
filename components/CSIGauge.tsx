import React, { useEffect, useState } from 'react';

interface CSIGaugeProps {
  value: number; // 0 to 100
  label: string;
}

const CSIGauge: React.FC<CSIGaugeProps> = ({ value, label }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    // Animation logic
    let startTimestamp: number | null = null;
    const duration = 1500; // ms
    const startValue = displayValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentVal = startValue + (value - startValue) * easeProgress;
      setDisplayValue(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Determine color based on score
  const getColor = (val: number) => {
    if (val >= 80) return '#10b981'; // Green
    if (val >= 50) return '#3b82f6'; // Blue
    return '#ef4444'; // Red
  };

  const currentColor = getColor(displayValue);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          {/* Background Ring */}
          <circle
            stroke="#1e293b" // Slate 800
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Ring */}
          <circle
            stroke={currentColor}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.1s linear' }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-white">
          <span className="text-4xl font-bold font-mono tracking-tighter">
            {Math.round(displayValue)}%
          </span>
          <span className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Score</span>
        </div>
      </div>
      <h3 className="text-lg font-medium text-slate-200 mt-2">{label}</h3>
    </div>
  );
};

export default CSIGauge;