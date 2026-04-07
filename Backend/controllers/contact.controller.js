import { sendEmail } from "../utils/sendEmail.js"

export const contactEmail = async(req,res)=>{
    try{
        console.log("req body ", req.body)
        const {ownerEmail, listingName, message}= req.body
        await sendEmail({
            to: ownerEmail,
            subject: `Regarding ${listingName}`,
            text: message
        })
        res.status(200).json({message:"Email sent successfully"})
    }
    catch(error){
        res.status(500).json({message:"Error sending email"})
    }
}
