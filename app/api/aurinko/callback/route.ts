import { exchangeCodeForAccessToken, getAccountDetails } from "@/lib/aurinko/aurinko"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {


    const {userId} = await auth()
    if(!userId) throw new Error("User not authenticated")

        const params = req.nextUrl.searchParams;
        const status = params.get("status");
        if (status !== "success") throw new Error("Authorization failed");


        const code = params.get("code");
        console.log("the code is =>", code)
        if (!code) throw new Error("Code not found");
            const token = await exchangeCodeForAccessToken(code)

if(!token) throw new Error("Failed to exchange code for access token")


const accountDetails = await getAccountDetails(token.accessToken)


await prisma.account.upsert({
    where: { id: token.accountId.toString() },
    update: { accessToken: token.accessToken },
    create: {
      id: token.accountId.toString(),
      userId,
      emailAddress: accountDetails.email,
      name: accountDetails.name,
      accessToken: token.accessToken
    }
  });


    return NextResponse.redirect(new URL("/mail", req.url))

}


