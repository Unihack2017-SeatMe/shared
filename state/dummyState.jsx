import { MapState } from '../model/MapState';
let currentId = 0;
const capacity = 100;
let currentCount = 30;
const initial = [];
for(let i = 0; i < 10; i++) {
  initial.push([
    i, 
    { 
      count: currentCount,
      capacity: capacity
    }
  ]);
  currentCount += 10;
}
const mapState = new MapState(initial);
export { mapState };