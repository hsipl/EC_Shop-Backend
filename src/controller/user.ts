import {
    Controller,
    Response,
    Get,
    HttpStatus,
    Param,
    Patch,
    Body,
    Delete,
    Post
  } from '@nestjs/common';
  import { UserService } from '../service/user';
  import { CreateUserDTO } from '../dto/create-user.dto';
  import { UpdateUserDTO } from '../dto/update-user.dto';


  
  @Controller('user') //set route
  export class UserController {
    constructor(private userService: UserService) {}
  
    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO, @Response() res){
      try{
        await this.userService.createUser(createUserDTO)
        res.status(HttpStatus.OK).json({
          status: 'sucess'
        })
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    } 
  
    @Get()
    async getAll(@Response() res){
        try{
            const users = await this.userService.findAllUser()
            res.status(HttpStatus.OK).json(users)
        }
        catch(err){
            console.log(err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

  
    @Get('/:id')
    async getUser(@Response() res, @Param('id') id){
      try{
        const user = await this.userService.findUserById(id)
        res.status(HttpStatus.OK).json(user)
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
  
      }
    }
  
    @Patch('/:id')
    async updateUser(
      @Response() res,
      @Param('id') id,
      @Body() updateUserDTO: UpdateUserDTO,
    ){
      try{
        const isUpdate = await this.userService.updateUser(id, updateUserDTO)
        res.status(HttpStatus.OK).json({
          status: isUpdate ? 'suecess' : 'fail'
        })
      }
    
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  
    @Delete('/:id')
    async deleteUser(@Response() res, @Param('id') id){
      try{
        const isDelete = await this.userService.deleteUser(id)
        res.status(HttpStatus.OK).json({
          status: isDelete ? 'sucess' : 'fail'
        })
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  
  
  }
   
  