import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function LoadingSkeleton({ className = '', width = '100%', height = '20px' }: LoadingSkeletonProps) {
  return (
    <motion.div
      className={`animate-shimmer bg-secondary-200 rounded ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card space-y-4">
      <LoadingSkeleton height="24px" width="60%" />
      <LoadingSkeleton height="16px" width="80%" />
      <LoadingSkeleton height="16px" width="40%" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <LoadingSkeleton width="40px" height="40px" className="rounded-full" />
          <div className="space-y-2">
            <LoadingSkeleton width="120px" height="16px" />
            <LoadingSkeleton width="200px" height="14px" />
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton width="60px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton width="80px" height="20px" className="rounded-full" />
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton width="40px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton width="50px" height="16px" />
      </td>
      <td className="px-6 py-4">
        <LoadingSkeleton width="50px" height="16px" />
      </td>
      <td className="px-6 py-4 text-right">
        <LoadingSkeleton width="60px" height="16px" />
      </td>
    </tr>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <LoadingSkeleton width="150px" height="24px" />
        <LoadingSkeleton width="100px" height="20px" />
      </div>
      <LoadingSkeleton width="100%" height="300px" />
    </div>
  );
}