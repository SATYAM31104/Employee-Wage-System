
function getAttendance(){
let check=Math.random();
let attendance=Math.floor((check * 2));
return attendance;
}

function checkAttendance(attendance){
    if(attendance === 0){
        console.log("Employee is absent");
    }
    else{
        console.log("Employee is present");
    }
}

let value=getAttendance();
checkAttendance(value);