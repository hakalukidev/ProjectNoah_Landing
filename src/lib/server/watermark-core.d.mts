/** Types for the plain-ESM watermark compositor in ./watermark-core.mjs. */
export declare function watermarkBuffer(
  input: Buffer,
  options: { logoPath: string; brandName: string; phone: string }
): Promise<{ buffer: Buffer; width: number; height: number }>;
