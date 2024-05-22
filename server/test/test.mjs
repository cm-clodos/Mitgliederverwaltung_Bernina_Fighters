import { assert } from "chai";
import { describe, it } from "mocha";
import MemberHelper from "../helper/MemberHelper.mjs";
import Member from "../model/Member.mjs";
import { memberDataSanitzer, trikotDataSanitizer } from "../middleware/inputSanitizer.mjs";
import TrikotHelper from "../helper/TrikotHelper.mjs";
import Trikot from "../model/Trikot.mjs";
import EncryptionService from "../services/EncryptionService.mjs";
import { formatInSwissTime } from "../services/ExportService.mjs";
import FinanceHelper from "../helper/FinanceHelper.mjs";
import TransCategory from "../model/TransCategory.mjs";
import {
    checkActive,
    checkAvailable,
    checkEmail,
    checkEntryDate,
    checkFirstname,
    checkLastname,
    checkMemberId,
    checkRoleId,
    checkTelephone,
    checkTrikotName,
    checkTrikotNumber,
    formatFirstLetterOfNames,
    trimData,
    checkTransCategoryName,
} from "../services/FieldChecker.mjs";

const memberHelper = new MemberHelper("test");
const trikotHelper = new TrikotHelper("test");
const financeHelper = new FinanceHelper("test");

describe("check EncryptionService", () => {
    it("should encrypt and decrypt a string", () => {
        let encryptionService = new EncryptionService();
        const encrypted = encryptionService.encrypt("test");
        const decrypted = encryptionService.decrypt(encrypted);
        assert.equal(decrypted, "test");
    });
});

describe("Test formatInSwissTime", () => {
    it("should return a formatted string in Swiss date format", () => {
        let formattedDate = formatInSwissTime("2021-05-05T22:00:00.000Z");
        assert.strictEqual(typeof formattedDate, "string");
        assert.strictEqual(formattedDate, "06.05.2021");
    });
});

describe("check the memberDataSanitizer", () => {
    it("should sanitize member data fields", () => {
        const req = {
            body: {
                firstname: '<script>alert("XSS attack!");</script>',
                lastname: '<img src="not_an_image.jpg" onerror="alert(\'XSS attack!\');">',
                email: "example@<script>malicious.com</script>",
                telephone: '1234<script>alert("XSS attack!");</script>',
            },
        };

        const expected = {
            firstname: "",
            lastname: "",
            email: "example@",
            telephone: "1234",
        };

        memberDataSanitzer(req, null, () => {
            assert.deepEqual(req.body, expected);
        });
    });
});

describe("check the trikotDataSanitizer", () => {
    it("should sanitize trikot data field name", () => {
        const req = {
            body: {
                name: '<script>alert("XSS attack!");</script>',
            },
        };

        const expected = {
            name: "",
        };

        trikotDataSanitizer(req, null, () => {
            assert.deepEqual(req.body, expected);
        });
    });
});

describe("checkFirstname from validateMemberData", () => {
    it("should return an error if the firstname is missing", () => {
        const error = checkFirstname("");
        assert.deepEqual(error, { firstname: "Vorname ist erforderlich." });
    });
    it("should return an error if the firstname is longer than 50 characters", () => {
        const error = checkFirstname(
            "Thisfirstnameislongerthanfiftycharacterssoitshouldtriggeranerror"
        );
        assert.deepEqual(error, { firstname: "Vorname darf maximal 50 Zeichen lang sein." });
    });
    it("should return an error if the firstname contains digits", () => {
        const error = checkFirstname("John123");
        assert.deepEqual(error, { firstname: "Vorname darf keine Zahlen enthalten." });
    });
    it("should not return an error if the firstname is valid", () => {
        const error = checkFirstname("John");
        assert.deepEqual(error, {});
    });
});

