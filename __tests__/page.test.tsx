import { render, screen } from "@testing-library/react"
import { beforeEach, expect, test, vi } from "vitest"

import TestProvider from "@/components/TestProvider"
import { CityCommand } from "@/components/weather/city-command"
import CurrentWeather from "@/components/weather/current-weather"

import { message } from "./message"

vi.mock("next/navigation", () => {
  const actual = vi.importActual("next/navigation")
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  }
})

vi.mock("next-intl", async (importOriginal) => {
  const mod = (await importOriginal()) as any
  return {
    ...mod,
    useMessages: vi.fn(() => message),
  }
})

test("Page", () => {
  render(
    <TestProvider>
      <CityCommand locale="en" />
    </TestProvider>
  )
  expect(screen.getByRole("button")).toBeDefined()
})

test("Page", async () => {
  render(
    <CurrentWeather
      city={{
        name: "Cluj-Napoca",
        local_names: {
          en: "Cluj-Napoca",
          ro: "Cluj-Napoca",
        },
        lat: 46.769379,
        lon: 23.5899542,
        country: "RO",
      }}
      data={{
        coord: { lon: 23.59, lat: 46.7694 },
        weather: [
          { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
        ],
        base: "stations",
        main: {
          temp: -6.23,
          feels_like: -8.94,
          temp_min: -6.34,
          temp_max: -6.23,
          pressure: 1009,
          humidity: 86,
        },
        visibility: 10000,
        //@ts-ignore
        wind: {
          speed: 1.54,
          deg: 260,
        },
        clouds: { all: 0 },
        dt: 1705220765,
        sys: {
          //@ts-ignore
          type: 1,
          id: 6913,
          country: "RO",
          sunrise: 1705212428,
          sunset: 1705244477,
        },
        timezone: 7200,
        id: 681290,
        name: "Cluj-Napoca",
        cod: 200,
      }}
      timezone={7200}
      locale="en"
    />
  )
  expect(screen.getByText("Sunday")).toBeDefined()
  expect(screen.getByText("Cluj-Napoca")).toBeDefined()
})
