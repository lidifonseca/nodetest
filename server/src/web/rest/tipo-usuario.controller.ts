import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TipoUsuario from '../../domain/tipo-usuario.entity';
import { TipoUsuarioService } from '../../service/tipo-usuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/tipo-usuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('tipo-usuarios')
export class TipoUsuarioController {
  logger = new Logger('TipoUsuarioController');

  constructor(private readonly tipoUsuarioService: TipoUsuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TipoUsuario
  })
  async getAll(@Req() req: Request): Promise<TipoUsuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tipoUsuarioService.findAndCount(
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
    type: TipoUsuario
  })
  async getOne(@Param('id') id: string): Promise<TipoUsuario> {
    return await this.tipoUsuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tipoUsuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TipoUsuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tipoUsuario: TipoUsuario): Promise<TipoUsuario> {
    console.info(tipoUsuario);
    const created = await this.tipoUsuarioService.save(tipoUsuario);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoUsuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tipoUsuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TipoUsuario
  })
  async put(@Req() req: Request, @Body() tipoUsuario: TipoUsuario): Promise<TipoUsuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TipoUsuario', tipoUsuario.id);

    return await this.tipoUsuarioService.update(tipoUsuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tipoUsuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TipoUsuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TipoUsuario', id);
    const toDelete = await this.tipoUsuarioService.findById(id);
    return await this.tipoUsuarioService.delete(toDelete);
  }
}
