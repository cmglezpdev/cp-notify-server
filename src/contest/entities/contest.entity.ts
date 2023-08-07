import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { Platform } from '../../platform/entities/platform.entity';

@Entity()
export class Contest {
    @PrimaryColumn('text')
    id: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('int8', { nullable: false })
    durationSeconds: number;

    @Column('int8', { nullable: false })
    startTimeSeconds: number;

    @Column('text', { nullable: false })
    link: string;

    @Column('text')
    type?: string;

    @ManyToOne(() => Platform, { eager: true })
    platform: Platform;
}
