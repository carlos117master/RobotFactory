import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CommentResponse, CommentsResponse, RobotResponse, singleRobotResponse } from '../interface/responses';
import { Observable, map } from 'rxjs';
import { Comment,CommentInsert, Robots, RobotInsert } from '../interface/robots';

@Injectable({
  providedIn: 'root'
})
export class RobotServiceService {  
  #http = inject(HttpClient);
  #robotsUrl = 'robots';

  constructor() { }
 
  getRobots():Observable<Robots[]>{
    return this.#http.get<RobotResponse>(this.#robotsUrl).pipe(map((resp) => resp.robots));
  }

  addRobot(newRobot: RobotInsert):Observable<Robots>{
    return this.#http.post<Robots>(this.#robotsUrl, newRobot).pipe(map((resp) => resp));
  }

  editRobot(editRobot: RobotInsert, id: string):Observable<RobotInsert>{
    return this.#http.put<Robots>(`${this.#robotsUrl}/${id}/edit`, editRobot);
  }
  deleteRobot(id: string):Observable<void>{
    return this.#http.delete<void>(`${this.#robotsUrl}/${id}/delete`)
  }
  getRobot(id: string):Observable<Robots>{
    return this.#http.get<{robots: Robots}>(`${this.#robotsUrl}/${id}`).pipe(map((resp) => resp.robots));
  }

  getComments(robotId: string):Observable<CommentsResponse>{
    return this.#http.get<CommentsResponse>(`${this.#robotsUrl}/${robotId}/comments`).
    pipe(map((resp) => resp as CommentsResponse));
  }

  sendComment(robotId:string, comment: CommentInsert):Observable<Comment>{
    return this.#http.post<CommentResponse>(`${this.#robotsUrl}/${robotId}/comments`, comment)
    .pipe(map((resp) => resp.comment));
 }
 
}

