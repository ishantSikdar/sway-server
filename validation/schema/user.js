const zod = require("zod");
const {
    nameSchema,
    usernameSchema,
    emailSchema,
    passwordSchema,
    mobileNumberSchema
} = require("../fields");

exports.signUpSchema = zod.object({
    name: nameSchema,
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    mobile: mobileNumberSchema,
})

exports.signInSchema = zod.object({
    username: usernameSchema,
    password: passwordSchema,
})