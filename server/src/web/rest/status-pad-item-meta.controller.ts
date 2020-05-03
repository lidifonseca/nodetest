import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusPadItemMeta from '../../domain/status-pad-item-meta.entity';
import { StatusPadItemMetaService } from '../../service/status-pad-item-meta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-pad-item-metas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-pad-item-metas')
export class StatusPadItemMetaController {
  logger = new Logger('StatusPadItemMetaController');

  constructor(private readonly statusPadItemMetaService: StatusPadItemMetaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusPadItemMeta
  })
  async getAll(@Req() req: Request): Promise<StatusPadItemMeta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusPadItemMetaService.findAndCount(
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
    type: StatusPadItemMeta
  })
  async getOne(@Param('id') id: string): Promise<StatusPadItemMeta> {
    return await this.statusPadItemMetaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusPadItemMeta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusPadItemMeta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusPadItemMeta: StatusPadItemMeta): Promise<StatusPadItemMeta> {
    const created = await this.statusPadItemMetaService.save(statusPadItemMeta);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusPadItemMeta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusPadItemMeta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusPadItemMeta
  })
  async put(@Req() req: Request, @Body() statusPadItemMeta: StatusPadItemMeta): Promise<StatusPadItemMeta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusPadItemMeta', statusPadItemMeta.id);
    return await this.statusPadItemMetaService.update(statusPadItemMeta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusPadItemMeta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusPadItemMeta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusPadItemMeta', id);
    const toDelete = await this.statusPadItemMetaService.findById(id);
    return await this.statusPadItemMetaService.delete(toDelete);
  }
}
