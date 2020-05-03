import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import VwApiAtendimentosAceite from '../../domain/vw-api-atendimentos-aceite.entity';
import { VwApiAtendimentosAceiteService } from '../../service/vw-api-atendimentos-aceite.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/vw-api-atendimentos-aceites')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('vw-api-atendimentos-aceites')
export class VwApiAtendimentosAceiteController {
  logger = new Logger('VwApiAtendimentosAceiteController');

  constructor(private readonly vwApiAtendimentosAceiteService: VwApiAtendimentosAceiteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: VwApiAtendimentosAceite
  })
  async getAll(@Req() req: Request): Promise<VwApiAtendimentosAceite[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.vwApiAtendimentosAceiteService.findAndCount(
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
    type: VwApiAtendimentosAceite
  })
  async getOne(@Param('id') id: string): Promise<VwApiAtendimentosAceite> {
    return await this.vwApiAtendimentosAceiteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create vwApiAtendimentosAceite' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: VwApiAtendimentosAceite
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() vwApiAtendimentosAceite: VwApiAtendimentosAceite): Promise<VwApiAtendimentosAceite> {
    const created = await this.vwApiAtendimentosAceiteService.save(vwApiAtendimentosAceite);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VwApiAtendimentosAceite', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update vwApiAtendimentosAceite' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: VwApiAtendimentosAceite
  })
  async put(@Req() req: Request, @Body() vwApiAtendimentosAceite: VwApiAtendimentosAceite): Promise<VwApiAtendimentosAceite> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'VwApiAtendimentosAceite', vwApiAtendimentosAceite.id);
    return await this.vwApiAtendimentosAceiteService.update(vwApiAtendimentosAceite);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete vwApiAtendimentosAceite' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<VwApiAtendimentosAceite> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'VwApiAtendimentosAceite', id);
    const toDelete = await this.vwApiAtendimentosAceiteService.findById(id);
    return await this.vwApiAtendimentosAceiteService.delete(toDelete);
  }
}
