import { Metadata } from "next"
import { DatabaseIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { env } from "@/env.mjs"
import { LanguageSelect } from "@/components/language-select"
import { ModeToggle } from "@/components/mode-toggle"
import AirPollution from "@/components/weather/air-pollution"
import { CityCommand } from "@/components/weather/city-command"
import CurrentWeather from "@/components/weather/current-weather"
import FiveDaysForecast from "@/components/weather/five-day-forcast"
import ForecastDays from "@/components/weather/forecast-days"

export const revalidate = 60 * 60 * 24
const defaultCity = "Cluj-Napoca"

export async function generateMetadata({
  searchParams,
  params,
}: {
  searchParams: { city: string }
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "metadata",
  })
  const city = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${
      searchParams.city ?? "Cluj-Napoca"
    }&limit=5&appid=${env.OPEN_WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => res[0])

  return {
    title: `${city.name} - ${t("title")}`,
    description: `${city.name}  - ${t("description")}`,
  }
}

export default async function Home({
  searchParams,
  params,
}: {
  searchParams: { city: string }
  params: { locale: string }
}) {
  const data = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${
      searchParams.city ?? "Cluj-Napoca"
    }&limit=5&appid=${env.OPEN_WEATHER_API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => res[0])
  const currentWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&lang=${params.locale}&units=metric&appid=${env.OPEN_WEATHER_API_KEY}`
  ).then((res) => res.json())

  const t = await getTranslations("footer")
  return (
    <main className="mx-auto flex h-screen w-full max-w-5xl flex-col gap-4 px-4 py-6">
      <div className="flex w-full justify-end gap-2">
        <CityCommand locale={params.locale as "en" | "ro"} />
        <ModeToggle />
        <LanguageSelect locale={params.locale} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <CurrentWeather
          locale={params.locale}
          data={currentWeather}
          city={data}
          timezone={currentWeather.timezone}
        />
        <div className="col-span-2 flex w-full  flex-col gap-4">
          <ForecastDays city={data} />
          <AirPollution city={data} />
        </div>
        <FiveDaysForecast locale={params.locale} city={data} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <DatabaseIcon className="h-4 w-4" />
        <p className="items-center text-sm text-muted-foreground">
          {t("from")} <span className="font-semibold">Open Weather</span>
        </p>
      </div>
    </main>
  )
}
