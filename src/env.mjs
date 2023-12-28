import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    OPEN_WEATHER_API_KEY: z.string().min(1),
  },

  runtimeEnv: {
    OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  },
})
