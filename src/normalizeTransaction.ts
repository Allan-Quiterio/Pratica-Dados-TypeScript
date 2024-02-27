import moedaParaNumero from "./coinToNumber.js";
import stringToDate from "./stringToDate.js";

declare global {
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
    ["Valor (R$)"]: string;
  }

  interface ITransacao {
    data: Date;
    email: string;
    id: number;
    nome: string;
    status: Status;
    moeda: string;
    valor: number | null;
    pagamento: FormaPagamento;
    novo: boolean;
  }
}

export default function normalizarTransacao(
  transacao: ITransacaoApi
): ITransacao {
  return {
    data: stringToDate(transacao.Data),
    email: transacao.Email,
    id: transacao.ID,
    nome: transacao.Nome,
    status: transacao.Status,
    moeda: transacao["Valor (R$)"],
    valor: moedaParaNumero(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}
