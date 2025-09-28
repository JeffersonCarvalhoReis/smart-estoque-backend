import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type ProductStatus = 'active' | 'inactive';

@Entity({ name: 'tb_products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ length: 255, nullable: true })
  category?: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', name: 'min_quantity', default: 0 })
  minQuantity: number;

  @Column({ type: 'timestamp', nullable: true })
  expirationDate?: Date;

  @Column({ type: 'varchar', length: 10, default: 'active' })
  status: ProductStatus;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
