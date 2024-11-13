"use client";
import "../../banner.css";
import Pagina from "@/components/Pagina";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import { Formik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function JogadoresFormPage({ searchParams }) {
  const router = useRouter();

  const [equipamentoFiltrado, setEquipamentoFiltrado] = useState([]);

  const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
  const Jogadores = JSON.parse(localStorage.getItem("Jogadores")) || [];
  const id = searchParams?.id;
  const JogadorEditado = Jogadores.find((item) => item.id === id);

  function salvar(dados) {
    if (JogadorEditado) {
      Object.assign(JogadorEditado, dados);
      localStorage.setItem("Jogadores", JSON.stringify(Jogadores));
    } else {
      dados.id = v4();
      Jogadores.push(dados);
      localStorage.setItem("Jogadores", JSON.stringify(Jogadores));
    }
    alert("Equipamento criado com sucesso!");
    router.push("/Jogadores");
  }
  const initialValues = {
    nome: "",
    cpf: "",
    apelido: "",
    email: "",
    telefone: "",
    equipamento: "",
    experiencia: "",
    preferencia: "",
  };
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatorio"),
    cpf: Yup.string().required("Campo obrigatorio"),
    apelido: Yup.string().required("Campo obrigatorio"),
    email: Yup.string().email().required("Campo obrigatorio"),
    telefone: Yup.string().required("Campo obrigatorio"),
    equipamento: Yup.string().required("Campo obrigatorio"),
    experiencia: Yup.string().required("Campo obrigatorio"),
    preferencia: Yup.string().required("Campo obrigatorio"),
  });

  useEffect(() => {
    if (equipamentos.length > 0) setEquipamentoFiltrado(equipamentos);
  }, [equipamentos]);

  return (
    <Pagina titulo="Cadastro de equipamento">
      <Formik
        initialValues={JogadorEditado || initialValues}
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
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Nome do Jogador:</Form.Label>
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
                <Form.Label>Apelido:</Form.Label>
                <Form.Control
                  name="apelido"
                  value={values.apelido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.apelido && !errors.apelido}
                  isInvalid={touched.apelido && errors.apelido}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apelido}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>CPF:</Form.Label>
                <InputMask
                  mask="999.999.999-99"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cpf"
                      isValid={touched.cpf && !errors.cpf}
                      isInvalid={touched.cpf && errors.cpf}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>E-mail:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="telefone"
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Equipamento:</Form.Label>
                <Form.Select
                  name="equipamento"
                  value={values.equipamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.equipamento && !errors.equipamento}
                  isInvalid={touched.equipamento && errors.equipamento}
                >
                  <option value="">Selecione</option>
                  {equipamentoFiltrado.map((equipamento) => (
                    <option key={equipamento.nome} value={equipamento.nome}>
                      {equipamento.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.equipamento}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Experiência (Anos):</Form.Label>
                <Form.Control
                  name="experiencia"
                  value={values.experiencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.experiencia && !errors.experiencia}
                  isInvalid={touched.experiencia && errors.experiencia}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.experiencia}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Preferência de Arma:</Form.Label>
                <Form.Control
                  type="text"
                  name="preferencia"
                  value={values.preferencia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.preferencia && !errors.preferencia}
                  isInvalid={touched.preferencia && errors.preferencia}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.preferencia}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/Jogadores">
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
