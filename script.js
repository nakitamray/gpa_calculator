let classBtn = document.getElementById("createClassBtn");

classBtn.addEventListener("click", function() {
  let grade = document.getElementById("gradeInput").value;
  calcGpa(grade);
});

let unweightGpa; // converts text input to weighted GPA values (ex. an A = 5 or 78% = 3)
let weightGpa; // converts text input to unweighted GPA values

const weightArr = []; // array that stores if class added is weighted or unweighted
const weightGpaArr= []; // array that stores all unweightGpa values
const unweightGpaArr = []; // array that stores all weightGpa values

let totalUnweightGpa = 0;
let totalWeightGpa = 0;

//function with parameter of text input that calculates GPA
function calcGpa(gradeInput) {
  let weightSelect;
  let weights = document.getElementsByName("rb");

  // add if class is weighted/unweighted to arr (ex. ["weight", "weight", "unweight"...etc.])
  for(let i = 0; i < weights.length; i++) {
    if(weights[i].checked) {
      weightSelect = weights[i].value;
      weightArr.push(weightSelect);
    }
  }

  // removes percentage symbol IF inputted
  if(gradeInput.includes("%") === true) {
    gradeInput = gradeInput.replace("%", "");
  }
  
  gradeInput = gradeInput.toUpperCase();

  // if statement converts letter or number grade to a GPA score (unweighted + weighted)
  if(gradeInput === "A" || Number(gradeInput) >= 90) {
    unweightGpa = 4;
    weightGpa = 5;
  } else if(gradeInput === "B" || Number(gradeInput) >= 80) {
    unweightGpa = 3;
    weightGpa = 4;
  } else if(gradeInput === "C" || Number(gradeInput) >= 70) {
    unweightGpa = 2;
    weightGpa = 3;
  } else if(gradeInput === "D" || Number(gradeInput) >= 60) {
    unweightGpa = 1;
    weightGpa = 2;
  } else {
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

  // sum divided by # of classes
  totalUnweightGpa = (totalUnweightGpa/unweightGpaArr.length).toFixed(2); 
  totalWeightGpa = (totalWeightGpa/weightGpaArr.length).toFixed(2);

  document.getElementById("unweightedGrade").innerHTML = totalUnweightGpa;
  document.getElementById("weightedGrade").innerHTML = totalWeightGpa;

  document.getElementById("classCount").innerHTML = " " + weightArr.length; // counted number of weight/unweight for # of classes inputted

  animate(totalUnweightGpa, totalWeightGpa);
}

function animate(totalUnweightGpa, totalWeightGpa) {
  let circleVariable = document.querySelectorAll(".circle-animation");
  circleVariable.forEach(pro => {
    let unweightGpaWheel = 534(534*(totalUnweightGpa/4));
    let weightGpaWheel = 534(534*(totalWeightGpa/4));

    pro.style.setProperty("--stroke-dashoffset-unweight", unweightGpaWheel);
    pro.style.setProperty("--stroke-dashoffset-weight", weightGpaWheel);
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
}
