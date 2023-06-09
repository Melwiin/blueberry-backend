import {Controller} from "@tsed/di";
import { BadRequest } from "@tsed/exceptions";
import { QueryParams } from "@tsed/platform-params";
import {Get} from "@tsed/schema";
import { Bosses, getStats } from "osrs-json-hiscores";

@Controller("/")
export class HelloWorldController {
  @Get("/bosses")
  async getBosses(@QueryParams('name') name : string, 
                  @QueryParams('filter') filter : boolean = false) : Promise<any> {
    const stats = await getStats(name).catch((err) => { return new BadRequest(err); })
    let bosses = stats.main?.bosses;
    const filteredBosses: Record<string, any> = {};
    if(filter) {
      for (const boss in bosses) {
        if (bosses[boss].score > 1) {
          filteredBosses[boss] = bosses[boss];
        }
      }
      return filteredBosses;
    }
    return bosses;
  }
}
