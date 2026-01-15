
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}

const FeatureCard = ({
  title,
  description,
  icon,
  index = 0,
  className,
  onClick,
}: FeatureCardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100 + (index * 100));

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/40 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group",
        isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-500 to-healing-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      
      <div className="mb-4 inline-flex items-center justify-center p-2 rounded-lg bg-accent/50 group-hover:bg-accent transition-colors duration-300">
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-medical-500/10 to-transparent rounded-tl-3xl transform translate-y-8 translate-x-8 group-hover:translate-y-4 group-hover:translate-x-4 transition-transform duration-300" />
    </div>
  );
};

export default FeatureCard;
