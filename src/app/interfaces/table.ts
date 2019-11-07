import { Prompt } from './prompt';

export interface Table {
    id:String,
    prompt: Prompt,
    width: number,
    colwidths: String,
    pagebreak: boolean
}
