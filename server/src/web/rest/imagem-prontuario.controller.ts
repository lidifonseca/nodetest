import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ImagemProntuario from '../../domain/imagem-prontuario.entity';
import { ImagemProntuarioService } from '../../service/imagem-prontuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/imagem-prontuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('imagem-prontuarios')
export class ImagemProntuarioController {
  logger = new Logger('ImagemProntuarioController');

  constructor(private readonly imagemProntuarioService: ImagemProntuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ImagemProntuario
  })
  async getAll(@Req() req: Request): Promise<ImagemProntuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.imagemProntuarioService.findAndCount(
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
    type: ImagemProntuario
  })
  async getOne(@Param('id') id: string): Promise<ImagemProntuario> {
    return await this.imagemProntuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create imagemProntuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ImagemProntuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() imagemProntuario: ImagemProntuario): Promise<ImagemProntuario> {
    const created = await this.imagemProntuarioService.save(imagemProntuario);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ImagemProntuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update imagemProntuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ImagemProntuario
  })
  async put(@Req() req: Request, @Body() imagemProntuario: ImagemProntuario): Promise<ImagemProntuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ImagemProntuario', imagemProntuario.id);
    return await this.imagemProntuarioService.update(imagemProntuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete imagemProntuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ImagemProntuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ImagemProntuario', id);
    const toDelete = await this.imagemProntuarioService.findById(id);
    return await this.imagemProntuarioService.delete(toDelete);
  }
}
