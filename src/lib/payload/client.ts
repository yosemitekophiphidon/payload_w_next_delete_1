import { getPayload, Payload } from "payload";
import config from '@/payload.config';

// export async function getClientPayload(): Promise<Payload> {
//     const payload = await getPayload({config});
//     return payload;
// }

// let payload: Payload | null = null;
let payload: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient(){
    if (!payload) {
        payload = await getPayload({config});
    }   
    return payload;
}

