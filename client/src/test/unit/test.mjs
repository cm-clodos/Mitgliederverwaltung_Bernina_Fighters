import {describe, it} from 'mocha';
import {assert} from 'chai';
import {formatInSwissTime, formatActiveValue} from "../../services/formatterService.mjs";

describe('Test formatInSwissTime', () => {
    it('should return a formatted string in Swiss date format', () => {
        let formattedDate = formatInSwissTime("2021-05-05T22:00:00.000Z");
        assert.strictEqual(typeof formattedDate, 'string');
        assert.strictEqual(formattedDate, "06.05.2021");
    });
});

describe('Test formatActiveValue', () => {
    it('should return "Aktiv" when input is 1', () => {
        let result = formatActiveValue(1);
        assert.strictEqual(result, 'Aktiv');
    });
    it('should return "Inaktiv" when input is 0', () => {
        let result = formatActiveValue(0);
        assert.strictEqual(result, 'Inaktiv');
    });
    it('should return "Inaktiv" when input is -1', () => {
        let result = formatActiveValue(-1);
        assert.strictEqual(result, 'Inaktiv');
    });
    it('should return "Inaktiv" when input is a string', () => {
        let result = formatActiveValue('not a number');
        assert.strictEqual(result, 'Inaktiv');
    });
    it('should return "Inaktiv" when input is null', () => {
        let result = formatActiveValue(null);
        assert.strictEqual(result, 'Inaktiv');
    });
    it('should return "Inaktiv" when input is undefined', () => {
        let result = formatActiveValue(undefined);
        assert.strictEqual(result, 'Inaktiv');
    });
});