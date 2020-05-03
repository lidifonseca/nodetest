import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Categoria from '../../domain/categoria.entity';
import { CategoriaService } from '../../service/categoria.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/categorias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('categorias')
export class CategoriaController {
  logger = new Logger('CategoriaController');

  constructor(private readonly categoriaService: CategoriaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Categoria
  })
  async getAll(@Req() req: Request): Promise<Categoria[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.categoriaService.findAndCount(
      {
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder()
      },
      filters
    );
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Categoria
  })
  async getOne(@Param('id') id: string): Promise<Categoria> {
    return await this.categoriaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create categoria' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Categoria
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() categoria: Categoria): Promise<Categoria> {
    const created = await this.categoriaService.save(categoria);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Categoria', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update categoria' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Categoria
  })
  async put(@Req() req: Request, @Body() categoria: Categoria): Promise<Categoria> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Categoria', categoria.id);
    return await this.categoriaService.update(categoria);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete categoria' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Categoria> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Categoria', id);
    const toDelete = await this.categoriaService.findById(id);
    return await this.categoriaService.delete(toDelete);
  }
}
