import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import GeoPanico from '../../domain/geo-panico.entity';
import { GeoPanicoService } from '../../service/geo-panico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/geo-panicos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('geo-panicos')
export class GeoPanicoController {
  logger = new Logger('GeoPanicoController');

  constructor(private readonly geoPanicoService: GeoPanicoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: GeoPanico
  })
  async getAll(@Req() req: Request): Promise<GeoPanico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.geoPanicoService.findAndCount(
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
    type: GeoPanico
  })
  async getOne(@Param('id') id: string): Promise<GeoPanico> {
    return await this.geoPanicoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create geoPanico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: GeoPanico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() geoPanico: GeoPanico): Promise<GeoPanico> {
    console.info(geoPanico);
    const created = await this.geoPanicoService.save(geoPanico);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GeoPanico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update geoPanico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GeoPanico
  })
  async put(@Req() req: Request, @Body() geoPanico: GeoPanico): Promise<GeoPanico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GeoPanico', geoPanico.id);

    return await this.geoPanicoService.update(geoPanico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete geoPanico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<GeoPanico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'GeoPanico', id);
    const toDelete = await this.geoPanicoService.findById(id);
    return await this.geoPanicoService.delete(toDelete);
  }
}
