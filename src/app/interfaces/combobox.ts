import {Prompt} from "./prompt";
import {Comboboxitems} from "./comboboxitems";
export interface Combobox {
    id:String,
    prompt: Prompt,
    row: number,
    halign: String,
    comboboxitems:Comboboxitems

}
