/* eslint-disable @next/next/no-img-element */

/**
 * Swap'n'Serve organisation mark. The brand's own asset, used as identity, not
 * as a UI signal. Drop the file at public/swapnserve-logo.png. If it is absent
 * the image simply does not render; nothing else breaks.
 */
export function Logo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/swapnserve-logo.png"
      alt="Swap'n'Serve"
      width={size}
      height={size}
      className={`rounded-[6px] ${className}`}
      style={{ width: size, height: size, objectFit: "cover" }}
    />
  );
}
