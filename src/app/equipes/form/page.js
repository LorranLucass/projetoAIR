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
import apiLocalidades from "@/services/apiLocalidades";

export default function EquipesFormPage({ searchParams }) {
  const router = useRouter();

  const [paises, setPaises] = useState([]);

  const [JogadoresFiltrados, setJogadoresFiltrados] = useState([]);

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => setPaises(response.data));
    apiLocalidades.get("estados?orderBy=nome");
    // .then((response) => setEstados(response.data));
  }, []);

  const Jogadores = JSON.parse(localStorage.getItem("Jogadores")) || [];
  const equipes = JSON.parse(localStorage.getItem("equipes")) || [];
  const id = searchParams?.id;
  const equipeEditada = equipes.find((item) => item.id === id);

  function salvar(dados) {
    if (equipeEditada) {
      Object.assign(equipeEditada, dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    } else {
      dados.id = v4();
      equipes.push(dados);
      localStorage.setItem("equipes", JSON.stringify(equipes));
    }
    alert("Equipe inscrita. Boa sorte!");
    router.push("/equipes");
  }
  const initialValues = {
    nomeEquipe: "",
    capitao: "",
    membros: "",
    tagEquipe: "",
    pais: "Brasil",
    numeroVitorias: "",
    organizacao: "",
    descricao: "",
    eventos: "",
  };
  const validationSchema = Yup.object().shape({
    nomeEquipe: Yup.string().required("Campo obrigatorio"),
    capitao: Yup.string().required("Campo obrigatorio"),
    membros: Yup.string().required("Campo obrigatorio"),
    tagEquipe: Yup.string().required("Campo obrigatorio"),
    pais: Yup.string().required("Campo obrigatorio"),
    numeroVitorias: Yup.number().required("Campo obrigatorio"),
    organizacao: Yup.string().required("Campo obrigatorio"),
    eventos: Yup.string().required("Campo obrigatorio"),
  });

  useEffect(() => {
    if (Jogadores.length > 0) setJogadoresFiltrados(Jogadores);
  }, [Jogadores]);

  return (
    <Pagina titulo="Cadastro de numeroVitorias">
      <Formik
        initialValues={equipeEditada || initialValues}
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
                <Form.Label>Nome da Equipe:</Form.Label>
                <Form.Control
                  name="nomeEquipe"
                  type="text"
                  value={values.nomeEquipe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nomeEquipe && !errors.nomeEquipe}
                  isInvalid={touched.nomeEquipe && errors.nomeEquipe}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nomeEquipe}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Capitão da Equipe:</Form.Label>
                <Form.Select
                  name="capitao"
                  value={values.capitao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.capitao && !errors.capitao}
                  isInvalid={touched.capitao && errors.capitao}
                >
                  <option value="">Selecione:</option>
                  {JogadoresFiltrados.map((jogador) => (
                    <option key={jogador.nome} value={jogador.nome}>
                      {jogador.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.capitao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Membros:</Form.Label>
                <Form.Select
                  name="membros"
                  value={values.membros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.membros && !errors.membros}
                  isInvalid={touched.membros && errors.membros}
                >
                  <option value="">Selecione:</option>
                  {JogadoresFiltrados.map((jogador) => (
                    <option key={jogador.nome} value={jogador.nome}>
                      {jogador.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.membros}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Tag da Equipe:</Form.Label>
                <InputMask
                  mask="aaaa#99"
                  value={values.tagEquipe}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="tagEquipe"
                      isValid={touched.tagEquipe && !errors.tagEquipe}
                      isInvalid={touched.tagEquipe && errors.tagEquipe}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.tagEquipe}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>País:</Form.Label>
                <Form.Select
                  name="pais"
                  value={values.pais}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.pais && !errors.pais}
                  isInvalid={touched.pais && errors.pais}
                >
                  <option value="">Selecione</option>
                  {paises.map((pais) => (
                    <option key={pais.nome} value={pais.nome}>
                      {pais.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.pais}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Número de Vitórias:</Form.Label>
                <Form.Control
                  name="numeroVitorias"
                  value={values.numeroVitorias}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.numeroVitorias && !errors.numeroVitorias}
                  isInvalid={touched.numeroVitorias && errors.numeroVitorias}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numeroVitorias}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Organização Representante:</Form.Label>
                <Form.Control
                  name="organizacao"
                  value={values.organizacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.organizacao && !errors.organizacao}
                  isInvalid={touched.organizacao && errors.organizacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.organizacao}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Descrição da Equipe:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  rows={3}
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && errors.descricao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descricao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Eventos Participados:</Form.Label>
                <Form.Control
                  type="text"
                  name="eventos"
                  value={values.eventos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.eventos && !errors.eventos}
                  isInvalid={touched.eventos && errors.eventos}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.eventos}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="text-end">
              <Button className="me-2" href="/equipes">
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
