// Importa decorators do TypeORM para mapear a classe como entidade e colunas no banco
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// Define um tipo restrito para o campo status (apenas 'active' ou 'inactive')
export type ProductStatus = 'active' | 'inactive';

// Marca a classe como uma entidade do TypeORM e define o nome da tabela no banco
@Entity({ name: 'tb_products' })
export class Product {
  // Coluna ID primária gerada automaticamente no formato UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Coluna obrigatória, string de até 255 caracteres
  @Column({ length: 255, nullable: false })
  name: string;

  // Coluna opcional (nullable: true), string de até 255 caracteres
  @Column({ length: 255, nullable: true })
  category?: string;

  // Coluna numérica inteira, começa em 0 caso não seja informada
  @Column({ type: 'int', default: 0 })
  quantity: number;

  // Coluna numérica inteira, salva no banco com o nome "min_quantity"
  // começa em 0 caso não seja informada
  @Column({ type: 'int', name: 'min_quantity', default: 0 })
  minQuantity: number;

  // Coluna do tipo data/hora, pode ser nula
  @Column({ type: 'timestamp', nullable: true })
  expirationDate?: Date;

  // Coluna string de até 10 caracteres, valor padrão é "active"
  @Column({ type: 'varchar', length: 10, default: 'active' })
  status: ProductStatus;

  // Coluna que o TypeORM atualiza automaticamente sempre que o registro é modificado
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Coluna preenchida automaticamente pelo TypeORM quando o registro é criado
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
