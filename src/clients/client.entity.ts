import Activity from "src/activities/activity.entity";
import User from "src/users/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";

@Entity("Clients")
export default class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    user_id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    name: string;

    @Column({ type: "numeric", precision: 10, scale: 2, nullable: false })
    rate: number;

    @Column({ type: "varchar", length: 6, default: "FFFFFF", nullable: false })
    color: string;

    @Column({ type: "numeric", precision: 3, scale: 2, default: 1.0, nullable: false })
    overtime_multiplier: number;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, user => user.clients, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Activity, activity => activity.client)
    activities: Activity[];
}