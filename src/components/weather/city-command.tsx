"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "../ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"

const defaultCities = [
  {
    name: "Cluj-Napoca",
    local_names: {
      en: "Cluj-Napoca",
      ro: "Cluj-Napoca",
    },
    lat: 46.769379,
    lon: 23.5899542,
    country: "RO",
  },
  {
    name: "Bucharest",
    local_names: {
      en: "Bucharest",
      ro: "București",
    },
    lat: 44.4361414,
    lon: 26.1027202,
    country: "RO",
  },
  {
    name: "Craiova",
    local_names: {
      en: "Craiova",
      ro: "Craiova",
    },
    lat: 44.3190159,
    lon: 23.7965614,
    country: "RO",
  },
]

export function CityCommand({ locale }: { locale: "en" | "ro" }) {
  const [inputValue, setInputValue] = useState("")
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("city")

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => setOpen(true)}
        className="h-9  whitespace-nowrap px-4"
      >
        <p className="text-sm text-muted-foreground">
          {t("search")}{" "}
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hover:bg-primary md:ml-28">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          placeholder={t("placeholder")}
        />
        <CommandList>
          <CommandEmpty>{t("no-results")}</CommandEmpty>
          <CommandGroup heading={t("suggestions")}>
            {defaultCities.map((city) => (
              <CommandItem
                key={city.name}
                onSelect={() => {
                  setOpen(false)
                  router.push(
                    `${pathname}?${createQueryString("city", city.name)}`
                  )
                }}
              >
                {city.local_names?.[locale] ?? city.name}
              </CommandItem>
            ))}
          </CommandGroup>
          {inputValue.length > 0 && (
            <CommandGroup heading={t("custom")}>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  router.push(
                    `${pathname}?${createQueryString("city", inputValue)}`
                  )
                }}
              >
                {inputValue}
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
