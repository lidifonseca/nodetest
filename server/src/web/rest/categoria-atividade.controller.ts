import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CategoriaAtividade from '../../domain/categoria-atividade.entity';
import { CategoriaAtividadeService } from '../../service/categoria-atividade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/categoria-atividades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('categoria-atividades')
export class CategoriaAtividadeController {
  logger = new Logger('CategoriaAtividadeController');

  constructor(private readonly categoriaAtividadeService: CategoriaAtividadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CategoriaAtividade
  })
  async getAll(@Req() req: Request): Promise<CategoriaAtividade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.categoriaAtividadeService.findAndCount(
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
    type: CategoriaAtividade
  })
  async getOne(@Param('id') id: string): Promise<CategoriaAtividade> {
    return await this.categoriaAtividadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create categoriaAtividade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CategoriaAtividade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() categoriaAtividade: CategoriaAtividade): Promise<CategoriaAtividade> {
    console.info(categoriaAtividade);
    const created = await this.categoriaAtividadeService.save(categoriaAtividade);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaAtividade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update categoriaAtividade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CategoriaAtividade
  })
  async put(@Req() req: Request, @Body() categoriaAtividade: CategoriaAtividade): Promise<CategoriaAtividade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaAtividade', categoriaAtividade.id);

    return await this.categoriaAtividadeService.update(categoriaAtividade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete categoriaAtividade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CategoriaAtividade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CategoriaAtividade', id);
    const toDelete = await this.categoriaAtividadeService.findById(id);
    return await this.categoriaAtividadeService.delete(toDelete);
  }
}
