import io from 'socket.io-client';

import store from '../../../store';

// Princip SMARTSCALES

export class SmartScales {
  constructor(args) {
    this.baseUrl = args.baseUrl;
    this.socketPort = args.socketPort;
    this.event = args.event;
    this.socket = io(`${this.baseUrl}:${this.socketPort}`);
  }

  connect(fn) {
    this.disconnect();
    
    this.socket.on(this.event, (payload) => {
      fn(payload);
    });
  }

  disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
      delete this.socket;
    }
  }
}

export const getMainScales = () => {
  const scales = store.getState().scales.data;
  if (scales.length > 0) {
    return scales[0].id;
  }
  return null;
};