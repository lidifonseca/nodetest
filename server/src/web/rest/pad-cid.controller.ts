import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadCid from '../../domain/pad-cid.entity';
import { PadCidService } from '../../service/pad-cid.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-cids')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-cids')
export class PadCidController {
  logger = new Logger('PadCidController');

  constructor(private readonly padCidService: PadCidService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadCid
  })
  async getAll(@Req() req: Request): Promise<PadCid[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padCidService.findAndCount(
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
    type: PadCid
  })
  async getOne(@Param('id') id: string): Promise<PadCid> {
    return await this.padCidService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padCid' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadCid
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padCid: PadCid): Promise<PadCid> {
    const created = await this.padCidService.save(padCid);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadCid', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padCid' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadCid
  })
  async put(@Req() req: Request, @Body() padCid: PadCid): Promise<PadCid> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadCid', padCid.id);
    return await this.padCidService.update(padCid);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padCid' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadCid> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadCid', id);
    const toDelete = await this.padCidService.findById(id);
    return await this.padCidService.delete(toDelete);
  }
}
