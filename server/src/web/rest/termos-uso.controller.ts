import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TermosUso from '../../domain/termos-uso.entity';
import { TermosUsoService } from '../../service/termos-uso.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/termos-usos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('termos-usos')
export class TermosUsoController {
  logger = new Logger('TermosUsoController');

  constructor(private readonly termosUsoService: TermosUsoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TermosUso
  })
  async getAll(@Req() req: Request): Promise<TermosUso[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.termosUsoService.findAndCount(
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
    type: TermosUso
  })
  async getOne(@Param('id') id: string): Promise<TermosUso> {
    return await this.termosUsoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create termosUso' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TermosUso
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() termosUso: TermosUso): Promise<TermosUso> {
    console.info(termosUso);
    const created = await this.termosUsoService.save(termosUso);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TermosUso', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update termosUso' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TermosUso
  })
  async put(@Req() req: Request, @Body() termosUso: TermosUso): Promise<TermosUso> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TermosUso', termosUso.id);

    return await this.termosUsoService.update(termosUso);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete termosUso' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TermosUso> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TermosUso', id);
    const toDelete = await this.termosUsoService.findById(id);
    return await this.termosUsoService.delete(toDelete);
  }
}
