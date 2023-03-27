import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Email não pode ser vazio.' })
    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode ser vazio.' })
    @MinLength(5, { message: 'A senha deve conter no mínimo 5 caracteres.' })
    password: string;
}
