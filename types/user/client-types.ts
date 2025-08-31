
export interface Client {

  id: string;

  ruc: string;

  fullName: string;

  email?: string;

  age: number;

  phone?: string | null;

  job?: string | null;

  address?: string | null;

}
