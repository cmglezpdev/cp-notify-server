import { Handle } from "src/user/entities/handle.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    link: string;

    @OneToMany(() => Handle, handle => handle.platform)
    handles: Handle[];
}
