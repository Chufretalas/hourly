import Activity from "src/activities/activity.entity";
import User from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("Projects")
export default class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    user_id: number;

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string | null;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, user => user.projects, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Activity, activity => activity.project)
    activities: Activity[];
}