import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalDispositivoComplexidadeAtual from '../../domain/profissional-dispositivo-complexidade-atual.entity';
import { ProfissionalDispositivoComplexidadeAtualService } from '../../service/profissional-dispositivo-complexidade-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-dispositivo-complexidade-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-dispositivo-complexidade-atuals')
export class ProfissionalDispositivoComplexidadeAtualController {
  logger = new Logger('ProfissionalDispositivoComplexidadeAtualController');

  constructor(private readonly profissionalDispositivoComplexidadeAtualService: ProfissionalDispositivoComplexidadeAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalDispositivoComplexidadeAtual
  })
  async getAll(@Req() req: Request): Promise<ProfissionalDispositivoComplexidadeAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalDispositivoComplexidadeAtualService.findAndCount(
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
    type: ProfissionalDispositivoComplexidadeAtual
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalDispositivoComplexidadeAtual> {
    return await this.profissionalDispositivoComplexidadeAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalDispositivoComplexidadeAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalDispositivoComplexidadeAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtual
  ): Promise<ProfissionalDispositivoComplexidadeAtual> {
    console.info(profissionalDispositivoComplexidadeAtual);
    const created = await this.profissionalDispositivoComplexidadeAtualService.save(profissionalDispositivoComplexidadeAtual);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoComplexidadeAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalDispositivoComplexidadeAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalDispositivoComplexidadeAtual
  })
  async put(
    @Req() req: Request,
    @Body() profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtual
  ): Promise<ProfissionalDispositivoComplexidadeAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalDispositivoComplexidadeAtual', profissionalDispositivoComplexidadeAtual.id);

    return await this.profissionalDispositivoComplexidadeAtualService.update(profissionalDispositivoComplexidadeAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalDispositivoComplexidadeAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalDispositivoComplexidadeAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalDispositivoComplexidadeAtual', id);
    const toDelete = await this.profissionalDispositivoComplexidadeAtualService.findById(id);
    return await this.profissionalDispositivoComplexidadeAtualService.delete(toDelete);
  }
}
