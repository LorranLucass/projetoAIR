
"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function LocaisAirsoftPage() {
  const [locaisAirsoft, setLocaisAirsoft] = useState([]);

  
  useEffect(() => {
    const locaisAirsoftLocalStorage = JSON.parse(localStorage.getItem("locaisdejogos"));
    if (locaisAirsoftLocalStorage && Array.isArray(locaisAirsoftLocalStorage)) {
      setLocaisAirsoft(locaisAirsoftLocalStorage);
    } else {
      setLocaisAirsoft([]);
    }
    console.log(locaisAirsoftLocalStorage);
  }, []);

  
  function excluir(local) {
 
    if (window.confirm(`Deseja realmente excluir o local ${local.nome}?`)) {
      const novaLista = locaisAirsoft.filter((item) => item.id !== local.id);
      localStorage.setItem("locaisdejogos", JSON.stringify(novaLista));
      setLocaisAirsoft(novaLista);
      alert("Local de Airsoft excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Locais de Airsoft"}>
      <div className="text-end mb-2">
        <Button href="/locaisdejogos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Local</th>
            <th>Endereço</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Cidade</th>
            <th>Horário de Funcionamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {locaisAirsoft.length > 0 ? (
            locaisAirsoft.map((local) => {
              return (
                <tr key={local.id}>
                  <td>{local.nome}</td>
                  <td>{local.endereco}</td>
                  <td>{local.tipo}</td>
                  <td>{local.capacidade}</td>
                  <td>{local.cidade}</td>
                  <td>{local.horarios}</td>
                  <td className="text-center">
                    
                    <Button
                      className="me-2"
                      href={`/locaisdejogos/form?id=${local.id}`}
                    >
                      <FaPen />
                    </Button>
                    <Button variant="danger" onClick={() => excluir(local)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                Nenhum local de Airsoft cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://st2.depositphotos.com/4249115/6316/i/450/depositphotos_63162269-stock-photo-sniper-stands-with-arms-and.jpg"
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
