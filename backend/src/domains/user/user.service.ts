import bcrypt from "bcrypt";
import { createUser, findEmailUser } from "./user.repository";
import jwt from "jsonwebtoken";
import {
  SignupDto,
  LoginDto,
  LoginResponseDto,
  MeResponseDto,
} from "./user.dto";
import { User } from "@prisma/client";

export async function signupUserService(
  user: SignupDto,
): Promise<MeResponseDto> {
  const { nickname, email, password } = user;

  if (!nickname || !email || !password) {
    throw new Error("모든 항목을 입력해주시길 바랍니다.");
  }

  const existingUser = await findEmailUser(email);

  if (existingUser) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  createUser(nickname, email, hashedPassword);

  return {
    email: user.email,
    nickname: user.nickname,
  };
}

export async function loginUserService(
  user: LoginDto,
): Promise<LoginResponseDto> {
  const { email, password } = user;

  if (!email || !password) {
    throw new Error("모든 항목을 입력해주시길 바랍니다.");
  }

  const existingUser = await findEmailUser(email);

  if (!existingUser) {
    throw new Error("존재하지 않는 이메일입니다.");
  }

  const passwordValid = await bcrypt.compare(password, existingUser.password);

  if (!passwordValid) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const token = jwt.sign(
    {
      type: "JWT",
      user: existingUser.id,
      email: existingUser.email,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: process.env.EXPIREIN! as jwt.SignOptions["expiresIn"], //env 값은 런타임에 들어옴, expiresIn => 특수 타입으로 정의되어 있음 ex) "15m"
    },
  );

  return { token };
}

export function getUserService(user: User): MeResponseDto {
  const { email, nickname } = user;

  return {
    email: user.email,
    nickname: user.nickname,
  };
}
