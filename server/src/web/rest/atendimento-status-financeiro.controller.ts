import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoStatusFinanceiro from '../../domain/atendimento-status-financeiro.entity';
import { AtendimentoStatusFinanceiroService } from '../../service/atendimento-status-financeiro.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-status-financeiros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-status-financeiros')
export class AtendimentoStatusFinanceiroController {
  logger = new Logger('AtendimentoStatusFinanceiroController');

  constructor(private readonly atendimentoStatusFinanceiroService: AtendimentoStatusFinanceiroService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoStatusFinanceiro
  })
  async getAll(@Req() req: Request): Promise<AtendimentoStatusFinanceiro[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoStatusFinanceiroService.findAndCount(
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
    type: AtendimentoStatusFinanceiro
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoStatusFinanceiro> {
    return await this.atendimentoStatusFinanceiroService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoStatusFinanceiro' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoStatusFinanceiro
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoStatusFinanceiro: AtendimentoStatusFinanceiro): Promise<AtendimentoStatusFinanceiro> {
    const created = await this.atendimentoStatusFinanceiroService.save(atendimentoStatusFinanceiro);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoStatusFinanceiro', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoStatusFinanceiro' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoStatusFinanceiro
  })
  async put(@Req() req: Request, @Body() atendimentoStatusFinanceiro: AtendimentoStatusFinanceiro): Promise<AtendimentoStatusFinanceiro> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoStatusFinanceiro', atendimentoStatusFinanceiro.id);
    return await this.atendimentoStatusFinanceiroService.update(atendimentoStatusFinanceiro);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoStatusFinanceiro' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoStatusFinanceiro> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoStatusFinanceiro', id);
    const toDelete = await this.atendimentoStatusFinanceiroService.findById(id);
    return await this.atendimentoStatusFinanceiroService.delete(toDelete);
  }
}
