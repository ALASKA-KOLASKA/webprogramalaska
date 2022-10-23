
import {Performance} from '../../performance/entities/performance.entity'
import {Team} from '../../team/entities/team.entity'


export class Member {
  id: number ;
name: string ;
Performance?: Performance[] ;
Team?: Team[] ;
}