describe("checkLastname from validateMemberData", () => {
    it("should return an error if the lastname is missing", () => {
        const error = checkLastname("");
        assert.deepEqual(error, { lastname: "Nachname ist erforderlich." });
    });
    it("should return an error if the lastname is longer than 50 characters", () => {
        const error = checkLastname(
            "Thislastnameislongerthanfiftycharacterssoitshouldtriggeranerror"
        );
        assert.deepEqual(error, { lastname: "Nachname darf maximal 50 Zeichen lang sein." });
    });
    it("should return an error if the lastname contains digits", () => {
        const error = checkLastname("Doe123");
        assert.deepEqual(error, { lastname: "Nachname darf keine Zahlen enthalten." });
    });
    it("should not return an error if the lastname is valid", () => {
        const error = checkLastname("Doe");
        assert.deepEqual(error, {});
    });
});

describe("checkEmail from validateMemberData", () => {
    it("should return an error if the email is missing", () => {
        const error = checkEmail("");
        assert.deepEqual(error, { email: "E-Mail-Adresse ist ungültig." });
    });
    it("should return an error if the email is invalid", () => {
        const error = checkEmail("invalidemail");
        assert.deepEqual(error, { email: "E-Mail-Adresse ist ungültig." });
    });
    it("should not return an error if the email is valid", () => {
        const error = checkEmail("john@example.com");
        assert.deepEqual(error, {});
    });
});

describe("checkTelephone from from validateMemberData", () => {
    it("should return an error if the telephone is missing", () => {
        const error = checkTelephone("");
        assert.deepEqual(error, { telephone: "Telefonnummer ist ungültig." });
    });
    it("should return an error if the telephone is under 10 digits", () => {
        const error = checkTelephone("123456789");
        assert.deepEqual(error, { telephone: "Telefonnummer ist ungültig." });
    });
    it("should return an error if the telephone is invalid with whitespace", () => {
        const error = checkTelephone("123 123");
        assert.deepEqual(error, { telephone: "Telefonnummer ist ungültig." });
    });
    it("should return an error if the telephone is invalid with letters", () => {
        const error = checkTelephone("acbdefghij");
        assert.deepEqual(error, { telephone: "Telefonnummer ist ungültig." });
    });
    it("should  return an error if the telephone is more den 13 digits", () => {
        const error = checkTelephone("00417943078920");
        assert.deepEqual(error, { telephone: "Telefonnummer ist ungültig." });
    });
    it("should not return an error if the telephone is valid", () => {
        const error = checkTelephone("00494115690");
        assert.deepEqual(error, {});
    });
});

describe("checkActive from from validateMemberData", () => {
    it("should not return an error if active is valid", () => {
        assert.deepEqual(checkActive(true), {});
        assert.deepEqual(checkActive(false), {});
        assert.deepEqual(checkActive(0), {});
        assert.deepEqual(checkActive(1), {});
    });
    it("should return an error object if active is an invalid value", () => {
        assert.deepEqual(checkActive("invalid"), {
            active: "Aktives Flag muss true, false, 0 oder 1 sein.",
        });
        assert.deepEqual(checkActive("1"), {
            active: "Aktives Flag muss true, false, 0 oder 1 sein.",
        });
        assert.deepEqual(checkActive(2), {
            active: "Aktives Flag muss true, false, 0 oder 1 sein.",
        });
        assert.deepEqual(checkActive(-1), {
            active: "Aktives Flag muss true, false, 0 oder 1 sein.",
        });
    });
});

describe("checkRoleId from from validateMemberData", () => {
    it("should return an error object when roleId is not a number", () => {
        const error = checkRoleId("not a number");
        assert.deepEqual(error, { role_id: "Rolle ist ungültig." });
    });
    it("should return an error object when roleId is less than 1", () => {
        const error = checkRoleId(0);
        assert.deepEqual(error, { role_id: "Rolle ist ungültig." });
    });
    it("should return an error object when roleId is greater than 5", () => {
        const error = checkRoleId(6);
        assert.deepEqual(error, { role_id: "Rolle ist ungültig." });
    });
    it("should not return an error object when roleId is valid", () => {
        const result = checkRoleId(3);
        assert.deepEqual(result, {});
    });
});

