import { User } from "@/models/User";

declare global {
  var users: User[] | undefined;
}

if (!global.users) {
  global.users = [];
}

export const users = global.users;