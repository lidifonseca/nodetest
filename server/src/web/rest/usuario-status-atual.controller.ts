import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UsuarioStatusAtual from '../../domain/usuario-status-atual.entity';
import { UsuarioStatusAtualService } from '../../service/usuario-status-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usuario-status-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('usuario-status-atuals')
export class UsuarioStatusAtualController {
  logger = new Logger('UsuarioStatusAtualController');

  constructor(private readonly usuarioStatusAtualService: UsuarioStatusAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UsuarioStatusAtual
  })
  async getAll(@Req() req: Request): Promise<UsuarioStatusAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.usuarioStatusAtualService.findAndCount(
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
    type: UsuarioStatusAtual
  })
  async getOne(@Param('id') id: string): Promise<UsuarioStatusAtual> {
    return await this.usuarioStatusAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create usuarioStatusAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UsuarioStatusAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usuarioStatusAtual: UsuarioStatusAtual): Promise<UsuarioStatusAtual> {
    const created = await this.usuarioStatusAtualService.save(usuarioStatusAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioStatusAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update usuarioStatusAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsuarioStatusAtual
  })
  async put(@Req() req: Request, @Body() usuarioStatusAtual: UsuarioStatusAtual): Promise<UsuarioStatusAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioStatusAtual', usuarioStatusAtual.id);
    return await this.usuarioStatusAtualService.update(usuarioStatusAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete usuarioStatusAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UsuarioStatusAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UsuarioStatusAtual', id);
    const toDelete = await this.usuarioStatusAtualService.findById(id);
    return await this.usuarioStatusAtualService.delete(toDelete);
  }
}
