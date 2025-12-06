import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 20,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    image: {
        type: String,
        default: "https://placehold.co/600x400.png",
        password: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            require: true,
        }
    }
},
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);