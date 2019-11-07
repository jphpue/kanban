import { Prompt } from './prompt';

export interface Image {
    id:String,
    row: number,
    prompt:Prompt,
    colspan: number,
    overlay:String
}
