const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    equityBalance: Number, // free cash
    marginUsed: Number,
    holdings: [
        {
            type: Schema.Types.ObjectId,
            ref: "holdings"
        }
    ]
    ,
    positions: [{
        type: Schema.Types.ObjectId,
        ref: "positions"
    }]
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = model("user", UserSchema);