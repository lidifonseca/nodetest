import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoAssinaturas from '../../domain/atendimento-assinaturas.entity';
import { AtendimentoAssinaturasService } from '../../service/atendimento-assinaturas.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-assinaturas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-assinaturas')
export class AtendimentoAssinaturasController {
  logger = new Logger('AtendimentoAssinaturasController');

  constructor(private readonly atendimentoAssinaturasService: AtendimentoAssinaturasService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoAssinaturas
  })
  async getAll(@Req() req: Request): Promise<AtendimentoAssinaturas[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoAssinaturasService.findAndCount(
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
    type: AtendimentoAssinaturas
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoAssinaturas> {
    return await this.atendimentoAssinaturasService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoAssinaturas' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoAssinaturas
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoAssinaturas: AtendimentoAssinaturas): Promise<AtendimentoAssinaturas> {
    const created = await this.atendimentoAssinaturasService.save(atendimentoAssinaturas);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAssinaturas', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoAssinaturas' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoAssinaturas
  })
  async put(@Req() req: Request, @Body() atendimentoAssinaturas: AtendimentoAssinaturas): Promise<AtendimentoAssinaturas> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoAssinaturas', atendimentoAssinaturas.id);
    return await this.atendimentoAssinaturasService.update(atendimentoAssinaturas);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoAssinaturas' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoAssinaturas> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoAssinaturas', id);
    const toDelete = await this.atendimentoAssinaturasService.findById(id);
    return await this.atendimentoAssinaturasService.delete(toDelete);
  }
}
