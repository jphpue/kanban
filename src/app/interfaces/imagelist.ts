import { Image } from './image';
import { Prompt } from './prompt';

export interface Imagelist {
    image: Image,
    id: number,
    row: number,
    propmt: Prompt,
    colspan: number
}
