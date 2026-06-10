import { getPayloadClient } from "@/lib/payload/client";
import { CACHE_TAG_ARTICLES, STATUS_OPTIONS } from "./constants";
import { unstable_cache } from "next/cache";

export async function _getPublishedArticles(){
    const payload = await getPayloadClient();
    try{
        const {docs: articles} = await payload.find({
            collection: 'articles',
            where: {
                status: {
                    equals: STATUS_OPTIONS.PUBLISHED,
                },
            },
            select: {
                slug: true,
                title: true,
                constentSummary: true,
                author: true,
                status: true,
                readTimeInMins: true,
                publishedAt: true,
                coverImage: true,
            },
        })
        return articles ?? []
    } catch (error) {
        console.error("Failed to fetch articles", error)
        return []
    }
}

export function getPublishedArticles(){
    return unstable_cache(_getPublishedArticles, [],{
        tags: ['cms:global', CACHE_TAG_ARTICLES]
    })()
}