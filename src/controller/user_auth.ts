import { Controller, Request, Post, UseGuards, Response, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/service/user_auth';


@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('user/login')  
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
    }
