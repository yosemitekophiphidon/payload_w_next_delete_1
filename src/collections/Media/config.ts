import type { CollectionConfig } from 'payload'
import { generateBlurDataURL, isEligibleForBlurDataURLWithMimeType } from './lib/generate-blur-data-url';

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
      async ({operation,data, req}) => {
        // if(operation === 'update' && data?.filename !== req.file?.originalname){
          // delete data.filename;
        // }
        if (operation !== 'create' || !req.file) return;
        if (!isEligibleForBlurDataURLWithMimeType(req.file?.mimetype)) return data;
        const base64 = await generateBlurDataURL(req.file?.data, req.file?.mimetype);
        if (base64) {
          data.blurDataURL = base64;
        }
        return data;
      } 
    ]
  }
}
