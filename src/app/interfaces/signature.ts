import { Prompt } from './prompt';
import { Image } from './image';

export interface Signature {
    id:String,
    prompt:Prompt,
    width:number,
    colwidths:String,
    hiddeninmobile: boolean,
    image:Image
}
