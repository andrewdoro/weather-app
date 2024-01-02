"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import { Link } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelect({ locale }: { locale: string }) {
  const t = useTranslations()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-12" size="sm">
            {locale}
            <span className="sr-only">{t("lang.toggle")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link locale="en" href="/">
            <DropdownMenuItem>{t("lang.en")}</DropdownMenuItem>
          </Link>
          <Link locale="ro" href="/">
            <DropdownMenuItem>{t("lang.ro")}</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
