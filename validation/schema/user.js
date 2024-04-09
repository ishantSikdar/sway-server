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
    username: zod.union([
        emailSchema,
        mobileNumberSchema,
        usernameSchema,
    ]).optional().refine(value => value !== undefined, {
        message: "Username is required",
        path: ["username"],
    }),
    password: passwordSchema,
});