import { observable, computed, action } from 'mobx';
import { RoomData } from './RoomData';
import { idMappings } from '../idMappings';

class MapState {
  @observable
  public allRoomState: Map<number, RoomData>;
  constructor(initialRoomData: Array<{}>) {
    this.allRoomState = new Map<number, RoomData>();
    this.setAllRoomData(initialRoomData);
  }

  @computed
  get fullnessList() {
    let fullnessArray = Array.from(this.allRoomState.entries());
    fullnessArray.sort(([key1, item1], [key2, item2]) => 
      item1.fullness - item2.fullness
    );
    console.log(fullnessArray)
    return fullnessArray;
  }

  @action
  setAllRoomData(roomDataArray: Array<any>) {
    for (let roomJson of roomDataArray) {
      this.addRoomData(roomJson.id, new RoomData(roomJson));
    }
  }

  @action
  addRoomData(id: number, roomData: RoomData) {
    // TODO: Change this? Maybe keep a record of all room data across time.
    this.setRoomData(id, roomData);
  }

  @action
  setRoomData(id: number, roomData: RoomData) {
    this.allRoomState.set(id, roomData);
  }

  @computed
  get allRoomData() {
    return this.allRoomState;
  }

  @computed
  get allRoomGeoData() {
    const result = [];
    for (const [key1, roomData] of this.allRoomState.entries()) {
      const key2: any = key1;
      const key = parseInt(key2);
      result.push({
        type: 'Feature',
        properties: {
          id: key
        },
        geometry: {
          type: 'Polygon',
          coordinates: [idMappings.get(key).coordinates.map(([lng, lat]) => [lat, lng])]
          }
      })
    }
    return result;
  }
}

export { MapState };
export default MapState;
