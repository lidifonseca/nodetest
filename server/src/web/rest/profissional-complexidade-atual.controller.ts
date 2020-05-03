import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalComplexidadeAtual from '../../domain/profissional-complexidade-atual.entity';
import { ProfissionalComplexidadeAtualService } from '../../service/profissional-complexidade-atual.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-complexidade-atuals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-complexidade-atuals')
export class ProfissionalComplexidadeAtualController {
  logger = new Logger('ProfissionalComplexidadeAtualController');

  constructor(private readonly profissionalComplexidadeAtualService: ProfissionalComplexidadeAtualService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalComplexidadeAtual
  })
  async getAll(@Req() req: Request): Promise<ProfissionalComplexidadeAtual[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalComplexidadeAtualService.findAndCount(
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
    type: ProfissionalComplexidadeAtual
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalComplexidadeAtual> {
    return await this.profissionalComplexidadeAtualService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalComplexidadeAtual' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalComplexidadeAtual
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalComplexidadeAtual: ProfissionalComplexidadeAtual
  ): Promise<ProfissionalComplexidadeAtual> {
    const created = await this.profissionalComplexidadeAtualService.save(profissionalComplexidadeAtual);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalComplexidadeAtual', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalComplexidadeAtual' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalComplexidadeAtual
  })
  async put(
    @Req() req: Request,
    @Body() profissionalComplexidadeAtual: ProfissionalComplexidadeAtual
  ): Promise<ProfissionalComplexidadeAtual> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalComplexidadeAtual', profissionalComplexidadeAtual.id);
    return await this.profissionalComplexidadeAtualService.update(profissionalComplexidadeAtual);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalComplexidadeAtual' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalComplexidadeAtual> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalComplexidadeAtual', id);
    const toDelete = await this.profissionalComplexidadeAtualService.findById(id);
    return await this.profissionalComplexidadeAtualService.delete(toDelete);
  }
}
