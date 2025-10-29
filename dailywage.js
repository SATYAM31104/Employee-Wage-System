function attendance(){
    let check = Math.floor(Math.random() * 2);
    return check;
}
// console.log(check);

function Wage(Check){
    let Fullday=8;
    let wagePerhour=20;
    let checkToday = (Check === 1) ? "Present" : "Absent"
    let hoursworked= (Check === 1) ?  Fullday : 0;
    let DailyWage = hoursworked * wagePerhour;
    return `The employee is ${checkToday} today and his wage is ${DailyWage}`;
}

let PresentOrAbsent=attendance();
let checking= Wage(PresentOrAbsent);
console.log(checking);