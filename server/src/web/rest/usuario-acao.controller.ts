import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UsuarioAcao from '../../domain/usuario-acao.entity';
import { UsuarioAcaoService } from '../../service/usuario-acao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usuario-acaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('usuario-acaos')
export class UsuarioAcaoController {
  logger = new Logger('UsuarioAcaoController');

  constructor(private readonly usuarioAcaoService: UsuarioAcaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UsuarioAcao
  })
  async getAll(@Req() req: Request): Promise<UsuarioAcao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.usuarioAcaoService.findAndCount(
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
    type: UsuarioAcao
  })
  async getOne(@Param('id') id: string): Promise<UsuarioAcao> {
    return await this.usuarioAcaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create usuarioAcao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UsuarioAcao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usuarioAcao: UsuarioAcao): Promise<UsuarioAcao> {
    console.info(usuarioAcao);
    const created = await this.usuarioAcaoService.save(usuarioAcao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioAcao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update usuarioAcao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsuarioAcao
  })
  async put(@Req() req: Request, @Body() usuarioAcao: UsuarioAcao): Promise<UsuarioAcao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioAcao', usuarioAcao.id);

    return await this.usuarioAcaoService.update(usuarioAcao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete usuarioAcao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UsuarioAcao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UsuarioAcao', id);
    const toDelete = await this.usuarioAcaoService.findById(id);
    return await this.usuarioAcaoService.delete(toDelete);
  }
}
