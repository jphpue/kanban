import {Prompt} from "./prompt";
export interface Group {
    id: String,
    prompt: Prompt,
    width: number,
    colwidths: [],
    main: boolean,
    pagebreak: boolean
}
