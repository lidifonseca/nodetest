import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Phinxlog from '../../domain/phinxlog.entity';
import { PhinxlogService } from '../../service/phinxlog.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/phinxlogs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('phinxlogs')
export class PhinxlogController {
  logger = new Logger('PhinxlogController');

  constructor(private readonly phinxlogService: PhinxlogService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Phinxlog
  })
  async getAll(@Req() req: Request): Promise<Phinxlog[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.phinxlogService.findAndCount(
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
    type: Phinxlog
  })
  async getOne(@Param('id') id: string): Promise<Phinxlog> {
    return await this.phinxlogService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create phinxlog' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Phinxlog
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() phinxlog: Phinxlog): Promise<Phinxlog> {
    const created = await this.phinxlogService.save(phinxlog);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Phinxlog', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update phinxlog' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Phinxlog
  })
  async put(@Req() req: Request, @Body() phinxlog: Phinxlog): Promise<Phinxlog> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Phinxlog', phinxlog.id);
    return await this.phinxlogService.update(phinxlog);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete phinxlog' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Phinxlog> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Phinxlog', id);
    const toDelete = await this.phinxlogService.findById(id);
    return await this.phinxlogService.delete(toDelete);
  }
}
