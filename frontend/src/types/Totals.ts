export interface PersonTotals {
  personId: number;
  name: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface GeneralTotals {
  pessoas: PersonTotals[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}