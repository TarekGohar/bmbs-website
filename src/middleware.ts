import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const supportedLocales = ["en", "fr"]
const defaultLocale = "end"


export default async function middleware(request: NextRequest) {
  const handleI18Nrouting = createMiddleware({
    // A list of all locales that are supported
    locales: ["en", "fr"],
  
    // Used when no locale matches
    defaultLocale: "en",
  });

  const response = handleI18Nrouting(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*"],
};
