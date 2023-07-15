import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Platform {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { nullable: false })
    name: string;

    @Column('text', { nullable: false })
    link: string;
}
