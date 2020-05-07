import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UsuarioPanico from '../../domain/usuario-panico.entity';
import { UsuarioPanicoService } from '../../service/usuario-panico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usuario-panicos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('usuario-panicos')
export class UsuarioPanicoController {
  logger = new Logger('UsuarioPanicoController');

  constructor(private readonly usuarioPanicoService: UsuarioPanicoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UsuarioPanico
  })
  async getAll(@Req() req: Request): Promise<UsuarioPanico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.usuarioPanicoService.findAndCount(
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
    type: UsuarioPanico
  })
  async getOne(@Param('id') id: string): Promise<UsuarioPanico> {
    return await this.usuarioPanicoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create usuarioPanico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UsuarioPanico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usuarioPanico: UsuarioPanico): Promise<UsuarioPanico> {
    console.info(usuarioPanico);
    const created = await this.usuarioPanicoService.save(usuarioPanico);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioPanico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update usuarioPanico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsuarioPanico
  })
  async put(@Req() req: Request, @Body() usuarioPanico: UsuarioPanico): Promise<UsuarioPanico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioPanico', usuarioPanico.id);

    return await this.usuarioPanicoService.update(usuarioPanico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete usuarioPanico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UsuarioPanico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UsuarioPanico', id);
    const toDelete = await this.usuarioPanicoService.findById(id);
    return await this.usuarioPanicoService.delete(toDelete);
  }
}
