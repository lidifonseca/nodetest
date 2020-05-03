import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AlertasResultadosEsperados from '../../domain/alertas-resultados-esperados.entity';
import { AlertasResultadosEsperadosService } from '../../service/alertas-resultados-esperados.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/alertas-resultados-esperados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('alertas-resultados-esperados')
export class AlertasResultadosEsperadosController {
  logger = new Logger('AlertasResultadosEsperadosController');

  constructor(private readonly alertasResultadosEsperadosService: AlertasResultadosEsperadosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AlertasResultadosEsperados
  })
  async getAll(@Req() req: Request): Promise<AlertasResultadosEsperados[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.alertasResultadosEsperadosService.findAndCount(
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
    type: AlertasResultadosEsperados
  })
  async getOne(@Param('id') id: string): Promise<AlertasResultadosEsperados> {
    return await this.alertasResultadosEsperadosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create alertasResultadosEsperados' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AlertasResultadosEsperados
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() alertasResultadosEsperados: AlertasResultadosEsperados): Promise<AlertasResultadosEsperados> {
    const created = await this.alertasResultadosEsperadosService.save(alertasResultadosEsperados);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AlertasResultadosEsperados', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update alertasResultadosEsperados' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AlertasResultadosEsperados
  })
  async put(@Req() req: Request, @Body() alertasResultadosEsperados: AlertasResultadosEsperados): Promise<AlertasResultadosEsperados> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AlertasResultadosEsperados', alertasResultadosEsperados.id);
    return await this.alertasResultadosEsperadosService.update(alertasResultadosEsperados);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete alertasResultadosEsperados' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AlertasResultadosEsperados> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AlertasResultadosEsperados', id);
    const toDelete = await this.alertasResultadosEsperadosService.findById(id);
    return await this.alertasResultadosEsperadosService.delete(toDelete);
  }
}
