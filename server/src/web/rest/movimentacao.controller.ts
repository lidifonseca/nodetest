import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Movimentacao from '../../domain/movimentacao.entity';
import { MovimentacaoService } from '../../service/movimentacao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/movimentacaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('movimentacaos')
export class MovimentacaoController {
  logger = new Logger('MovimentacaoController');

  constructor(private readonly movimentacaoService: MovimentacaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Movimentacao
  })
  async getAll(@Req() req: Request): Promise<Movimentacao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.movimentacaoService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Movimentacao
  })
  async getOne(@Param('id') id: string): Promise<Movimentacao> {
    return await this.movimentacaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create movimentacao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Movimentacao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() movimentacao: Movimentacao): Promise<Movimentacao> {
    const created = await this.movimentacaoService.save(movimentacao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Movimentacao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update movimentacao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Movimentacao
  })
  async put(@Req() req: Request, @Body() movimentacao: Movimentacao): Promise<Movimentacao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Movimentacao', movimentacao.id);
    return await this.movimentacaoService.update(movimentacao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete movimentacao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Movimentacao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Movimentacao', id);
    const toDelete = await this.movimentacaoService.findById(id);
    return await this.movimentacaoService.delete(toDelete);
  }
}
