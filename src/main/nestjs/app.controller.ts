import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignUp } from '~/domain/usecase';
import { SignUpInputDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async signUp(@Body() input: SignUpInputDto): Promise<SignUp.Output> {
    try {
      return await this.appService.signUp(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
