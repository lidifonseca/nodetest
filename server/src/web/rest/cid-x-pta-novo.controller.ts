import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CidXPtaNovo from '../../domain/cid-x-pta-novo.entity';
import { CidXPtaNovoService } from '../../service/cid-x-pta-novo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cid-x-pta-novos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cid-x-pta-novos')
export class CidXPtaNovoController {
  logger = new Logger('CidXPtaNovoController');

  constructor(private readonly cidXPtaNovoService: CidXPtaNovoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CidXPtaNovo
  })
  async getAll(@Req() req: Request): Promise<CidXPtaNovo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidXPtaNovoService.findAndCount(
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
    type: CidXPtaNovo
  })
  async getOne(@Param('id') id: string): Promise<CidXPtaNovo> {
    return await this.cidXPtaNovoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cidXPtaNovo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CidXPtaNovo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cidXPtaNovo: CidXPtaNovo): Promise<CidXPtaNovo> {
    const created = await this.cidXPtaNovoService.save(cidXPtaNovo);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cidXPtaNovo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CidXPtaNovo
  })
  async put(@Req() req: Request, @Body() cidXPtaNovo: CidXPtaNovo): Promise<CidXPtaNovo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovo', cidXPtaNovo.id);
    return await this.cidXPtaNovoService.update(cidXPtaNovo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cidXPtaNovo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CidXPtaNovo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CidXPtaNovo', id);
    const toDelete = await this.cidXPtaNovoService.findById(id);
    return await this.cidXPtaNovoService.delete(toDelete);
  }
}
