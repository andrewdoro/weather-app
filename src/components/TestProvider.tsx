import React, { ReactNode } from "react"
import { NextIntlClientProvider, useMessages } from "next-intl"

const TestProvider = ({ children }: { children: ReactNode }) => {
  const messages = useMessages()
  return (
    <NextIntlClientProvider locale={"en"} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

export default TestProvider
