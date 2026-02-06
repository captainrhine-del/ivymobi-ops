import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface SparkLineProps {
  data: number[];
  color?: string;
  height?: number;
  positive?: boolean;
}

export function SparkLine({ 
  data, 
  color,
  height = 40,
  positive = true 
}: SparkLineProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  
  const gradientColor = positive 
    ? "hsl(var(--gradient-start))" 
    : "hsl(0, 70%, 50%)";
  
  const strokeColor = color || gradientColor;

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
          <defs>
            <linearGradient id={`sparkGradient-${positive}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={2}
            fill={`url(#sparkGradient-${positive})`}
            dot={false}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
