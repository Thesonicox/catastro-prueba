import { Button, Form, Input, message, Popconfirm, Select, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import {
  useCreatePropietario,
  usePropietarios,
  useDeletePropietario
} from "../src/graphql/propietarios/hooks";

const { Option } = Select;


const Propietarios = () => {
  const eliminarPropietarios = useDeletePropietario();
  const { data, loading } = usePropietarios();
  const crearPropietario = useCreatePropietario();
  const [typePerson, setTypePerson] = useState<string>("");
  const [propietarios, setPropietarios] = useState([]);
  console.log(propietarios)
  const handleSubmit = (values: any) => {
    let valores = {};
    if (typePerson) {
      valores = {
        ...values,
        tipoPersona: typePerson,
      };
    }
    crearPropietario({ variables: valores });
  };
  const handleChangeDocumentType = (value: string) => {
    console.log(value);
    if (value === "cedula") {
      setTypePerson("natural");
    } else {
      setTypePerson("juridica");
    }
  };

  const confirm = (idPropietarios) => {
    console.log(idPropietarios);
    message.success("Se elimino correctamente");
  };

  useEffect(() => {
    setPropietarios(data?.allPropietarios.nodes);
    console.log(propietarios);
  }, [data]);


  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido'
    },
    {
      title: 'Tipo de persona',
      dataIndex: 'tipoPersona',
      key: 'tipoPersona'
    },
    {
      title: 'Tipo de documento',
      dataIndex: 'tipoDocumento',
      key: 'tipoDocumento'
    },
    {
      title: 'Numero de documento',
      dataIndex: 'numeroDocumento',
      key: 'numeroDocumento'
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    },
    {
      title: 'NIT',
      dataIndex: 'nit',
      key: 'nit'
    },
    {
      title: 'Razon Social',
      dataIndex: 'razonSocial',
      key: 'razonSocial'
    },
    {
      title: 'Direccion',
      dataIndex: 'direccion',
      key: 'direccion'
    },
    {
      title: 'Telefono',
      dataIndex: 'correo',
      key: 'correo'
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo'
  
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Actualizar</Button>
          <Popconfirm
            title="¿Estas seguro que deseas eliminar?"
            onConfirm={() => deletePropietariosById(record.id)}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const deletePropietariosById = id => {
    eliminarPropietarios({ variables: { idDelete: id } });
  }

  return (
    <div>
      <h2>Propietarios</h2>

      <Table dataSource={propietarios} columns={columns}/>
      <Form layout="vertical" onFinish={handleSubmit}>
        {typePerson != "" && <span>El tipo de persona es: {typePerson}</span>}

        <Form.Item
          label="Tipo de Documento"
          name="tipoDocumento"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el tipo de Documento!",
            },
          ]}
        >
          <Select onChange={handleChangeDocumentType}>
            <Option value="cedula">Cedula de Ciudadania</Option>
            <Option value="nit">NIT</Option>
          </Select>
        </Form.Item>

        {typePerson === "natural" && (
          <Form.Item
            label="Numero de Documento"
            name="numeroDocumento"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Numero de Documento",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {typePerson === "natural" && (
          <>
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[
                { required: true, message: "Por favor ingrese el Nombre!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Apellidos"
              name="apellido"
              rules={[
                { required: true, message: "Por favor ingrese los Apellidos!" },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        {typePerson === "juridica" && (
          <>
            <Form.Item
              label="NIT"
              name="nit"
              rules={[{ required: true, message: "Por favor ingrese el NIT!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Razon Social"
              name="razonSocial"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la Razon Social!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </>
        )}

        <Form.Item
          label="Direccion"
          name="direccion"
          rules={[
            { required: true, message: "Por favor ingrese la Direccion!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefono"
          name="telefono"
          rules={[
            { required: true, message: "Por favor ingrese el Telefono!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo"
          name="correo"
          rules={[{ required: true, message: "Por favor ingrese el Correo!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Formulario
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Propietarios;
