import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalDispositivoAtual from '../../domain/profissional-dispositivo-atual.entity';
import { ProfissionalDispositivoAtualService } from '../../service/profissional-dispositivo-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-dispositivo-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-dispositivo-atuals')
export class ProfissionalDispositivoAtualController {
  logger = new Logger('ProfissionalDispositivoAtualController');

  constructor(private readonly profissionalDispositivoAtualService: ProfissionalDispositivoAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalDispositivoAtual
  })
  async getAll(@Req() req: Request): Promise<ProfissionalDispositivoAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalDispositivoAtualService.findAndCount(
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
    type: ProfissionalDispositivoAtual
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalDispositivoAtual> {
    return await this.profissionalDispositivoAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalDispositivoAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalDispositivoAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalDispositivoAtual: ProfissionalDispositivoAtual
  ): Promise<ProfissionalDispositivoAtual> {
    console.info(profissionalDispositivoAtual);
    const created = await this.profissionalDispositivoAtualService.save(profissionalDispositivoAtual);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalDispositivoAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalDispositivoAtual
  })
  async put(
    @Req() req: Request,
    @Body() profissionalDispositivoAtual: ProfissionalDispositivoAtual
  ): Promise<ProfissionalDispositivoAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoAtual', profissionalDispositivoAtual.id);

    return await this.profissionalDispositivoAtualService.update(profissionalDispositivoAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalDispositivoAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalDispositivoAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalDispositivoAtual', id);
    const toDelete = await this.profissionalDispositivoAtualService.findById(id);
    return await this.profissionalDispositivoAtualService.delete(toDelete);
  }
}
