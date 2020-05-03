import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Pad from '../../domain/pad.entity';
import { PadService } from '../../service/pad.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pads')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pads')
export class PadController {
  logger = new Logger('PadController');

  constructor(private readonly padService: PadService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Pad
  })
  async getAll(@Req() req: Request): Promise<Pad[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padService.findAndCount(
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
    type: Pad
  })
  async getOne(@Param('id') id: string): Promise<Pad> {
    return await this.padService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pad' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Pad
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pad: Pad): Promise<Pad> {
    const created = await this.padService.save(pad);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pad', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pad' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Pad
  })
  async put(@Req() req: Request, @Body() pad: Pad): Promise<Pad> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pad', pad.id);
    return await this.padService.update(pad);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pad' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Pad> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Pad', id);
    const toDelete = await this.padService.findById(id);
    return await this.padService.delete(toDelete);
  }
}
