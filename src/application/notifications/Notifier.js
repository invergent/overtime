import EventEmitter from 'events';

class Notify {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  register(eventName, handler) {
    this.eventEmitter.on(eventName, handler);
  }

  emit(eventName, args) {
    this.eventEmitter.emit(eventName, ...args);
  }
}

const notify = new Notify();

export default notify;
