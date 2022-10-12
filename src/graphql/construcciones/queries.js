import { gql } from "@apollo/client";

export const CONSTRUCCIONES = gql`
query MyQuery {
  allConstrucciones {
    nodes {
      areaTotal
      direcccion
      id
      numeroPisos
      tipoConstruccion
    }
  }
}

`;
