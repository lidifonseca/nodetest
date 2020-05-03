import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import FranquiaUsuario from '../../domain/franquia-usuario.entity';
import { FranquiaUsuarioService } from '../../service/franquia-usuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/franquia-usuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('franquia-usuarios')
export class FranquiaUsuarioController {
  logger = new Logger('FranquiaUsuarioController');

  constructor(private readonly franquiaUsuarioService: FranquiaUsuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FranquiaUsuario
  })
  async getAll(@Req() req: Request): Promise<FranquiaUsuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.franquiaUsuarioService.findAndCount(
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
    type: FranquiaUsuario
  })
  async getOne(@Param('id') id: string): Promise<FranquiaUsuario> {
    return await this.franquiaUsuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create franquiaUsuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FranquiaUsuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() franquiaUsuario: FranquiaUsuario): Promise<FranquiaUsuario> {
    const created = await this.franquiaUsuarioService.save(franquiaUsuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaUsuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update franquiaUsuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FranquiaUsuario
  })
  async put(@Req() req: Request, @Body() franquiaUsuario: FranquiaUsuario): Promise<FranquiaUsuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FranquiaUsuario', franquiaUsuario.id);
    return await this.franquiaUsuarioService.update(franquiaUsuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete franquiaUsuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<FranquiaUsuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FranquiaUsuario', id);
    const toDelete = await this.franquiaUsuarioService.findById(id);
    return await this.franquiaUsuarioService.delete(toDelete);
  }
}
