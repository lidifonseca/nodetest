import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Maio from '../../domain/maio.entity';
import { MaioService } from '../../service/maio.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/maios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('maios')
export class MaioController {
  logger = new Logger('MaioController');

  constructor(private readonly maioService: MaioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Maio
  })
  async getAll(@Req() req: Request): Promise<Maio[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.maioService.findAndCount(
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
    type: Maio
  })
  async getOne(@Param('id') id: string): Promise<Maio> {
    return await this.maioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create maio' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Maio
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() maio: Maio): Promise<Maio> {
    const created = await this.maioService.save(maio);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Maio', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update maio' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Maio
  })
  async put(@Req() req: Request, @Body() maio: Maio): Promise<Maio> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Maio', maio.id);
    return await this.maioService.update(maio);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete maio' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Maio> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Maio', id);
    const toDelete = await this.maioService.findById(id);
    return await this.maioService.delete(toDelete);
  }
}
