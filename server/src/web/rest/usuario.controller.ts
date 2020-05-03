import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Usuario from '../../domain/usuario.entity';
import { UsuarioService } from '../../service/usuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('usuarios')
export class UsuarioController {
  logger = new Logger('UsuarioController');

  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Usuario
  })
  async getAll(@Req() req: Request): Promise<Usuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.usuarioService.findAndCount(
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
    type: Usuario
  })
  async getOne(@Param('id') id: string): Promise<Usuario> {
    return await this.usuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create usuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Usuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usuario: Usuario): Promise<Usuario> {
    const created = await this.usuarioService.save(usuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Usuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update usuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Usuario
  })
  async put(@Req() req: Request, @Body() usuario: Usuario): Promise<Usuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Usuario', usuario.id);
    return await this.usuarioService.update(usuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete usuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Usuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Usuario', id);
    const toDelete = await this.usuarioService.findById(id);
    return await this.usuarioService.delete(toDelete);
  }
}
