
import {Member} from '../../member/entities/member.entity'
import {Prop} from '../../prop/entities/prop.entity'


export class Performance {
  id: number ;
  name: string ;
  date: Date ;
  venue: string ;
  members?: Member[] ;
  props?: Prop[] ;
}
