import {ToolingTemplate} from "../tools/tool-dir/tooling-template";
import {ToolsService} from "../../tools.service";

export class AttributeMethod extends ToolingTemplate {
  override toolName: string;

  public AllAssignedAttributes;
  public ListOfAttributes = new Array<string>();
  attribKVPairArray = new Array<Map<string, number>>
  attributeCountMap = new Map<string, number>;

  constructor(name: string) {
    super();
    this.toolName = name;
    this.AllAssignedAttributes = this.GetAllAssignedStringAttributes();
  }

  /**
   * Override the mainTool method.
   * This method initializes the tool by setting all attributes,
   * counting the last index of each attribute,
   * calculating the real count of each attribute,
   * and logs the attribute count map and tool name.
   *
   * @return {void}
   */
  override mainTool(): void {
    this.setAllAttributes();
    for (const Attribute of this.ListOfAttributes) {
      this.attributeCountMap.set(Attribute, this.getLastAttributeIndex(Attribute));
      this.addToAttributesCount(Attribute)
    }
    this.calculateRealCount(this.attributeCountMap)
    // ToolsService.GetArrayOfProperty("attribute","Wood")
    console.log(this.attributeCountMap);
    console.log(`${this.toolName} initialized`);
  }


  /**
   * Calculates the real count of attributes in the given {@link KVAttributesMap}.
   * The real count is obtained by incrementing the count of each attribute by 1, and then
   * subtracting the count of the next attribute from the current attribute count.
   *
   * @param {Map<string, number>} KVAttributesMap - The map containing attribute names as keys
   *                                                and their respective counts as values.
   *
   * @return {void} - This method does not return anything.
   *                - It updates the attributeCountMap property of the current instance.
   *                - If there is an error while processing the map, a warning is logged to the console.
   */
  private calculateRealCount(KVAttributesMap: Map<string, number>): void {
    const attrMap = KVAttributesMap;
    for (const key of attrMap.keys()) { //this makes it human-readable kinda
      attrMap.set(key, attrMap.get(key)! + 1);
    }
    const arrayFromMap = Array.from(attrMap);
    for (let i = 0; i < arrayFromMap.length; i++) {
      if (i + 1 >= arrayFromMap.length) {
        break;
      }
      try {
        const nextEntry = arrayFromMap[i + 1][1];
        arrayFromMap[i][1] = arrayFromMap[i][1] - nextEntry;
      } catch (e) {
        console.warn("There is no item past this. Could/should probably add a checker for the index to see if it is over the length" + e)
      }
    }
    this.attributeCountMap = new Map(arrayFromMap);
  }

  /**
   * Sets all attributes in the list of assigned attributes.
   *
   * @private
   * @function setAllAttributes
   *
   * @description This method iterates through each assigned attribute in the list of assigned attributes and adds it to the list of attributes if it does not already exist.
   *
   */
  private setAllAttributes() {
    for (const assignedAttribute of this.AllAssignedAttributes) {
      this.ListOfAttributes.find(attr => attr === assignedAttribute) === undefined ? this.ListOfAttributes.push(assignedAttribute) : true;
    }
  }

  /**
   * Increases the count of the specified attribute in the attribute map.
   *
   * @param {string} attribute - The attribute to be counted.
   */
  private addToAttributesCount(attribute: string) {
    const attrMap = this.attribKVPairArray.find(value => value.get(attribute));
    if (attrMap != undefined) {
      attrMap.set(attribute, attrMap.get(attribute)! + 1);
    }
  }

  /**
   * Returns the index of the last occurrence of the given attribute in the sorted list of assigned attributes.
   *
   * @param {string} attribute - The attribute to search for.
   * @returns {number} - The index of the last occurrence of the attribute, or 0 if the attribute is not found.
   */
  private getLastAttributeIndex(attribute: string): number {
    const sortedList = this.AllAssignedAttributes.sort();
    // console.log(sortedList);
    let count = 0;
    for (let i = 0; i < this.AllAssignedAttributes.length; i++) {
      if (sortedList[i] === attribute) {
        if (sortedList[i + 1] !== attribute) {
          count = i;
          break;
        }
      }
    }
    return count;
  }

  /**
   * Get all the different attributes and assign them to an array
   */
  private GetAllAssignedStringAttributes() {
    return this.CachedData.reduce((acc: string[], value) => {
      if (typeof value.attribute === "string") {
        acc.push(value.attribute);
      }
      return acc;
    }, []);
  }

}
