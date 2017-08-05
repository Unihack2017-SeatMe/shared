import { MapState } from '../model/MapState';
let currentId = 0;
const capacity = 100;
let currentCount = 30;
const initial: Array<any> = [];
for(let i = 0; i < 19; i++) {
  initial.push(
    { 
      id: i,
      count: currentCount,
      capacity
    }
  );
  currentCount += 10;
}
const mapState = new MapState(initial);
setInterval(() => {
  for(let key of mapState.allRoomData.keys()) {
    const roomData = mapState.allRoomData.get(key);
    roomData.count = Math.random() * roomData.capacity;
  }
}, 2000);
export { mapState };