describe("checkEntryDate from from validateMemberData", () => {
    it("should return an error object when entryDate is not a string", () => {
        const error = checkEntryDate(123);
        assert.deepEqual(error, { entry_date: "Eintrittsdatum ist erforderlich." });
    });
    it("should return an error object when entryDate is an empty string", () => {
        const error = checkEntryDate("");
        assert.deepEqual(error, { entry_date: "Eintrittsdatum ist erforderlich." });
    });
    it("should return an error object when entryDate is too long", () => {
        const error = checkEntryDate("2022-05-15T12:00:00Z");
        assert.deepEqual(error, {
            entry_date: "Eintrittsdatum darf maximal 10 Zeichen lang sein.",
        });
    });
    it("should not return an error object when entryDate is valid", () => {
        const error = checkEntryDate("2022-05-15");
        assert.deepEqual(error, {});
    });
});

describe("checkTrikotNumber from validateTrikotData", () => {
    it("should return an error object when trikotNumber is empty", () => {
        const error = checkTrikotNumber(" ");
        assert.deepEqual(error, { number: "Trikotnummer ist ungültig." });
    });
    it("should return an error object when trikotNumber is bigger than 99", () => {
        const error = checkTrikotNumber(100);
        assert.deepEqual(error, { number: "Trikotnummer muss zwischen 0 und 99 liegen." });
    });
    it("should return an error object when trikotNumber is smaller than 0", () => {
        const error = checkTrikotNumber(-1);
        assert.deepEqual(error, { number: "Trikotnummer muss zwischen 0 und 99 liegen." });
    });
    it("should not return an error object when trikotNumber is valid", () => {
        const error = checkTrikotNumber(10);
        assert.deepEqual(error, {});
    });
    it("should not return an error object when trikotNumber is not a number", () => {
        const error = checkTrikotNumber("1");
        assert.deepEqual(error, {});
    });
});

describe("checkTrikotName from validateTrikotData", () => {
    it("should return an error object when trikotName is too long", () => {
        const error = checkTrikotName("Piz Bellavista von Graubünden");
        assert.deepEqual(error, { name: "Trikotname darf maximal 20 Zeichen lang sein." });
    });
    it("should not return an error object when trikotName is valid", () => {
        const error = checkTrikotName("Piz");
        assert.deepEqual(error, {});
    });
});

describe("checkAvailable from validateTrikotData", () => {
    it("should return an error object when available is not a boolean", () => {
        const error = checkAvailable("true");
        assert.deepEqual(error, { available: "Verfügbarkeit muss true, false, 0 oder 1 sein." });
    });
    it("should return an error object when available is not a boolean", () => {
        const error = checkAvailable("1");
        assert.deepEqual(error, { available: "Verfügbarkeit muss true, false, 0 oder 1 sein." });
    });
    it("should not return an error object when available is valid", () => {
        const error = checkAvailable(true);
        assert.deepEqual(error, {});
    });
    it("should not return an error object when available is valid", () => {
        const error = checkAvailable(1);
        assert.deepEqual(error, {});
    });
});

describe("checkMemberId from validateTrikotData", () => {
    it("should return an error object when memberId is empty", () => {
        const error = checkMemberId(" ");
        assert.deepEqual(error, { member_id: "Mitglieds ID ist ungültig." });
    });
    it("should return an error object when memberId is smaller than 1", () => {
        const error = checkMemberId(0);
        assert.deepEqual(error, { member_id: "Mitglieds ID ist ungültig." });
    });
    it("should not return an error object when memberId is valid", () => {
        const error = checkMemberId(1);
        assert.deepEqual(error, {});
    });
    it("should not return an error object when memberId is not a number", () => {
        const error = checkMemberId("1");
        assert.deepEqual(error, {});
    });
    it("should not return an error object when memberId is null", () => {
        const error = checkMemberId(null);
        assert.deepEqual(error, {});
    });
    it("should not return an error object when memberId is null as a string", () => {
        const error = checkMemberId("null");
        assert.deepEqual(error, {});
    });
});

