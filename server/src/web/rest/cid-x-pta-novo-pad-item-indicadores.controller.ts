import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CidXPtaNovoPadItemIndicadores from '../../domain/cid-x-pta-novo-pad-item-indicadores.entity';
import { CidXPtaNovoPadItemIndicadoresService } from '../../service/cid-x-pta-novo-pad-item-indicadores.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cid-x-pta-novo-pad-item-indicadores')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cid-x-pta-novo-pad-item-indicadores')
export class CidXPtaNovoPadItemIndicadoresController {
  logger = new Logger('CidXPtaNovoPadItemIndicadoresController');

  constructor(private readonly cidXPtaNovoPadItemIndicadoresService: CidXPtaNovoPadItemIndicadoresService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CidXPtaNovoPadItemIndicadores
  })
  async getAll(@Req() req: Request): Promise<CidXPtaNovoPadItemIndicadores[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidXPtaNovoPadItemIndicadoresService.findAndCount(
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
    type: CidXPtaNovoPadItemIndicadores
  })
  async getOne(@Param('id') id: string): Promise<CidXPtaNovoPadItemIndicadores> {
    return await this.cidXPtaNovoPadItemIndicadoresService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cidXPtaNovoPadItemIndicadores' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CidXPtaNovoPadItemIndicadores
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadores
  ): Promise<CidXPtaNovoPadItemIndicadores> {
    const created = await this.cidXPtaNovoPadItemIndicadoresService.save(cidXPtaNovoPadItemIndicadores);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovoPadItemIndicadores', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cidXPtaNovoPadItemIndicadores' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CidXPtaNovoPadItemIndicadores
  })
  async put(
    @Req() req: Request,
    @Body() cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadores
  ): Promise<CidXPtaNovoPadItemIndicadores> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovoPadItemIndicadores', cidXPtaNovoPadItemIndicadores.id);
    return await this.cidXPtaNovoPadItemIndicadoresService.update(cidXPtaNovoPadItemIndicadores);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cidXPtaNovoPadItemIndicadores' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CidXPtaNovoPadItemIndicadores> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CidXPtaNovoPadItemIndicadores', id);
    const toDelete = await this.cidXPtaNovoPadItemIndicadoresService.findById(id);
    return await this.cidXPtaNovoPadItemIndicadoresService.delete(toDelete);
  }
}
