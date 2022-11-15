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
    UseInterceptors,
    ClassSerializerInterceptor,
    UseGuards,
    Request
  
  } from '@nestjs/common';
  import { UserService } from '../service/user';
  import { CreateUserDTO } from '../dto/create-user.dto';
  import { UpdateUserDTO } from '../dto/update-user.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { AuthService } from 'src/service/user_auth';

  
  @Controller('user') //set route
  @UsePipes(ValidationPipe)
    export class UserController {
    constructor(
      private userService: UserService,
      private authService: AuthService) {}

    @Post('/login')  
    async login (@Request() req, @Response() res){
      try{
        const {name, password} = req.body
        const checkAccount = await this.authService.validateUser(name, password)
        if(checkAccount !== true){
          res.send("error")
        }
        
        const access_token = await this.authService.createToken(req.body)
        return res.status(HttpStatus.OK).send(access_token)
        }  

        catch(err){
          console.log(err)
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
        }
      }

    //@UseGuards(AuthGuard('jwt'))  
    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO, @Response() res) {
      try{
        await this.userService.createUser(createUserDTO)
        res.status(HttpStatus.OK).send({
          message: `Created user ${createUserDTO.name} sucessfully!`
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
    //@UseGuards(AuthGuard('local'))  
    @Patch('/:id')
    async updateUser(
      @Response() res,
      @Param('id') id,
      @Body() updateUserDTO: UpdateUserDTO,
    ){
      try{
        const isUpdate = await this.userService.updateUser(id, updateUserDTO)
        res.status(HttpStatus.OK).send({
          status: isUpdate ? 'suecess' : 'fail'
        })
      }
    
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
      }
    }
    //@UseGuards(AuthGuard('local'))  
    @Delete('/:id')
    async deleteUser(@Response() res, @Param('id') id){
      try{
        const isDelete = await this.userService.deleteUser(id)
        res.status(HttpStatus.OK).send({
          status: isDelete ? 'sucess' : 'fail'
        })
      }
  
      catch(err){
        console.log(err)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err)
      }
    }
  
  
  }
   
  