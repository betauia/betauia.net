import type { ImageMetadata } from "astro";

export interface BoardMember {
  position: string;
  name: string;
  linkedin?: string;
  github?: string;
  photo?: ImageMetadata;
  bio?: string;
}

export interface YearData {
  year: string;
  members: BoardMember[];
  groupPhoto?: ImageMetadata;
}

export interface BoardYear {
  members: BoardMember[];
  groupPhoto?: ImageMetadata;
}

export const boardData: Record<string, BoardYear> = {
  "2025": {
    members: [
      {
        position: "Leder",
        name: "Jakob Moen Bekken",
        linkedin: "https://linkedin.com/in/jakob-moen-bekken-52643927a",
        github: "https://github.com/jakobbekken",
      },
      {
        position: "Nestleder",
        name: "Oscar Gran Fehn",
      },
      {
        position: "Økonomiansvarlig",
        name: "Benjamin Nylund",
      },
      {
        position: "PR-ansvarlig",
        name: "Lars Høydahl Ohme",
      },
      {
        position: "Bedkom leder",
        name: "Andreas Røberg Beitnes",
      },
      {
        position: "Eventkom leder",
        name: "Vetle Andreas Tysland",
      },
      {
        position: "Betalan leder",
        name: "Albert Salvesen-Orø",
      },
      {
        position: "Betadev leder",
        name: "Morten Andreas Myrstad",
      },
      {
        position: "Betasec leder",
        name: "Magnus Johannessen",
      },
    ],
    groupPhoto: undefined,
  },
  "2024": {
    members: [
      {
        position: "Leder",
        name: "Sindre Thomas Lorentsen",
      },
      {
        position: "Nestleder",
        name: "Jakob Moen Bekken",
        linkedin: "https://linkedin.com/in/jakob-moen-bekken-52643927a",
        github: "https://github.com/jakobbekken",
      },
      {
        position: "Økonomiansvarlig",
        name: "Benjamin Nylund",
      },
      {
        position: "PR-ansvarlig",
        name: "Thomas Joon Hetland",
      },
      {
        position: "Bedkom leder",
        name: "Ole-Johan Øvreås",
      },
      {
        position: "Eventkom leder",
        name: "Alexander Ruud",
      },
      {
        position: "Betalan leder",
        name: "Albert Salvesen-Orø",
      },
      {
        position: "Betadev leder",
        name: "Ask Sødal",
      },
      {
        position: "Betasec leder",
        name: "Thomas McFarlane",
      },
    ],
    groupPhoto: undefined,
  },
  "2023": {
    members: [
      {
        position: "Leder",
        name: "Patrik Karlsen",
      },
      {
        position: "Nestleder",
        name: "Andreas Holme Ulvig",
      },
      {
        position: "Økonomiansvarlig",
        name: "Elyas Jama",
      },
      {
        position: "PR-ansvarlig",
        name: "Steffen Magnussen",
      },
      {
        position: "Bedkom leder",
        name: "Ole-Johan Øvreås",
      },
      {
        position: "Eventkom leder",
        name: "Abraham Kohr",
      },
      {
        position: "Betalan leder",
        name: "Mathias René Juelsen-Jacobsen",
      },
      {
        position: "Betadev leder",
        name: "Sigurd Holme Ulvig",
      },
      {
        position: "Betasec leder",
        name: "Thomas McFarlane",
      },
    ],
    groupPhoto: undefined,
  },
  "2022": {
    members: [
      {
        position: "Leder",
        name: "Patrik Karlsen",
      },
      {
        position: "Nestleder",
        name: "Andreas Holme Ulvig",
      },
      {
        position: "Økonomiansvarlig",
        name: "Frode Andre Bogetveit Hitland",
      },
      {
        position: "Bedkom leder",
        name: "Marija Kontstantinovna Bravikova",
      },
      {
        position: "Eventkom leder",
        name: "Skage Graasvold Bjørkevoll",
      },
      {
        position: "Betalan leder",
        name: "Sigurd Holme Ulvig",
      },
      {
        position: "Betadev leder",
        name: "Håkon Mikaelsen",
      },
      {
        position: "Betasec leder",
        name: "Bendik Egenes Dyrli",
      },
    ],
    groupPhoto: undefined,
  },
  "2021": {
    members: [
      {
        position: "Leder",
        name: "Theodor Middleton",
      },
      {
        position: "Nestleder",
        name: "Ingrid Louise Husevåg-Kristensen",
      },
      {
        position: "Økonomiansvarlig",
        name: "Trai Paul Nguyen",
      },
      {
        position: "Eventkom leder",
        name: "Vegar Kristoffer Kvammen",
      },
      {
        position: "Betalan leder",
        name: "Patrick Karlsen",
      },
      {
        position: "Betadev leder",
        name: "Ferdinand Gumø Løberg",
      },
      {
        position: "Betasec leder",
        name: "Bendik Egenes Dyrli",
      },
    ],
    groupPhoto: undefined,
  },
  "2020": {
    members: [
      {
        position: "Leder",
        name: "Anders Godstad",
      },
      {
        position: "Nestleder",
        name: "Theodor Middleton",
      },
      {
        position: "Økonomiansvarlig",
        name: "Vinh Vu",
      },
      {
        position: "Bedkom leder",
        name: "Ingrid Husevåg-Kristensen",
      },
      {
        position: "Eventkom leder",
        name: "Jon Inntveit",
      },
      {
        position: "Betalan leder",
        name: "Adrian Risholm",
      },
      {
        position: "Betasec leder",
        name: "Even Eilertsen",
      },
    ],
    groupPhoto: undefined,
  },
  "2019": {
    members: [
      {
        position: "Leder",
        name: "Kristoffer Solli",
      },
      {
        position: "Nestleder",
        name: "Even Eilertsen",
      },
      {
        position: "Økonomiansvarlig",
        name: "Christer Mathisen",
      },
      {
        position: "Bedrift leder",
        name: "Aslak Frafjord Skailand",
      },
      {
        position: "Event leder",
        name: "Martin Bråten",
      },
      {
        position: "Betalan leder",
        name: "Mattias Alexander Coelho",
      },
    ],
    groupPhoto: undefined,
  },
  "2018": {
    members: [
      {
        position: "Leder",
        name: "Even Eilertsen",
      },
      {
        position: "Nestleder/Økonomi",
        name: "Kristoffer Solli",
      },
      {
        position: "Event ansvarlig",
        name: "Samuel Ogbai Habte",
      },
      {
        position: "Betalan leder",
        name: "Hans Lau Borch",
      },
      {
        position: "Styremedlem",
        name: "Kreshan Thangasamy",
      },
      {
        position: "Styremedlem",
        name: "Martin Bråten",
      },
    ],
    groupPhoto: undefined,
  },
  "2017": {
    members: [
      {
        position: "Leder",
        name: "Marius Bjørni",
      },
      {
        position: "Nestleder",
        name: "Olav Markus Sjursø",
      },
      {
        position: "Økonomi ansvarlig",
        name: "Martin Bråten",
      },
      {
        position: "Pr/Web ansvarlig",
        name: "Vebjørn Nystad",
      },
      {
        position: "Event ansvarlig",
        name: "Espen Kalhagen",
      },
      {
        position: "Betalan ansvarlig",
        name: "Hans Lau Borch",
      },
      {
        position: "Styremedlem",
        name: "Vetle Ørstavik Hollund",
      },
      {
        position: "Styremedlem",
        name: "Christian Trinh",
      },
    ],
    groupPhoto: undefined,
  },
  "2016": {
    members: [
      {
        position: "Leder",
        name: "Marius Bjørni",
      },
      {
        position: "Nestleder",
        name: "Shahab Afsharipour",
      },
      {
        position: "Styremedlem",
        name: "Mohamed Samatar",
      },
      {
        position: "PR-ansvarlig",
        name: "Tommy Johannessen",
      },
      {
        position: "Arrangement ansvarlig",
        name: "Celine Abigael Tomren",
      },
      {
        position: "Betalan ansvarlig",
        name: "Hans Lau Borch",
      },
      {
        position: "Styremedlem",
        name: "Siri Dybdahl",
      },
      {
        position: "Styremedlem",
        name: "Christer Mathisen",
      },
    ],
    groupPhoto: undefined,
  },
  "2015": {
    members: [
      {
        position: "Leder",
        name: "Anders Refsdal Olsen",
      },
      {
        position: "Nestleder",
        name: "Knut Eivind Sandsmark",
      },
      {
        position: "Økonomi/materiell ansvarlig",
        name: "Ørjan Solli",
      },
      {
        position: "Pr/web ansvarlig",
        name: "John Føreland",
      },
      {
        position: "Event ansvarlig",
        name: "Sahand Johansen",
      },
      {
        position: "Betalan ansvarlig",
        name: "Martin Abrahamsen",
      },
      {
        position: "Styremedlem",
        name: "Jonathan Luu",
      },
      {
        position: "Styremedlem",
        name: "Mohamed Samatar",
      },
    ],
    groupPhoto: undefined,
  },
  "2014": {
    members: [
      {
        position: "Leder",
        name: "Anders Refsdal Olsen",
      },
      {
        position: "Nestleder",
        name: "Shahab Afsharipour",
      },
      {
        position: "Økonomiansvarlig",
        name: "Huy Quy Vu",
      },
      {
        position: "PR-ansvarlig",
        name: "Tommy Johannessen",
      },
      {
        position: "Grafiker",
        name: "Kim-Leonhard Halvorsen",
      },
      {
        position: "Arrangement ansvarlig",
        name: "Nina Over",
      },
      {
        position: "Betalan ansvarlig",
        name: "Martin Abrahamsen",
      },
      {
        position: "Styremedlem",
        name: "Knut Eivind Sandsmark",
      },
      {
        position: "Styremedlem",
        name: "Malene Danielsen",
      },
    ],
    groupPhoto: undefined,
  },
};

export const availableYears = Object.keys(boardData);
