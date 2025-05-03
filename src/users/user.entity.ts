import Activity from "src/activities/activity.entity";
import Client from "src/clients/client.entity";
import Project from "src/projects/project.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Users")
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, unique: true, nullable: false })
    username: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    pass_hash: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(() => Client, client => client.user)
    clients: Client[];

    @OneToMany(() => Project, project => project.user)
    projects: Project[];

    @OneToMany(() => Activity, activity => activity.user)
    activities: Activity[];
}