describe("trimData", () => {
    it("should trim string values in the data object", () => {
        const data = {
            name: "  Test Testperson  ",
            age: 25,
            email: "  test@example.com  ",
        };

        const trimmedData = trimData(data);

        assert.strictEqual(trimmedData.name, "Test Testperson");
        assert.strictEqual(trimmedData.age, 25);
        assert.strictEqual(trimmedData.email, "test@example.com");
    });
    it("should not modify non-string values in the data object", () => {
        const data = {
            name: "  Test Testperson  ",
            age: 25,
            email: "  test@example.com  ",
        };

        const trimmedData = trimData(data);

        assert.strictEqual(trimmedData.name, "Test Testperson");
        assert.strictEqual(trimmedData.age, 25);
        assert.strictEqual(trimmedData.email, "test@example.com");
    });
});

describe("formatFirstLetterOfNames", () => {
    it("should format the first letter of a given name and converts the rest of the letters to lowercase.", function () {
        const formattedName = formatFirstLetterOfNames("müller");
        assert.strictEqual(formattedName, "Müller");
    });
    it("should format the first letter of a given name and converts the rest of the letters to lowercase.", function () {
        const formattedName = formatFirstLetterOfNames("HANS");
        assert.strictEqual(formattedName, "Hans");
    });
    it("should format the first letter of a given name and converts the rest of the letters to lowercase.", function () {
        const formattedName = formatFirstLetterOfNames("hAnS");
        assert.strictEqual(formattedName, "Hans");
    });
    it("should format a double name with space between", function () {
        const formattedName = formatFirstLetterOfNames("hans ueli");
        assert.strictEqual(formattedName, "Hans Ueli");
    });
    it("should format a double name with - between", function () {
        const formattedName = formatFirstLetterOfNames("jean-luc");
        assert.strictEqual(formattedName, "Jean-Luc");
    });
});

describe("checkTranscategoryName from validateTransCategoryData", () => {
    it("should return an error if the categoryname is missing", () => {
        const error = checkTransCategoryName("");
        error.name = "Finanzkategorie ist erforderlich.";
        assert.deepEqual(error, { name: "Finanzkategorie ist erforderlich." });
    });
    it("should return an error if the transCategoryName is longer than 20 characters", () => {
        const error = checkTransCategoryName(
            "ThisCategorynamenameislongerthantwentycharacterssoitshouldtriggeranerror"
        );
        assert.deepEqual(error, { name: "Finanzkategorie darf maximal 20 Zeichen lang sein." });
    });
    it("should not return an error if the category is valid", () => {
        const error = checkTransCategoryName("Mitgliederbeiträge");
        assert.deepEqual(error, {});
    });
});

