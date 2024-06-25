const zod = require("zod");

exports.nameSchema = zod.string({
    invalid_type_error: "name must be a string",
    required_error: "name is required"
});

exports.usernameSchema = zod.string({
    invalid_type_error: "username must be a string",
    required_error: "username is required"
});

exports.emailSchema = zod.string({
    invalid_type_error: "email must be a string",
    required_error: "email is required"
}).email({ message: "Invalid email address" });

exports.passwordSchema = zod.string({
    invalid_type_error: "password must be a string",
    required_error: "password is required"
}).min(8, "Password must be of 8 or more characters");

exports.mobileNumberSchema = zod.string({
    invalid_type_error: "mobile must be a string",
    required_error: "mobile is required"
}).length(10, "Mobile number must be of 10 digits");

exports.objectIdSchema = zod.string()
    .refine((id) => /^[0-9a-fA-F]{24}$/.test(id), {
        message: "Invalid BSON ObjectId",
    })