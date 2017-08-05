import { observable, computed, action } from 'mobx';

import LOCATIONS from './LOCATIONS';

class MapState {
  @observable
  allRoomState = null;
  constructor(initialRoomData) {
    this.allRoomState = initialRoomData;
  }

  @action
  addRoomData(roomData) {
    // TODO: Change this? Maybe keep a record of all room data across time.
    this.setRoomData(roomData);
  }

  @action
  setRoomData(roomData) {
    this.allRoomState.set(roomData.id, roomData);
  }

  @computed
  get allRoomData() {
    return this.allRoomState;
  }

  @computed
  get all_room_geo_data() {
    const result = [];
    for (const [key, {count, capacity}] of this.all_room_data.entries()) {
      console.log(key);
      result.push({
        type: 'Feature',
        properties: {
          name: LOCATIONS[key].name,
          count,
          capacity
        },
        geometry: {
          type: 'Polygon',
          coordinates: [LOCATIONS[key].coordinates]
        }
      });
    }
  }
}

export { MapState };
export default MapState;
