import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteMotivoInternacao from '../../domain/paciente-motivo-internacao.entity';
import { PacienteMotivoInternacaoService } from '../../service/paciente-motivo-internacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-motivo-internacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-motivo-internacaos')
export class PacienteMotivoInternacaoController {
  logger = new Logger('PacienteMotivoInternacaoController');

  constructor(private readonly pacienteMotivoInternacaoService: PacienteMotivoInternacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteMotivoInternacao
  })
  async getAll(@Req() req: Request): Promise<PacienteMotivoInternacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteMotivoInternacaoService.findAndCount(
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
    type: PacienteMotivoInternacao
  })
  async getOne(@Param('id') id: string): Promise<PacienteMotivoInternacao> {
    return await this.pacienteMotivoInternacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteMotivoInternacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteMotivoInternacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteMotivoInternacao: PacienteMotivoInternacao): Promise<PacienteMotivoInternacao> {
    const created = await this.pacienteMotivoInternacaoService.save(pacienteMotivoInternacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteMotivoInternacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteMotivoInternacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteMotivoInternacao
  })
  async put(@Req() req: Request, @Body() pacienteMotivoInternacao: PacienteMotivoInternacao): Promise<PacienteMotivoInternacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteMotivoInternacao', pacienteMotivoInternacao.id);
    return await this.pacienteMotivoInternacaoService.update(pacienteMotivoInternacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteMotivoInternacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteMotivoInternacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteMotivoInternacao', id);
    const toDelete = await this.pacienteMotivoInternacaoService.findById(id);
    return await this.pacienteMotivoInternacaoService.delete(toDelete);
  }
}
