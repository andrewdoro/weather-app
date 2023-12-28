"use client"

import * as React from "react"

import { Link } from "@/lib/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelect({ locale }: { locale: string }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-12" size="sm">
            {locale}
            <span className="sr-only">ChangeLanguage</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link locale="ro" href="/">
            <DropdownMenuItem>ro</DropdownMenuItem>
          </Link>

          <Link locale="en" href="/">
            <DropdownMenuItem>en</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
