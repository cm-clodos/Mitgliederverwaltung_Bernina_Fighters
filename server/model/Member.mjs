
class Member {
    id;
    firstname;
    lastname;
    email;
    telephone;
    active;
    role;
    entryDate;

    constructor(firstname, lastname, email, telephone, active, role, entryDate){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.telephone = telephone;
        this.active = active;
        this.role = role;
        this.entryDate = new Date(entryDate);
    }
}

export default Member;