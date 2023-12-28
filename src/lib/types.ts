export type HourlyForecastData = {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain?: {
    "1h": number
  }
  sys: {
    pod: "d" | "n"
  }
  dt_txt: string
}
export type City = {
  name: string
  local_names: Record<string, string>
  lat: number
  lon: number
  country: string
}

type Coordinates = {
  lon: string
  lat: string
}
export type AirQualityData = {
  dt: number
  main: {
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    co: number // Concentration of CO (Carbon monoxide), μg/m3
    no: number // Concentration of NO (Nitrogen monoxide), μg/m3
    no2: number // Concentration of NO2 (Nitrogen dioxide), μg/m3
    o3: number // Concentration of O3 (Ozone), μg/m3
    so2: number // Concentration of SO2 (Sulphur dioxide), μg/m3
    pm2_5: number // Concentration of PM2.5 (Fine particles matter), μg/m3
    pm10: number // Concentration of PM10 (Coarse particulate matter), μg/m3
    nh3: number // Concentration of NH3 (Ammonia), μg/m3
  }
}

export type AirPollutionResponse = {
  coord: Coordinates
  list: AirQualityData[]
}
