import { observable, computed, action } from 'mobx';
class MapState {
  @observable
  all_room_state = null;
  constructor(initial_room_data) {
    this.all_room_state = initial_room_data;
  }

  @action
  addRoomData(roomData) {
    this.all_room_state.set(roomData.id, roomData);
  }

  @computed
  get all_room_data() {
    return this.all_room_state;
  }
}
export { MapState };
export default MapState;
