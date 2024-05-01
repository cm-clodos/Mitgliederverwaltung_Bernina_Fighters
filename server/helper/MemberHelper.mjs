import DatabaseConnection from "../model/DatabaseConnection.mjs";

class MemberHelper {
  databaseConnector = null;

  constructor(databaseType = process.env.DB_TYPE || "production") {
    this.databaseConnector = new DatabaseConnection(databaseType);
  }

  async getAllMembers() {
    let sql =
      "SELECT members.id, members.firstname, members.lastname, members.email, members.telephone, members.active, memberrole.role, members.entry_date FROM members";
    sql += " JOIN memberrole ON members.role_id = memberrole.id";
    sql += " ORDER BY members.active DESC, members.entry_date ASC";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllActiveMembers() {
    let sql =
      "SELECT members.id, members.firstname, members.lastname, members.email, members.telephone, members.active, memberrole.role, members.entry_date FROM members";
    sql += " JOIN memberrole ON members.role_id = memberrole.id";
    sql += " WHERE members.active = 1"; // Nur aktive Mitglieder
    sql += " ORDER BY members.entry_date ASC";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async addMember(member) {
    const sql =
      "INSERT INTO members (firstname, lastname, email, telephone, active, role_id, entry_date) VALUES (?,?,?,?,?,?,?)";
    try {
      return await this.databaseConnector.query(sql, [
        member.firstname,
        member.lastname,
        member.email,
        member.telephone,
        member.active,
        member.role,
        member.entryDate,
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getMemberById(id) {
    const sql = "SELECT * FROM members WHERE id = ?";
    try {
      return await this.databaseConnector.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  async getMemberByIdWithRole(id) {
    let sql =
      "SELECT members.id, members.firstname, members.lastname, members.email, members.telephone, members.active, memberrole.role, members.entry_date FROM members";
    sql += " JOIN memberrole ON members.role_id = memberrole.id";
    sql += " WHERE members.id = ?";
    try {
      return await this.databaseConnector.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  async getMemberByRole(role_id) {
    let sql = "SELECT * FROM members WHERE role_id = ?";
    try {
      return await this.databaseConnector.query(sql, [role_id]);
    } catch (error) {
      throw error;
    }
  }

  async deleteMemberById(id) {
    const sql = "DELETE FROM members WHERE id = ?";
    try {
      return await this.databaseConnector.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  async deleteMemberByLastname(lastname) {
    const sql = "DELETE FROM members WHERE lastname = ?";
    try {
      return await this.databaseConnector.query(sql, [lastname]);
    } catch (error) {
      throw error;
    }
  }

  async updateMember(id, member) {
    const data = [
      member.firstname,
      member.lastname,
      member.email,
      member.telephone,
      member.active,
      member.role,
      member.entryDate,
      id,
    ];
    const sql =
      "UPDATE members SET firstname=?, lastname=?, email=?, telephone=?, active=?, role_id=?, entry_date=? WHERE id=?";
    try {
      return await this.databaseConnector.query(sql, data);
    } catch (error) {
      throw error;
    }
  }

  async getAllMemberRoles() {
    const sql = "SELECT * FROM memberrole";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberPaymentsForPeriod() {
    let sql = "SELECT p.id, p.paid, p.paid_date, p.created_at, m.firstname, m.lastname ";
    sql += "FROM payment p ";
    sql += "INNER JOIN members m ON p.member_id = m.id ";
    sql += "WHERE m.role_id <> 3 AND m.active = 1";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberPaymentById(id) {
    const sql = "SELECT * FROM payment WHERE id = ?";
    try {
      return await this.databaseConnector.query(sql, [id]);
    } catch (error) {
      throw error;
    }
  }

  async updateMemberPayment(id, paid) {
    const data = [paid, id];
    const sql = "UPDATE payment SET paid=? WHERE id=?";
    try {
      return await this.databaseConnector.query(sql, data);
    } catch (error) {
      throw error;
    }
  }

  async addMemberPaymentPeriod() {
    let sql = "INSERT INTO payment (paid, member_id) SELECT 0, id FROM members ";
    sql += "WHERE role_id <> 3 AND active = 1";
    try {
      return await this.databaseConnector.query(sql, null);
    } catch (error) {
      throw error;
    }
  }

  async getAllMemberPaymentsPeriods() {
    let sql = "SELECT created_at FROM payment";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async resetMemberPaymentTable() {
    let sql = "TRUNCATE TABLE payment";
    try {
      return await this.databaseConnector.query(sql, null);
    } catch (error) {
      throw error;
    }
  }

  async getMemberTelephones() {
    let sql = "SELECT telephone FROM members";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberEmails() {
    let sql = "SELECT email FROM members";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getActiveMemberEmails() {
    let sql = "SELECT email FROM members WHERE active = 1";
    try {
      const res = await this.databaseConnector.query(sql, null);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getMemberEmailsWithPaymentInfos() {
    let sql = "SELECT p.paid, p.created_at, m.email FROM payment p ";
    sql += "JOIN members m ON p.member_id = m.id ";
    sql += "WHERE m.active = 1";
    try {
      return await this.databaseConnector.query(sql, null);
    } catch (error) {
      throw error;
    }
  }
}

export default MemberHelper;
