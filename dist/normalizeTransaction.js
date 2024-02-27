import moedaParaNumero from "./coinToNumber.js";
export default function normalizarTransacao(transacao) {
    return {
        data: transacao.Data,
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
//# sourceMappingURL=normalizeTransaction.js.map