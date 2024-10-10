import NextAuth from "next-auth";

type Ability = {
  subject: string;
  action: string[];
};
type Role = {
  abilities: Ability[];
};
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      givenName: string;
      role: Role;
    };
  }
}
