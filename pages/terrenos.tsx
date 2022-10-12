import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Space,
} from "antd";
import {
  useCreateTerreno,
  useTerreno,
  useDeleteTerreno,
} from "../src/graphql/terrenos/hooks";
import { useState, useEffect } from "react";
import Table, { ColumnsType } from "antd/lib/table";
import FormTerrenos from "../src/components/Formularios/FormTerrenos";
const { Option } = Select;

export default function Terrenos() {
  const { data, loading } = useTerreno();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const crearTerreno = useCreateTerreno();
  const eliminarTerreno = useDeleteTerreno();
  const [terrenos, setTerrenos] = useState([]);
  const [terrenoSelected, setTerrenoSelected] = useState({})
  const handleSubmit = (values: any) => {
    let valores = { ...values };
    crearTerreno({ variables: valores });
  };

  const showModal = ( terreno: any ) => {
    setTerrenoSelected( terreno )
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setTerrenoSelected({});
  };


  const columns = [
    {
      title: "Valor Comercial",
      dataIndex: "valorComercial",
      key: "valorComercial",
    },
    {
      title: "Fuente de agua",
      dataIndex: "fuenteAgua",
      key: "fuenteAgua",
      render: (_, record) => (
        <Space size="middle">{record.fuenteAgua ? "Si" : "No"}</Space>
      ),
    },
    {
      title: "Area Total",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "Tipo de Terreno",
      dataIndex: "tipoTerreno",
      key: "tipoTerreno",
    },
    {
      title: "Construcciones",
      dataIndex: "construcciones",
      key: "construcciones",
      render: (_, record) => (
        <Space size="middle">{record.construcciones ? "Si" : "No"}</Space>
      ),
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
                deleteTerrenoById(Number(x.id));
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

  useEffect(() => {
    setTerrenos(data?.allTerrenos.nodes);
  }, [data]);

  const deleteTerrenoById = (id) => {
    eliminarTerreno({ variables: { idDelete: id } });
  };
  return (
    <div>
      <h2>Terrenos</h2>
      <Table dataSource={terrenos} columns={columns} />
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Valor Comercial"
          name="valorComercial"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el Valor Comercial!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Area Total"
          name="area"
          rules={[{ required: true, message: "Por favor ingrese el Area!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tipo de Terreno"
          name="tipoTerreno"
          rules={[
            {
              required: true,
              message: "Por favor seleccione el tipo de Terreno!",
            },
          ]}
        >
          <Select>
            <Option value="rural">Rural</Option>
            <Option value="urbano">Urbano</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="¿Tiene Construcciones?"
          name="construcciones"
          rules={[
            {
              required: true,
              message: "Por favor selecccione una respuesta!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item></Form.Item>

        <Form.Item
          label="¿Tiene Fuentes de agua cerca?"
          name="fuenteAgua"
          rules={[
            {
              required: true,
              message: "Por favor selecccione una respuesta!",
            },
          ]}
        >
          <Radio.Group>
            <Radio value={true}>Si</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
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
        <FormTerrenos values={terrenoSelected} handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}
