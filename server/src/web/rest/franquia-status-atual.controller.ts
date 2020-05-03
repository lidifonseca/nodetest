import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import FranquiaStatusAtual from '../../domain/franquia-status-atual.entity';
import { FranquiaStatusAtualService } from '../../service/franquia-status-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/franquia-status-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('franquia-status-atuals')
export class FranquiaStatusAtualController {
  logger = new Logger('FranquiaStatusAtualController');

  constructor(private readonly franquiaStatusAtualService: FranquiaStatusAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FranquiaStatusAtual
  })
  async getAll(@Req() req: Request): Promise<FranquiaStatusAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.franquiaStatusAtualService.findAndCount(
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
    type: FranquiaStatusAtual
  })
  async getOne(@Param('id') id: string): Promise<FranquiaStatusAtual> {
    return await this.franquiaStatusAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create franquiaStatusAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FranquiaStatusAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() franquiaStatusAtual: FranquiaStatusAtual): Promise<FranquiaStatusAtual> {
    const created = await this.franquiaStatusAtualService.save(franquiaStatusAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaStatusAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update franquiaStatusAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FranquiaStatusAtual
  })
  async put(@Req() req: Request, @Body() franquiaStatusAtual: FranquiaStatusAtual): Promise<FranquiaStatusAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaStatusAtual', franquiaStatusAtual.id);
    return await this.franquiaStatusAtualService.update(franquiaStatusAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete franquiaStatusAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<FranquiaStatusAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FranquiaStatusAtual', id);
    const toDelete = await this.franquiaStatusAtualService.findById(id);
    return await this.franquiaStatusAtualService.delete(toDelete);
  }
}
