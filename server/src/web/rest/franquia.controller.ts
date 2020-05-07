import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Franquia from '../../domain/franquia.entity';
import { FranquiaService } from '../../service/franquia.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/franquias')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('franquias')
export class FranquiaController {
  logger = new Logger('FranquiaController');

  constructor(private readonly franquiaService: FranquiaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Franquia
  })
  async getAll(@Req() req: Request): Promise<Franquia[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.franquiaService.findAndCount(
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
    type: Franquia
  })
  async getOne(@Param('id') id: string): Promise<Franquia> {
    return await this.franquiaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create franquia' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Franquia
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() franquia: Franquia): Promise<Franquia> {
    console.info(franquia);
    const created = await this.franquiaService.save(franquia);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Franquia', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update franquia' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Franquia
  })
  async put(@Req() req: Request, @Body() franquia: Franquia): Promise<Franquia> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Franquia', franquia.id);

    return await this.franquiaService.update(franquia);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete franquia' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Franquia> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Franquia', id);
    const toDelete = await this.franquiaService.findById(id);
    return await this.franquiaService.delete(toDelete);
  }
}
