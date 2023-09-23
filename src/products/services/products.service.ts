import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/product.dto';
import { ProductImage } from '../entities/product-image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,
  ) {}

  //Crear un registro
  /*   async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    await this.productRepo.save(product);

    return product;
  } */

  //Crear un registro con imagen
  async create(productoDto: CreateProductDto) {
    const { images = [], ...productDetails } = productoDto;

    const product = this.productRepo.create({
      ...productDetails,
      images: images.map((image) =>
        this.productImageRepo.create({ url: image }),
      ),
    });
    await this.productRepo.save(product);

    return product;
  }

  //Encontrar un registro
  // findOne(id: number) {
  //   return this.productRepo.findOneBy({ id });
  // }

  //Encontrar un registro con relaciones
  findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: {
        autor: true,
      },
    });
  }

  //Mostrar todos los registros
  findAll() {
    return this.productRepo.find({
      order: { id: 'ASC' },
    });
  }

  //Eliminar un registro
  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return 'Producto eliminado satisfactoriamente';
  }

  //Actualizar un producto
  /*   async update(id: number, cambios: CreateProductDto) {
    const oldProduct = await this.findOne(id);
    const updatedProduct = await this.productRepo.merge(oldProduct, cambios);
    return this.productRepo.save(updatedProduct);
  } */

  //Actualizar un producto con una imagen
  async update(id: number, createProductDto: CreateProductDto) {
    const product = await this.productRepo.preload({
      id: id,
      ...createProductDto,
      images: [],
    });

    await this.productRepo.save(product);
    return product;
  }
}
