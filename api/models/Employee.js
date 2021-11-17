"use strict";

const bcrypt = require("bcrypt");
const query = require("../helper/query");

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
            'SELECT * FROM employee',
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
            .map(e => new Employee(e.id_employee, e.email, e.password, e.name, e.profession))
            .find(e => e.email === this.email);

        const match = await new Promise((resolve, reject) => {
            bcrypt.compare(this.password, employee.password, (error, res) => {
                if (error) reject(error);
                resolve(res);
            })
        });
        delete employee.password;
        return {
            status: match ? 200 : 400,
            response: match ? employee : { res: 'Passwords do not match' }
        };
    };
}

module.exports = Employee;
