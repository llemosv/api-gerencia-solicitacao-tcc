import { IsNotEmpty } from 'class-validator';

export class UpdatePeopleDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    fl_ativo: boolean;

    @IsNotEmpty()
    id_tipo_pessoa: string;
}
