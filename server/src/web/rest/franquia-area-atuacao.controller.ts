import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import FranquiaAreaAtuacao from '../../domain/franquia-area-atuacao.entity';
import { FranquiaAreaAtuacaoService } from '../../service/franquia-area-atuacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/franquia-area-atuacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('franquia-area-atuacaos')
export class FranquiaAreaAtuacaoController {
  logger = new Logger('FranquiaAreaAtuacaoController');

  constructor(private readonly franquiaAreaAtuacaoService: FranquiaAreaAtuacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FranquiaAreaAtuacao
  })
  async getAll(@Req() req: Request): Promise<FranquiaAreaAtuacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.franquiaAreaAtuacaoService.findAndCount(
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
    type: FranquiaAreaAtuacao
  })
  async getOne(@Param('id') id: string): Promise<FranquiaAreaAtuacao> {
    return await this.franquiaAreaAtuacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create franquiaAreaAtuacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FranquiaAreaAtuacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() franquiaAreaAtuacao: FranquiaAreaAtuacao): Promise<FranquiaAreaAtuacao> {
    console.info(franquiaAreaAtuacao);
    const created = await this.franquiaAreaAtuacaoService.save(franquiaAreaAtuacao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaAreaAtuacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update franquiaAreaAtuacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FranquiaAreaAtuacao
  })
  async put(@Req() req: Request, @Body() franquiaAreaAtuacao: FranquiaAreaAtuacao): Promise<FranquiaAreaAtuacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaAreaAtuacao', franquiaAreaAtuacao.id);

    return await this.franquiaAreaAtuacaoService.update(franquiaAreaAtuacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete franquiaAreaAtuacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<FranquiaAreaAtuacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FranquiaAreaAtuacao', id);
    const toDelete = await this.franquiaAreaAtuacaoService.findById(id);
    return await this.franquiaAreaAtuacaoService.delete(toDelete);
  }
}
