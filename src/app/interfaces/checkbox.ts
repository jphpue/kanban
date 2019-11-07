import { Prompt } from './prompt';
import { CheckBoxItems } from './check-box-items';

export interface Checkbox {
    prompt:Prompt,
    id: String,
    row: number,
    halign: String,
    checkBoxItems: CheckBoxItems

}
