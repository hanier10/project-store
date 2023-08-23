import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './entities/marca.entity';
import { Modelo } from './entities/modelo.entity';
import { MarcasService } from './services/marcas.service';
import { ModelosService } from './services/modelos.service';
import { MarcasController } from './controllers/marcas.controller';
import { ModelosController } from './controllers/modelos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Marca, Modelo])],
  controllers: [MarcasController, ModelosController],
  providers: [MarcasService, ModelosService],
})
export class MarcasModule {}
