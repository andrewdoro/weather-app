import "@/styles/globals.css"

import { Inter } from "next/font/google"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = useMessages()

  return (
    <html lang={locale}>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
