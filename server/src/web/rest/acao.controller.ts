import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Acao from '../../domain/acao.entity';
import { AcaoService } from '../../service/acao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/acaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('acaos')
export class AcaoController {
  logger = new Logger('AcaoController');

  constructor(private readonly acaoService: AcaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Acao
  })
  async getAll(@Req() req: Request): Promise<Acao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.acaoService.findAndCount(
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
    type: Acao
  })
  async getOne(@Param('id') id: string): Promise<Acao> {
    return await this.acaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create acao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Acao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() acao: Acao): Promise<Acao> {
    console.info(acao);
    const created = await this.acaoService.save(acao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Acao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update acao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Acao
  })
  async put(@Req() req: Request, @Body() acao: Acao): Promise<Acao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Acao', acao.id);

    return await this.acaoService.update(acao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete acao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Acao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Acao', id);
    const toDelete = await this.acaoService.findById(id);
    return await this.acaoService.delete(toDelete);
  }
}
