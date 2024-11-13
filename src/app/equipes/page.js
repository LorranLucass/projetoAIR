"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EquipesPage() {
  const [equipes, setEquipes] = useState([]);

  useEffect(() => {
    const equipesLocalStorage = JSON.parse(localStorage.getItem("equipes")) || [];
    setEquipes(equipesLocalStorage);
  }, []);

  function excluir(equipe) {
    if (window.confirm(`Deseja realmente excluir a equipe ${equipe.nomeEquipe}?`)) {
      const novaLista = equipes.filter((item) => item.id !== equipe.id);
      localStorage.setItem("equipes", JSON.stringify(novaLista));
      setEquipes(novaLista);
      alert("Equipe excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo="Lista de Equipes">
      <div className="text-end mb-2">
        <Button href="/equipes/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome:</th>
            <th>Capitão:</th>
            <th>Membros:</th>
            <th>Tag da Equipe:</th>
            <th>País:</th>
            <th>Organização</th>
            <th>Vitórias</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipes.map((equipe) => (
            <tr key={equipe.id}>
              <td>{equipe.nomeEquipe}</td>
              <td>{equipe.capitao}</td>
              <td>{equipe.membros}</td>
              <td>{equipe.tagEquipe}</td>
              <td>{equipe.pais}</td>
              <td>{equipe.organizacao}</td>
              <td>{equipe.numeroVitorias}</td>
              <td className="text-center">
                <Button className="me-2" href={`/equipes/form?id=${equipe.id}`}>
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(equipe)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://www.adrena.me/blog/wp-content/uploads/2020/02/Jogar-airsoft-Veja-1200x675.jpeg"
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
