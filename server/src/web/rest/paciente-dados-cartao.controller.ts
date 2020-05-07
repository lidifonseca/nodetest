import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDadosCartao from '../../domain/paciente-dados-cartao.entity';
import { PacienteDadosCartaoService } from '../../service/paciente-dados-cartao.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-dados-cartaos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-dados-cartaos')
export class PacienteDadosCartaoController {
  logger = new Logger('PacienteDadosCartaoController');

  constructor(private readonly pacienteDadosCartaoService: PacienteDadosCartaoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDadosCartao
  })
  async getAll(@Req() req: Request): Promise<PacienteDadosCartao[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDadosCartaoService.findAndCount(
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
    type: PacienteDadosCartao
  })
  async getOne(@Param('id') id: string): Promise<PacienteDadosCartao> {
    return await this.pacienteDadosCartaoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDadosCartao' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDadosCartao
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDadosCartao: PacienteDadosCartao): Promise<PacienteDadosCartao> {
    console.info(pacienteDadosCartao);
    const created = await this.pacienteDadosCartaoService.save(pacienteDadosCartao);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDadosCartao', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDadosCartao' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDadosCartao
  })
  async put(@Req() req: Request, @Body() pacienteDadosCartao: PacienteDadosCartao): Promise<PacienteDadosCartao> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDadosCartao', pacienteDadosCartao.id);

    return await this.pacienteDadosCartaoService.update(pacienteDadosCartao);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDadosCartao' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDadosCartao> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDadosCartao', id);
    const toDelete = await this.pacienteDadosCartaoService.findById(id);
    return await this.pacienteDadosCartaoService.delete(toDelete);
  }
}
