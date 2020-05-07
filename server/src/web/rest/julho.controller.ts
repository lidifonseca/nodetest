import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Julho from '../../domain/julho.entity';
import { JulhoService } from '../../service/julho.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/julhos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('julhos')
export class JulhoController {
  logger = new Logger('JulhoController');

  constructor(private readonly julhoService: JulhoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Julho
  })
  async getAll(@Req() req: Request): Promise<Julho[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.julhoService.findAndCount(
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
    type: Julho
  })
  async getOne(@Param('id') id: string): Promise<Julho> {
    return await this.julhoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create julho' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Julho
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() julho: Julho): Promise<Julho> {
    console.info(julho);
    const created = await this.julhoService.save(julho);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Julho', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update julho' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Julho
  })
  async put(@Req() req: Request, @Body() julho: Julho): Promise<Julho> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Julho', julho.id);

    return await this.julhoService.update(julho);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete julho' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Julho> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Julho', id);
    const toDelete = await this.julhoService.findById(id);
    return await this.julhoService.delete(toDelete);
  }
}
