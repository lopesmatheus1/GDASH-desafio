import { AlertTriangle, Leaf, Thermometer } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const alertVariants = {
  warning: {
    icon: AlertTriangle,
    borderColor: 'border-l-amber-400',
    iconColor: 'text-amber-400',
  },
  temperature: {
    icon: Thermometer,
    borderColor: 'border-l-cyan-500',
    iconColor: 'text-cyan-500',
  },
  success: {
    icon: Leaf,
    borderColor: 'border-l-green-500',
    iconColor: 'text-green-500',
  },
}

interface InsightCardProps {
  variant?: keyof typeof alertVariants
  title: string
  description: string
  className?: string
  isLoading?: boolean
  score?: number
}

export function InsightCard({
  variant = 'warning',
  title,
  description,
  className,
  isLoading = false,
  score,
}: InsightCardProps) {
  const { icon: Icon, borderColor, iconColor } = alertVariants[variant]

  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-400'
    if (value >= 50) return 'text-amber-400'
    return 'text-red-400'
  }

  if (isLoading) {
    return (
      <Card
        className={cn(
          'border-l-4 border-slate-700 border-l-slate-600 bg-slate-900',
          className
        )}
      >
        <CardContent className="flex items-start gap-3 p-4">
          <Skeleton className="h-6 w-6 shrink-0 rounded-full bg-slate-700" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32 bg-slate-700" />
            <Skeleton className="h-4 w-full bg-slate-700" />
            <Skeleton className="h-4 w-3/4 bg-slate-700" />
          </div>
          <Skeleton className="h-8 w-12 shrink-0 bg-slate-700" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-l-4', borderColor, className)}>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="flex items-start gap-3">
          <Icon className={cn('mt-0.5 h-6 w-6 shrink-0', iconColor)} />
          <div className="space-y-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
        {score !== undefined && (
          <div className="flex shrink-0 flex-col items-end">
            <span className={cn('text-2xl font-bold', getScoreColor(score))}>
              {score}
            </span>
            <span className="text-xs text-slate-500">score</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
