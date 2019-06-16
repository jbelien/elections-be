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
    highestLevel: "R",
    listsLevel: "R"
  },
  CG: {
    name_fr: "Conseil communal",
    name_nl: "Gemeenteraden",
    highestLevel: "M",
    listsLevel: null
  },
  CK: {
    name_fr: "Chambre",
    name_nl: "Kamer",
    highestLevel: "R",
    listsLevel: "C"
  },
  CS: {
    name_fr: "Conseil CPAS",
    name_nl: "OCMWraden",
    highestLevel: "M",
    listsLevel: null
  },
  DE: {
    name_fr: "Parlement de la Communauté germanophone",
    name_nl: "Parlement van de Duitstalige Gemeenschap",
    highestLevel: "G",
    listsLevel: "G"
  },
  DI: {
    name_fr: "Conseil de district (Anvers)",
    name_nl: "Districtraden (in Antwerpen)",
    highestLevel: "I",
    listsLevel: null
  },
  EU: {
    name_fr: "Parlement européen",
    name_nl: "Europees Parlement",
    highestLevel: "R",
    listsLevel: "L"
  },
  PR: {
    name_fr: "Conseil provincial",
    name_nl: "Provincieraden",
    highestLevel: "P",
    listsLevel: null
  },
  VL: {
    name_fr: "Parlement flamand",
    name_nl: "Vlaams Parlement",
    highestLevel: "R",
    listsLevel: "C"
  },
  WL: {
    name_fr: "Parlement régional wallon ",
    name_nl: "Waals Parlement",
    highestLevel: "R",
    listsLevel: "C"
  }
};
