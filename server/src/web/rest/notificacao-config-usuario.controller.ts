import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import NotificacaoConfigUsuario from '../../domain/notificacao-config-usuario.entity';
import { NotificacaoConfigUsuarioService } from '../../service/notificacao-config-usuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/notificacao-config-usuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('notificacao-config-usuarios')
export class NotificacaoConfigUsuarioController {
  logger = new Logger('NotificacaoConfigUsuarioController');

  constructor(private readonly notificacaoConfigUsuarioService: NotificacaoConfigUsuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: NotificacaoConfigUsuario
  })
  async getAll(@Req() req: Request): Promise<NotificacaoConfigUsuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.notificacaoConfigUsuarioService.findAndCount(
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
    type: NotificacaoConfigUsuario
  })
  async getOne(@Param('id') id: string): Promise<NotificacaoConfigUsuario> {
    return await this.notificacaoConfigUsuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create notificacaoConfigUsuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: NotificacaoConfigUsuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() notificacaoConfigUsuario: NotificacaoConfigUsuario): Promise<NotificacaoConfigUsuario> {
    console.info(notificacaoConfigUsuario);
    const created = await this.notificacaoConfigUsuarioService.save(notificacaoConfigUsuario);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'NotificacaoConfigUsuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update notificacaoConfigUsuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NotificacaoConfigUsuario
  })
  async put(@Req() req: Request, @Body() notificacaoConfigUsuario: NotificacaoConfigUsuario): Promise<NotificacaoConfigUsuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'NotificacaoConfigUsuario', notificacaoConfigUsuario.id);

    return await this.notificacaoConfigUsuarioService.update(notificacaoConfigUsuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete notificacaoConfigUsuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<NotificacaoConfigUsuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'NotificacaoConfigUsuario', id);
    const toDelete = await this.notificacaoConfigUsuarioService.findById(id);
    return await this.notificacaoConfigUsuarioService.delete(toDelete);
  }
}
