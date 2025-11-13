import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "name must be 3 character long").max(20, "user name too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Enter at least 8 characters, with uppercase, lowercase, and a number."
    )
})


export const loginSchema = z.object({
    email: z.string().email("please enter a valid email address"),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Invalid Password"
    ),
})


export const updateSchema = z.object({
    name: z.string().min(3, "name must be 3 character long").max(20, "user name too long"),
    email: z.string().email("please enter a valid email address"),

})

export const productInfoSchema = z.object({
    producttype: z.string().min(5, "product-Type must be 5 character long ").max(12, "product-Type  too long"),
    category: z.string().min(3, "category must be 3 character long ").max(10, "category  too long"),
    subcategory: z.string().min(3, "Subcategory must be 3 character long ").max(10, "Subcategory too long"),
    description: z.string().min(20, " description  must be 30 character long ").max(50, "description  too long"),
    brand: z.string().min(3, "brand name must me 3 character long").max(10, "brand name too  long"),
    productname: z.string().min(3, "Product name must me 3 character long").max(30, "Prductname name too  long")
})


export const vendordetails = z.object({
    name: z.string().min(3, "vendorname must be 3 character long").max(20, "vendoruser name too long"),
    businessName: z.string().min(10, " businessname must be 3 character long").max(40, "businessName too long"),
    contactEmail: z.string().email("Invalid email address"),
    contactPhone: z.string().min(10, "contactPhone cannot be more than 10 character ").max(10, "contactPhone cannot be more than 10 "),
    address: z.object({
        street: z
            .string()
            .min(3, "Street must be at least 3 characters long")
            .max(20, "Street name too long"),

        city: z
            .string()
            .min(3, "City must be at least 3 characters long")
            .max(20, "City name too long"),

        state: z
            .string()
            .min(3, "State must be at least 3 characters long")
            .max(20, "State name too long"),

        country: z
            .string()
            .min(3, "Country must be at least 3 characters long")
            .max(20, "Country name too long"),

        postalCode: z
            .string()
            .min(6, "Postal code must be 6 characters long")
            .max(6, "Postal code must be 6 characters long"),
    }),
    // verified: z.boolean()


})