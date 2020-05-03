import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusAtual from '../../domain/status-atual.entity';
import { StatusAtualService } from '../../service/status-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-atuals')
export class StatusAtualController {
  logger = new Logger('StatusAtualController');

  constructor(private readonly statusAtualService: StatusAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusAtual
  })
  async getAll(@Req() req: Request): Promise<StatusAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusAtualService.findAndCount(
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
    type: StatusAtual
  })
  async getOne(@Param('id') id: string): Promise<StatusAtual> {
    return await this.statusAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusAtual: StatusAtual): Promise<StatusAtual> {
    const created = await this.statusAtualService.save(statusAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusAtual
  })
  async put(@Req() req: Request, @Body() statusAtual: StatusAtual): Promise<StatusAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtual', statusAtual.id);
    return await this.statusAtualService.update(statusAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusAtual', id);
    const toDelete = await this.statusAtualService.findById(id);
    return await this.statusAtualService.delete(toDelete);
  }
}
