export default class ImmutableHelper {
  static updateSingleElement(array, index, value) {
    const result = [...array];
    result[index] = value;
    return result;
  }
}
