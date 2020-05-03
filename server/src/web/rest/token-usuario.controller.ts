import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import TokenUsuario from '../../domain/token-usuario.entity';
import { TokenUsuarioService } from '../../service/token-usuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/token-usuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('token-usuarios')
export class TokenUsuarioController {
  logger = new Logger('TokenUsuarioController');

  constructor(private readonly tokenUsuarioService: TokenUsuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TokenUsuario
  })
  async getAll(@Req() req: Request): Promise<TokenUsuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.tokenUsuarioService.findAndCount(
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
    type: TokenUsuario
  })
  async getOne(@Param('id') id: string): Promise<TokenUsuario> {
    return await this.tokenUsuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create tokenUsuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TokenUsuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() tokenUsuario: TokenUsuario): Promise<TokenUsuario> {
    const created = await this.tokenUsuarioService.save(tokenUsuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TokenUsuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update tokenUsuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TokenUsuario
  })
  async put(@Req() req: Request, @Body() tokenUsuario: TokenUsuario): Promise<TokenUsuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TokenUsuario', tokenUsuario.id);
    return await this.tokenUsuarioService.update(tokenUsuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete tokenUsuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<TokenUsuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TokenUsuario', id);
    const toDelete = await this.tokenUsuarioService.findById(id);
    return await this.tokenUsuarioService.delete(toDelete);
  }
}
