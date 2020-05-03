import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import LicaoCasaEvolucao from '../../domain/licao-casa-evolucao.entity';
import { LicaoCasaEvolucaoService } from '../../service/licao-casa-evolucao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/licao-casa-evolucaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('licao-casa-evolucaos')
export class LicaoCasaEvolucaoController {
  logger = new Logger('LicaoCasaEvolucaoController');

  constructor(private readonly licaoCasaEvolucaoService: LicaoCasaEvolucaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LicaoCasaEvolucao
  })
  async getAll(@Req() req: Request): Promise<LicaoCasaEvolucao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.licaoCasaEvolucaoService.findAndCount(
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
    type: LicaoCasaEvolucao
  })
  async getOne(@Param('id') id: string): Promise<LicaoCasaEvolucao> {
    return await this.licaoCasaEvolucaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create licaoCasaEvolucao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LicaoCasaEvolucao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() licaoCasaEvolucao: LicaoCasaEvolucao): Promise<LicaoCasaEvolucao> {
    const created = await this.licaoCasaEvolucaoService.save(licaoCasaEvolucao);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LicaoCasaEvolucao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update licaoCasaEvolucao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LicaoCasaEvolucao
  })
  async put(@Req() req: Request, @Body() licaoCasaEvolucao: LicaoCasaEvolucao): Promise<LicaoCasaEvolucao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LicaoCasaEvolucao', licaoCasaEvolucao.id);
    return await this.licaoCasaEvolucaoService.update(licaoCasaEvolucao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete licaoCasaEvolucao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<LicaoCasaEvolucao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'LicaoCasaEvolucao', id);
    const toDelete = await this.licaoCasaEvolucaoService.findById(id);
    return await this.licaoCasaEvolucaoService.delete(toDelete);
  }
}
