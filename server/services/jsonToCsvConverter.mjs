import { Parser } from '@json2csv/plainjs';
import fs from 'fs';

class JSONToCSVConverter {
    constructor(options) {
        this.parser = new Parser(options);
    }

    convert(jsonData, fileName) {
        try {
            try {
                const csv = this.parser.parse(jsonData);
                fs.writeFileSync(fileName, csv, {encoding:"utf-8"});
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    }
}
export default JSONToCSVConverter;





