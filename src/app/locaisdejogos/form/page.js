"use client";
import "../../banner.css";
import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask"

export default function LocalAirsoftFormPage(props) {
  const router = useRouter();
  const locaisAirsoft = JSON.parse(localStorage.getItem("locaisdejogos")) || [];
  const id = props.searchParams?.id;
  console.log(id);
  const localEditado = id ? locaisAirsoft.find((item) => item.id === id) : null;

  function salvar(dados) {
    if (localEditado) {
      Object.assign(localEditado, dados);
      localStorage.setItem("locaisdejogos", JSON.stringify(locaisAirsoft));
    } else {
      dados.id = v4();
      locaisAirsoft.push(dados);
      localStorage.setItem("locaisdejogos", JSON.stringify(locaisAirsoft));
    }

    alert("Local de Airsoft criado com sucesso!");
    router.push("/locaisdejogos");
  }

  const initialValues = {
    nome: "",
    endereco: "",
    tipo: "",
    capacidade: "",
    responsavel: "",
    cidade: "",
    estado: "",
    regras: "",
    horarios: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    tipo: Yup.string().required("Campo obrigatório"),
    capacidade: Yup.number()
      .required("Campo obrigatório")
      .min(1, "Capacidade deve ser maior que 0"),
    responsavel: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    regras: Yup.string().required("Campo obrigatório"),
    horarios: Yup.string().required("Campo Obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Local de Airsoft"}>
      <Formik
        initialValues={localEditado || initialValues}
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
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome do Local:</Form.Label>
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

                <Form.Group as={Col}>
                  <Form.Label>Endereço:</Form.Label>
                  <Form.Control
                    name="endereco"
                    type="text"
                    value={values.endereco}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.endereco && !errors.endereco}
                    isInvalid={touched.endereco && errors.endereco}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endereco}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Tipo (CQB ou Campo Aberto):</Form.Label>
                  <Form.Control
                    name="tipo"
                    type="text"
                    value={values.tipo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.tipo && !errors.tipo}
                    isInvalid={touched.tipo && errors.tipo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.tipo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Capacidade:</Form.Label>
                  <Form.Control
                    name="capacidade"
                    type="number"
                    value={values.capacidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.capacidade && !errors.capacidade}
                    isInvalid={touched.capacidade && errors.capacidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.capacidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Responsável pelo Local:</Form.Label>
                  <Form.Control
                    name="responsavel"
                    type="text"
                    value={values.responsavel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.responsavel && !errors.responsavel}
                    isInvalid={touched.responsavel && errors.responsavel}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.responsavel}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Cidade:</Form.Label>
                  <Form.Control
                    name="cidade"
                    type="text"
                    value={values.cidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cidade && !errors.cidade}
                    isInvalid={touched.cidade && errors.cidade}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cidade}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Estado:</Form.Label>
                  <Form.Control
                    name="estado"
                    type="text"
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.estado && !errors.estado}
                    isInvalid={touched.estado && errors.estado}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.estado}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Regras Específicas:</Form.Label>
                  <Form.Control
                    name="regras"
                    as="textarea"
                    value={values.regras}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.regras && !errors.regras}
                    isInvalid={touched.regras && errors.regras}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.regras}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Horário de Funcionamento:</Form.Label>
                  <InputMask
                  mask="99:99 às 99:99"
                  value={values.horarios}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="horarios"
                      isValid={touched.horarios && !errors.horarios}
                      isInvalid={touched.horarios && errors.horarios}
                    />
                  )}
                </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.horarios}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className="text-end">
                <Button className="me-2" href="/locaisdejogos">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
