import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProntuarioMotivoManifestacao from '../../domain/prontuario-motivo-manifestacao.entity';
import { ProntuarioMotivoManifestacaoService } from '../../service/prontuario-motivo-manifestacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/prontuario-motivo-manifestacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('prontuario-motivo-manifestacaos')
export class ProntuarioMotivoManifestacaoController {
  logger = new Logger('ProntuarioMotivoManifestacaoController');

  constructor(private readonly prontuarioMotivoManifestacaoService: ProntuarioMotivoManifestacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProntuarioMotivoManifestacao
  })
  async getAll(@Req() req: Request): Promise<ProntuarioMotivoManifestacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.prontuarioMotivoManifestacaoService.findAndCount(
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
    type: ProntuarioMotivoManifestacao
  })
  async getOne(@Param('id') id: string): Promise<ProntuarioMotivoManifestacao> {
    return await this.prontuarioMotivoManifestacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create prontuarioMotivoManifestacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProntuarioMotivoManifestacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() prontuarioMotivoManifestacao: ProntuarioMotivoManifestacao
  ): Promise<ProntuarioMotivoManifestacao> {
    console.info(prontuarioMotivoManifestacao);
    const created = await this.prontuarioMotivoManifestacaoService.save(prontuarioMotivoManifestacao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioMotivoManifestacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update prontuarioMotivoManifestacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProntuarioMotivoManifestacao
  })
  async put(
    @Req() req: Request,
    @Body() prontuarioMotivoManifestacao: ProntuarioMotivoManifestacao
  ): Promise<ProntuarioMotivoManifestacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProntuarioMotivoManifestacao', prontuarioMotivoManifestacao.id);

    return await this.prontuarioMotivoManifestacaoService.update(prontuarioMotivoManifestacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete prontuarioMotivoManifestacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProntuarioMotivoManifestacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProntuarioMotivoManifestacao', id);
    const toDelete = await this.prontuarioMotivoManifestacaoService.findById(id);
    return await this.prontuarioMotivoManifestacaoService.delete(toDelete);
  }
}
