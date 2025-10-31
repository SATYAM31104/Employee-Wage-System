class Employee {
    constructor(type) {
        this.type = type.toLowerCase(); 
    }

    calculateMonthlyWage() {
        const wagePerHour = 20;
        const fullDayHours = 8;
        const partTimeHours = 4;
        const maxWorkingDays = 20;
        const maxWorkingHours = 100;
        
        let totalHours = 0;
        let totalWage = 0;
        let daysWorked = 0;
        let day = 1;

        console.log(`\n--- Monthly Wage Calculation for ${this.type.toUpperCase()} Employee ---`);
        
        while (daysWorked < maxWorkingDays && totalHours < maxWorkingHours) {
            const attendance = Math.floor(Math.random() * 2);
            
            if (attendance === 1) {
                let hoursWorked = 0;
                
                if (this.type === "fulltime") {
                    hoursWorked = fullDayHours;
                } else if (this.type === "parttime") {
                    hoursWorked = partTimeHours;
                } else {
                    console.log("Invalid employee type");
                    return 0;
                }
                
                if (totalHours + hoursWorked > maxWorkingHours) {
                    hoursWorked = maxWorkingHours - totalHours;
                }
                
                totalHours += hoursWorked;
                const dailyWage = hoursWorked * wagePerHour;
                totalWage += dailyWage;
                daysWorked++;
                
                console.log(`Day ${day}: Present - Worked ${hoursWorked} hours, Earned $${dailyWage}`);
            } else {
                console.log(`Day ${day}: Absent`);
            }
            
            day++;
        }
        
        let reason = "";
        if (totalHours >= maxWorkingHours) {
            reason = `Maximum working hours (${maxWorkingHours}) reached`;
        } else if (daysWorked >= maxWorkingDays) {
            reason = `Maximum working days (${maxWorkingDays}) reached`;
        }
        
        console.log(`\n--- Monthly Summary ---`);
        console.log(`Reason for stopping: ${reason}`);
        console.log(`Total days worked: ${daysWorked}`);
        console.log(`Total hours worked: ${totalHours}`);
        console.log(`Total monthly wage: $${totalWage}`);
        console.log(`Average daily wage: $${(totalWage / daysWorked).toFixed(2)}`);
        
        return totalWage;
    }
}

console.log("=".repeat(60));
const fullTimeEmp = new Employee("fulltime");
fullTimeEmp.calculateMonthlyWage();

console.log("\n" + "=".repeat(60));
const partTimeEmp = new Employee("parttime");
partTimeEmp.calculateMonthlyWage();