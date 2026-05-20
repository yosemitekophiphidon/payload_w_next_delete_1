import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'blurDataURL',
      type: 'text',
      required: true,
       admin: {
        // readOnly: true,
        hidden: true,
      },
    }
  ],
  upload: true,
  hooks: {
    beforeChange: [
      ({operation,data, req}) => {
        // if(operation === 'update' && data?.filename !== req.file?.originalname){
          // delete data.filename;
        // }
      } 
    ]
  }
}
