import { Column, Entity, PrimaryColumn, ManyToOne, Index } from "typeorm";
import { Platform } from '../../platform/entities/platform.entity';

@Entity()
export class Contest {
    @PrimaryColumn('text')
    id: string;

    @Column('text', { unique: true })
    @Index()
    name: string;

    @Column('bigint')
    durationSeconds: number;

    @Column('bigint')
    startTimeSeconds: number;

    @Column('text')
    link: string;

    @Column('text')
    type?: string;

    @ManyToOne(() => Platform, { eager: true })
    platform: Platform;
}
