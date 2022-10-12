import { gql } from "@apollo/client";

export const CREAR_PREDIOS = gql`
  mutation crearPredios(
    $avaluo: String
    $departamento: String
    $municipio: String
    $nombre: String
    $numeroPredial: String
  ) {
    createPredio(
      input: {
        predio: {
          avaluo: $avaluo
          departamento: $departamento
          municipio: $municipio
          nombre: $nombre
          numeroPredial: $numeroPredial
        }
      }
    ) {
      predio {
        avaluo
        departamento
        municipio
        nombre
        numeroPredial
      }
    }
  }
`;

export const ELIMINAR_PREDIOS = gql`
  mutation eliminarPredios($idDelete: Int!) {
    deletePredioById(input: { id: $idDelete }) {
      deletedPredioId
    }
  }
`;

export const EDITAR_PREDIOS = gql`
  mutation editarPredios(
    $avaluo: String
    $departamento: String
    $idEdit: Int!
    $municipio: String
    $nombre: String
    $numeroPredial: String
  ) {
    updatePredioById(
      input: {
        id: $idEdit 
        predioPatch: {
          numeroPredial: $numeroPredial
          nombre: $nombre
          municipio: $municipio
          departamento: $departamento
          avaluo: $avaluo
        }
      }
    ) {
      predio {
        avaluo
        departamento
        id
        municipio
        nombre
        numeroPredial
      }
    }
  }
`;
