let classBtn = document.getElementById("createClassBtn");

classBtn.addEventListener("click", function() {
  let grade = document.getElementById("gradeInput").value;
  let classValue = document.getElementById("classInput").value;

  calcGpa(grade, classValue);
});

let unweightGpa; // converts text input to weighted GPA values (ex. an A = 5 or 78% = 3)
let weightGpa; // converts text input to unweighted GPA values

const weightArr = []; // array that stores if class added is weighted or unweighted
const weightGpaArr= []; // array that stores all unweightGpa values
const unweightGpaArr = []; // array that stores all weightGpa values
const classList = [];

let totalUnweightGpa = 0;
let totalWeightGpa = 0;

const gpaCollege = {
  Harvard_University: 4.4,
  University_Of_CaliforniaLosAngeles: 4.3,
  Stanford_University: 4.2,
  California_Institute_Of_Technology: 4.1,
  Georgia_Institute_Of_Technology: 4.0,
  Princeton_University: 3.9,
  University_Of_Michigan: 3.8,
  John_Hopkins_University: 3.7,
  University_Of_Portland: 3.6,
  Northwestern_College: 3.5,
  California_State_Polytechnic: 3.4,
  University_Of_Hawaii: 3.3,
  Columbus_State_University: 3.2,
  California_State_University: 3.1,
  University_Of_Balitmore: 3.0,
  Northeastern_Illinois_University: 2.9,
  Indiana_Universtiy_Northwest: 2.8,
  New_England_College: 2.7, 
  Virgina_Union_University: 2.6,
  Calamet_College_Of_Saint_Joseph: 2.5,
  Kentucky_State_University: 2.4,
  Fisher_College: 2.3,
  Concordia_University_Ann_Arbor: 2.2
};

//function with parameter of text input that calculates GPA
function calcGpa(gradeInput, classInput) {
  
  let weightSelect;
  let weights = document.getElementsByName("rb");

  // add if class is weighted/unweighted to arr (ex. ["weight", "weight", "unweight"...etc.])
  for(let i = 0; i < weights.length; i++) {
    if(weights[i].checked) {
      weightSelect = weights[i].value;
      weightArr.push(weightSelect);
    }
  }

  classList.push(classInput);

  // removes percentage symbol IF inputted
  if(gradeInput.includes("%") === true) {
    gradeInput = gradeInput.replace("%", "");
  }
  
  gradeInput = gradeInput.toUpperCase();

  // if statement converts letter or number grade to a GPA score (unweighted + weighted)
  if(gradeInput === "A" || Number(gradeInput) >= 90) {
    gradeInput = "A";
    unweightGpa = 4;
    weightGpa = 5;
  } else if(gradeInput === "B" || Number(gradeInput) >= 80) {
    gradeInput = "B";
    unweightGpa = 3;
    weightGpa = 4;
  } else if(gradeInput === "C" || Number(gradeInput) >= 70) {
    gradeInput = "C";
    unweightGpa = 2;
    weightGpa = 3;
  } else if(gradeInput === "D" || Number(gradeInput) >= 60) {
    gradeInput = "D";
    unweightGpa = 1;
    weightGpa = 2;
  } else {
    gradeInput = "F";
    unweightGpa = 0;
    weightGpa = 0;
  }

  unweightGpaArr.push(unweightGpa); // stores unweighted GPA for class entered based on grade
  weightGpaArr.push(weightGpa); // stores weighted GPA for class entered based on grade

  // loops through weight & unweightArrays (both have the same len)
  for(let i = 0; i < unweightGpaArr.length; i++) {
    if(weightArr[i] === "unweighted") {
      weightGpaArr[i] = unweightGpaArr[i]; // if class is unweighted, change weight gpa to unweighted
    }
    
    totalUnweightGpa += unweightGpaArr[i]; // sum of all unweighted gpa classes
    totalWeightGpa += weightGpaArr[i]; // sum of all weighted gp classes    
  }

  let table = document.getElementById("myTable");
  let row = table.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  cell1.innerHTML = classInput;
  cell2.innerHTML = gradeInput;

  // sum divided by # of classes
  totalUnweightGpa = (totalUnweightGpa/unweightGpaArr.length).toFixed(2); 
  totalWeightGpa = (totalWeightGpa/weightGpaArr.length).toFixed(2);

  document.getElementById("unweightedGrade").innerHTML = totalUnweightGpa;
  document.getElementById("weightedGrade").innerHTML = totalWeightGpa;

  document.getElementById("classCount").innerHTML = " " + weightArr.length; // counted number of weight/unweight for # of classes inputted

  let SAT = Math.floor((totalUnweightGpa/4)*1600)
  document.getElementById("satScore").innerHTML = SAT;

  let ACT = Math.floor((totalUnweightGpa/4)*36)
  document.getElementById("actScore").innerHTML = ACT;

  animate(totalUnweightGpa, totalWeightGpa);
}

function animate(totalUnweightGpa, totalWeightGpa) {
  let circleVariable = document.querySelectorAll(".circle-animation");
  circleVariable.forEach(pro => {
    let unweightGpaWheel = 534-(534*(totalUnweightGpa/4));
    let weightGpaWheel = 534-(534*(totalWeightGpa/5));

    pro.style.setProperty("--stroke-dashoffset-unweight", unweightGpaWheel);
    pro.style.setProperty("--stroke-dashoffset-weight", weightGpaWheel);
  })

  let collegeTable = document.getElementById("collegeGpaTable");

  let colleges = Object.keys(gpaCollege);
  colleges.forEach((colleges) => {
    if(gpaCollege[colleges] <= totalWeightGpa) {
      let rowCollege = collegeTable.insertRow(-1);
      let cell1College = rowCollege.insertCell(0);
      let cell2College = rowCollege.insertCell(1);
      cell1College.innerHTML = colleges;
      cell2College.innerHTML = gpaCollege[colleges];
    }
  })

  reset()
}

function reset() {
  // totalGpas are reset to 0 so to calculate again when new class added and not have repeats of summing the array
  totalUnweightGpa = 0;
  totalWeightGpa = 0;

  // Once calcGPA() is done, the radio & inputs are cleared for user to add a new class.
  document.getElementById("r1").checked = false;
  document.getElementById("r2").checked = false;
  document.getElementById("gradeInput").value = '';
  document.getElementById("classInput").value = '';
}
