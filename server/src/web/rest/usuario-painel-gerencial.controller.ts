import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import UsuarioPainelGerencial from '../../domain/usuario-painel-gerencial.entity';
import { UsuarioPainelGerencialService } from '../../service/usuario-painel-gerencial.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/usuario-painel-gerencials')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('usuario-painel-gerencials')
export class UsuarioPainelGerencialController {
  logger = new Logger('UsuarioPainelGerencialController');

  constructor(private readonly usuarioPainelGerencialService: UsuarioPainelGerencialService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: UsuarioPainelGerencial
  })
  async getAll(@Req() req: Request): Promise<UsuarioPainelGerencial[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.usuarioPainelGerencialService.findAndCount(
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
    type: UsuarioPainelGerencial
  })
  async getOne(@Param('id') id: string): Promise<UsuarioPainelGerencial> {
    return await this.usuarioPainelGerencialService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create usuarioPainelGerencial' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UsuarioPainelGerencial
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() usuarioPainelGerencial: UsuarioPainelGerencial): Promise<UsuarioPainelGerencial> {
    const created = await this.usuarioPainelGerencialService.save(usuarioPainelGerencial);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioPainelGerencial', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update usuarioPainelGerencial' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: UsuarioPainelGerencial
  })
  async put(@Req() req: Request, @Body() usuarioPainelGerencial: UsuarioPainelGerencial): Promise<UsuarioPainelGerencial> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'UsuarioPainelGerencial', usuarioPainelGerencial.id);
    return await this.usuarioPainelGerencialService.update(usuarioPainelGerencial);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete usuarioPainelGerencial' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<UsuarioPainelGerencial> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'UsuarioPainelGerencial', id);
    const toDelete = await this.usuarioPainelGerencialService.findById(id);
    return await this.usuarioPainelGerencialService.delete(toDelete);
  }
}
