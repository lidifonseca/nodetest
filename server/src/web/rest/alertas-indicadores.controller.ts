import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AlertasIndicadores from '../../domain/alertas-indicadores.entity';
import { AlertasIndicadoresService } from '../../service/alertas-indicadores.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/alertas-indicadores')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('alertas-indicadores')
export class AlertasIndicadoresController {
  logger = new Logger('AlertasIndicadoresController');

  constructor(private readonly alertasIndicadoresService: AlertasIndicadoresService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AlertasIndicadores
  })
  async getAll(@Req() req: Request): Promise<AlertasIndicadores[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.alertasIndicadoresService.findAndCount(
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
    type: AlertasIndicadores
  })
  async getOne(@Param('id') id: string): Promise<AlertasIndicadores> {
    return await this.alertasIndicadoresService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create alertasIndicadores' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AlertasIndicadores
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() alertasIndicadores: AlertasIndicadores): Promise<AlertasIndicadores> {
    const created = await this.alertasIndicadoresService.save(alertasIndicadores);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AlertasIndicadores', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update alertasIndicadores' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AlertasIndicadores
  })
  async put(@Req() req: Request, @Body() alertasIndicadores: AlertasIndicadores): Promise<AlertasIndicadores> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AlertasIndicadores', alertasIndicadores.id);
    return await this.alertasIndicadoresService.update(alertasIndicadores);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete alertasIndicadores' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AlertasIndicadores> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AlertasIndicadores', id);
    const toDelete = await this.alertasIndicadoresService.findById(id);
    return await this.alertasIndicadoresService.delete(toDelete);
  }
}
