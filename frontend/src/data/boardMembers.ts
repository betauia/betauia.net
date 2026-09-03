import type { ImageMetadata } from "astro";
import { useTranslations } from "@i18n/utils.ts";

export interface BoardMember {
  position: string;
  name: string;
  linkedin?: string;
  github?: string;
  photo?: ImageMetadata;
  bio?: string;
}

export interface BoardYear {
  members: BoardMember[];
  groupPhoto?: ImageMetadata;
}

export function boardData(lang?: string):  Record<string, BoardYear> {
  const t = useTranslations(lang);

  return {
    "2025": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Jakob Moen Bekken",
          linkedin: "https://linkedin.com/in/jakob-moen-bekken-52643927a",
          github: "https://github.com/jakobbekken",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Oscar Gran Fehn",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Benjamin Nylund",
        },
        {
          position: t("page.board.profile.roles.prManager"),
          name: "Lars Høydahl Ohme",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Andreas Røberg Beitnes",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Vetle Andreas Tysland",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Albert Salvesen-Orø",
        },
        {
          position: t("page.board.profile.roles.betaDevLeader"),
          name: "Morten Andreas Myrstad",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Magnus Johannessen",
        },
      ],
      groupPhoto: undefined,
    },
    "2024": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Sindre Thomas Lorentsen",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Jakob Moen Bekken",
          linkedin: "https://linkedin.com/in/jakob-moen-bekken-52643927a",
          github: "https://github.com/jakobbekken",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Benjamin Nylund",
        },
        {
          position: t("page.board.profile.roles.prManager"),
          name: "Thomas Joon Hetland",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Ole-Johan Øvreås",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Alexander Ruud",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Albert Salvesen-Orø",
        },
        {
          position: t("page.board.profile.roles.betaDevLeader"),
          name: "Ask Sødal",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Thomas McFarlane",
        },
      ],
      groupPhoto: undefined,
    },
    "2023": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Patrik Karlsen",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Andreas Holme Ulvig",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Elyas Jama",
        },
        {
          position: t("page.board.profile.roles.prManager"),
          name: "Steffen Magnussen",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Ole-Johan Øvreås",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Abraham Kohr",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Mathias René Juelsen-Jacobsen",
        },
        {
          position: t("page.board.profile.roles.betaDevLeader"),
          name: "Sigurd Holme Ulvig",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Thomas McFarlane",
        },
      ],
      groupPhoto: undefined,
    },
    "2022": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Patrik Karlsen",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Andreas Holme Ulvig",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Frode Andre Bogetveit Hitland",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Marija Kontstantinovna Bravikova",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Skage Graasvold Bjørkevoll",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Sigurd Holme Ulvig",
        },
        {
          position: t("page.board.profile.roles.betaDevLeader"),
          name: "Håkon Mikaelsen",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Bendik Egenes Dyrli",
        },
      ],
      groupPhoto: undefined,
    },
    "2021": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Theodor Middleton",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Ingrid Louise Husevåg-Kristensen",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Trai Paul Nguyen",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Vegar Kristoffer Kvammen",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Patrick Karlsen",
        },
        {
          position: t("page.board.profile.roles.betaDevLeader"),
          name: "Ferdinand Gumø Løberg",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Bendik Egenes Dyrli",
        },
      ],
      groupPhoto: undefined,
    },
    "2020": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Anders Godstad",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Theodor Middleton",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Vinh Vu",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Ingrid Husevåg-Kristensen",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Jon Inntveit",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Adrian Risholm",
        },
        {
          position: t("page.board.profile.roles.betaSecLeader"),
          name: "Even Eilertsen",
        },
      ],
      groupPhoto: undefined,
    },
    "2019": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Kristoffer Solli",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Even Eilertsen",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Christer Mathisen",
        },
        {
          position: t("page.board.profile.roles.businessCommitteeLeader"),
          name: "Aslak Frafjord Skailand",
        },
        {
          position: t("page.board.profile.roles.eventCommitteeLeader"),
          name: "Martin Bråten",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Mattias Alexander Coelho",
        },
      ],
      groupPhoto: undefined,
    },
    "2018": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Even Eilertsen",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Kristoffer Solli",
        },
        {
          position: t("page.board.profile.roles.eventManager"),
          name: "Samuel Ogbai Habte",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Hans Lau Borch",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Kreshan Thangasamy",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Martin Bråten",
        },
      ],
      groupPhoto: undefined,
    },
    "2017": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Marius Bjørni",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Olav Markus Sjursø",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Martin Bråten",
        },
        {
          position: t("page.board.profile.roles.prWebManager"),
          name: "Vebjørn Nystad",
        },
        {
          position: t("page.board.profile.roles.eventManager"),
          name: "Espen Kalhagen",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Hans Lau Borch",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Vetle Ørstavik Hollund",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Christian Trinh",
        },
      ],
      groupPhoto: undefined,
    },
    "2016": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Marius Bjørni",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Shahab Afsharipour",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Mohamed Samatar",
        },
        {
          position: t("page.board.profile.roles.prManager"),
          name: "Tommy Johannessen",
        },
        {
          position: t("page.board.profile.roles.eventManager"),
          name: "Celine Abigael Tomren",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Hans Lau Borch",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Siri Dybdahl",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Christer Mathisen",
        },
      ],
      groupPhoto: undefined,
    },
    "2015": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Anders Refsdal Olsen",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Knut Eivind Sandsmark",
        },
        {
          position: t("page.board.profile.roles.financeAndMaterialManager"),
          name: "Ørjan Solli",
        },
        {
          position: t("page.board.profile.roles.prWebManager"),
          name: "John Føreland",
        },
        {
          position: t("page.board.profile.roles.eventManager"),
          name: "Sahand Johansen",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Martin Abrahamsen",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Jonathan Luu",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Mohamed Samatar",
        },
      ],
      groupPhoto: undefined,
    },
    "2014": {
      members: [
        {
          position: t("page.board.profile.roles.leader"),
          name: "Anders Refsdal Olsen",
        },
        {
          position: t("page.board.profile.roles.deputyLeader"),
          name: "Shahab Afsharipour",
        },
        {
          position: t("page.board.profile.roles.financeManager"),
          name: "Huy Quy Vu",
        },
        {
          position: t("page.board.profile.roles.prManager"),
          name: "Tommy Johannessen",
        },
        {
          position: t("page.board.profile.roles.graphicDesigner"),
          name: "Kim-Leonhard Halvorsen",
        },
        {
          position: t("page.board.profile.roles.eventManager"),
          name: "Nina Over",
        },
        {
          position: t("page.board.profile.roles.betaLanLeader"),
          name: "Martin Abrahamsen",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Knut Eivind Sandsmark",
        },
        {
          position: t("page.board.profile.roles.boardMember"),
          name: "Malene Danielsen",
        },
      ],
      groupPhoto: undefined,
    },
  };
}

export const availableYears = Object.keys(boardData());
