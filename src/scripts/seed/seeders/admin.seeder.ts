import { getPayload } from "payload";
import config from '@/payload.config';
import { isDuplicateError } from "../lib/is-duplicate-error";
import { env } from "@/lib/env";
// --------------------------

const email: string = ''
const password: string = ''
if (!email || !email.trim().length || !email.includes('@') || !password || password.trim().length < 8)


export async function seedAdmin(){
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    const payload = await getPayload({config});
    try {
        const response = await payload.create({
            collection: 'users',
            data: {
                email: env.ADMIN_EMAIL,
                password: env.ADMIN_PASSWORD,
            },
        })
        console.log('Admin user created: ', response);
        return response;
    } catch (error) {
        if (isDuplicateError(error,"email")) {
            console.log("Admin user already exists")
        } else {
            console.error('Error seeding admin user: ',JSON.stringify(error, null,2));
        }
    }
}