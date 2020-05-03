import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoUnidade from '../../domain/tipo-unidade.entity';
import { TipoUnidadeService } from '../../service/tipo-unidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-unidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-unidades')
export class TipoUnidadeController {
  logger = new Logger('TipoUnidadeController');

  constructor(private readonly tipoUnidadeService: TipoUnidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoUnidade
  })
  async getAll(@Req() req: Request): Promise<TipoUnidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoUnidadeService.findAndCount(
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
    type: TipoUnidade
  })
  async getOne(@Param('id') id: string): Promise<TipoUnidade> {
    return await this.tipoUnidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoUnidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoUnidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoUnidade: TipoUnidade): Promise<TipoUnidade> {
    const created = await this.tipoUnidadeService.save(tipoUnidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoUnidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoUnidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoUnidade
  })
  async put(@Req() req: Request, @Body() tipoUnidade: TipoUnidade): Promise<TipoUnidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoUnidade', tipoUnidade.id);
    return await this.tipoUnidadeService.update(tipoUnidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoUnidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoUnidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoUnidade', id);
    const toDelete = await this.tipoUnidadeService.findById(id);
    return await this.tipoUnidadeService.delete(toDelete);
  }
}
