import Estatisticas from "./Statistics.js";
import { ICountList } from "./countBy.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizeTransaction.js";

async function handleData() {
  const data = await fetchData<ITransacaoApi[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (!data) return;

  const transacoes = data.map(normalizarTransacao);

  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: ICountList, containerId: string): void {
  const containerElement = document.getElementById(containerId);

  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `
        <p>${key}: ${lista[key]}</p>
      `;
    });
  }
}

function preencherEstatisticas(transacoes: ITransacao[]): void {
  const data = new Estatisticas(transacoes);

  const totalElement = document.querySelector<HTMLElement>("#total span");

  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  preencherLista(data.pagamento, "pagamentos");
  preencherLista(data.status, "status");

  const melhorDia = document.getElementById("melhorDia");

  if (melhorDia) {
    melhorDia.innerHTML += data.melhorDia[0];
  }
}

function preencherTabela(transacoes: ITransacao[]): void {
  const tabela = document.querySelector("#transacoes tbody");
  if (!tabela) return;

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
