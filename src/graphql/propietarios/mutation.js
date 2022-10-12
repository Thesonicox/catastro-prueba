import { gql } from "@apollo/client";

export const CREAR_PROPIETARIOS = gql`
  mutation crearPropietario(
    $nombre: String
    $apellido: String
    $tipoPersona: String
    $tipoDocumento: String
    $numeroDocumento: String
    $nit: String
    $razonSocial: String
    $direccion: String 
    $telefono: String
    $correo: String
  ) {
    createPropietario(
      input: {
        propietario: {
          apellido: $apellido
          nombre: $nombre
          numeroDocumento: $numeroDocumento
          telefono: $telefono
          tipoDocumento: $tipoDocumento
          tipoPersona: $tipoPersona
          correo: $correo
          direccion: $direccion
          razonSocial: $razonSocial
          nit: $nit 
        }
      }
    ) {
      propietario {
        apellido
        nombre
        numeroDocumento
        telefono
        tipoDocumento
        tipoPersona
        correo
        direccion
        razonSocial
        nit
      }
    }
  }
`;

export const ELIMINAR_PROPIETARIOS = gql`
  mutation EliminarPropietario(
    $idDelete: Int!) {
    deletePropietarioById(
      input: {
          id: $idDelete
      }) {
        deletedPropietarioId
    }
  }
`;
