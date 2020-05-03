import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ProfissionalCategoriaContrato from '../../domain/profissional-categoria-contrato.entity';
import { ProfissionalCategoriaContratoService } from '../../service/profissional-categoria-contrato.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissional-categoria-contratoes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissional-categoria-contratoes')
export class ProfissionalCategoriaContratoController {
  logger = new Logger('ProfissionalCategoriaContratoController');

  constructor(private readonly profissionalCategoriaContratoService: ProfissionalCategoriaContratoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfissionalCategoriaContrato
  })
  async getAll(@Req() req: Request): Promise<ProfissionalCategoriaContrato[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalCategoriaContratoService.findAndCount(
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
    type: ProfissionalCategoriaContrato
  })
  async getOne(@Param('id') id: string): Promise<ProfissionalCategoriaContrato> {
    return await this.profissionalCategoriaContratoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissionalCategoriaContrato' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfissionalCategoriaContrato
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(
    @Req() req: Request,
    @Body() profissionalCategoriaContrato: ProfissionalCategoriaContrato
  ): Promise<ProfissionalCategoriaContrato> {
    const created = await this.profissionalCategoriaContratoService.save(profissionalCategoriaContrato);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalCategoriaContrato', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissionalCategoriaContrato' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfissionalCategoriaContrato
  })
  async put(
    @Req() req: Request,
    @Body() profissionalCategoriaContrato: ProfissionalCategoriaContrato
  ): Promise<ProfissionalCategoriaContrato> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfissionalCategoriaContrato', profissionalCategoriaContrato.id);
    return await this.profissionalCategoriaContratoService.update(profissionalCategoriaContrato);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissionalCategoriaContrato' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ProfissionalCategoriaContrato> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfissionalCategoriaContrato', id);
    const toDelete = await this.profissionalCategoriaContratoService.findById(id);
    return await this.profissionalCategoriaContratoService.delete(toDelete);
  }
}
