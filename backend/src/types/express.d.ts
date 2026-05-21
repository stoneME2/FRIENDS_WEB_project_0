//d 타입 선언 전용 파일
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {}; //이 파일을 모듈로 인식하기 위해