describe("Testing MemberHelper for checking database operations", () => {
    describe("addMember", () => {
        let memberId;
        const member = new Member(
            "Test",
            "TestPerson",
            "test.testperson@example.com",
            "12345678",
            1,
            5,
            "2021-01-01"
        );
        const encryptionService = new EncryptionService();
        const encryptedMember = encryptionService.encryptMemberData(member);
        it("should return an object with affectedRows 1", async () => {
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
        });
        it("should return duple entry", async function () {
            try {
                await memberHelper.addMember(encryptedMember);
            } catch (error) {
                assert.strictEqual(error.code, "ER_DUP_ENTRY");
            }
        });
        after(async () => {
            await memberHelper.deleteMemberById(memberId);
        });
    });

    describe("getAllMembers", () => {
        it("should return an array of members", async () => {
            const members = await memberHelper.getAllMembers();
            assert.isArray(members, "members is an array");
        });
    });

    describe("getMemberById", () => {
        let memberId;

        before(async () => {
            const member = new Member(
                "Test",
                "TestPerson",
                "test.testperson@example.com",
                "12345678",
                1,
                5,
                "2021-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
        });
        it("should return a member by id", async () => {
            const member = await memberHelper.getMemberById(memberId);
            assert.strictEqual(typeof member, "object");
            assert.strictEqual(typeof member.data[0], "object");
            assert.strictEqual(member.data[0].id, memberId);
        });
        after(async () => {
            await memberHelper.deleteMemberById(memberId);
        });
    });

    describe("deleteMemberById", async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                "Test",
                "TestPerson",
                "test.testperson@example.com",
                "12345678",
                1,
                5,
                "2021-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
        });
        it("should delete a member by id", async () => {
            const res = await memberHelper.deleteMemberById(memberId);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it("should not delete a member if id does not exist", async () => {
            const res = await memberHelper.deleteMemberById(-1);
            assert.strictEqual(res.data.affectedRows, 0);
        });
    });

    describe("deleteMemberByLastname", async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                "Test",
                "TestPerson",
                "test.testperson@example.com",
                "12345678",
                1,
                5,
                "2021-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
        });
        it("should delete a member by id", async () => {
            const member = await memberHelper.getMemberById(memberId);
            const res = await memberHelper.deleteMemberByLastname(member.data[0].lastname);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it("should not delete a member if id does not exist", async () => {
            const res = await memberHelper.deleteMemberByLastname("Kessler");
            assert.strictEqual(res.data.affectedRows, 0);
        });
    });

    describe("updateMember", async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                "Test",
                "TestPerson",
                "test.testperson@example.com",
                "12345678",
                1,
                5,
                "2021-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
        });
        it("should update member information in database", async () => {
            const member = new Member(
                "UpdateTest",
                "UpdateTestPerson",
                "Updatetest.testperson@example.com",
                "000012345678",
                0,
                3,
                "2023-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            await memberHelper.updateMember(memberId, encryptedMember);
            const updatedMember = await memberHelper.getMemberById(memberId);
            let decryptedMember = encryptionService.decryptMemberData(updatedMember);

            assert.strictEqual(decryptedMember.firstname, "UpdateTest");
            assert.strictEqual(decryptedMember.lastname, "UpdateTestPerson");
            assert.strictEqual(decryptedMember.email, "Updatetest.testperson@example.com");
            assert.strictEqual(decryptedMember.telephone, "000012345678");
            assert.strictEqual(decryptedMember.active, 0);
            assert.strictEqual(decryptedMember.role_id, 3);
        });
        it("should member not found and return no data", async function () {
            const updatedMember = await memberHelper.getMemberById(-1);
            assert.strictEqual(updatedMember.data.length, 0);
        });
        after(async () => {
            await memberHelper.deleteMemberById(memberId);
        });
    });

    describe("get all member-roles", async () => {
        it("should return an array of member-roles", async () => {
            const memberroles = await memberHelper.getAllMemberRoles();
            assert.isArray(memberroles, "member-roles is an array");
        });
    });

    describe("create new member payment period for one member", async () => {
        let memberId;
        before(async () => {
            const member = new Member(
                "Test",
                "TestPerson",
                "test.testperson@example.com",
                "12345678",
                1,
                5,
                "2021-01-01"
            );
            const encryptionService = new EncryptionService();
            const encryptedMember = encryptionService.encryptMemberData(member);
            const res = await memberHelper.addMember(encryptedMember);
            memberId = parseInt(res.data.insertId);
        });
        it("should create a new payment period for a member", async () => {
            const res = await memberHelper.addMemberPaymentPeriod();
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it("update the payment should return paid ", async () => {
            await memberHelper.updateMemberPayment(1, 1);
            const payment = await memberHelper.getMemberPaymentById(1);
            assert.strictEqual(payment.data[0].id, 1);
            assert.strictEqual(payment.data[0].paid, 1);
        });
        after(async () => {
            await memberHelper.deleteMemberById(memberId);
            await memberHelper.resetMemberPaymentTable();
        });
    });
});

