import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface WeatherMetricCardProps {
  icon: React.ReactNode
  title: string
  value: string
  className?: string
  isLoading?: boolean
}

const WeatherMetricCard = ({
  icon,
  title,
  value,
  className = '',
  isLoading = false,
}: WeatherMetricCardProps) => {
  return (
    <Card className={`justify-center rounded-xl border-white/10 ${className}`}>
      <CardContent>
        <div className="flex items-center gap-3">
          {/* Ícone */}
          {isLoading ? (
            <Skeleton className="h-8 w-8 rounded-md" />
          ) : (
            icon
          )}

          {/* Textos / Skeleton */}
          <div className="flex flex-col w-full">
            {isLoading ? (
              <>
                {/* Linha do título */}
                <Skeleton className="h-4 w-1/2 mb-2" />
                {/* Linha do valor */}
                <Skeleton className="h-6 w-3/4" />
              </>
            ) : (
              <>
                <span className="text-muted-foreground">{title}</span>
                <span className="text-xl font-semibold">{value}</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherMetricCard
