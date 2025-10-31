class Employee {
    // Class variables (static properties)
    static WAGE_PER_HOUR = 20;
    static FULL_DAY_HOURS = 8;
    static PART_TIME_HOURS = 4;
    static MAX_WORKING_DAYS = 20;
    static MAX_WORKING_HOURS = 100;
    static PRESENT = 1;
    static ABSENT = 0;

    constructor(name, type) {
        this.name = name;
        this.type = type.toLowerCase();
        this.totalHours = 0;
        this.totalWage = 0;
        this.daysWorked = 0;
    }

    // Class method to check attendance (random)
    static checkAttendance() {
        return Math.floor(Math.random() * 2);
    }

    // Class method to get working hours based on employee type
    static getWorkingHours(employeeType) {
        switch (employeeType.toLowerCase()) {
            case "fulltime":
                return Employee.FULL_DAY_HOURS;
            case "parttime":
                return Employee.PART_TIME_HOURS;
            default:
                return 0;
        }
    }

    // Class method to calculate daily wage
    static calculateDailyWage(hoursWorked) {
        return hoursWorked * Employee.WAGE_PER_HOUR;
    }

    // Class method to check if monthly limits are reached
    static hasReachedMonthlyLimit(totalHours, daysWorked) {
        return totalHours >= Employee.MAX_WORKING_HOURS || daysWorked >= Employee.MAX_WORKING_DAYS;
    }

    // Instance method to compute monthly wage
    computeMonthlyWage() {
        console.log(`\n--- Computing Monthly Wage for ${this.name} (${this.type.toUpperCase()}) ---`);
        
        this.resetMonthlyData();
        let day = 1;

        while (!Employee.hasReachedMonthlyLimit(this.totalHours, this.daysWorked)) {
            const attendance = Employee.checkAttendance();
            
            if (attendance === Employee.PRESENT) {
                let hoursWorked = Employee.getWorkingHours(this.type);
                
                // Check if adding these hours would exceed the limit
                if (this.totalHours + hoursWorked > Employee.MAX_WORKING_HOURS) {
                    hoursWorked = Employee.MAX_WORKING_HOURS - this.totalHours;
                }
                
                this.totalHours += hoursWorked;
                const dailyWage = Employee.calculateDailyWage(hoursWorked);
                this.totalWage += dailyWage;
                this.daysWorked++;
                
                console.log(`Day ${day}: Present - Worked ${hoursWorked} hours, Earned $${dailyWage}`);
            } else {
                console.log(`Day ${day}: Absent`);
            }
            
            day++;
        }
        
        this.displayMonthlySummary();
        return this.totalWage;
    }

    // Instance method to reset monthly data
    resetMonthlyData() {
        this.totalHours = 0;
        this.totalWage = 0;
        this.daysWorked = 0;
    }

    // Instance method to display monthly summary
    displayMonthlySummary() {
        let reason = "";
        if (this.totalHours >= Employee.MAX_WORKING_HOURS) {
            reason = `Maximum working hours (${Employee.MAX_WORKING_HOURS}) reached`;
        } else if (this.daysWorked >= Employee.MAX_WORKING_DAYS) {
            reason = `Maximum working days (${Employee.MAX_WORKING_DAYS}) reached`;
        }
        
        console.log(`\n--- Monthly Summary for ${this.name} ---`);
        console.log(`Reason for stopping: ${reason}`);
        console.log(`Total days worked: ${this.daysWorked}`);
        console.log(`Total hours worked: ${this.totalHours}`);
        console.log(`Total monthly wage: $${this.totalWage}`);
        if (this.daysWorked > 0) {
            console.log(`Average daily wage: $${(this.totalWage / this.daysWorked).toFixed(2)}`);
        }
    }

    // Class method to display company wage policy
    static displayWagePolicy() {
        console.log("\n--- Company Wage Policy ---");
        console.log(`Wage per hour: $${Employee.WAGE_PER_HOUR}`);
        console.log(`Full-time hours per day: ${Employee.FULL_DAY_HOURS}`);
        console.log(`Part-time hours per day: ${Employee.PART_TIME_HOURS}`);
        console.log(`Maximum working days per month: ${Employee.MAX_WORKING_DAYS}`);
        console.log(`Maximum working hours per month: ${Employee.MAX_WORKING_HOURS}`);
    }
}

// Usage example
console.log("=".repeat(60));
Employee.displayWagePolicy();

console.log("\n" + "=".repeat(60));
const johnFullTime = new Employee("John", "fulltime");
johnFullTime.computeMonthlyWage();

console.log("\n" + "=".repeat(60));
const sarahPartTime = new Employee("Sarah", "parttime");
sarahPartTime.computeMonthlyWage();