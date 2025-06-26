// import { Webhook } from "svix";
// import User from "../models/User.js";
// // import User from "../.."

// // API controller function to manage the clerk user with database :

// export const clerkWebhooks = async(req, res) =>{

//   try{

//     // Create a svix instance with clerk webhook secret :
//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//     // Verifying the Headers :
//     const event = await whook.verify(JSON.stringify(req.body),{
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"]
//     });

//     // Getting data from event :
//     const { data , type } = event;
//     console.log("first", data)

//     // Switch case for different types :
//     switch (type) {
//       case "user.created":{

//         const userData = {
//           _id : data.id,
//           email: data.email_addresses[0].email_address,
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//           resume: ''
//         }
        
//         await User.create(userData)
//         break;
//       }

//       case "user.updated":{

//         const userData = {
//           email: data.email_addresses[0].email_address, // <-- fixed here
//           name: data.first_name + " " + data.last_name,
//           image: data.image_url,
//         }

//         await User.findByIdAndUpdate(data.id, userData)
//         break;
//       }

//       case "user.deleted":{

//         await User.findByIdAndDelete(data.id);
//         break;
//       }

//       default:
//         break;
//     }

//     res.status(200).json({ success: true });
//   } catch (error){

//     console.log("jfjf", error)
//     res.json({success:false, message:"Webhooks Error"})
//   }
// }


import { Webhook } from "svix";
import User from "../models/User.js"; // ✅ Case-sensitive

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // ✅ Must be raw buffer
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    // ✅ Verify the event
    const event = await whook.verify(payload, headers);

    const { data, type } = event;
    console.log("📩 Clerk webhook received:", type, data);

    console.log("➡️  Raw payload:", req.body);
    console.log("➡️  Headers:", req.headers);
    console.log("✅ Is Buffer:", Buffer.isBuffer(req.body));


    switch (type) {
      case "user.created":
        await User.create({
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: ""
        });
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook Error:", error.message);
    return res.status(400).json({ success: false, message: "Webhook error" });
  }
};
