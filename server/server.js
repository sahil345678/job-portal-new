import "./config/instrument.js"
import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import * as Sentry from "@sentry/node"
import { clerkWebhooks } from "./controllers/webhooks.js"
import connectCloudinary from "./config/cloudinary.js"
import companyRoutes from "./routes/companyRoutes.js"; // ye hatana hai agar mahi chala 
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { clerkMiddleware } from '@clerk/express'; // ✅ correct for v1.7.2






// initialize the expres :
const app = express()

// Connect to the database :
await connectDB()
await connectCloudinary()

// middlewares :
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware());




// routes :
app.get('/',(req,res)=> res.send("API WORKING"))
app.get("/debug-sentry", function mainHandler(req,res) {
  throw new Error("My first Sentry error!");
})
app.post('/webhooks',clerkWebhooks)
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)

// PORT :
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

//
app.listen(PORT,()=>{
  console.log(`Server is runnign on port ${PORT}`);
})


