import { useTranslations } from "@i18n/utils.ts";

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

export function getNavigationDropdowns(locale?: string): NavigationDropdown[] {
  const t = useTranslations(locale);

  return [
    {
      id: "om-beta",
      label: t("nav.omBeta.label"),
      items: [
        {
          icon: "fa-solid:info-circle",
          title: t("nav.omBeta.about.title"),
          desc: t("nav.omBeta.about.desc"),
          href: "/om",
        },
        {
          icon: "fa-solid:users",
          title: t("nav.omBeta.board.title"),
          desc: t("nav.omBeta.board.desc"),
          href: "/styret",
        },
        {
          icon: "fa-solid:balance-scale",
          title: t("nav.omBeta.bylaws.title"),
          desc: t("nav.omBeta.bylaws.desc"),
          href: "/Vedtekter.pdf",
        },
        // {
        //   icon: "fa-solid:archive",
        //   title: "Referat",
        //   desc: "Se hva som har skjedd i ulike møter og samlinger.",
        //   href: "/referat",
        // },
        {
          icon: "fa-solid:paint-brush",
          title: t("nav.omBeta.branding.title"),
          desc: t("nav.omBeta.branding.desc"),
          href: "/om/branding",
        },
        {
          icon: "fa-solid:envelope",
          title: t("nav.omBeta.contact.title"),
          desc: t("nav.omBeta.contact.desc"),
          href: "/kontakt",
        },
      ],
    },
    {
      id: "for-studenter",
      label: t("nav.forStudents.label"),
      items: [
        // {
        //   icon: "fa-solid:calendar",
        //   title: "Arrangementer",
        //   desc: "Se kommende arrangementer, bedpresser og fagkvelder vi arrangerer.",
        //   href: "/arrangementer",
        // },
        // {
        //   icon: "fa-solid:rss",
        //   title: "Nyheter",
        //   desc: "Få med siste nytt om hva som sker i Beta og på UiA.",
        //   href: "/ressurser",
        // },
        {
          icon: "fa-solid:briefcase",
          title: t("nav.forStudents.jobs.title"),
          desc: t("nav.forStudents.jobs.desc"),
          href: "/jobs",
        },
        // {
        //   icon: "fa-solid:book-open",
        //   title: "Ressurser",
        //   desc: "Lenker til kurs, oppgaver, prosjekter og eksempler.",
        //   href: "/ressurser",
        // },
        // {
        //   icon: "fa-solid:users",
        //   title: "Interessegrupper",
        //   desc: "Utforsk våre faglige og sosiale grupper som er åpne for alle studenter.",
        //   href: "/interessegrupper",
        // },
        // {
        //   icon: "fa-solid:home",
        //   title: "Komiteer",
        //   desc: "Les mer om komiteene våre og hva de jobber med.",
        //   href: "/komiteer",
        // },
        {
          icon: "fa-solid:code-branch",
          title: t("nav.forStudents.projects.title"),
          desc: t("nav.forStudents.projects.desc"),
          href: "/prosjekter",
        },
        {
          icon: "fa-solid:city",
          title: t("nav.forStudents.generalAssembly.title"),
          desc: t("nav.forStudents.generalAssembly.desc"),
          href: "/genfors",
        },
        {
          icon: "fa-solid:book-open",
          title: t("nav.forStudents.guides.title"),
          desc: t("nav.forStudents.guides.desc"),
          href: "/guides",
        },
        {
          icon: "fa-solid:gamepad",
          title: t("nav.forStudents.betaLan.title"),
          desc: t("nav.forStudents.betaLan.desc"),
          href: "/betalan",
        },
      ],
    },
    {
      id: "for-bedrifter",
      label: t("nav.forCompanies.label"),
      items: [
        // {
        //   icon: "fa-solid:building",
        //   title: "Bedriftspresentasjon",
        //   desc: "Informasjon om hvordan din bedrift kan holde presentasjon hos oss.",
        //   href: "/bedrift/bedpress",
        // },
        // {
        //   icon: "fa-solid:bullhorn",
        //   title: "Stillingsannonser",
        //   desc: "Publiser relevante stillinger for våre studenter.",
        //   href: "/bedrift/annonse",
        // },
        // {
        //   icon: "fa-solid:handshake",
        //   title: "Hovedsamarbeidspartner",
        //   desc: "Utforsk muligheten til å bli vår HSP og profilere dere mot engasjerte studenter.",
        //   href: "/bedrift/hsp",
        // },
        {
          icon: "fa-solid:envelope",
          title: t("nav.forCompanies.contact.title"),
          desc: t("nav.forCompanies.contact.desc"),
          href: "/kontakt",
        },
      ],
    },
  ];
}
