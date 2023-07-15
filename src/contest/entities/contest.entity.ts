import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Platform } from '../../platform/entities/platform.entity';

@Entity()
export class Contest {
    @PrimaryColumn('text')
    id: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('bigint', { nullable: false })
    durationSeconds:  number;

    @Column('bigint', { nullable: false })
    startTimeSeconds: number;
    
    @Column('text', { nullable: false })
    link:             string;

    @Column('text')
    type?: string;

    @ManyToOne(() => Platform)
    platform: Platform;
}
