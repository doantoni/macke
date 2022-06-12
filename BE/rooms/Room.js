import { Room } from "colyseus";

export class GameRoom extends Room {
    onCreate(options) {
      console.log('Somebody just created a room')
    }
    onJoin(client, options) {
      console.log('Somebody just joined a room')  
    }
  }