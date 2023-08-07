import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index } from 'typeorm';
import { Handle } from "src/user/entities/handle.entity";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    @Index({ unique: true })
    name: string;

    @Column('text', { nullable: false })
    link: string;

    @OneToMany(() => Handle, handle => handle.platform)
    handles: Handle[];
}
