import { wait } from 'payload/shared';
import { ArticleCard } from './_components/article-card';
import { getPublishedArticles } from '@/collections/Articles/fetchers';
import { Media } from '@/payload-types';
import { Author } from 'next/dist/lib/metadata/types/metadata-types';


function relationIsObject<T>(relation: number | T): relation is T {
    return typeof relation !== 'number';
}


export default async function BlogIndexPage(){
    // console.log('published@: ', new Date('2025-11-13T20:45:00'))

    await wait(2000)

    const articles = await getPublishedArticles();
    console.log('articles',articles)

    if (!articles.length){
        return <p>No articles found</p>
    }


    return(
        <div className ="grid grid-cols-3 gap-4 w-full">
            {articles.map(
                ({id, title, slug, contentSummary, coverImage, author, readTimeInMins, publishedAt}) => {
                    if (!relationIsObject(coverImage)) return null;
                    if (!relationIsObject(author) || !relationIsObject(author.avatar))  return null;


                    return (
                        <ArticleCard
                            key = {id}
                            href={`/blog/${slug}`}
                            title={title}
                            summary = {contentSummary}
                            coverImage={coverImage}
                            publishedAt = {new Date(publishedAt ?? new Date())}
                            readTimeMins = {readTimeInMins ?? 0}
                            author = {{
                                avatar: author.avatar,
                                name: author.name,
                                role: author.role,
                            }}
                    />
                )
            })}
        </div>
    )
}