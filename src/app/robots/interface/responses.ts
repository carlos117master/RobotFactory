import { Robots } from "./robots";
import { Comment } from "./robots";

export interface RobotResponse {
    robots: Robots[];
}

export interface singleRobotResponse {
    robot: Robots;
}

export interface CommentsResponse {
    comentarios: Comment[];
}

export interface CommentResponse {
    comment: Comment;
}