import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemAtividade from '../../domain/pad-item-atividade.entity';
import { PadItemAtividadeService } from '../../service/pad-item-atividade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-atividades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-atividades')
export class PadItemAtividadeController {
  logger = new Logger('PadItemAtividadeController');

  constructor(private readonly padItemAtividadeService: PadItemAtividadeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemAtividade
  })
  async getAll(@Req() req: Request): Promise<PadItemAtividade[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemAtividadeService.findAndCount(
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
    type: PadItemAtividade
  })
  async getOne(@Param('id') id: string): Promise<PadItemAtividade> {
    return await this.padItemAtividadeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemAtividade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemAtividade
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemAtividade: PadItemAtividade): Promise<PadItemAtividade> {
    const created = await this.padItemAtividadeService.save(padItemAtividade);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemAtividade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemAtividade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemAtividade
  })
  async put(@Req() req: Request, @Body() padItemAtividade: PadItemAtividade): Promise<PadItemAtividade> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemAtividade', padItemAtividade.id);
    return await this.padItemAtividadeService.update(padItemAtividade);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemAtividade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemAtividade> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemAtividade', id);
    const toDelete = await this.padItemAtividadeService.findById(id);
    return await this.padItemAtividadeService.delete(toDelete);
  }
}
