import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function createRoom(roomName: any, ownerId: any) {
    return prisma.room.create({
        data: {
            name: roomName,
            ownerId,
            members: {
                create: {
                    userId: ownerId,
                },
            },
        },
        include: {
            members: true,
        },
    });
}