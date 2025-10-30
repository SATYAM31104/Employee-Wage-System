class Employee{
    constructor(type){
        this.type = type;
    }
     calculateWage(check){
        let wagePerhour=20;
        let Fullday=8;
        let halfday=4;
        let checkToday = (check === 1 ) ? "present" : "absent"
        if(this.type === 'fulltime'){
            const hoursworked= (check === 1) ? Fullday : 0;
            const DailyWage = hoursworked * wagePerhour;
        return `The employee is ${checkToday} today and his wage is ${DailyWage}`;
        }
        else{
            const halfwork = (check === 1 ) ? halfday : 0;
            const wage = halfwork * wagePerhour;
            return `The employee is ${checkToday} today and his wage is ${wage}`;
        }
    }
}

let check = Math.floor(Math.random() * 2) ;
// const Emp = new Employee("fulltime");
const Emp = new Employee("partTime");
console.log(Emp.calculateWage(check));
