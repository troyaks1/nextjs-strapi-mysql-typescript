import Image from "next/image";
import { getStrapiMedia } from "@/lib/utils/strapi";

interface StrapiImageProps {
  src: string | null;
  alt: string;
  height: number;
  width: number;
  className?: string;
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
}: Readonly<StrapiImageProps>) {
  console.dir("Source image path: ", src);
  const imageUrl = getStrapiMedia(src);
  const imageFallback = `https://placehold.co/${width}x${height}`;
  const finalUrl = imageUrl ?? imageFallback;
  console.dir("Final Image URL: ", finalUrl)
  return (
    <Image
      src={finalUrl}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}