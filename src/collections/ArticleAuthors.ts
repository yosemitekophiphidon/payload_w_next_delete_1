import { CollectionConfig } from "payload";

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                {value:'staff writer', label: 'Staff Writer'},
                {value:'contributor', label: 'Contributor'},
                {value:'guest author', label: 'Guest Author'}, 
                {value:'editor', label: 'Editor'},
            ],
            defaultValue: 'staff writer',
            required: true,
        },
    ]
}