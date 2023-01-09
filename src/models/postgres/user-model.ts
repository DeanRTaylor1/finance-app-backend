import { UserProps } from '../../common/Types/types-interfaces';
import pool from '../../pool';
import { tables } from './util/tables';
import toCamelCase from './util/to-camel-case';


class User {
  private static table = tables.users;

  static async find() {
    const { rows } = await pool.query(`SELECT * FROM users;`);
    const parsedRows = toCamelCase(rows);
    return parsedRows;
  }
  static async findByEmail(email: string) {
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
       savings_target = $4,
       updated_at = current_timestamp
       WHERE email = $5
       RETURNING *;`,
      [user.monthlySalary, user.currency, user.phone, user.savingsTarget, user.email]
    );
    return toCamelCase(rows)[0];
  }
}

export { User };
