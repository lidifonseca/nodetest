import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Parte from '../../domain/parte.entity';
import { ParteService } from '../../service/parte.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/partes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('partes')
export class ParteController {
  logger = new Logger('ParteController');

  constructor(private readonly parteService: ParteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Parte
  })
  async getAll(@Req() req: Request): Promise<Parte[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.parteService.findAndCount({
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
    type: Parte
  })
  async getOne(@Param('id') id: string): Promise<Parte> {
    return await this.parteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create parte' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Parte
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() parte: Parte): Promise<Parte> {
    const created = await this.parteService.save(parte);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Parte', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update parte' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Parte
  })
  async put(@Req() req: Request, @Body() parte: Parte): Promise<Parte> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Parte', parte.id);
    return await this.parteService.update(parte);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete parte' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Parte> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Parte', id);
    const toDelete = await this.parteService.findById(id);
    return await this.parteService.delete(toDelete);
  }
}
