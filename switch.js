class Employee {
    constructor(type) {
        this.type = type.toLowerCase(); 
    }

    calculateWage(check) {
        const wagePerHour = 20;
        const fullDay = 8;
        const halfDay = 4;
        const checkToday = (check === 1) ? "present" : "absent";

        switch (this.type) {
            case "fulltime": {
                const hoursWorked = (check === 1) ? fullDay : 0;
                const dailyWage = hoursWorked * wagePerHour;
                return `The employee is ${checkToday} today and his wage is ${dailyWage}`;
            }
            case "parttime": {
                const hoursWorked = (check === 1) ? halfDay : 0;
                const dailyWage = hoursWorked * wagePerHour;
                return `The employee is ${checkToday} today and his wage is ${dailyWage}`;
            }
            default:
                return "Invalid employee type";
        }
    }
}

// Example usage
let check = Math.floor(Math.random() * 2); 
const empFull = new Employee("fulltime");
console.log(empFull.calculateWage(check));

const empPart = new Employee("parttime");
console.log(empPart.calculateWage(check));

const visitor = new Employee("Visitor");
console.log(visitor.calculateWage(check));