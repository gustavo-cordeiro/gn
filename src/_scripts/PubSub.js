export default class {
  constructor() {
    this.topics = {};
    this.eventsCount = 0;
  }

  pub(events, data) {
    for (var topic in this.topics){
      if (this.topics.hasOwnProperty(topic)) {
        if (topic.split('#')[0] == events) {
          this.topics[topic](data) !== false || delete this.topics[topic];
        }
      }
    }
  }

  sub (events, callback) {
    this.topics[`${events}#${++this.eventsCount}`] = callback;
  }
};
