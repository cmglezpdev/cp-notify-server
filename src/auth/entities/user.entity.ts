import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Platform } from 'src/platform/entities/platform.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { nullable: false })
    name: string;

    @Column('text')
    password: string;

    @Column('text', { unique: true })
    email: string;

    @ManyToMany(() => Platform)
    @JoinTable()
    platforms: Platform[]

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}
