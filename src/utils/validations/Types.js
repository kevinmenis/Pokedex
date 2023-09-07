export function nameTypes(type) {
  switch (type) {
    case "grass":
      return "Planta";
    case "poison":
      return "Veneno";
    case "fire":
      return "Fuego";
    case "water":
      return "Agua";
    case "bug":
      return "Bicho";
    case "flying":
      return "Volador";
    case "normal":
      return "Normal";
    case "electric":
      return "Eléctrico";
    case "ground":
      return "Tierra";
    case "fairy":
      return "Hada";
    case "fighting":
      return "Lucha";
    case "psychic":
      return "Psíquico";
    case "rock":
      return "Roca";
    case "steel":
      return "Acero";
    case "ice":
      return "Hielo";
    case "ghost":
      return "Fantasma";
    case "dragon":
      return "Dragón";
    case "dark":
      return "Siniestro";
    default:
      return "undefined";
  }
}

export function styleTypes(type) {
  switch (type) {
    case "grass":
      return {
        backgroundColor: "#78C850",
        color: "#fff",
      };
    case "poison":
      return {
        backgroundColor: "#B058A0",
        color: "#fff",
      };
    case "fire":
      return {
        backgroundColor: "#F05030",
        color: "#fff",
      };
    case "water":
      return {
        backgroundColor: "#3899F8",
        color: "#fff",
      };
    case "bug":
      return {
        backgroundColor: "#A8B820",
        color: "#fff",
      };
    case "flying":
      return {
        /* backgroundColor: "#98A8F0",
        color: "#fff", */
        background: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
        backgroundColor: "#3dc7ef",
        color: "#212121",
      };
    case "normal":
      return {
        backgroundColor: "#A8A090",
        color: "#fff",
      };
    case "electric":
      return {
        backgroundColor: "#F8D030",
        color: "#212121",
      };
    case "ground":
      return {
        /* backgroundColor: "#E9D6A4", */
        background: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
        backgroundColor: "#f7de3f",
        color: "#212121",
      };
    case "fairy":
      return {
        backgroundColor: "#E79FE7",
        color: "#fff",
      };
    case "fighting":
      return {
        backgroundColor: "#A05038",
        color: "#fff",
      };
    case "psychic":
      return {
        backgroundColor: "#F870A0",
        color: "#fff",
      };
    case "rock":
      return {
        backgroundColor: "#B8A058",
        color: "#fff",
      };
    case "steel":
      return {
        backgroundColor: "#A8A8C0",
        color: "#fff",
      };
    case "ice":
      return {
        backgroundColor: "#58C8E0",
        color: "#fff",
      };
    case "ghost":
      return {
        backgroundColor: "#6060B0",
        color: "#fff",
      };
    case "dragon":
      return {
        background: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
        backgroundColor: "#53a4cf",
        color: "#fff",
      };
    case "dark":
      return {
        backgroundColor: "#424242",
        color: "#fff",
      };
    default:
      return {};
  }
}
