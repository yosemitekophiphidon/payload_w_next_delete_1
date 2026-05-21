import type { Buffer } from "node:buffer";
import { getPlaiceholder } from "plaiceholder";


export function isEligibleForBlurDataURL(file: Buffer): boolean {
  const fileSignature = file.slice(0, 4).toString("hex").toUpperCase();
  const eligibleSignatures = ["89504E47", "FFD8FFDB", "FFD8FFE0", "FFD8FFE1"];
  return eligibleSignatures.includes(fileSignature);
}

export function isEligibleForBlurDataURLWithMimeType(mimeType: string): boolean {
  const eligibleMimeTypes = ["image/png", "image/jpeg"];
  return eligibleMimeTypes.includes(mimeType);
}

export async function generateBlurDataURL(file: Buffer, mimeType: string): Promise<string | null> {
    //   if (!isEligibleForBlurDataURL(file) || !isEligibleForBlurDataURLWithMimeType(mimeType)) {
    //     throw new Error("File is not eligible for blurDataURL generation.");
    //   }
    //     const base64Data = file.toString("base64");
    //     return `data:${mimeType};base64,${base64Data}`;

    if (!file){
        console.warn("No file buffer provided for blurDataURL generation.");
        return null;
    }
    const { base64 } = await getPlaiceholder(file, { size: 10 });
    return base64 ? base64 : null;
}