"use client";
import "../banner.css";
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function JogadoresPage() {
  const [Jogadores, setJogadores] = useState([]);

  useEffect(() => {
    const jogadoresLocalStorage =
      JSON.parse(localStorage.getItem("Jogadores")) || [];
    setJogadores(jogadoresLocalStorage);
    console.log(jogadoresLocalStorage);
  }, []);

  const excluir = (jogador) => {
    if (window.confirm(`Deseja realmente excluir o jogador ${jogador.nome}?`)) {
      const novaLista = Jogadores.filter((item) => item.id !== jogador.id);
      localStorage.setItem("Jogadores", JSON.stringify(novaLista));
      setJogadores(novaLista);
      alert("Jogador excluído com sucesso!");
    }
  };

  return (
    <Pagina titulo={"Lista de Jogadores"}>
      <div className="text-end mb-2">
        <Button href="/Jogadores/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Experiência (anos)</th>
            <th>Equipamento:</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Jogadores.map((jogador) => (
            <tr key={jogador.id}>
              <td>{jogador.nome}</td>
              <td>{jogador.apelido}</td>
              <td>{jogador.cpf}</td>
              <td>{jogador.email}</td>
              <td>{jogador.telefone}</td>
              <td>{jogador.experiencia}</td>
              <td>{jogador.equipamento}</td>
              <td className="text-center">
                <Button
                  className="me-2"
                  href={`/Jogadores/form?id=${jogador.id}`}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(jogador)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://as2.ftcdn.net/v2/jpg/07/49/62/49/1000_F_749624910_sX16v0Bb0pm7eOwNHlsNAL1ZXW30ZYrM.jpg"
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
