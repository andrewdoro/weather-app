import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NEXT_PUBLIC_OPEN_WEATHER_API_KEY: z.string().min(1),
  },

  runtimeEnv: {
    NEXT_PUBLIC_OPEN_WEATHER_API_KEY:
      process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY,
  },
})
