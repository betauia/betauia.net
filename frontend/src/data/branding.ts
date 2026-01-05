import BetaLogo from "@assets/logos/Beta.svg";
import BetaIcon from "@assets/logos/BetaIcon.jpg";

interface ImageDownloadItem {
  name: string;
  variations: VariationItem[];
}

interface VariationItem {
  variation: string;
  fileType: string;
  image: ImageMetadata;
}

// accent "0085ff" "14B8A6"

// fg "242424" "FDFDFD"
// muted "425269" "A1B1D1"

// bg "F2F2F6" "0F151F"
// raised "425269" "A1B1D1"

export const imageDownloadItems: ImageDownloadItem[] = [
  {
    name: "beta-icon",
    variations: [{ variation: "base", fileType: "jpg", image: BetaIcon }],
  },
  {
    name: "beta-logo",
    variations: [
      { variation: "base", fileType: "svg", image: BetaLogo },
      { variation: "base", fileType: "svg", image: BetaLogo },
    ],
  },
];
