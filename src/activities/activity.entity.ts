import Client from "src/clients/client.entity";
import Project from "src/projects/project.entity";
import User from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("activities")
export default class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    user_id: number;

    @Column({ type: "int", nullable: false })
    client_id: number;

    @Column({ type: "int", nullable: true })
    project_id: number | null;

    @Column({ type: "date", nullable: false })
    dt_worked: Date;

    @Column({ type: "numeric", precision: 5, scale: 2, nullable: false })
    hours: number;

    @Column({ type: "varchar", length: 200, nullable: true })
    description: string | null;

    @Column({ type: "boolean", default: false, nullable: false })
    fl_is_overtime: boolean;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, user => user.activities, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Client, client => client.activities)
    @JoinColumn({ name: "client_id" })
    client: Client;

    @ManyToOne(() => Project, project => project.activities, { onDelete: "SET NULL" })
    @JoinColumn({ name: "project_id" })
    project: Project | null;
}