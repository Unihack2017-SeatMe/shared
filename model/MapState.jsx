import { observable, computed, action } from 'mobx';
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
}
export { MapState };
export default MapState;
