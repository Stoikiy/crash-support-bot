import Tesseract, {ImageLike} from 'tesseract.js';

import {Languages} from '@enums/index';

class ImageAnalyser {
    private image: ImageLike;
    private text: string;
    private lang: string;
    constructor() {
        this.image = {} as ImageLike;
        this.text = '';
        this.lang = Languages.English
    }

    setImage(sample: ImageLike) {
        this.image = sample;
    }

    getText() {
        return this.text;
    }

    searchOnImage() {
        Tesseract.recognize(
            this.image,
            this.lang, { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            this.text = text;
            console.log('text from img => ', text);
        })
    }

}

export default ImageAnalyser;

