import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ReportEmailAtendimento from '../../domain/report-email-atendimento.entity';
import { ReportEmailAtendimentoService } from '../../service/report-email-atendimento.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/report-email-atendimentos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('report-email-atendimentos')
export class ReportEmailAtendimentoController {
  logger = new Logger('ReportEmailAtendimentoController');

  constructor(private readonly reportEmailAtendimentoService: ReportEmailAtendimentoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ReportEmailAtendimento
  })
  async getAll(@Req() req: Request): Promise<ReportEmailAtendimento[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.reportEmailAtendimentoService.findAndCount(
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
    type: ReportEmailAtendimento
  })
  async getOne(@Param('id') id: string): Promise<ReportEmailAtendimento> {
    return await this.reportEmailAtendimentoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create reportEmailAtendimento' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ReportEmailAtendimento
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() reportEmailAtendimento: ReportEmailAtendimento): Promise<ReportEmailAtendimento> {
    const created = await this.reportEmailAtendimentoService.save(reportEmailAtendimento);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ReportEmailAtendimento', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update reportEmailAtendimento' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ReportEmailAtendimento
  })
  async put(@Req() req: Request, @Body() reportEmailAtendimento: ReportEmailAtendimento): Promise<ReportEmailAtendimento> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ReportEmailAtendimento', reportEmailAtendimento.id);
    return await this.reportEmailAtendimentoService.update(reportEmailAtendimento);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete reportEmailAtendimento' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ReportEmailAtendimento> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ReportEmailAtendimento', id);
    const toDelete = await this.reportEmailAtendimentoService.findById(id);
    return await this.reportEmailAtendimentoService.delete(toDelete);
  }
}
