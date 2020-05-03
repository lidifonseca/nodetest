import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Banco from '../../domain/banco.entity';
import { BancoService } from '../../service/banco.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/bancos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('bancos')
export class BancoController {
  logger = new Logger('BancoController');

  constructor(private readonly bancoService: BancoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Banco
  })
  async getAll(@Req() req: Request): Promise<Banco[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.bancoService.findAndCount(
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
    type: Banco
  })
  async getOne(@Param('id') id: string): Promise<Banco> {
    return await this.bancoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create banco' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Banco
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() banco: Banco): Promise<Banco> {
    const created = await this.bancoService.save(banco);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Banco', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update banco' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Banco
  })
  async put(@Req() req: Request, @Body() banco: Banco): Promise<Banco> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Banco', banco.id);
    return await this.bancoService.update(banco);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete banco' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Banco> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Banco', id);
    const toDelete = await this.bancoService.findById(id);
    return await this.bancoService.delete(toDelete);
  }
}
