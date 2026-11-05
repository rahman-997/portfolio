import Image from "next/image";

/** The approved HAJAR abstract signature: two folds, no initials. */
export default function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <Image
      src="/brand/hajar-mark.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
    />
  );
}
