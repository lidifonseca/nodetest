import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusAtualLigacao from '../../domain/status-atual-ligacao.entity';
import { StatusAtualLigacaoService } from '../../service/status-atual-ligacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-atual-ligacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-atual-ligacaos')
export class StatusAtualLigacaoController {
  logger = new Logger('StatusAtualLigacaoController');

  constructor(private readonly statusAtualLigacaoService: StatusAtualLigacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusAtualLigacao
  })
  async getAll(@Req() req: Request): Promise<StatusAtualLigacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusAtualLigacaoService.findAndCount(
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
    type: StatusAtualLigacao
  })
  async getOne(@Param('id') id: string): Promise<StatusAtualLigacao> {
    return await this.statusAtualLigacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusAtualLigacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusAtualLigacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusAtualLigacao: StatusAtualLigacao): Promise<StatusAtualLigacao> {
    const created = await this.statusAtualLigacaoService.save(statusAtualLigacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtualLigacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusAtualLigacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusAtualLigacao
  })
  async put(@Req() req: Request, @Body() statusAtualLigacao: StatusAtualLigacao): Promise<StatusAtualLigacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtualLigacao', statusAtualLigacao.id);
    return await this.statusAtualLigacaoService.update(statusAtualLigacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusAtualLigacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusAtualLigacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusAtualLigacao', id);
    const toDelete = await this.statusAtualLigacaoService.findById(id);
    return await this.statusAtualLigacaoService.delete(toDelete);
  }
}
