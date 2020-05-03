import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Periodo from '../../domain/periodo.entity';
import { PeriodoService } from '../../service/periodo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/periodos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('periodos')
export class PeriodoController {
  logger = new Logger('PeriodoController');

  constructor(private readonly periodoService: PeriodoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Periodo
  })
  async getAll(@Req() req: Request): Promise<Periodo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.periodoService.findAndCount(
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
    type: Periodo
  })
  async getOne(@Param('id') id: string): Promise<Periodo> {
    return await this.periodoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create periodo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Periodo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() periodo: Periodo): Promise<Periodo> {
    const created = await this.periodoService.save(periodo);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Periodo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update periodo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Periodo
  })
  async put(@Req() req: Request, @Body() periodo: Periodo): Promise<Periodo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Periodo', periodo.id);
    return await this.periodoService.update(periodo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete periodo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Periodo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Periodo', id);
    const toDelete = await this.periodoService.findById(id);
    return await this.periodoService.delete(toDelete);
  }
}
