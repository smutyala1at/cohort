const zod = require("zod");

const SignupSchemaValidation = zod.object({
    firstName: zod
                .string({required_error: "First name is required"})
                .min(3, {message: "First name must contain at least 3 characters"}),
    lastName: zod
                .string({required_error: "Last name is required"})
                .min(3, {message: "Last name must contain at least 3 characters"}),
    email: zod
            .string({required_error: "Email is required"})
            .email({ message: "Invalid email address" })
            .min(8, {message: "Email must be at least 8 characters long"})
            .max(100, {message: "Email length cannot exceed 100 characters"}),
    password: zod
                .string({required_error: "Password is required"})
                .min(8, {message: "Password must contain at least 8 characters"})
                .max(50, {message: "Password length cannot exceed 50 characters"})
                .refine(password => /[A-Z]/.test(password), {message: "Password must contain at least one uppercase letter"})
                .refine(password => /[a-z]/.test(password), {message: "Password must contain at least one lowercase letter"})
                .refine(password => /[0-9]/.test(password), {message: "Password must contain at least one number"})
                .refine(password => /[^\w\s]/.test(password), {message: "Password must contain at least one special character"})
}).strict({message: "Unknown parameters have been passed"})


const SigninSchemaValidation = SignupSchemaValidation.partial({
    firstName: true,
    lastName: true
}).strict({message: "Unknown parameters have been passed"})

module.exports = {
    SignupSchemaValidation,
    SigninSchemaValidation
}