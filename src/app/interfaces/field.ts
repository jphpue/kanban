import {Parent} from "./parent";
import {Textbox} from "./textbox";
import {Image} from "./image";
import {Imagelist} from "./imagelist";
import {Prompt} from "./prompt";

export interface Field {
    id:Text,
    attributes: 
    { 
        prompt: Prompt, 
        default: String, 
        row: number, 
        parent: Parent, 
        colspan: number, 
        halign: String, 
        image: Image, 
        promptcols: Textbox, 
        hiddeninmobile: boolean,
        mandatory: boolean,
        colwidths: number,
        widths: number,
        pagebreak: boolean,
        promptpos: Textbox,
        main: boolean,
        hiddeninweb: boolean,
        approvalprocess: boolean,
        overlay: String,
        rows: number,
        fontsize: number 
        inputfontsize: number,
        maxlength: number,
        mode: Imagelist,
        format: Textbox,
        maxvalue: Imagelist
    }

}
