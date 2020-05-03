import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoOperadora from '../../domain/tipo-operadora.entity';
import { TipoOperadoraService } from '../../service/tipo-operadora.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-operadoras')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-operadoras')
export class TipoOperadoraController {
  logger = new Logger('TipoOperadoraController');

  constructor(private readonly tipoOperadoraService: TipoOperadoraService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoOperadora
  })
  async getAll(@Req() req: Request): Promise<TipoOperadora[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoOperadoraService.findAndCount(
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
    type: TipoOperadora
  })
  async getOne(@Param('id') id: string): Promise<TipoOperadora> {
    return await this.tipoOperadoraService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoOperadora' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoOperadora
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoOperadora: TipoOperadora): Promise<TipoOperadora> {
    const created = await this.tipoOperadoraService.save(tipoOperadora);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoOperadora', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoOperadora' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoOperadora
  })
  async put(@Req() req: Request, @Body() tipoOperadora: TipoOperadora): Promise<TipoOperadora> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoOperadora', tipoOperadora.id);
    return await this.tipoOperadoraService.update(tipoOperadora);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoOperadora' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoOperadora> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoOperadora', id);
    const toDelete = await this.tipoOperadoraService.findById(id);
    return await this.tipoOperadoraService.delete(toDelete);
  }
}
