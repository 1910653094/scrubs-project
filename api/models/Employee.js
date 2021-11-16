"use strict";

const { PreparedStatement: PS } = require('pg-promise')();
const db = require('../helper/elephantSQL');
const bcrypt = require("bcrypt");

class Employee {
    constructor(id, email, password, name, profession) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.profession = profession;
    }

    getAllEmployees = async () => await query(
            "Get * employees",
            'SELECT email, password, "name", profession FROM employee',
            []
        );

    getEmployee = async () => await query(
            "Get specified employee",
            'SELECT email, password, "name", profession FROM employee WHERE id_employee = $1',
            [this.id]
        );

    insertEmployee = async () => {
        const password = bcrypt.hashSync(this.password, 10);
        return await query(
            "Insert employee",
            'INSERT INTO employee (email, password, "name", profession) VALUES ($1, $2, $3, $4) RETURNING *',
            [this.email, password, this.name, this.profession]
        );
    };

    login = async () => {
        const allObj = await this.getAllEmployees();
        if (allObj.status !== 200) {
            return allObj;
        }
        const employee = allObj.response
            .map(e => new Employee(e.id, e.email, e.password, e.name, e.profession))
            .find(e => e.email === this.email);

        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(this.password, employee.password, (error, res) => {
                if (error) reject(error);
                resolve(res);
            })
        });
        return {
            status: match ? 200 : 400,
            response: match ? { success: 'Matching emails and password' } : { error: 'Passwords do not match' }
        };
    };
}

const query = async (name, sql, v) => {
    const stmt = new PS({
        name: name,
        text: sql,
        values: v
    });

    let res;
    await db.any(stmt)
        .then(data => {
            res = {
                status: 200,
                response: data
            };
        })
        .catch(err => {
            return res = {
                status: 400,
                response: err
            }
        });
    return res;
}

module.exports = Employee;
