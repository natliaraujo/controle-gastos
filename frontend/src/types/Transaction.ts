export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: string;
  personId: number;
}