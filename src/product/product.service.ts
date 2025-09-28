// Importa classes e decorators do NestJS para exceções, status HTTP e injeção de dependências
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// Importa os DTOs usados para validação dos dados de entrada
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Importa o decorator para injetar repositórios do TypeORM
import { InjectRepository } from '@nestjs/typeorm';

// Importa a entidade Product que representa a tabela no banco
import { Product } from './entities/product.entity';

// Importa tipos do TypeORM (Repository para consultas e DeleteResult para exclusão)
import { DeleteResult, Repository } from 'typeorm';

// Marca a classe como um serviço que pode ser injetado em outros lugares (ex: Controller)
@Injectable()
export class ProductService {
  // Injeta o repositório da entidade Product para interagir com o banco
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Cria um novo produto no banco
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // `save` insere o registro usando os dados do DTO
    return await this.productRepository.save(createProductDto);
  }

  // Busca todos os produtos
  async findAll() {
    // Retorna todos os registros da tabela
    return await this.productRepository.find();
  }

  // Busca um único produto pelo ID
  async findOne(id: string): Promise<Product> {
    // Procura o produto no banco
    const product = await this.productRepository.findOneBy({ id });

    // Caso não encontre, lança uma exceção HTTP 404
    if (!product) {
      throw new HttpException(`Produto não encontrado`, HttpStatus.NOT_FOUND);
    }
    return product;
  }

  // Atualiza um produto existente
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    // Primeiro garante que o produto existe
    const product = await this.findOne(id);

    // Atualiza os campos do produto com os dados recebidos
    Object.assign(product, updateProductDto);

    // Salva as alterações no banco
    return this.productRepository.save(product);
  }

  // Remove um produto pelo ID
  async remove(id: string): Promise<DeleteResult> {
    // Verifica se o produto existe antes de deletar
    await this.findOne(id);

    // Executa a exclusão no banco
    return await this.productRepository.delete(id);
  }
}
