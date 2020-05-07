import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import IndicadoresValores from '../../domain/indicadores-valores.entity';
import { IndicadoresValoresService } from '../../service/indicadores-valores.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/indicadores-valores')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('indicadores-valores')
export class IndicadoresValoresController {
  logger = new Logger('IndicadoresValoresController');

  constructor(private readonly indicadoresValoresService: IndicadoresValoresService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: IndicadoresValores
  })
  async getAll(@Req() req: Request): Promise<IndicadoresValores[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.indicadoresValoresService.findAndCount(
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
    type: IndicadoresValores
  })
  async getOne(@Param('id') id: string): Promise<IndicadoresValores> {
    return await this.indicadoresValoresService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create indicadoresValores' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: IndicadoresValores
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() indicadoresValores: IndicadoresValores): Promise<IndicadoresValores> {
    console.info(indicadoresValores);
    const created = await this.indicadoresValoresService.save(indicadoresValores);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'IndicadoresValores', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update indicadoresValores' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: IndicadoresValores
  })
  async put(@Req() req: Request, @Body() indicadoresValores: IndicadoresValores): Promise<IndicadoresValores> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'IndicadoresValores', indicadoresValores.id);

    return await this.indicadoresValoresService.update(indicadoresValores);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete indicadoresValores' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<IndicadoresValores> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'IndicadoresValores', id);
    const toDelete = await this.indicadoresValoresService.findById(id);
    return await this.indicadoresValoresService.delete(toDelete);
  }
}
