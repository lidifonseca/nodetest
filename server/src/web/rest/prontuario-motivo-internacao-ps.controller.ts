import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProntuarioMotivoInternacaoPs from '../../domain/prontuario-motivo-internacao-ps.entity';
import { ProntuarioMotivoInternacaoPsService } from '../../service/prontuario-motivo-internacao-ps.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prontuario-motivo-internacao-ps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('prontuario-motivo-internacao-ps')
export class ProntuarioMotivoInternacaoPsController {
  logger = new Logger('ProntuarioMotivoInternacaoPsController');

  constructor(private readonly prontuarioMotivoInternacaoPsService: ProntuarioMotivoInternacaoPsService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProntuarioMotivoInternacaoPs
  })
  async getAll(@Req() req: Request): Promise<ProntuarioMotivoInternacaoPs[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.prontuarioMotivoInternacaoPsService.findAndCount(
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
    type: ProntuarioMotivoInternacaoPs
  })
  async getOne(@Param('id') id: string): Promise<ProntuarioMotivoInternacaoPs> {
    return await this.prontuarioMotivoInternacaoPsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create prontuarioMotivoInternacaoPs' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProntuarioMotivoInternacaoPs
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPs
  ): Promise<ProntuarioMotivoInternacaoPs> {
    console.info(prontuarioMotivoInternacaoPs);
    const created = await this.prontuarioMotivoInternacaoPsService.save(prontuarioMotivoInternacaoPs);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioMotivoInternacaoPs', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update prontuarioMotivoInternacaoPs' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProntuarioMotivoInternacaoPs
  })
  async put(
    @Req() req: Request,
    @Body() prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPs
  ): Promise<ProntuarioMotivoInternacaoPs> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioMotivoInternacaoPs', prontuarioMotivoInternacaoPs.id);

    return await this.prontuarioMotivoInternacaoPsService.update(prontuarioMotivoInternacaoPs);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete prontuarioMotivoInternacaoPs' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProntuarioMotivoInternacaoPs> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProntuarioMotivoInternacaoPs', id);
    const toDelete = await this.prontuarioMotivoInternacaoPsService.findById(id);
    return await this.prontuarioMotivoInternacaoPsService.delete(toDelete);
  }
}
