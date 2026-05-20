import {Article} from '@/payload-types'
import type { CollectionConfig, FieldHook } from 'payload';
import { convertLexicalToPlaintext } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToPlaintext/sync';

export const generateContentSummaryHook: FieldHook<Article, string> = ({value,data}) => {
    const MAX_SUMMARY_LENGTH = 160; // You can adjust this as needed
    if (value) return value.trim();
    if (!data?.content) return '';
    const text = convertLexicalToPlaintext({data: data?.content}).trim();
    if (!text) return '';
    console.log(text);
    return text.length > MAX_SUMMARY_LENGTH ? text.slice(0, MAX_SUMMARY_LENGTH -3) + '...' : text;
}