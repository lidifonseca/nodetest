import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UnidadeEasyAreaAtuacao from '../../domain/unidade-easy-area-atuacao.entity';
import { UnidadeEasyAreaAtuacaoService } from '../../service/unidade-easy-area-atuacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/unidade-easy-area-atuacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('unidade-easy-area-atuacaos')
export class UnidadeEasyAreaAtuacaoController {
  logger = new Logger('UnidadeEasyAreaAtuacaoController');

  constructor(private readonly unidadeEasyAreaAtuacaoService: UnidadeEasyAreaAtuacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UnidadeEasyAreaAtuacao
  })
  async getAll(@Req() req: Request): Promise<UnidadeEasyAreaAtuacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.unidadeEasyAreaAtuacaoService.findAndCount(
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
    type: UnidadeEasyAreaAtuacao
  })
  async getOne(@Param('id') id: string): Promise<UnidadeEasyAreaAtuacao> {
    return await this.unidadeEasyAreaAtuacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create unidadeEasyAreaAtuacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UnidadeEasyAreaAtuacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacao): Promise<UnidadeEasyAreaAtuacao> {
    const created = await this.unidadeEasyAreaAtuacaoService.save(unidadeEasyAreaAtuacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeEasyAreaAtuacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update unidadeEasyAreaAtuacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UnidadeEasyAreaAtuacao
  })
  async put(@Req() req: Request, @Body() unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacao): Promise<UnidadeEasyAreaAtuacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UnidadeEasyAreaAtuacao', unidadeEasyAreaAtuacao.id);
    return await this.unidadeEasyAreaAtuacaoService.update(unidadeEasyAreaAtuacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete unidadeEasyAreaAtuacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UnidadeEasyAreaAtuacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UnidadeEasyAreaAtuacao', id);
    const toDelete = await this.unidadeEasyAreaAtuacaoService.findById(id);
    return await this.unidadeEasyAreaAtuacaoService.delete(toDelete);
  }
}
