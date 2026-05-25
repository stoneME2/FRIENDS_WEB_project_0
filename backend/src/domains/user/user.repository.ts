import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function findEmailUser(email: any) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUser(nickname: any, email: any, hashedPassword: any) {
  return prisma.user.create({
    data: {
      nickname,
      email,
      password: hashedPassword,
    },
  });
}

