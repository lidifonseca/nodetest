import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CidXPtaNovoPadItemIndi from '../../domain/cid-x-pta-novo-pad-item-indi.entity';
import { CidXPtaNovoPadItemIndiService } from '../../service/cid-x-pta-novo-pad-item-indi.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cid-x-pta-novo-pad-item-indis')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cid-x-pta-novo-pad-item-indis')
export class CidXPtaNovoPadItemIndiController {
  logger = new Logger('CidXPtaNovoPadItemIndiController');

  constructor(private readonly cidXPtaNovoPadItemIndiService: CidXPtaNovoPadItemIndiService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CidXPtaNovoPadItemIndi
  })
  async getAll(@Req() req: Request): Promise<CidXPtaNovoPadItemIndi[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidXPtaNovoPadItemIndiService.findAndCount(
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
    type: CidXPtaNovoPadItemIndi
  })
  async getOne(@Param('id') id: string): Promise<CidXPtaNovoPadItemIndi> {
    return await this.cidXPtaNovoPadItemIndiService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cidXPtaNovoPadItemIndi' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CidXPtaNovoPadItemIndi
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndi): Promise<CidXPtaNovoPadItemIndi> {
    const created = await this.cidXPtaNovoPadItemIndiService.save(cidXPtaNovoPadItemIndi);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovoPadItemIndi', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cidXPtaNovoPadItemIndi' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CidXPtaNovoPadItemIndi
  })
  async put(@Req() req: Request, @Body() cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndi): Promise<CidXPtaNovoPadItemIndi> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidXPtaNovoPadItemIndi', cidXPtaNovoPadItemIndi.id);
    return await this.cidXPtaNovoPadItemIndiService.update(cidXPtaNovoPadItemIndi);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cidXPtaNovoPadItemIndi' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CidXPtaNovoPadItemIndi> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CidXPtaNovoPadItemIndi', id);
    const toDelete = await this.cidXPtaNovoPadItemIndiService.findById(id);
    return await this.cidXPtaNovoPadItemIndiService.delete(toDelete);
  }
}
