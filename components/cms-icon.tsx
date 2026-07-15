"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import type { LucideProps } from "lucide-react";
import { normalizeIconName, getLegacyIconMap } from "@/lib/icon";

export type CmsIconProps = {
  name?: string | null;
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
  decorative?: boolean;
  "aria-label"?: string;
};

export function CmsIcon({
  name,
  size = 24,
  className,
  color,
  strokeWidth,
  decorative = true,
  "aria-label": ariaLabel,
  ...rest
}: CmsIconProps & Omit<LucideProps, "ref" | "name" | "size" | "color" | "className" | "strokeWidth">) {
  let iconName = normalizeIconName(name);

  if (!iconName) {
    return null;
  }

  const legacyMap = getLegacyIconMap();
  if (legacyMap[iconName]) {
    iconName = legacyMap[iconName] as string;
  }

  return (
    <DynamicIcon
      name={iconName as never}
      size={size}
      className={className}
      color={color}
      strokeWidth={strokeWidth}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? ariaLabel : undefined}
      role={decorative ? "presentation" : "img"}
      {...rest}
    />
  );
}
