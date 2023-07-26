import MemberHelper from "../helper/MemberHelper.mjs";
import EncryptionService from "./EncryptionService.mjs";

export async function checkIfUniqueTelephone(telephone) {
    const memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();

    let memberTelephones = await memberHelper.getMemberTelephones()
    const telephones = memberTelephones.map(member => encryptionService.decrypt(member.telephone));
    return !telephones.includes(telephone);
}

export async function checkIfUniqueEmail(email) {
    const memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();

    let memberEmails = await memberHelper.getMemberEmails()
    const emails = memberEmails.map(member => encryptionService.decrypt(member.email));
    return !emails.includes(email);
}

export async function checkIfExistingEmailHasChanged(email, memberId) {
    const memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();

    const existingMemberData = await memberHelper.getMemberById(memberId)
    const decryptedMemberData = encryptionService.decryptMemberData(existingMemberData)
    const existingEmail = decryptedMemberData.email
    return  existingEmail !== email
}

export async function checkIfExistingTelephoneHasChanged(telephone, memberId) {
    const memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();

    const existingMemberData = await memberHelper.getMemberById(memberId)
    const decryptedMemberData = encryptionService.decryptMemberData(existingMemberData)
    const existingTelephone = decryptedMemberData.telephone
    return  existingTelephone !== telephone
}




