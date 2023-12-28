import React from "react"

import { City } from "@/lib/types"

import { env } from "../../env.mjs"
import HourlyForecast from "./hourly-forecast"

const ForecastDays = async ({ city }: { city: City }) => {
  const forecast = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&cnt=5&appid=${env.OPEN_WEATHER_API_KEY}`
  ).then((res) => res.json())

  return <HourlyForecast data={forecast.list} />
}

export default ForecastDays
