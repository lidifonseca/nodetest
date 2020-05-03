import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CepbrCidade from '../../domain/cepbr-cidade.entity';
import { CepbrCidadeService } from '../../service/cepbr-cidade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cepbr-cidades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cepbr-cidades')
export class CepbrCidadeController {
  logger = new Logger('CepbrCidadeController');

  constructor(private readonly cepbrCidadeService: CepbrCidadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CepbrCidade
  })
  async getAll(@Req() req: Request): Promise<CepbrCidade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cepbrCidadeService.findAndCount(
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
    type: CepbrCidade
  })
  async getOne(@Param('id') id: string): Promise<CepbrCidade> {
    return await this.cepbrCidadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cepbrCidade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CepbrCidade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cepbrCidade: CepbrCidade): Promise<CepbrCidade> {
    const created = await this.cepbrCidadeService.save(cepbrCidade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrCidade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cepbrCidade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CepbrCidade
  })
  async put(@Req() req: Request, @Body() cepbrCidade: CepbrCidade): Promise<CepbrCidade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CepbrCidade', cepbrCidade.id);
    return await this.cepbrCidadeService.update(cepbrCidade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cepbrCidade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CepbrCidade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CepbrCidade', id);
    const toDelete = await this.cepbrCidadeService.findById(id);
    return await this.cepbrCidadeService.delete(toDelete);
  }
}
