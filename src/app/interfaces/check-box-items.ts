import { Prompt } from './prompt';
import { Parent } from './parent';

export interface CheckBoxItems {
    id: String,
    row: number,
    prompt: Prompt,
    parent: Parent
}
