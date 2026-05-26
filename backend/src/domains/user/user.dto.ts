export interface SignupDto {
    email: string;
    password: string;
    nickname: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    token: string;
}

export interface MeResponseDto {
    email: string;
    nickname: string;
}