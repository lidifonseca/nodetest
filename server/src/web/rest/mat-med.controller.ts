import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import MatMed from '../../domain/mat-med.entity';
import { MatMedService } from '../../service/mat-med.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/mat-meds')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('mat-meds')
export class MatMedController {
  logger = new Logger('MatMedController');

  constructor(private readonly matMedService: MatMedService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: MatMed
  })
  async getAll(@Req() req: Request): Promise<MatMed[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.matMedService.findAndCount(
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
    type: MatMed
  })
  async getOne(@Param('id') id: string): Promise<MatMed> {
    return await this.matMedService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create matMed' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: MatMed
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() matMed: MatMed): Promise<MatMed> {
    const created = await this.matMedService.save(matMed);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MatMed', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update matMed' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: MatMed
  })
  async put(@Req() req: Request, @Body() matMed: MatMed): Promise<MatMed> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'MatMed', matMed.id);
    return await this.matMedService.update(matMed);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete matMed' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<MatMed> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'MatMed', id);
    const toDelete = await this.matMedService.findById(id);
    return await this.matMedService.delete(toDelete);
  }
}
