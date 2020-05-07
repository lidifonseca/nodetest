import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemIndicadores from '../../domain/pad-item-indicadores.entity';
import { PadItemIndicadoresService } from '../../service/pad-item-indicadores.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-indicadores')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-indicadores')
export class PadItemIndicadoresController {
  logger = new Logger('PadItemIndicadoresController');

  constructor(private readonly padItemIndicadoresService: PadItemIndicadoresService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemIndicadores
  })
  async getAll(@Req() req: Request): Promise<PadItemIndicadores[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemIndicadoresService.findAndCount(
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
    type: PadItemIndicadores
  })
  async getOne(@Param('id') id: string): Promise<PadItemIndicadores> {
    return await this.padItemIndicadoresService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemIndicadores' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemIndicadores
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemIndicadores: PadItemIndicadores): Promise<PadItemIndicadores> {
    console.info(padItemIndicadores);
    const created = await this.padItemIndicadoresService.save(padItemIndicadores);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemIndicadores', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemIndicadores' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemIndicadores
  })
  async put(@Req() req: Request, @Body() padItemIndicadores: PadItemIndicadores): Promise<PadItemIndicadores> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemIndicadores', padItemIndicadores.id);

    return await this.padItemIndicadoresService.update(padItemIndicadores);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemIndicadores' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemIndicadores> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemIndicadores', id);
    const toDelete = await this.padItemIndicadoresService.findById(id);
    return await this.padItemIndicadoresService.delete(toDelete);
  }
}
