import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Pesquisa from '../../domain/pesquisa.entity';
import { PesquisaService } from '../../service/pesquisa.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pesquisas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pesquisas')
export class PesquisaController {
  logger = new Logger('PesquisaController');

  constructor(private readonly pesquisaService: PesquisaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Pesquisa
  })
  async getAll(@Req() req: Request): Promise<Pesquisa[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.pesquisaService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Pesquisa
  })
  async getOne(@Param('id') id: string): Promise<Pesquisa> {
    return await this.pesquisaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pesquisa' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Pesquisa
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pesquisa: Pesquisa): Promise<Pesquisa> {
    const created = await this.pesquisaService.save(pesquisa);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pesquisa', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pesquisa' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Pesquisa
  })
  async put(@Req() req: Request, @Body() pesquisa: Pesquisa): Promise<Pesquisa> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Pesquisa', pesquisa.id);
    return await this.pesquisaService.update(pesquisa);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pesquisa' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Pesquisa> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Pesquisa', id);
    const toDelete = await this.pesquisaService.findById(id);
    return await this.pesquisaService.delete(toDelete);
  }
}
