import { gql } from "@apollo/client";

export const CREAR_CONSTRUCCIONES = gql`
  mutation crearConstrucciones(
    $tipoConstruccion: String
    $numeroPisos: String
    $direccion: String
    $areaTotal: String
  ) {
    createConstruccione(
      input: {
        construccione: {
          tipoConstruccion: $tipoConstruccion
          numeroPisos: $numeroPisos
          direcccion: $direccion
          areaTotal: $areaTotal
        }
      }
    ) {
      construccione {
        tipoConstruccion
        numeroPisos
        direcccion
        areaTotal
      }
    }
  }
`;

export const ELIMINAR_CONSTRUCCIONES = gql`
  mutation EliminarConstrucciones($idDelete: Int!) {
    deleteConstruccioneById(input: { id: $idDelete }) {
      deletedConstruccioneId
    }
  }
`;

export const EDITAR_CONSTRUCCION = gql`
  mutation editarConstruccion(
    $areaTotal: String
    $direcccion: String
    $idEdit: Int!
    $numeroPisos: String
    $tipoConstruccion: String
  ) {
    updateConstruccioneById(
      input: {
        id: $idEdit
        construccionePatch: {
          areaTotal: $areaTotal
          direcccion: $direcccion
          numeroPisos: $numeroPisos
          tipoConstruccion: $tipoConstruccion
        }
      }
    ) {
      construccione {
        areaTotal
        direcccion
        id
        numeroPisos
        tipoConstruccion
      }
    }
  }
`;
