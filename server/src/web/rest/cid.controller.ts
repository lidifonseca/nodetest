import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Cid from '../../domain/cid.entity';
import { CidService } from '../../service/cid.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cids')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cids')
export class CidController {
  logger = new Logger('CidController');

  constructor(private readonly cidService: CidService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Cid
  })
  async getAll(@Req() req: Request): Promise<Cid[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidService.findAndCount(
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
    type: Cid
  })
  async getOne(@Param('id') id: string): Promise<Cid> {
    return await this.cidService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cid' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cid
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cid: Cid): Promise<Cid> {
    console.info(cid);
    const created = await this.cidService.save(cid);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cid', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cid' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Cid
  })
  async put(@Req() req: Request, @Body() cid: Cid): Promise<Cid> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Cid', cid.id);

    return await this.cidService.update(cid);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cid' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Cid> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Cid', id);
    const toDelete = await this.cidService.findById(id);
    return await this.cidService.delete(toDelete);
  }
}
