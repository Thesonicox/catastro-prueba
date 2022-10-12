import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
} from "antd";
import {
  useCreatePredios,
  useDeletePredios,
  usePredios,
  useEditPredios
} from "../src/graphql/predios/hooks";
import { useState, useEffect } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import FormPredios  from "../src/components/Formularios/FormPredios";
import { useTerreno } from "src/graphql/terrenos/hooks";
import { Option } from "antd/lib/mentions";

export default function Predios() {
  const dataTerreno = useTerreno()
  const { data, loading } = usePredios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const crearPredios = useCreatePredios();
  const eliminarPredios = useDeletePredios();
  const [predios, setPredios] = useState([]);
  const [prediosSelected, setPrediosSelected] = useState({})
  const handleSubmit = (values: any) => {
    let valores = { ...values };
    crearPredios({ variables: valores });
  };

  const showModal = ( terreno: any ) => {
    setPrediosSelected( terreno )
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setPrediosSelected({});
  };

  useEffect(() => {
    setPredios(data?.allPredios.nodes);
  }, [data]);

  const columns = [
    {
      title: "Numero Predial",
      dataIndex: "numeroPredial",
      key: "numeroPredial",
    },
    {
      title: "Avalúo",
      dataIndex: "avaluo",
      key: "avaluo",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
    },
    {
      title: "Municipio",
      dataIndex: "municipio",
      key: "municipio",
    },
    {
      title: "Acciones",
      key: "action",
      render: (x) => (
        <Space size="middle">
            <Button type="primary" onClick={ () => showModal(x) }>
              Actualizar
            </Button>
            <Popconfirm
              title="¿Estas seguro que deseas eliminar?"
              onConfirm={() => {
                deletePrediosById(Number(x.id));
              }}
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
  ];

 

  const deletePrediosById = (id) => {
    eliminarPredios({ variables: { idDelete: id } });
  };
  return (
    <div>
      <h2>Predios</h2>
      <Table dataSource={predios} columns={columns} />
      <Form layout="vertical" onFinish={handleSubmit}>
        {/* <Form.Item
        label='Informacion del Terreno'
        name="infoTerreno"
        >
          <Select />
        </Form.Item> */}

        <Form.Item
          label="Numero Predial"
          name="numeroPredial"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Numero Predial!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Avalúo"
          name="avaluo"
          rules={[{ required: true, message: "Por favor ingrese el Avalúo!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el Nombre!",
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Departamento"
          name="departamento"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Departamento!",
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item></Form.Item>

        <Form.Item
          label="Municipio"
          name="municipio"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Municipio!",
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Formulario
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <FormPredios
          values={prediosSelected}
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}