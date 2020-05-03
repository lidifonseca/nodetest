import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemHistDataIncComp from '../../domain/pad-item-hist-data-inc-comp.entity';
import { PadItemHistDataIncCompService } from '../../service/pad-item-hist-data-inc-comp.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-hist-data-inc-comps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-hist-data-inc-comps')
export class PadItemHistDataIncCompController {
  logger = new Logger('PadItemHistDataIncCompController');

  constructor(private readonly padItemHistDataIncCompService: PadItemHistDataIncCompService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemHistDataIncComp
  })
  async getAll(@Req() req: Request): Promise<PadItemHistDataIncComp[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemHistDataIncCompService.findAndCount(
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
    type: PadItemHistDataIncComp
  })
  async getOne(@Param('id') id: string): Promise<PadItemHistDataIncComp> {
    return await this.padItemHistDataIncCompService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemHistDataIncComp' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemHistDataIncComp
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemHistDataIncComp: PadItemHistDataIncComp): Promise<PadItemHistDataIncComp> {
    const created = await this.padItemHistDataIncCompService.save(padItemHistDataIncComp);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemHistDataIncComp', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemHistDataIncComp' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemHistDataIncComp
  })
  async put(@Req() req: Request, @Body() padItemHistDataIncComp: PadItemHistDataIncComp): Promise<PadItemHistDataIncComp> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemHistDataIncComp', padItemHistDataIncComp.id);
    return await this.padItemHistDataIncCompService.update(padItemHistDataIncComp);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemHistDataIncComp' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemHistDataIncComp> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemHistDataIncComp', id);
    const toDelete = await this.padItemHistDataIncCompService.findById(id);
    return await this.padItemHistDataIncCompService.delete(toDelete);
  }
}
