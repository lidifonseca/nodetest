import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItem from '../../domain/pad-item.entity';
import { PadItemService } from '../../service/pad-item.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-items')
export class PadItemController {
  logger = new Logger('PadItemController');

  constructor(private readonly padItemService: PadItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItem
  })
  async getAll(@Req() req: Request): Promise<PadItem[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemService.findAndCount(
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
    type: PadItem
  })
  async getOne(@Param('id') id: string): Promise<PadItem> {
    return await this.padItemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItem' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItem
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItem: PadItem): Promise<PadItem> {
    console.info(padItem);
    const created = await this.padItemService.save(padItem);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItem' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItem
  })
  async put(@Req() req: Request, @Body() padItem: PadItem): Promise<PadItem> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItem', padItem.id);

    return await this.padItemService.update(padItem);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItem' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItem> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItem', id);
    const toDelete = await this.padItemService.findById(id);
    return await this.padItemService.delete(toDelete);
  }
}
