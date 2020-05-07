import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Resultados from '../../domain/resultados.entity';
import { ResultadosService } from '../../service/resultados.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/resultados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('resultados')
export class ResultadosController {
  logger = new Logger('ResultadosController');

  constructor(private readonly resultadosService: ResultadosService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Resultados
  })
  async getAll(@Req() req: Request): Promise<Resultados[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.resultadosService.findAndCount(
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
    type: Resultados
  })
  async getOne(@Param('id') id: string): Promise<Resultados> {
    return await this.resultadosService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create resultados' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Resultados
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() resultados: Resultados): Promise<Resultados> {
    console.info(resultados);
    const created = await this.resultadosService.save(resultados);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Resultados', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update resultados' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Resultados
  })
  async put(@Req() req: Request, @Body() resultados: Resultados): Promise<Resultados> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Resultados', resultados.id);

    return await this.resultadosService.update(resultados);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete resultados' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Resultados> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Resultados', id);
    const toDelete = await this.resultadosService.findById(id);
    return await this.resultadosService.delete(toDelete);
  }
}
