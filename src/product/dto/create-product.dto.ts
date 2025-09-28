// Importa decorators do class-validator para validar os dados recebidos no DTO
import { IsDateString, IsIn, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

// DTO usado para criar um novo produto
export class CreateProductDto {
  // Campo obrigatório: deve ser string, entre 1 e 255 caracteres
  @IsString()
  @Length(1, 255)
  name: string;

  // Campo opcional: se informado, deve ser string
  @IsOptional()
  @IsString()
  category?: string;

  // Campo obrigatório: deve ser número inteiro, valor mínimo 0
  @IsInt()
  @Min(0)
  quantity: number;

  // Campo obrigatório: deve ser número inteiro, valor mínimo 0
  @IsInt()
  @Min(0)
  minQuantity: number;

  // Campo opcional: se informado, deve ser string em formato de data ISO (YYYY-MM-DD ou ISO completo)
  @IsOptional()
  @IsDateString()
  expirationDate?: string;

  // Campo opcional: se informado, deve estar entre os valores "active" ou "inactive"
  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
