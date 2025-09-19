import type { Pdf } from "@lib/types/models";

export interface BannerProps {
  text: string;
  link: string;
  buttonText?: string;
}
export interface SortListProps {
  files: Pdf[];
}
