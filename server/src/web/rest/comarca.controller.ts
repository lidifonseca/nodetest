import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Comarca from '../../domain/comarca.entity';
import { ComarcaService } from '../../service/comarca.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/comarcas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('comarcas')
export class ComarcaController {
  logger = new Logger('ComarcaController');

  constructor(private readonly comarcaService: ComarcaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Comarca
  })
  async getAll(@Req() req: Request): Promise<Comarca[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.comarcaService.findAndCount({
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
    type: Comarca
  })
  async getOne(@Param('id') id: string): Promise<Comarca> {
    return await this.comarcaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create comarca' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Comarca
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() comarca: Comarca): Promise<Comarca> {
    const created = await this.comarcaService.save(comarca);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Comarca', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update comarca' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Comarca
  })
  async put(@Req() req: Request, @Body() comarca: Comarca): Promise<Comarca> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Comarca', comarca.id);
    return await this.comarcaService.update(comarca);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete comarca' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Comarca> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Comarca', id);
    const toDelete = await this.comarcaService.findById(id);
    return await this.comarcaService.delete(toDelete);
  }
}
