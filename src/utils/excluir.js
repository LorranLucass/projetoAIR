export function excluir(key, localStorage) {
  if (window.confirm(`Deseja realmente excluir o equipamento ${key.nomeEquipamento}?`)) {
    const equipamentos = JSON.parse(localStorage.getItem(localStorage)) || [];
    const novaLista = equipamentos.filter((item) => item.id !== key.id);
    localStorage.setItem(localStorage, JSON.stringify(novaLista));
    setEquipamentos(novaLista);
    alert("Equipamento excluído com sucesso!");
  }
}
