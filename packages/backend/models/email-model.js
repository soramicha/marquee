import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema(
    {
        emailSubject: {
            type: String,
            required: true,
            trim: true,
        },
        emailContent: {
            type: String,
            required: true,
            trim: true,
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isReadSender: {
            type: Boolean,
            default: true, // all emails by sender are read by default
        },
        isReadReceiver: {
            type: Boolean,
            default: false, // all emails aren't read yet by default
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        // create an array of replies
        replies: [
            {
                sender_username: { type: String, required: true },
                message: { type: String, required: true },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    immutable: true,
                },
            },
        ],
    },
    {
        collection: "emails",
        timestamps: true,
    }
);

const Email = mongoose.model("Email", EmailSchema);

export default Email;
