import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient();

export function findEmailUser(email: any) {
  prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function signup(nickname: any, email: any, hashedPassword: any) {
  prisma.user.create({
    data: {
      nickname,
      email,
      password: hashedPassword,
    },
  });
}
