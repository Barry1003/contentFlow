module.exports=[73895,a=>{"use strict";var b=a.i(37936),c=a.i(66518),d=a.i(5246);async function e(){let a=await (0,d.headers)(),b=await fetch("https://ep-delicate-glade-b4wedf4u.neonauth.c-6.us-east-2.aws.neon.tech/neondb/auth/api/auth/get-session",{headers:{cookie:a.get("cookie")||""}});if(!b.ok)throw Error("Not authenticated");let c=await b.json();if(!c||!c.user)throw Error("Not authenticated");return{id:c.user.id}}async function f(a){try{(await e()).id}catch(a){}try{let b=await c.default.order.create({data:{customerName:a.customerName,customerEmail:a.customerEmail,deliveryAddress:a.deliveryAddress,paymentMethod:a.paymentMethod,totalAmount:a.totalAmount,status:"COMPLETED"}});console.log("Order saved:",b.id)}catch(a){console.error("Error saving order, proceeding with notifications anyway.",a)}return console.log(`[WHATSAPP NOTIFICATION SENT]
To: Seller
Message: New Order from ${a.customerName}! 
Ordered: ${a.productId} ($${a.totalAmount})
Deliver to: ${a.deliveryAddress}
Contact: ${a.customerEmail}
`),console.log(`[EMAIL NOTIFICATION SENT]
To: Seller Email
Subject: New Order Received - ${a.customerName}
Body: You just received a new order for ${a.productId}. 
Delivery address: ${a.deliveryAddress}
`),console.log(`[EMAIL CONFIRMATION SENT]
To: ${a.customerEmail}
Subject: Order Confirmation
Body: Hi ${a.customerName}, thanks for your purchase!
Your order for ${a.productId} is confirmed.
Estimated delivery: 2-3 business days to ${a.deliveryAddress}.
`),{success:!0}}(0,a.i(13095).ensureServerEntryExports)([f]),(0,b.registerServerReference)(f,"405c85b397aa79e9af7a4b9c1efd2930d8b880a767",null),a.s([],94216),a.i(94216),a.s(["405c85b397aa79e9af7a4b9c1efd2930d8b880a767",0,f],73895)}];

//# sourceMappingURL=_next-internal_server_app_checkout_page_actions_1axoeof.js.map