import betaBase from "@assets/logos/beta/base.svg";
import betaBlack from "@assets/logos/beta/black.png";
import betaBlue from "@assets/logos/beta/blue.png";
import betaWhite from "@assets/logos/beta/white.png";
import betaIcon from "@assets/logos/beta/icon.jpg";

import betadevBase from "@assets/logos/betadev/base.svg";
import betadevBlack from "@assets/logos/betadev/black.png";
import betadevBlue from "@assets/logos/betadev/blue.png";
import betadevWhite from "@assets/logos/betadev/white.png";

import betasecBase from "@assets/logos/betasec/base.svg";
import betasecBlack from "@assets/logos/betasec/black.png";
import betasecBlue from "@assets/logos/betasec/blue.png";
import betasecWhite from "@assets/logos/betasec/white.png";

import betalanBase from "@assets/logos/betalan/base.svg";
import betalanBlack from "@assets/logos/betalan/black.png";
import betalanBlue from "@assets/logos/betalan/blue.png";
import betalanWhite from "@assets/logos/betalan/white.png";

import bedkomBase from "@assets/logos/bedkom/base.svg";
import bedkomBlack from "@assets/logos/bedkom/black.png";
import bedkomBlue from "@assets/logos/bedkom/blue.png";
import bedkomWhite from "@assets/logos/bedkom/white.png";

import eventkomBase from "@assets/logos/bedkom/base.svg";
import eventkomBlack from "@assets/logos/bedkom/black.png";
import eventkomBlue from "@assets/logos/bedkom/blue.png";
import eventkomWhite from "@assets/logos/bedkom/white.png";

export const logos = {
  beta: {
    name: "beta",
    base: betaBase,
    black: betaBlack,
    blue: betaBlue,
    white: betaWhite,
    icon: betaIcon,
  },
  betadev: {
    name: "betadev",
    base: betadevBase,
    black: betadevBlack,
    blue: betadevBlue,
    white: betadevWhite,
  },
  betasec: {
    name: "betasec",
    base: betasecBase,
    black: betasecBlack,
    blue: betasecBlue,
    white: betasecWhite,
  },
  betalan: {
    name: "betalan",
    base: betalanBase,
    black: betalanBlack,
    blue: betalanBlue,
    white: betalanWhite,
  },
  bedkom: {
    name: "bedkom",
    base: bedkomBase,
    black: bedkomBlack,
    blue: bedkomBlue,
    white: bedkomWhite,
  },
  eventkom: {
    name: "eventkom",
    base: eventkomBase,
    black: eventkomBlack,
    blue: eventkomBlue,
    white: eventkomWhite,
  },
} as const;

export const brandingColors = [
  {
    name: "Background",
    description:
      "Grunnfarge for bakgrunner som rammer inn innhold, som sider, seksjoner og sidepaneler.",
    light: "#F2F2F6",
    dark: "#0F151F",
  },
  {
    name: "Raised",
    description: "Bakgrunner som ligger over base, for eksempel kort, bokser og felt.",
    light: "#EAEAEF",
    dark: "#151E2D",
  },
  {
    name: "Foreground",
    description: "Hovedfarge for tekst og annet viktig innhold.",
    light: "#242424",
    dark: "#FDFDFD",
  },
  {
    name: "Muted",
    description: "Nedtonet tekstfarge for mindre viktig informasjon.",
    light: "#425269",
    dark: "#A1B1D1",
  },
  {
    name: "Aksent (primær)",
    description: "Hovedaksent brukt til knapper, lenker og viktige markeringer.",
    light: "#0085FF",
    dark: "#0085FF",
  },
  {
    name: "Aksent (sekundær)",
    description: "Sekundær aksent brukt sparsomt for variasjon og detaljer.",
    light: "#14B8A6",
    dark: "#14B8A6",
  },
];
