import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Indicadores from '../../domain/indicadores.entity';
import { IndicadoresService } from '../../service/indicadores.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/indicadores')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('indicadores')
export class IndicadoresController {
  logger = new Logger('IndicadoresController');

  constructor(private readonly indicadoresService: IndicadoresService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Indicadores
  })
  async getAll(@Req() req: Request): Promise<Indicadores[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.indicadoresService.findAndCount(
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
    type: Indicadores
  })
  async getOne(@Param('id') id: string): Promise<Indicadores> {
    return await this.indicadoresService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create indicadores' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Indicadores
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() indicadores: Indicadores): Promise<Indicadores> {
    const created = await this.indicadoresService.save(indicadores);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Indicadores', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update indicadores' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Indicadores
  })
  async put(@Req() req: Request, @Body() indicadores: Indicadores): Promise<Indicadores> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Indicadores', indicadores.id);
    return await this.indicadoresService.update(indicadores);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete indicadores' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Indicadores> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Indicadores', id);
    const toDelete = await this.indicadoresService.findById(id);
    return await this.indicadoresService.delete(toDelete);
  }
}
