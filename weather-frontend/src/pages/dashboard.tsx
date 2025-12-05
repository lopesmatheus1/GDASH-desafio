import { useQueries, useQuery } from '@tanstack/react-query'
import {
  CloudyIcon,
  DropletsIcon,
  ThermometerIcon,
  WindIcon,
} from 'lucide-react'

import { useAuthContext } from '@/context/authContext'
import Header from '@/features/dashboard/components/header'
import { InsightCard } from '@/features/dashboard/components/ia-insights-card'
import WeatherMetricCard from '@/features/dashboard/components/weather-metric-card'
import { protectedApi } from '@/lib/axios'

const DashboardPage = () => {
  const { isInitializing } = useAuthContext()

  const { data: weatherData, isLoading } = useQuery({
    queryKey: ['fetch-last-weather'],
    queryFn: async () => {
      const res = await protectedApi.get('/weather/logs/latest')
      console.log(res.data)
      return res.data
    },
  })

  const results = useQueries({
    queries: [
      {
        queryKey: ['fetch-weather-warnings'],
        queryFn: async () => {
          const res = await protectedApi.get('/weather/insights/warning')
          console.log(res.data)
          return res.data
        },
      },
      {
        queryKey: ['fetch-tendency-insight'],
        queryFn: async () => {
          const res = await protectedApi.get('/weather/insights/tendency')
          console.log(res.data)
          return res.data
        },
      },
      {
        queryKey: ['fetch-day-classification-insight'],
        queryFn: async () => {
          const res = await protectedApi.get(
            '/weather/insights/day-classification'
          )
          console.log(res.data)
          return res.data
        },
      },
    ],
  })

  const [
    { data: weatherWarnings, isLoading: isLoadingWarnings },
    { data: tendencyInsight, isLoading: isLoadingTendency },
    { data: dayClassification, isLoading: isLoadingDayClassification },
  ] = results

  const isLoadingAiQueries =
    isLoadingWarnings || isLoadingTendency || isLoadingDayClassification

  if (isInitializing) return null

  return (
    <div className="min-h-screen w-full py-6">
      {/* CONTAINER CENTRAL */}
      <div className="container mx-auto w-full p-6">
        {/* HEADER */}
        <Header />

        {/* */}
        <main className="mt-6 space-y-6">
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <WeatherMetricCard
              icon={<ThermometerIcon size={32} />}
              title={'Temperatura atual'}
              value={
                weatherData?.temperature ? `${weatherData?.temperature}°C` : ''
              }
              isLoading={isLoading}
            />

            <WeatherMetricCard
              icon={<DropletsIcon size={32} />}
              title={'Umidade atual'}
              value={weatherData?.humidity ? `${weatherData?.humidity} %` : ''}
              isLoading={isLoading}
            />

            <WeatherMetricCard
              icon={<WindIcon size={32} />}
              title={'Velocidade do vento'}
              value={
                weatherData?.windSpeed ? `${weatherData?.windSpeed} km/h` : ''
              }
              isLoading={isLoading}
            />

            <WeatherMetricCard
              icon={<CloudyIcon size={32} />}
              title={'Condição Climática'}
              value={
                weatherData?.weatherCondition
                  ? weatherData.weatherCondition
                  : ''
              }
              isLoading={isLoading}
            />
          </section>

          {/* BLOCO DOS INSIGHTS */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InsightCard
              variant="warning"
              title="Alertas"
              isLoading={isLoadingAiQueries}
              description={
                weatherWarnings?.warnings ? weatherWarnings?.warnings : ''
              }
            />
            <InsightCard
              variant="success"
              isLoading={isLoadingAiQueries}
              title={'Tendência do dia'}
              description={
                tendencyInsight?.tendency ? tendencyInsight?.tendency : ''
              }
            />
            <InsightCard
              variant="temperature"
              title="Qualidade do clime"
              description={
                dayClassification?.summary ? dayClassification?.summary : ''
              }
              isLoading={isLoadingAiQueries}
              score={dayClassification?.score ? dayClassification?.score : 0}
            />
          </section>

          {/* GRÁFICOS */}
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="h-80 rounded-xl bg-white/5"></div>
            <div className="h-80 rounded-xl bg-white/5"></div>
          </section>

          {/* TABELA */}
          <section className="h-96 rounded-xl bg-white/5 p-4"></section>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
