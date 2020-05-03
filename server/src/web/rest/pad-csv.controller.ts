import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadCsv from '../../domain/pad-csv.entity';
import { PadCsvService } from '../../service/pad-csv.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-csvs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-csvs')
export class PadCsvController {
  logger = new Logger('PadCsvController');

  constructor(private readonly padCsvService: PadCsvService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadCsv
  })
  async getAll(@Req() req: Request): Promise<PadCsv[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padCsvService.findAndCount(
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
    type: PadCsv
  })
  async getOne(@Param('id') id: string): Promise<PadCsv> {
    return await this.padCsvService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padCsv' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadCsv
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padCsv: PadCsv): Promise<PadCsv> {
    const created = await this.padCsvService.save(padCsv);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadCsv', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padCsv' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadCsv
  })
  async put(@Req() req: Request, @Body() padCsv: PadCsv): Promise<PadCsv> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadCsv', padCsv.id);
    return await this.padCsvService.update(padCsv);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padCsv' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadCsv> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadCsv', id);
    const toDelete = await this.padCsvService.findById(id);
    return await this.padCsvService.delete(toDelete);
  }
}
