"use client";
import '../banner.css';
import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";
import {excluir} from '../../utils/excluir.js'


export default function EquipamentosPage() {
  const [equipamentos, setEquipamentos] = useState([]);


  useEffect(() => {
    const equipamentosLocalStorage =JSON.parse(localStorage.getItem("equipamentos")) || [];
    setEquipamentos(equipamentosLocalStorage);
  }, []);

  function excluir(equipamento) {
    if (window.confirm(`Deseja realmente excluir o equipamento ${equipamento.nomeEquipamento}?`)) {
      const equipamentos = JSON.parse(localStorage.getItem("equipamentos")) || [];
      const novaLista = equipamentos.filter((item) => item.id !== equipamento.id);
      localStorage.setItem("equipamentos", JSON.stringify(novaLista));
      setEquipamentos(novaLista);
      alert("Equipamento excluído com sucesso!");
    }
  }


  return (
    <Pagina titulo={"Lista de equipamentos"}>
      <div className="text-end mb-2">
        <Button href="/equipamentos/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Equipamento</th>
            <th>Tipo</th>
            <th>Fabricante</th>
            <th>Proprietário</th>
            <th>Condição</th>
            <th>Status:</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamento) => {
            return(
              <tr key={equipamento.id}>
                <td>{equipamento.nome}</td>
                <td>{equipamento.Tipo}</td>
                <td>{equipamento.Fabricante}</td>
                <td>{equipamento.Proprietario}</td>
                <td>{equipamento.Condicao}</td>
                <td>{equipamento.Status}</td>
                <td className="text-center">
                  <Button
                    className="me-2" href={`/equipamentos/form?id=${equipamento.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(equipamento)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <div className="my-5">
        <img
          src="https://blog.lazereaventura.com.br/wp-content/uploads/2019/02/como_fazer_a_limpeza_e_manuten%C3%A7%C3%A3o_da_arma_de_airsoft_lazer_e_aventura_shop-810x540.jpg"
          alt="Imagem de Airsoft"
          className="d-block w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
    </Pagina>
  );
}
