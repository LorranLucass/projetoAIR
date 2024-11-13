"use client";
import '../../banner.css';
import Pagina from "@/components/Pagina";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask"

export default function EquipamentosFormPage({ searchParams }) {
  const router = useRouter();
  const [modelosDeArma] = useState([
    { nome: "M4A1" },
    { nome: "AK-47" },
    { nome: "MP5" },
    { nome: "G36" },
    { nome: "P90" },
  ]);
  const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
  const id = searchParams?.id;
  const equipamentoEditada = equipamentos.find((item) => item.id === id);
  
  function salvar(dados) {
    if (equipamentoEditada) {
      Object.assign(equipamentoEditada, dados);
      localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
    } else {
      dados.id = v4();
      equipamentos.push(dados);
      localStorage.setItem("equipamentos", JSON.stringify(equipamentos));
    }
    alert("Equipamento criado com sucesso!");
    router.push("/equipamentos");
  }
  const initialValues = {
    nome: "",
    Tipo: "",
    Fabricante: "",
    modeloArma: "",
    Proprietario: "",
    Condicao: "",
    DataAquisicao: "",
    UltimaManutencao: "",
    Descricao: "",
    Status: "",
  };
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatorio"),
    Tipo: Yup.string().required("Campo obrigatorio"),
    Fabricante: Yup.string(),
    modeloArma: Yup.string(),
    Proprietario: Yup.string().required("Campo obrigatorio"),
    Condicao: Yup.string().required("Campo obrigatorio"),
    DataAquisicao: Yup.date().required("Campo obrigatorio"),
    UltimaManutencao: Yup.date(),
    Descricao: Yup.string(),
    Status: Yup.string(),
  });
  return (
    <Pagina titulo="Cadastro de equipamento">
      <Formik
        initialValues={equipamentoEditada || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Equipamento:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Tipo (e.g., Rifle, Pistola, Protecao):</Form.Label>
                <Form.Control
                  name="Tipo"
                  type="text"
                  value={values.Tipo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.Tipo && !errors.Tipo}
                  isInvalid={touched.Tipo && errors.Tipo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Tipo}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Fabricante:</Form.Label>
                <Form.Control
                  name="Fabricante"
                  type="text"
                  value={values.Fabricante}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.Fabricante && !errors.Fabricante}
                  isInvalid={touched.Fabricante && errors.Fabricante}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Fabricante}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Proprietário:</Form.Label>
                <InputMask
                  mask="CPF: 999.999.999-99"
                  value={values.Proprietario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="Proprietario"
                      isValid={touched.Proprietario && !errors.Proprietario}
                      isInvalid={touched.Proprietario && errors.Proprietario}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.Proprietario}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Condicao:</Form.Label>
                <Form.Select
                  name="Condicao"
                  value={values.Condicao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.Condicao && !errors.Condicao}
                  isInvalid={touched.Condicao && errors.Condicao}
                >
                  <option value="">Selecione</option>
                  <option value="Novo">Novo</option>
                  <option value="Usado">Usado</option>
                  <option value="Ruim">Ruim</option>
                  <option value="Descartar">Descartar</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.Condicao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Data de Aquisicao:</Form.Label>
                <Form.Control
                  name="DataAquisicao"
                  type="date"
                  value={values.DataAquisicao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.DataAquisicao && !errors.DataAquisicao}
                  isInvalid={touched.DataAquisicao && errors.DataAquisicao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.DataAquisicao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Ultima Manutencao:</Form.Label>
                <Form.Control
                  name="UltimaManutencao"
                  type="date"
                  value={values.UltimaManutencao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.UltimaManutencao && !errors.UltimaManutencao}
                  isInvalid={touched.UltimaManutencao && errors.UltimaManutencao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.UltimaManutencao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descricao:</Form.Label>
                <Form.Control
                  name="Descricao"
                  as="textarea"
                  value={values.Descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.Descricao && !errors.Descricao}
                  isInvalid={touched.Descricao && errors.Descricao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.Descricao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Status do Equipamento:</Form.Label>
                <Form.Select
                  name="Status"
                  value={values.Status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.Status && !errors.Status}
                  isInvalid={touched.Status && errors.Status}
                >
                  <option value="">Selecione</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Alugado">Alugado</option>
                  <option value="Desativo">Desativo</option>
                  <option value="Sem Identificador">Sem Identificador</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.Status}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="text-end">
              <Button className="me-2" href="/equipamentos">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}