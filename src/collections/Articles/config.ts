import {Article} from '@/payload-types'
import type { CollectionConfig, FieldHook } from 'payload';
import { slugify } from 'payload/shared';
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext';
import { generateSlugHook } from './hooks/generate-slug.hook';
import { generateContentSummaryHook } from './hooks/generate-content-summary.hook';
import { STATUS_OPTIONS } from './constants';

// fields
// - title
// - slug (unique, URL-friendly identifier)
// - content (rich text, WYSIWYG editor )
// - content_summary (auto-generated from content- for SEO and article cards)
// - read_time_in_mins (auto-generated from content)
// - coverImage (relationship to media collection)
// - author (relationship to users collection)
// - status (draft, published, archived)
// - publishedAt (date and time when the article was published) (only visible when status is published)
// - tags (array of strings for categorization and searchability)




export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [
                    generateSlugHook,
                ]
            }
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: {
                beforeValidate: [
                    generateContentSummaryHook,
                ],
            }
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
             hooks: {
                beforeChange: [
                    ({siblingData}) => {
                        delete siblingData.readTimeInMins;
                    }
                ],
                afterRead: [
                    ({data}) => {
                        const text = convertLexicalToPlaintext({data: data?.content});
                        const wordsPerMinute = 200; // Average reading speed
                        const wordCount = text.split(/\s+/).length;
                        const readTime = Math.ceil(wordCount / wordsPerMinute);
                        return Math.max(readTime, 1); // Ensure at least 1 minute;
                    }
                ]
             }
        },
        {
            name: 'coverImage',
            type: 'relationship',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'article-authors',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            options: Object.values(STATUS_OPTIONS),
            // options: [
            //     {value: 'draft', label: 'Draft'},
            //     {value: 'published', label: 'Published'},
            // ],
            required: true,
            defaultValue: STATUS_OPTIONS.DRAFT,
        },{
            name: 'publishedAt',
            type: 'date',
            required: true,
            admin: {
                condition: (data) => data?.status === 'published',
                date: {
                    displayFormat: 'MMMM Do YYYY, h:mm:ss a',
                    // timeIntervals: 15,
                    pickerAppearance: 'dayAndTime',
                }
            },

        }
    ]
}
// function extractTextFromRichText(content: { [k: string]: unknown; root: { type: string; children: { type: any; version: number;[k: string]: unknown; }[]; direction: ("ltr" | "rtl") | null; format: "left" | "start" | "center" | "right" | "end" | "justify" | ""; indent: number; version: number; }; }) {
//     throw new Error('Function not implemented.');
// }

