import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Uf from '../../domain/uf.entity';
import { UfService } from '../../service/uf.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/ufs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('ufs')
export class UfController {
  logger = new Logger('UfController');

  constructor(private readonly ufService: UfService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Uf
  })
  async getAll(@Req() req: Request): Promise<Uf[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.ufService.findAndCount(
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
    type: Uf
  })
  async getOne(@Param('id') id: string): Promise<Uf> {
    return await this.ufService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create uf' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Uf
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() uf: Uf): Promise<Uf> {
    const created = await this.ufService.save(uf);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Uf', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update uf' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Uf
  })
  async put(@Req() req: Request, @Body() uf: Uf): Promise<Uf> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Uf', uf.id);
    return await this.ufService.update(uf);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete uf' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Uf> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Uf', id);
    const toDelete = await this.ufService.findById(id);
    return await this.ufService.delete(toDelete);
  }
}
