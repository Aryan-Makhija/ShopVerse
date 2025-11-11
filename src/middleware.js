// export const middleware = (request) => {
//     if (request.cookies.get("admintoken")) {
//         if (request.nextUrl.pathname === "/AdminLogin" || request.nextUrl.pathname === "/AdminSignup") {
//             return Response.redirect(new URL("/DashBoard", request.nextUrl.origin))
//         } else if (request.nextUrl.pathname === "/DashBoard") {
//             return Response.redirect(new URL("/AdminLogin", request.nextUrl.origin))
//         }
//     }
// }

// export const config = {
//     matcher: ["/AdminLogin", "/AdminSingup", "/DashBoard"]
// }

import { NextResponse } from "next/server";
import { ur } from "zod/v4/locales";

export const middleware = (request) => {
    const token = request.cookies.get("admintoken");
    const usertoken = request.cookies.get("token")
    const { pathname } = request.nextUrl;

    // If no token and trying to access /DashBoard => Redirect to /AdminLogin
    if (!token && pathname === "/DashBoard") {
        return NextResponse.redirect(new URL("/AdminLogin", request.url));
    }

    // If token exists and trying to access /AdminLogin or /AdminSignup => Redirect to /DashBoard
    if (token && (pathname === "/AdminLogin" || pathname === "/AdminSignup")) {
        return NextResponse.redirect(new URL("/DashBoard", request.url));
    }

    if (!usertoken && pathname === "/Cart") {
        return NextResponse.redirect(new URL("/UserLogin", request.url))
    }

    if (usertoken && (pathname === "/UserLogin" || pathname === "/UserSignup")) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!usertoken && pathname === "/MyOrders") {
        return NextResponse.redirect(new URL("/UserLogin", request.url))
    }
    if (!usertoken && pathname === "/WishList") {
        return NextResponse.redirect(new URL("/UserLogin", request.url))
    }
    // Allow the request
    return NextResponse.next();
};

export const config = {
    matcher: ["/DashBoard", "/AdminLogin", "/AdminSignup", "/UserLogin", "/UserSignup", "/Cart", "/MyOrders", "/WishList"],
};
