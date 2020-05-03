import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CategoriaUnidade from '../../domain/categoria-unidade.entity';
import { CategoriaUnidadeService } from '../../service/categoria-unidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/categoria-unidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('categoria-unidades')
export class CategoriaUnidadeController {
  logger = new Logger('CategoriaUnidadeController');

  constructor(private readonly categoriaUnidadeService: CategoriaUnidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CategoriaUnidade
  })
  async getAll(@Req() req: Request): Promise<CategoriaUnidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.categoriaUnidadeService.findAndCount(
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
    type: CategoriaUnidade
  })
  async getOne(@Param('id') id: string): Promise<CategoriaUnidade> {
    return await this.categoriaUnidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create categoriaUnidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CategoriaUnidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() categoriaUnidade: CategoriaUnidade): Promise<CategoriaUnidade> {
    const created = await this.categoriaUnidadeService.save(categoriaUnidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaUnidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update categoriaUnidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CategoriaUnidade
  })
  async put(@Req() req: Request, @Body() categoriaUnidade: CategoriaUnidade): Promise<CategoriaUnidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaUnidade', categoriaUnidade.id);
    return await this.categoriaUnidadeService.update(categoriaUnidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete categoriaUnidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CategoriaUnidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CategoriaUnidade', id);
    const toDelete = await this.categoriaUnidadeService.findById(id);
    return await this.categoriaUnidadeService.delete(toDelete);
  }
}
