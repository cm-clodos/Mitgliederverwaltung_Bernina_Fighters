import * as crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

class EncryptionService {
    constructor() {
        this.algorithm = process.env.ALGORITHM;
        this.secretKey = process.env.SECRET_KEY;
    }
    encrypt (text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return iv.toString("hex") + ":" + encrypted.toString("hex");
    }

    decrypt (text){
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(text.split(":")[0], "hex"));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(text.split(":")[1], "hex")), decipher.final()]);
        return decrypted.toString();
    }

    encryptMemberData(member){
        return {
            ...member,
            firstname: this.encrypt(member.firstname),
            lastname: this.encrypt(member.lastname),
            email: this.encrypt(member.email),
            telephone: this.encrypt(member.telephone)
        };
    }

    decryptMembersListData(members){
        for (let member of members) {
            member.firstname = this.decrypt(member.firstname);
            member.lastname = this.decrypt(member.lastname);
            member.email = this.decrypt(member.email);
            member.telephone = this.decrypt(member.telephone);
        }
        return members;
    }

    decryptMemberData(member){
        return {
            ...member.data[0],
            firstname: this.decrypt(member.data[0].firstname),
            lastname: this.decrypt(member.data[0].lastname),
            email: this.decrypt(member.data[0].email),
            telephone: this.decrypt(member.data[0].telephone)
        };
    }

    decryptMemberEmails(emails){
        for (let email of emails) {
            email.email = this.decrypt(email.email);
        }
        return emails;
    }

    decryptPaymentData(payments){
        for (let payment of payments) {
            payment.firstname = this.decrypt(payment.firstname);
            payment.lastname = this.decrypt(payment.lastname);
        }
        return payments;
    }

    decryptTrikotData(trikots){
        for (let trikot of trikots) {
            if (trikot.firstname === null || trikot.lastname === null) continue;
            trikot.firstname = this.decrypt(trikot.firstname);
            trikot.lastname = this.decrypt(trikot.lastname);
        }
        return trikots;
    }
}

export default EncryptionService;