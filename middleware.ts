import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();


  // Protected routes
  const protectedRoutes = [
    "/add-product",
    "/dashboard",
    "/inventory",
    "/settings",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );


  if (!user && isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/sign-in", request.url)
    );
  }


  return response;
}


export const config = {
  matcher: [
    "/add-product/.path",
    "/dashboard/:path*",
    "/inventory/:path*",
    "/settings/:path*",
  ],
};