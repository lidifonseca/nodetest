import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Migracao from '../../domain/migracao.entity';
import { MigracaoService } from '../../service/migracao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/migracaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('migracaos')
export class MigracaoController {
  logger = new Logger('MigracaoController');

  constructor(private readonly migracaoService: MigracaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Migracao
  })
  async getAll(@Req() req: Request): Promise<Migracao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.migracaoService.findAndCount(
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
    type: Migracao
  })
  async getOne(@Param('id') id: string): Promise<Migracao> {
    return await this.migracaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create migracao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Migracao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() migracao: Migracao): Promise<Migracao> {
    console.info(migracao);
    const created = await this.migracaoService.save(migracao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Migracao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update migracao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Migracao
  })
  async put(@Req() req: Request, @Body() migracao: Migracao): Promise<Migracao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Migracao', migracao.id);

    return await this.migracaoService.update(migracao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete migracao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Migracao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Migracao', id);
    const toDelete = await this.migracaoService.findById(id);
    return await this.migracaoService.delete(toDelete);
  }
}
