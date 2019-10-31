import { Prompt } from './prompt';

export interface Header {
    id: String,
    row: number,
    prompt: Prompt,
    halign: String,
    colspan: number
}
