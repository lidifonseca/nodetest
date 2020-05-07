import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoMatMed from '../../domain/tipo-mat-med.entity';
import { TipoMatMedService } from '../../service/tipo-mat-med.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-mat-meds')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-mat-meds')
export class TipoMatMedController {
  logger = new Logger('TipoMatMedController');

  constructor(private readonly tipoMatMedService: TipoMatMedService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoMatMed
  })
  async getAll(@Req() req: Request): Promise<TipoMatMed[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoMatMedService.findAndCount(
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
    type: TipoMatMed
  })
  async getOne(@Param('id') id: string): Promise<TipoMatMed> {
    return await this.tipoMatMedService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoMatMed' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoMatMed
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoMatMed: TipoMatMed): Promise<TipoMatMed> {
    console.info(tipoMatMed);
    const created = await this.tipoMatMedService.save(tipoMatMed);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoMatMed', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoMatMed' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoMatMed
  })
  async put(@Req() req: Request, @Body() tipoMatMed: TipoMatMed): Promise<TipoMatMed> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoMatMed', tipoMatMed.id);

    return await this.tipoMatMedService.update(tipoMatMed);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoMatMed' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoMatMed> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoMatMed', id);
    const toDelete = await this.tipoMatMedService.findById(id);
    return await this.tipoMatMedService.delete(toDelete);
  }
}
