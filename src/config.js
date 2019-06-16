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
    name_fr: "Parlement de la Région de Bruxelles-Capitale",
    name_nl: "Brussels Hoofdstedelijk Parlement",
    highestLevel: "R"
  },
  CG: {
    name_fr: "Conseil communal",
    name_nl: "Gemeenteraden",
    highestLevel: "M"
  },
  CK: {
    name_fr: "Chambre",
    name_nl: "Kamer",
    highestLevel: "R"
  },
  CS: {
    name_fr: "Conseil CPAS",
    name_nl: "OCMWraden",
    highestLevel: "M"
  },
  DE: {
    name_fr: "Parlement de la Communauté germanophone",
    name_nl: "Parlement van de Duitstalige Gemeenschap",
    highestLevel: "G"
  },
  DI: {
    name_fr: "Conseil de district (Anvers)",
    name_nl: "Districtraden (in Antwerpen)",
    highestLevel: "I"
  },
  EU: {
    name_fr: "Parlement européen",
    name_nl: "Europees Parlement",
    highestLevel: "R"
  },
  PR: {
    name_fr: "Conseil provincial",
    name_nl: "Provincieraden",
    highestLevel: "P"
  },
  VL: {
    name_fr: "Parlement flamand",
    name_nl: "Vlaams Parlement",
    highestLevel: "R"
  },
  WL: {
    name_fr: "Parlement régional wallon ",
    name_nl: "Waals Parlement",
    highestLevel: "R"
  }
};
