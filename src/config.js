export const api = "https://api.elections.openknowledge.be/v1";

export const elections = [
  {
    year: 2019,
    types: ["CK", "BR", "VL", "WL", "DE", "EU"],
    previous: 2014
  }
];

export const electionsTypes = {
  BR: {
    fr: "Parlement de la Région de Bruxelles-Capitale",
    nl: "Brussels Hoofdstedelijk Parlement"
  },
  CG: {
    fr: "Conseil communal",
    nl: "Gemeenteraden"
  },
  CK: {
    fr: "Chambre",
    nl: "Kamer"
  },
  CS: {
    fr: "Conseil CPAS",
    nl: "OCMWraden"
  },
  DE: {
    fr: "Parlement de la Communauté germanophone",
    nl: "Parlement van de Duitstalige Gemeenschap"
  },
  DI: {
    fr: "Conseil de district (Anvers)",
    nl: "Districtraden (in Antwerpen)"
  },
  EU: {
    fr: "Parlement européen",
    nl: "Europees Parlement"
  },
  PR: {
    fr: "Conseil provincial",
    nl: "Provincieraden"
  },
  VL: {
    fr: "Parlement flamand",
    nl: "Vlaams Parlement"
  },
  WL: {
    fr: "Parlement régional wallon ",
    nl: "Waals Parlement"
  }
};
