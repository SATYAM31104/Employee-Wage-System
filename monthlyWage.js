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
    monthlywage(check){
        const workingdays = 20;
        const wagePerHour = 20;
        const fullDay = 8;
        const halfDay = 4;
        const checkToday = (check === 1) ? "present" : "absent";
        if(this.type === "fulltime"){
            let monthlyWage=0;
            for(let i = 0 ; i < 20 ; i++){
                const attendance = Math.floor(Math.random() * 2); // hum harr dinn ki attendance check kar rahe hain and not based on monthly
                if(attendance === 1){
                    const hoursWorked = fullDay;
                    const dailyWage = hoursWorked * wagePerHour;
                    monthlyWage += dailyWage;
                }
                else{
                    console.log("Employee was absent today");
                }
            }
             console.log(`the employee is earning ${monthlyWage} per month`) ;

        }
        else if (this.type === "parttime"){
           
            let monthlyWage=0;
            for(let i =0 ; i<20 ;i++){
                const attendance = Math.floor(Math.random() * 2);
                if(attendance === 1){
                    const hoursWorked = halfDay;
                    const dailyWage = hoursWorked * wagePerHour;
                    monthlyWage += dailyWage;
                }
                else{
                    console.log("Employee was absent today");
                }

            }
            console.log(` the employee is earning ${monthlyWage} per month`);
        }
        
        else{
            console.log(`Not an employee because this is a ${this.type}`);
        }
    }
}


let check = Math.floor(Math.random() * 2); 
const empFull = new Employee("fulltime");
// console.log(empFull.calculateWage(check));
console.log(empFull.monthlywage(check));

// const empPart = new Employee("parttime");
// console.log(empPart.calculateWage(check));

// const visitor = new Employee("Visitor");
// console.log(visitor.calculateWage(check));