export function convertToDate(
  timezone: number,
  dt: number,
  weekdayFormat: "short" | "long",
  locale: string
): string {
  let utc_time = new Date(dt * 1000)
  let local_time = new Date(utc_time.getTime() + timezone * 1000)

  const options = { weekday: weekdayFormat }

  const dateFormatter = new Intl.DateTimeFormat(
    locale === "en" ? "en-US" : "ro-RO",
    options
  )

  return dateFormatter.format(local_time)
}
