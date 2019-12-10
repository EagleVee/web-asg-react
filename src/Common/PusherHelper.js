import Pusher from "pusher-js";

const APP_KEY = process.env.REACT_APP_PUSHER_KEY;
const APP_CLUSTER = process.env.REACT_APP_PUSHER_CLUSTER;
const APP_SECRET = process.env.REACT_APP_PUSHER_SECRET;

const socket = new Pusher(APP_KEY, {
  cluster: APP_CLUSTER
});

// Pusher.logToConsole = true;

export default class PusherHelper {
  static subscribe = channel => {
    return socket.subscribe(channel);
  };

  static bind = (channel, channelName, callback) => {
    channel.bind(channelName, callback);
  };

  static trigger = (channel, eventName, data) => {
    socket.trigger(channel);
  };

  static getChannel = channelName => {
    return socket.channel(channelName);
  };
}
