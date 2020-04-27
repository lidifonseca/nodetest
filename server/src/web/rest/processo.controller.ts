import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Processo from '../../domain/processo.entity';
import { ProcessoService } from '../../service/processo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/processos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('processos')
export class ProcessoController {
  logger = new Logger('ProcessoController');

  constructor(private readonly processoService: ProcessoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Processo
  })
  async getAll(@Req() req: Request): Promise<Processo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.processoService.findAndCount({
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
    type: Processo
  })
  async getOne(@Param('id') id: string): Promise<Processo> {
    return await this.processoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create processo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Processo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() processo: Processo): Promise<Processo> {
    const created = await this.processoService.save(processo);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Processo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update processo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Processo
  })
  async put(@Req() req: Request, @Body() processo: Processo): Promise<Processo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Processo', processo.id);
    return await this.processoService.update(processo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete processo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Processo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Processo', id);
    const toDelete = await this.processoService.findById(id);
    return await this.processoService.delete(toDelete);
  }
}
