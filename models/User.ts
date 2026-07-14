export type Role = "usuario" | "admin";

export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  role: Role;
}