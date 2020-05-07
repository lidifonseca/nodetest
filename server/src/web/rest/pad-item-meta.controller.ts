import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemMeta from '../../domain/pad-item-meta.entity';
import { PadItemMetaService } from '../../service/pad-item-meta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-metas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-metas')
export class PadItemMetaController {
  logger = new Logger('PadItemMetaController');

  constructor(private readonly padItemMetaService: PadItemMetaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemMeta
  })
  async getAll(@Req() req: Request): Promise<PadItemMeta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemMetaService.findAndCount(
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
    type: PadItemMeta
  })
  async getOne(@Param('id') id: string): Promise<PadItemMeta> {
    return await this.padItemMetaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemMeta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemMeta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemMeta: PadItemMeta): Promise<PadItemMeta> {
    console.info(padItemMeta);
    const created = await this.padItemMetaService.save(padItemMeta);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemMeta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemMeta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemMeta
  })
  async put(@Req() req: Request, @Body() padItemMeta: PadItemMeta): Promise<PadItemMeta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemMeta', padItemMeta.id);

    return await this.padItemMetaService.update(padItemMeta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemMeta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemMeta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemMeta', id);
    const toDelete = await this.padItemMetaService.findById(id);
    return await this.padItemMetaService.delete(toDelete);
  }
}
