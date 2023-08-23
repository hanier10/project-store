import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Marca } from './marca.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Modelo {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id?: number;

  @PrimaryGeneratedColumn({ type: 'int4' })
  marca_id: number;

  @Column({ type: 'varchar', nullable: false })
  nombre: string;

  @Column({ type: 'int8', nullable: false })
  user_id: number;

  // Relaciones

  @ManyToOne(() => Marca)
  @JoinColumn({
    name: 'marca_id', //el campo que relaciona a mi tabla
    referencedColumnName: 'id', //este es el id de la tabla a relacionar
  })
  marca: Marca;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  autor: User;
}
