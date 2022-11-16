import {
    Controller,
    Response,
    Get,
    HttpStatus,
    Param,
    Patch,
    Body,
    Delete,
    Post,
    UsePipes,
    ValidationPipe,
    UseGuards,
    Request
  
  } from '@nestjs/common';
  import { UserService } from '../service/user';
  import { CreateUserDTO } from '../dto/create-user.dto';
  import { UpdateUserDTO } from '../dto/update-user.dto';
  import { AuthGuard } from '@nestjs/passport';


  
  @Controller('user') //set route
  @UsePipes(ValidationPipe)
    export class UserController {
    constructor(
      private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))  
    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO, @Response() res) {
      try{
        await this.userService.createUser(createUserDTO)
        res.status(HttpStatus.OK).send({
          message: `Created user ${createUserDTO.username} sucessfully!`
        })
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
      }
    } 
  
    @Get()
    async getAll(@Response() res){
        try{
            const users = await this.userService.findAllUser()
            res.status(HttpStatus.OK).send(users)
        }
        catch(err){
            console.log(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
    }

  
    @Get('/:id')
    async getUser(@Response() res, @Param('id') id){
      try{
        const user = await this.userService.findUserById(id)
        return res.status(HttpStatus.OK).send(user)
      }
  
      catch(err){
        console.log(err)
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
  
      }
    }
    @UseGuards(AuthGuard('jwt'))  
    @Patch('/:id')
    async updateUser(
      @Response() res,
      @Param('id') id,
      @Body() updateUserDTO: UpdateUserDTO,
    ){
      try{
        const isUpdate = await this.userService.updateUser(id, updateUserDTO)
        res.status(HttpStatus.OK).send({
          status: isUpdate ? 'Updated suecessfully.' : 'Updated failed.'
        })
      }
    
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
      }
    }
    @UseGuards(AuthGuard('jwt'))  
    @Delete('/:id')
    async deleteUser(@Response() res, @Param('id') id){
      try{
        const isDelete = await this.userService.deleteUser(id)
        res.status(HttpStatus.OK).send({
          status: isDelete ? 'Deleted sucessfully.' : 'Deleted failed.'
        })
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
      }
    }
  
  
  }
   
  