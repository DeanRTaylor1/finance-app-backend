
import pool from '../../pool';
import { User } from './user-model';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';

type UserProps = {
  email: string;
  monthlySalary: number;
  username: string;
  currency: string;
  phone: string;
  savingsTarget: number;
};

/* TODO IMPLEMENT POSTGRES ABSTRACT CLASS FOR BASIC METHODS */

class Outgoings {
  private static table = tables.outgoings;

  static async findAll() {
    const { rows } = await pool.query(`SELECT * FROM ${this.table};`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }

  static async findExistingItemByName(item: string) {
    const { rows } = await pool.query(`SELECT * FROM ${this.table} WHERE item = $1;`, [item]);
    console.log(rows)
    return toCamelCase(rows)[0]
  }


  static async insertNewRecord(item: string, currency: string, userId: number, tag: string, cost: number) {
    const { rows } = await pool.query(
      `INSERT INTO ${this.table} (item, currency, user_id, tag, cost)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *;`,
      [item, currency, userId, tag, cost]
    )

    return toCamelCase(rows)[0]
  }


  static async deleteOutgoingRecords(item: string, userId: number) {
    const { rows } = await pool.query(
      `DELETE FROM ${this.table} WHERE user_id = $1 AND item = $2 RETURNING *;`,
      [userId, item]
    )
    return toCamelCase(rows)[0]

  }

  static async updateExistingRecord(email: string, item: string, currency: string, tag: string, cost: number) {

    const { id } = await User.findByEmail(email)
    console.log(id)


    const { rows } = await pool.query(
      `UPDATE ${this.table} 
        SET currency = $1,
        tag = $2,
        cost = $3,
        updated_at = current_timestamp
        WHERE user_id = $4 AND item = $5
        RETURNING *;`,
      [currency, tag, cost, id, item]
    );
    return toCamelCase(rows)[0];
  }

  static async getRecordsByUser(email: string) {

    const { id } = await User.findByEmail(email)
    console.log(id)


    const { rows } = await pool.query(
      `SELECT * FROM ${this.table} WHERE user_id = $1;`,
      [id]
    );
    // console.log(rows)
    return toCamelCase(rows);
  }


  //static async deleteRecord()

  /*  static async findByEmail(email: string) {
     const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1;`, [
       email,
     ]);
     return toCamelCase(rows)[0];
   }
   static async insertNewUser(email: string, username: string) {
     const { rows } = await pool.query(
       `INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *;`,
       [email, username]
     );
     console.log('\x1b[32m%s\x1b[0m', rows);
     return toCamelCase(rows)[0];
   }
   static async count() {
     const { rows } = await pool.query(`SELECT COUNT(*) FROM users`);
     return toCamelCase(rows)[0];
   }
 
   static async updateExistingUser(user: UserProps) {
     const { rows } = await pool.query(
       `UPDATE users 
        SET monthly_salary = $1,
        currency = $2,
        phone = $3,
        savings_target = $4
        WHERE email = $5
        RETURNING *;`,
       [user.monthlySalary, user.currency, user.phone, user.savingsTarget, user.email]
     );
     return toCamelCase(rows)[0];
   } */
}

export { Outgoings };
