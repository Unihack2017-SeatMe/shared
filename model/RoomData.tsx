import { observable, computed } from 'mobx';
import { idMappings } from '../idMappings';
import { fullnessToColour } from '../colors';
class RoomData {
  @observable
  public capacity: number;
  @observable
  public count: number;
  public readonly roomName: string;
  public readonly coordinates: Array<any>;
  constructor(jsonData: any) {
    this.capacity = jsonData.capacity;
    this.count = jsonData.count;
    console.log(jsonData);
    const data = idMappings.get(jsonData.id);
    console.log(jsonData);
    this.roomName = data.name;
    this.coordinates = data.coordinates;
  }

  @computed
  get fullness() {
    return this.count / this.capacity;
  }

  @computed
  get fullnessColor() { 
    return fullnessToColour(this.fullness);
  }
}
export { RoomData };
export default RoomData;