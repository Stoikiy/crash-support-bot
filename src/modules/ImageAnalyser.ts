import Tesseract, {ImageLike} from 'tesseract.js';

import {Languages} from '../enums/index.js';

class ImageAnalyser {
    private _image: ImageLike;
    private _text: string;
    private _lang: string;
    private _searchValues: string[];
    private _foundedValues: string[]

    constructor() {
        this._image = {} as ImageLike;
        this._text = '';
        this._lang = Languages.English;
        this._searchValues = ['program will be terminated', 'not sdl file'];
        this._foundedValues = [];
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

    public get foundedValues() {
        return this._foundedValues;
    }

    public searchOnImage(): Promise<string[]> {
     return new Promise((resolve, reject) => {
            Tesseract.recognize(this.image, this._lang).then(({ data: { text } }) => {
                this._searchValues.some(str => {

                    console.log(text);

                    // TODO replace with search regex
                    if (text.toLowerCase().includes(str)) {
                        this._foundedValues.push(str)
                        resolve(this._searchValues)
                    }

                    reject('No data match')
                })
            })
        })
    }
}

export default ImageAnalyser;

