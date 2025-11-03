export interface DropdownItem {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

export interface NavigationDropdown {
  id: string;
  label: string;
  items: DropdownItem[];
}

export const navigationDropdowns: NavigationDropdown[] = [
  {
    id: "om-beta",
    label: "/om_beta",
    items: [
      {
        icon: "fa-solid:info-circle",
        title: "Om Beta",
        desc: "Lær mer om hvem vi er og hva vi gjør for studentene.",
        href: "/om",
      },
      {
        icon: "fa-solid:users",
        title: "Hovedstyret",
        desc: "Sjekk ut tidligere og nåværende hovedstyre.",
        href: "/styret",
      },
      {
        icon: "fa-solid:balance-scale",
        title: "Vedtekter",
        desc: "Les vedtektene og se hvordan foreningen er organisert.",
        href: "/vedtekter",
      },
      {
        icon: "fa-solid:archive",
        title: "Referat",
        desc: "Se hva som har skjedd i ulike møter og samlinger.",
        href: "/referat",
      },
      {
        icon: "fa-solid:user-graduate",
        title: "Studier",
        desc: "Studiene på UiA som linjeforeningen dekker.",
        href: "/studier",
      },
      {
        icon: "fa-solid:envelope",
        title: "Kontakt oss",
        desc: "Ta kontakt med oss for samarbeid, spørsmål eller tilbakemelding.",
        href: "/kontakt",
      },
    ],
  },
  {
    id: "for-studenter",
    label: "/for_studenter",
    items: [
      {
        icon: "fa-solid:calendar",
        title: "Arrangementer",
        desc: "Se kommende arrangementer, bedpresser og fagkvelder vi arrangerer.",
        href: "/arrangementer",
      },
      {
        icon: "fa-solid:rss",
        title: "Nyheter",
        desc: "Få med siste nytt om hva som sker i Beta og på UiA.",
        href: "/ressurser",
      },
      {
        icon: "fa-solid:briefcase",
        title: "Stillingsannonser",
        desc: "Finn sommerjobber, internship og relevante stillinger.",
        href: "/stillingsannonser",
      },
      {
        icon: "fa-solid:book-open",
        title: "Ressurser",
        desc: "Lenker til kurs, oppgaver, prosjekter og eksempler.",
        href: "/ressurser",
      },
      {
        icon: "fa-solid:users",
        title: "Interessegrupper",
        desc: "Utforsk våre faglige og sosiale grupper som er åpne for alle studenter.",
        href: "/interessegrupper",
      },
      {
        icon: "fa-solid:home",
        title: "Komiteer",
        desc: "Les mer om komiteene våre og hva de jobber med.",
        href: "/komiteer",
      },
      {
        icon: "fa-solid:code-branch",
        title: "Prosjekter",
        desc: "Sjekk ut studentprosjekter vi jobber med eller bli med.",
        href: "/prosjekter",
      },
    ],
  },
  {
    id: "for-bedrifter",
    label: "/for_bedrifter",
    items: [
      {
        icon: "fa-solid:building",
        title: "Bedriftspresentasjon",
        desc: "Informasjon om hvordan din bedrift kan holde presentasjon hos oss.",
        href: "/bedrift/bedpress",
      },
      {
        icon: "fa-solid:bullhorn",
        title: "Stillingsannonser",
        desc: "Publiser relevante stillinger for våre studenter.",
        href: "/bedrift/annonse",
      },
      {
        icon: "fa-solid:handshake",
        title: "Hovedsamarbeidspartner",
        desc: "Utforsk muligheten til å bli vår HSP og profilere dere mot engasjerte studenter.",
        href: "/bedrift/hsp",
      },
    ],
  },
];
