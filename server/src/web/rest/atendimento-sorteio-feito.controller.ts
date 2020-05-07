import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import AtendimentoSorteioFeito from '../../domain/atendimento-sorteio-feito.entity';
import { AtendimentoSorteioFeitoService } from '../../service/atendimento-sorteio-feito.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/atendimento-sorteio-feitos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('atendimento-sorteio-feitos')
export class AtendimentoSorteioFeitoController {
  logger = new Logger('AtendimentoSorteioFeitoController');

  constructor(private readonly atendimentoSorteioFeitoService: AtendimentoSorteioFeitoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AtendimentoSorteioFeito
  })
  async getAll(@Req() req: Request): Promise<AtendimentoSorteioFeito[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.atendimentoSorteioFeitoService.findAndCount(
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
    type: AtendimentoSorteioFeito
  })
  async getOne(@Param('id') id: string): Promise<AtendimentoSorteioFeito> {
    return await this.atendimentoSorteioFeitoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create atendimentoSorteioFeito' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AtendimentoSorteioFeito
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() atendimentoSorteioFeito: AtendimentoSorteioFeito): Promise<AtendimentoSorteioFeito> {
    console.info(atendimentoSorteioFeito);
    const created = await this.atendimentoSorteioFeitoService.save(atendimentoSorteioFeito);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoSorteioFeito', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update atendimentoSorteioFeito' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AtendimentoSorteioFeito
  })
  async put(@Req() req: Request, @Body() atendimentoSorteioFeito: AtendimentoSorteioFeito): Promise<AtendimentoSorteioFeito> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AtendimentoSorteioFeito', atendimentoSorteioFeito.id);

    return await this.atendimentoSorteioFeitoService.update(atendimentoSorteioFeito);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete atendimentoSorteioFeito' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<AtendimentoSorteioFeito> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AtendimentoSorteioFeito', id);
    const toDelete = await this.atendimentoSorteioFeitoService.findById(id);
    return await this.atendimentoSorteioFeitoService.delete(toDelete);
  }
}
