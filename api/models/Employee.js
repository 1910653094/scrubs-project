"use strict";

const bcrypt = require("bcrypt");
const query = require("../helper/query");
const EmailSender = require("../helper/EmailSender");

class Employee {
    constructor(id, email, password, name, profession, gender, shoe_size_preference, top_size_preference, bottom_size_preference) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.profession = profession;
        this.gender = gender;
        this.shoe_size_preference = shoe_size_preference;
        this.top_size_preference = top_size_preference;
        this.bottom_size_preference = bottom_size_preference;
    };

    getAllEmployees = async () => await query(
        'Get * employees',
        'SELECT * FROM employee',
        []
    );

    getEmployee = async () => await query(
        'Get specified employee',
        'SELECT name, email, profession, gender, shoe_size_preference, top_size_preference, bottom_size_preference FROM employee WHERE id_employee = $1',
        [this.id]
    );

    getEmployeeWithBorrowings = async () => {
        const obj = await this.getEmployee();
        if (obj.status !== 200) return obj;

        let res = await query(
            'Get * borrowings from distinct employee',
            'SELECT description, "size", color, quantity, borrowed_date, return_date, returned FROM borrow_history ' +
            'JOIN scrub_type USING(id_scrub_type) WHERE id_employee = $1',
            [this.id]
        );
        if (res.status !== 200) return res

        const employee = obj.response;
        delete employee.password;
        employee.borrowings = res.response.map(borrow => {
            const today = new Date();
            if (!borrow.returned && today > borrow.return_date) borrow.status = 'Overdue';
            else if (!borrow.returned) borrow.status = 'Borrowing';
            else borrow.status = 'Returned';
            delete borrow.returned;
        });

        return {
            status: 200,
            response: employee
        };
    };

    insertEmployee = async () => {
        const pwdChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const pwdLen = 16;
        const randPassword = Array(pwdLen)
            .fill(pwdChars)
            .map(x => x[Math.floor(Math.random() * x.length)])
            .join('');

        const password = bcrypt.hashSync(randPassword, 10);
        const resObj = await query(
            'Insert employee',
            'INSERT INTO employee (email, password, "name", profession, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [this.email, password, this.name, this.profession, this.gender]
        );

        if (resObj !== 200) {
            return resObj;
        }

        const subject = 'Your account';
        const text = `Your account has been created:\nUsername: ${this.email}\nPassword: ${randPassword}`;

        const email = new EmailSender(this.email, subject, text);
        email.setUp();
        email.send();

        return resObj;
    };

    updatePreferences = async () => {
        return await query(
            'Update preferences',
            `UPDATE public.employee SET shoe_size_preference = $1, top_size_preference = $2, bottom_size_preference = $3 WHERE id_employee = $4`,
            [this.shoe_size_preference, this.top_size_preference, this.bottom_size_preference, this.id]
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
