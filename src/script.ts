import fetchData from "./fetchData.js";

type FormaPagamento = "Cartão de Crédito" | "Boleto";
type Status =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornada";

interface ITransacaoApi {
  Data: string;
  Email: string;
  ID: number;
  Nome: string;
  Status: Status;
  ["Cliente Novo"]: 0 | 1;
  ["Forma de Pagamento"]: FormaPagamento;
  ["Valor (R$)"]: number;
}

async function handleData() {
  const data = await fetchData<ITransacaoApi[]>(
    "https://api.origamid.dev/json/transacoes.json"
  );

  if (data) {
  }
}

handleData();
