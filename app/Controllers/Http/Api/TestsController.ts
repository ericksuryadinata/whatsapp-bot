import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {training, extract} from "App/Services/Bot/Engine"

export default class TestsController {
  public async training(ctx: HttpContextContract){
    ctx.response.send(training())
  }

  public async extract(ctx: HttpContextContract){
    ctx.response.send(extract())
  }
}
