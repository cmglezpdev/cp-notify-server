import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Platform } from "src/platform/entities/platform.entity";


@Entity()
export class Handle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    userId: string;
    
    @Column('int')
    platformId: number;

    @Column('text')
    handle: string;

    @ManyToOne(() => User, (user) => user.handles)
    user: User;

    @ManyToOne(() => Platform, (platform) => platform.handles)
    platform: Platform;
}