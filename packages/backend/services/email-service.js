import Email from "../models/email-model.js";
import { getUsersFromDB } from "./user-service.js";

export async function postEmail(req, res) {
    try {
        const requiredFields = [
            "emailSubject",
            "emailContent",
            "receiver_email",
        ];
        const missingFields = requiredFields.filter(
            (field) => !req.body[field]
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: `Missing required fields: ${missingFields.join(", ")}`,
            });
        }
        console.log("calling post email!");
        // search if receiver_email is valid
        const receiver = await getUsersFromDB(req.body.receiver_email);
        if (receiver.length !== 1) {
            return res.status(404).json({
                error: `Invalid receiver email: ${req.body.receiver_email}. User not found`,
            });
        }
        console.log(req.body);
        const result = await postEmailToDB({
            emailSubject: req.body.emailSubject,
            emailContent: req.body.emailContent,
            sender_id: req.user.userID,
            receiver_id: receiver[0]._id.toString(),
        });

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json(result.data);
    } catch (error) {
        console.error("Error creating email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// actual push to database
async function postEmailToDB(email) {
    try {
        const emailToAdd = new Email(email);
        const savedEmail = await emailToAdd.save();
        return { success: true, data: savedEmail };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// retreive ALL emails
export async function getEmail(req, res) {
    try {
        // get the parameters
        if (!req.query.id) {
            const emails = await getEmailsFromDB(req.user.userID);
            res.status(200).json(emails);
        } else {
            const email = await findEmailFromDB(req.query.id);
            res.status(200).json(email);
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function getEmailsFromDB(user_id) {
    try {
        // return promise
        return await Email.find({
            $or: [{ receiver_id: `${user_id}` }, { sender_id: `${user_id}` }],
        });
    } catch (error) {
        throw error;
    }
}

async function findEmailFromDB(id) {
    try {
        // return promise
        return await Email.find({ _id: `${id}` });
    } catch (error) {
        throw error;
    }
}

export async function updateReadStatus(req, res) {
    try {
        let updatedEmail;
        if (req.query.user == "isReadReceiver") {
            console.log(req.query.user, "for updating status for receiver");

            updatedEmail = await Email.findByIdAndUpdate(
                req.query.id,
                { isReadReceiver: true },
                { new: true }
            );
        } else {
            console.log(req.query.user, "for updating status for sender");
            updatedEmail = await Email.findByIdAndUpdate(
                req.query.id,
                { isReadSender: true },
                { new: true }
            );
        }
        console.log("Successfully updated read status from backend!");
        res.status(200).json(updatedEmail);
    } catch (error) {
        return { success: false, error: error.message };
    }
}

export async function addReplytoEmail(req, res) {
    try {
        // add reply to email
        await Email.findByIdAndUpdate(
            req.query.id,
            {
                $push: { replies: req.body },
            },
            { new: true }
        );
        // retreive all replies
        const allReplies = await Email.findById(req.query.id);
        res.status(200).json(allReplies.replies);
    } catch (error) {
        return { success: false, error: error.message };
    }
}
