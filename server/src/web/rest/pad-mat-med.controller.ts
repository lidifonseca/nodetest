import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadMatMed from '../../domain/pad-mat-med.entity';
import { PadMatMedService } from '../../service/pad-mat-med.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-mat-meds')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-mat-meds')
export class PadMatMedController {
  logger = new Logger('PadMatMedController');

  constructor(private readonly padMatMedService: PadMatMedService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadMatMed
  })
  async getAll(@Req() req: Request): Promise<PadMatMed[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padMatMedService.findAndCount(
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
    type: PadMatMed
  })
  async getOne(@Param('id') id: string): Promise<PadMatMed> {
    return await this.padMatMedService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padMatMed' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadMatMed
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padMatMed: PadMatMed): Promise<PadMatMed> {
    console.info(padMatMed);
    const created = await this.padMatMedService.save(padMatMed);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadMatMed', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padMatMed' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadMatMed
  })
  async put(@Req() req: Request, @Body() padMatMed: PadMatMed): Promise<PadMatMed> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadMatMed', padMatMed.id);

    return await this.padMatMedService.update(padMatMed);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padMatMed' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadMatMed> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadMatMed', id);
    const toDelete = await this.padMatMedService.findById(id);
    return await this.padMatMedService.delete(toDelete);
  }
}
