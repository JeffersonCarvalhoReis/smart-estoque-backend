// Importa os decorators do NestJS usados para definir as rotas e parâmetros
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

// Importa o service que contém a regra de negócio e interação com o banco
import { ProductService } from './product.service';

// Importa os DTOs usados para validação e tipagem dos dados
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Define que esse controller responde a requisições no caminho base "/products"
@Controller('products')
export class ProductController {
  // Injeta o ProductService no controller (injeção de dependência)
  constructor(private readonly productService: ProductService) {}

  // Rota POST /products
  // Recebe um body no formato de CreateProductDto e delega a criação para o service
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Rota GET /products
  // Retorna todos os produtos
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Rota GET /products/:id
  // Recebe o parâmetro "id" da URL e busca um único produto
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  // Rota PATCH /products/:id
  // Atualiza parcialmente um produto existente com os dados do UpdateProductDto
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  // Rota DELETE /products/:id
  // Remove um produto pelo id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
