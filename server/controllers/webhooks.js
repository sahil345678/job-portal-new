import { Webhook } from "svix";
import User from "../models/user.js";

// API controller function to manage the clerk user with database :

export const clerkWebhooks = async(req, res) =>{

  try{

    // Create a svix instance with clerk webhook secret :
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    // Verifying the Headers :
    const event = await whook.verify(JSON.stringify(req.body),{
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    // Getting data from event :
    const { data , type } = event;

    // Switch case for different types :
    switch (type) {
      case "user.created":{

        const userData = {
          _id : data.id,
          email: data.email_addresses[0].email_addresses,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        }
        
        await User.create(userData)
        res.JSON({})
        break;
      }

      case "user.updated":{

        const userData = {
          email: data.email_addresses[0].email_addresses,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        }

        await User.findByIdAndUpdate(data.id, userData)
        res.json({})
        break;
      }

      case "user.deleted":{

        await User.findByIdAndDelete(data.id),
        res.json({})
        break;
      }

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (error){

    console.log(error.message)
    res.json({success:false, message:"Webhooks Error"})
  }
}