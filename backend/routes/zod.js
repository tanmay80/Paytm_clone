const zod=require('zod');

const signupSchema= zod.object({
    userName: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
})

const signinSchema= zod.object({
    userName: zod.string(),
    password: zod.string(),
})

const updateSchema=zod.object({
    userName:zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional(),
})

module.exports={
    signupSchema,
    signinSchema,
    updateSchema,
}