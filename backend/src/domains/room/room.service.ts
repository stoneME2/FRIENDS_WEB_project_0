import { createRoom } from "./room.repository";

export async function createRoomService(roomName: any, user: any) {

  const { name } = roomName
  const userId = user.id;

  const result = await createRoom(name, userId);
  console.log(result);
  return result;
}
