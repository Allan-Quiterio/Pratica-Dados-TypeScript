import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizeTransaction.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    preencherTabela(transacoes);
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return;
    transacoes.forEach((item) => {
        tabela.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>R$ ${item.moeda}</td>
        <td>${item.pagamento}</td>
        <td>${item.status}</td>
      </tr>
    `;
    });
}
handleData();
//# sourceMappingURL=script.js.map