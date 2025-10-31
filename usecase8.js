class Employee {
    constructor(name, type) {
        this.name = name;
        this.type = type.toLowerCase();
    }

    // Class method to check attendance (random)
    static checkAttendance() {
        return Math.floor(Math.random() * 2);
    }

    // Class method to get working hours based on employee type and company policy
    static getWorkingHours(employeeType, fullTimeHours, partTimeHours) {
        switch (employeeType.toLowerCase()) {
            case "fulltime":
                return fullTimeHours;
            case "parttime":
                return partTimeHours;
            default:
                return 0;
        }
    }

    // Class method to calculate daily wage
    static calculateDailyWage(hoursWorked, wagePerHour) {
        return hoursWorked * wagePerHour;
    }

    // Class method to check if monthly limits are reached
    static hasReachedMonthlyLimit(totalHours, daysWorked, maxWorkingHours, maxWorkingDays) {
        return totalHours >= maxWorkingHours || daysWorked >= maxWorkingDays;
    }

    // Class method to compute monthly wage for any company
    static computeMonthlyWageForCompany(employee, companyPolicy) {
        const { companyName, wagePerHour, fullTimeHours, partTimeHours, maxWorkingDays, maxWorkingHours } = companyPolicy;
        
        console.log(`\n--- Computing Monthly Wage for ${employee.name} (${employee.type.toUpperCase()}) at ${companyName} ---`);
        
        let totalHours = 0;
        let totalWage = 0;
        let daysWorked = 0;
        let day = 1;

        while (!Employee.hasReachedMonthlyLimit(totalHours, daysWorked, maxWorkingHours, maxWorkingDays)) {
            const attendance = Employee.checkAttendance();
            
            if (attendance === 1) { // Present
                let hoursWorked = Employee.getWorkingHours(employee.type, fullTimeHours, partTimeHours);
                
                // Check if adding these hours would exceed the limit
                if (totalHours + hoursWorked > maxWorkingHours) {
                    hoursWorked = maxWorkingHours - totalHours;
                }
                
                totalHours += hoursWorked;
                const dailyWage = Employee.calculateDailyWage(hoursWorked, wagePerHour);
                totalWage += dailyWage;
                daysWorked++;
                
                console.log(`Day ${day}: Present - Worked ${hoursWorked} hours, Earned $${dailyWage}`);
            } else {
                console.log(`Day ${day}: Absent`);
            }
            
            day++;
        }
        
        Employee.displayMonthlySummary(employee.name, companyName, totalHours, totalWage, daysWorked, maxWorkingHours, maxWorkingDays);
        return totalWage;
    }

    // Class method to display monthly summary
    static displayMonthlySummary(employeeName, companyName, totalHours, totalWage, daysWorked, maxWorkingHours, maxWorkingDays) {
        let reason = "";
        if (totalHours >= maxWorkingHours) {
            reason = `Maximum working hours (${maxWorkingHours}) reached`;
        } else if (daysWorked >= maxWorkingDays) {
            reason = `Maximum working days (${maxWorkingDays}) reached`;
        }
        
        console.log(`\n--- Monthly Summary for ${employeeName} at ${companyName} ---`);
        console.log(`Reason for stopping: ${reason}`);
        console.log(`Total days worked: ${daysWorked}`);
        console.log(`Total hours worked: ${totalHours}`);
        console.log(`Total monthly wage: $${totalWage}`);
        if (daysWorked > 0) {
            console.log(`Average daily wage: $${(totalWage / daysWorked).toFixed(2)}`);
        }
    }

    // Class method to display company policy
    static displayCompanyPolicy(companyPolicy) {
        const { companyName, wagePerHour, fullTimeHours, partTimeHours, maxWorkingDays, maxWorkingHours } = companyPolicy;
        
        console.log(`\n--- ${companyName} Wage Policy ---`);
        console.log(`Wage per hour: $${wagePerHour}`);
        console.log(`Full-time hours per day: ${fullTimeHours}`);
        console.log(`Part-time hours per day: ${partTimeHours}`);
        console.log(`Maximum working days per month: ${maxWorkingDays}`);
        console.log(`Maximum working hours per month: ${maxWorkingHours}`);
    }

    // Class method to compare wages across companies
    static compareWagesAcrossCompanies(employee, companies) {
        console.log(`\n--- Wage Comparison for ${employee.name} (${employee.type.toUpperCase()}) ---`);
        
        const results = [];
        
        companies.forEach(company => {
            // Simulate wage calculation without random attendance for comparison
            const hoursPerDay = Employee.getWorkingHours(employee.type, company.fullTimeHours, company.partTimeHours);
            const maxPossibleWage = Math.min(company.maxWorkingDays * hoursPerDay, company.maxWorkingHours) * company.wagePerHour;
            
            results.push({
                company: company.companyName,
                maxPossibleWage: maxPossibleWage,
                wagePerHour: company.wagePerHour
            });
        });
        
        // Sort by maximum possible wage
        results.sort((a, b) => b.maxPossibleWage - a.maxPossibleWage);
        
        console.log("Companies ranked by maximum possible monthly wage:");
        results.forEach((result, index) => {
            console.log(`${index + 1}. ${result.company}: $${result.maxPossibleWage} (at $${result.wagePerHour}/hour)`);
        });
        
        return results;
    }
}

// Define company policies
const companies = [
    {
        companyName: "TechCorp",
        wagePerHour: 25,
        fullTimeHours: 8,
        partTimeHours: 4,
        maxWorkingDays: 22,
        maxWorkingHours: 120
    },
    {
        companyName: "StartupXYZ",
        wagePerHour: 30,
        fullTimeHours: 10,
        partTimeHours: 5,
        maxWorkingDays: 20,
        maxWorkingHours: 100
    },
    {
        companyName: "MegaCorp",
        wagePerHour: 20,
        fullTimeHours: 7,
        partTimeHours: 3.5,
        maxWorkingDays: 25,
        maxWorkingHours: 140
    }
];

// Create employees
const alice = new Employee("Alice", "fulltime");
const bob = new Employee("Bob", "parttime");

// Display all company policies
console.log("=".repeat(70));
companies.forEach(company => {
    Employee.displayCompanyPolicy(company);
});

// Compare wages across companies
console.log("\n" + "=".repeat(70));
Employee.compareWagesAcrossCompanies(alice, companies);
Employee.compareWagesAcrossCompanies(bob, companies);

// Compute actual wages for each company
console.log("\n" + "=".repeat(70));
companies.forEach(company => {
    Employee.computeMonthlyWageForCompany(alice, company);
    console.log("\n" + "-".repeat(50));
    Employee.computeMonthlyWageForCompany(bob, company);
    console.log("\n" + "=".repeat(70));
});