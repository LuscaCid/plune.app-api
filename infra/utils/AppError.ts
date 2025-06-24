export class AppError {
  message : string;
  statusCode : number;

  constructor (message : string, statusCode = 401){ 
    this.message = message;
    this.statusCode = statusCode;
  }
}