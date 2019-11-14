import { Prompt } from './prompt';
import { CheckBoxItems } from './check-box-items';

export interface Checkbox {
    prompt:String,
    id: String,
    row: number,
    halign: String,
    checkBoxItems: CheckBoxItems

}
