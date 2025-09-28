import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160 })
  name: string;

  @Index({ unique: true })
  @Column({ unique: true, length: 88 })
  slug: string;

  @Column()
  ownerId: number;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: 'active' | 'suspended' | 'pending' | 'deleted';

  @Column({ length: 3, default: 'USD' })
  currency: string;

  @Column()
  locale: string;

  @Column()
  isActive: boolean;

  @Column({ length: 64, default: 'UTC' })
  timezone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
