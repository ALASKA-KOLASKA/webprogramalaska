
import {Member} from '../../member/entities/member.entity'


export class Team {
  id: number ;
name: string ;
captain?: Member  | null;
captainId: number  | null;
instUrl: string ;
}
