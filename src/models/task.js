import md5 from 'md5'
const salt = "ramdom_str";

export const TASK_TYPE = Object.freeze({
  IMMEDIATELY: "immediately",
  IMPORTANT: "important",
  ORDINARY: "ordinary",
  INSIGNIFICANT: "insignificant",
});

export const TASK_STATUS = Object.freeze({
  COMPLETED: 'completed',
  UNCOMPLETED: 'uncompleted',
});

export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'

  constructor() {
    this.id = md5(Date.now()+salt)
    this.title = "";
    this.description = "";
    this.type = TASK_TYPE.INSIGNIFICANT
    this.status = Task.TS_INCOMPLETED;
  }
}
