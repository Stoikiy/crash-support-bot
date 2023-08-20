import Tesseract, {ImageLike} from 'tesseract.js';

import {Languages} from '../enums/index.js';

class ImageAnalyser {
    private _image: ImageLike;
    private _text: string;
    private _lang: string;
    private _valuesMap: Map<string, string>;

    constructor() {
        this._image = {} as ImageLike;
        this._text = '';
        this._lang = Languages.English;
        this._valuesMap = new Map([
            ['crash', 'Program was crashed'],
            ['terminated', 'Program Will be terminated'],
            ['sdl', 'No SDL File']
        ])
    }

    public set text(str: string) {
        this._text = str;
    }

    public set image(sample: ImageLike) {
        this._image = sample;
    }

    public get text() {
        return this._text;
    }

    public get image() {
        return this._image;
    }

    public searchOnImage(): Promise<string[]> {
     return new Promise((resolve, reject) => {
            Tesseract.recognize(this.image, this._lang).then(({ data: {text}}) => {
                let finds: string[] = [];
                this._valuesMap.forEach((value, key) => {
                    // TODO add search by user text
                    if (text.toLowerCase().match(new RegExp(key, 'ig'))) {
                        finds.push(this._valuesMap.get(key))
                    }
                })
                resolve(finds);
            }).catch(e => {
                reject(`No data match - ${e}`)
            })
        })
    }
}

export default ImageAnalyser;

