import { prisma } from "@/lib/db/prisma";


export const POST =async (req: Request) => {
    const {data } = await req.json();
    console.log("clerk webhook data recived", data);

    const emailAddress = data?.email_addresses[0].email_address;
    const firstName = data?.first_name;
    const lastname = data?.last_name;
    const imageUrls = data?.image_url;
    const id = data?.id;


    await prisma.user.create({  
        data : {
            id,
            emailAddress:emailAddress,
            firstName:firstName,
            lastName:lastname,
            image:imageUrls
        }
    })
    console.log("user created");
    return new Response("ok", { status: 200 });
}