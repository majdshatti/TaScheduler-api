import { IUserDocument } from "./";

interface ServerToClientEvents {
  notifyTask: (key: string, body: Object) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  user: IUserDocument;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
