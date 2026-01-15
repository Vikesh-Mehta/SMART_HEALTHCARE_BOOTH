
import { useEffect, useState } from 'react';
import { Activity, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface HealthMetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  status?: 'normal' | 'warning' | 'critical';
  icon?: React.ReactNode;
  description?: string;
}

const HealthMetricCard = ({
  title,
  value,
  unit = '',
  change,
  status = 'normal',
  icon = <Activity size={20} />,
  description,
}: HealthMetricCardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const statusColors = {
    normal: 'text-healing-600 dark:text-healing-400',
    warning: 'text-amber-500',
    critical: 'text-destructive',
  };

  const statusBg = {
    normal: 'bg-healing-50 dark:bg-healing-900/30',
    warning: 'bg-amber-50 dark:bg-amber-900/30',
    critical: 'bg-red-50 dark:bg-red-900/30',
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
        isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {change !== undefined && (
              <div className="flex items-center text-xs">
                {change > 0 ? (
                  <ArrowUp size={12} className="text-destructive mr-1" />
                ) : change < 0 ? (
                  <ArrowDown size={12} className="text-healing-500 mr-1" />
                ) : (
                  <span className="w-3"></span>
                )}
                <span className={change > 0 ? 'text-destructive' : change < 0 ? 'text-healing-500' : ''}>
                  {Math.abs(change)}%
                </span>
              </div>
            )}
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className={`p-2 rounded-full ${statusBg[status]}`}>
          <div className={statusColors[status]}>{icon}</div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/40">
        <div 
          className={`h-full ${
            status === 'normal' ? 'bg-healing-500' : 
            status === 'warning' ? 'bg-amber-500' : 
            'bg-destructive'
          } transition-all duration-1000 ease-out`}
          style={{ width: `${isAnimated ? (status === 'normal' ? 70 : status === 'warning' ? 85 : 100) : 0}%` }}
        />
      </div>
    </div>
  );
};

export default HealthMetricCard;
