import { Routes } from 'nest-router';
import { PerformanceModule } from './performance/performance.module';
import { MemberModule } from './member/member.module';
import { PropModule } from './prop/prop.module';
import { TeamModule } from './team/team.module';
export const routes: Routes = [
    {
        path: '/api/v1',
        module: MemberModule,
    },
    {
        path: '/api/v1',
        module: PropModule,
    },
    {
        path: '/api/v1',
        module: PerformanceModule,
    },
    {
        path: '/api/v1',
        module: TeamModule,
    },
];