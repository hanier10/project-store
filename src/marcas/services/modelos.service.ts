import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Modelo } from '../entities/modelo.entity';
import { CreateModeloDto } from '../dto/modelo.dto';

@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private modeloRepo: Repository<Modelo>,
  ) {}

  async create(createModeloDto: CreateModeloDto) {
    const modelo = this.modeloRepo.create(createModeloDto);
    await this.modeloRepo.save(modelo);
    return modelo;
  }

  //Encontrar un modelo
  // findOne(id: number){
  //     return this.modeloRepo.findOneBy({id})
  // }

  findOne(id: number) {
    return this.modeloRepo.findOne({
      where: { id },
      relations: {
        marca: true,
        autor: true,
      },
    });
  }

  findAll() {
    return this.modeloRepo.find({
      order: { id: 'ASC' },
    });
  }

  async remove(id: number) {
    const modelo = await this.findOne(id);
    await this.modeloRepo.remove(modelo);
    return 'Registro eliminado correctamente';
  }

  async update(id: number, cambios: CreateModeloDto) {
    const oldModel = await this.findOne(id);
    const updateModel = await this.modeloRepo.merge(oldModel, cambios);
    return this.modeloRepo.save(updateModel);
  }
}
