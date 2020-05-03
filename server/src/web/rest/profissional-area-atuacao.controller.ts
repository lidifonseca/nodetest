import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalAreaAtuacao from '../../domain/profissional-area-atuacao.entity';
import { ProfissionalAreaAtuacaoService } from '../../service/profissional-area-atuacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-area-atuacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-area-atuacaos')
export class ProfissionalAreaAtuacaoController {
  logger = new Logger('ProfissionalAreaAtuacaoController');

  constructor(private readonly profissionalAreaAtuacaoService: ProfissionalAreaAtuacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalAreaAtuacao
  })
  async getAll(@Req() req: Request): Promise<ProfissionalAreaAtuacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalAreaAtuacaoService.findAndCount(
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
    type: ProfissionalAreaAtuacao
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalAreaAtuacao> {
    return await this.profissionalAreaAtuacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalAreaAtuacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalAreaAtuacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalAreaAtuacao: ProfissionalAreaAtuacao): Promise<ProfissionalAreaAtuacao> {
    const created = await this.profissionalAreaAtuacaoService.save(profissionalAreaAtuacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalAreaAtuacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalAreaAtuacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalAreaAtuacao
  })
  async put(@Req() req: Request, @Body() profissionalAreaAtuacao: ProfissionalAreaAtuacao): Promise<ProfissionalAreaAtuacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalAreaAtuacao', profissionalAreaAtuacao.id);
    return await this.profissionalAreaAtuacaoService.update(profissionalAreaAtuacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalAreaAtuacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalAreaAtuacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalAreaAtuacao', id);
    const toDelete = await this.profissionalAreaAtuacaoService.findById(id);
    return await this.profissionalAreaAtuacaoService.delete(toDelete);
  }
}
