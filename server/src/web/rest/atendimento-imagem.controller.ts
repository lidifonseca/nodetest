import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoImagem from '../../domain/atendimento-imagem.entity';
import { AtendimentoImagemService } from '../../service/atendimento-imagem.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-imagems')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-imagems')
export class AtendimentoImagemController {
  logger = new Logger('AtendimentoImagemController');

  constructor(private readonly atendimentoImagemService: AtendimentoImagemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoImagem
  })
  async getAll(@Req() req: Request): Promise<AtendimentoImagem[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoImagemService.findAndCount(
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
    type: AtendimentoImagem
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoImagem> {
    return await this.atendimentoImagemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoImagem' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoImagem
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem> {
    const created = await this.atendimentoImagemService.save(atendimentoImagem);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoImagem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoImagem' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoImagem
  })
  async put(@Req() req: Request, @Body() atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoImagem', atendimentoImagem.id);
    return await this.atendimentoImagemService.update(atendimentoImagem);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoImagem' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoImagem> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoImagem', id);
    const toDelete = await this.atendimentoImagemService.findById(id);
    return await this.atendimentoImagemService.delete(toDelete);
  }
}
