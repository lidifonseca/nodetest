import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalStatusAtual from '../../domain/profissional-status-atual.entity';
import { ProfissionalStatusAtualService } from '../../service/profissional-status-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-status-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-status-atuals')
export class ProfissionalStatusAtualController {
  logger = new Logger('ProfissionalStatusAtualController');

  constructor(private readonly profissionalStatusAtualService: ProfissionalStatusAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalStatusAtual
  })
  async getAll(@Req() req: Request): Promise<ProfissionalStatusAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalStatusAtualService.findAndCount(
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
    type: ProfissionalStatusAtual
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalStatusAtual> {
    return await this.profissionalStatusAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalStatusAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalStatusAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissionalStatusAtual: ProfissionalStatusAtual): Promise<ProfissionalStatusAtual> {
    const created = await this.profissionalStatusAtualService.save(profissionalStatusAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalStatusAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalStatusAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalStatusAtual
  })
  async put(@Req() req: Request, @Body() profissionalStatusAtual: ProfissionalStatusAtual): Promise<ProfissionalStatusAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalStatusAtual', profissionalStatusAtual.id);
    return await this.profissionalStatusAtualService.update(profissionalStatusAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalStatusAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalStatusAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalStatusAtual', id);
    const toDelete = await this.profissionalStatusAtualService.findById(id);
    return await this.profissionalStatusAtualService.delete(toDelete);
  }
}