describe("Testing TrikotHelper for checking database operations", () => {
    describe("addTrikot", () => {
        const trikot = new Trikot(1, "TestTrikot", 0, null);
        it("should return an object with affectedRows 1", async () => {
            const res = await trikotHelper.addTrikot(trikot);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
        });
        it("should return duple entry", async function () {
            try {
                await trikotHelper.addTrikot(trikot);
            } catch (error) {
                assert.strictEqual(error.code, "ER_DUP_ENTRY");
            }
        });
        after(async () => {
            await trikotHelper.deleteTrikotByNumber(1);
        });
    });

    describe("getAllTrikots", () => {
        it("should return an array of trikots", async () => {
            const trikots = await trikotHelper.getAllTrikots();
            assert.isArray(trikots, "trikots is an array");
        });
    });

    describe("updateTrikot", () => {
        before(async () => {
            const trikot = new Trikot(1, "TestTrikot", 0, null);
            await trikotHelper.addTrikot(trikot);
        });
        it("should update trikot information data", async () => {
            const trikot = new Trikot(1, "TestTrikotV2", 1, null);
            await trikotHelper.updateTrikot(trikot);
            const updatedTrikot = await trikotHelper.getTrikotByNumber(1);
            assert.strictEqual(updatedTrikot[0].number, 1);
            assert.strictEqual(updatedTrikot[0].name, "TestTrikotV2");
            assert.strictEqual(updatedTrikot[0].available, 1);
            assert.strictEqual(updatedTrikot[0].member_id, null);
        });
        it("should trikot not found and return no data", async function () {
            const updatedTrikot = await trikotHelper.getTrikotByNumber(-1);
            assert.strictEqual(updatedTrikot.length, 0);
        });
        after(async () => {
            await trikotHelper.deleteTrikotByNumber(1);
        });
    });

    describe("getTrikotByNumber", () => {
        before(async () => {
            const trikot = new Trikot(1, "TestTrikot", 0, null);
            await trikotHelper.addTrikot(trikot);
        });
        it("should return a trikot by number", async () => {
            const trikot = await trikotHelper.getTrikotByNumber(1);
            assert.strictEqual(typeof trikot, "object");
            assert.strictEqual(typeof trikot[0], "object");
            assert.strictEqual(trikot[0].number, 1);
        });
        after(async () => {
            await trikotHelper.deleteTrikotByNumber(1);
        });
    });

    describe("deleteTrikotByNumber", async () => {
        before(async () => {
            const trikot = new Trikot(1, "TestTrikot", 0, null);
            await trikotHelper.addTrikot(trikot);
        });
        it("should delete a trikot by number", async () => {
            const res = await trikotHelper.deleteTrikotByNumber(1);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it("should not delete a member if id does not exist", async () => {
            const res = await trikotHelper.deleteTrikotByNumber(-1);
            assert.strictEqual(res.data.affectedRows, 0);
        });
    });
});

describe("Testing FinanceHelper for checking database operations", () => {
    describe("addTransCategory", () => {
        let transCategoryId;
        const transCategory = new TransCategory("TestTransCategory");
        it("should return an object with affectedRows 1", async () => {
            const res = await financeHelper.addTransCategory(transCategory);
            transCategoryId = parseInt(res.data.insertId);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
        });
        it("should return duple entry", async function () {
            try {
                await financeHelper.addTransCategory(transCategory);
            } catch (error) {
                assert.strictEqual(error.code, "ER_DUP_ENTRY");
            }
        });
        describe("getAllCategories", () => {
            it("should return an array of categories", async () => {
                const transCategories = await financeHelper.getAllTransCategories();
                assert.isArray(transCategories, "transCategories is an array");
            });
        });
        after(async () => {
            await financeHelper.deleteTransCategory(transCategoryId);
        });
    });

    describe("deleteTransCategoryById", async () => {
        let transCategoryId;
        before(async () => {
            const transCategory = new TransCategory("TestTransCategory");
            const res = await financeHelper.addTransCategory(transCategory);
            transCategoryId = parseInt(res.data.insertId);
        });
        it("should delete a transCategory by id", async () => {
            const res = await financeHelper.deleteTransCategory(transCategoryId);
            assert.strictEqual(typeof res, "object");
            assert.strictEqual(res.data.affectedRows, 1);
            assert.strictEqual(res.success, true);
        });
        it("should not delete a transCategory if id does not exist", async () => {
            const res = await financeHelper.deleteTransCategory(-1);
            assert.strictEqual(res.data.affectedRows, 0);
        });
    });
});
