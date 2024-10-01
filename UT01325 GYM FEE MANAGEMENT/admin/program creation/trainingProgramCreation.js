

let gymTrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];

const tableBody = document.querySelector('#data-table tbody');
const addProgramModal = document.getElementById("addProgramModal");
const addProgram = document.getElementById("addProgram");
const modalTitle=document.getElementById("modalTitle");
const modalVeiwProgram=document.getElementById("modalVeiwProgram");
const ProgramDetails=document.getElementById("ProgramDetails");
const modalDeleteProgram=document.getElementById("modalDeleteProgram");
const program=document.getElementById("program");
const Delete=document.getElementById("Delete");
const modalSubmit=document.getElementById("modalSubmit");
const programTitle = document.getElementById("title");
const programDescription = document.getElementById("description");
const initialFee = document.getElementById("initalFee");
const monthlyFee = document.getElementById("monthlyFee");
const annualFee = document.getElementById("annualFee");

const searchInput=document.getElementById("searchInput");


console.log(modalSubmit)

//form

function tableBodyCreation(gymTrainingProgram) {
    let tableData = "";
    tableBody.innerHTML = "";
    gymTrainingProgram.forEach(item => {
        //Get every user and creating their rows
        tableData += `<tr>
                            <td>${item.id}</td>
                            <td>${item.title}</td>
                            <td>${item.initalFee}</td>
                            <td>${item.monthlyFee}</td>
                            <td>${item.annualFee}</td>
                            <td>${item.description}</td>
                            <td>
                                <button type="button" class="tablecolor btn"  onclick="viewProgramModal('${item.id}')">View</button>
                                <button type="button" class="tablecolor btn" onclick="programEditModal('${item.id}')">Edit</button>
                                <button type="button" class="tablecolor btn" onclick="DeleteProgram('${item.id}')">Delete</button>
                            </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}
tableBodyCreation(gymTrainingProgram);
// Show add program modal
addProgram.onclick = function () {
    addProgramModal.style.display = 'block';
};

function search(){
    let Search=searchInput.value;
    let displayData = gymTrainingProgram.filter(item => item.id == Search);
    tableBodyCreation(displayData);
}

// Handle add program form submission
document.getElementById("trainingProgramCreation").addEventListener("submit", function (event) {
    event.preventDefault();
    const programTitle = document.getElementById("title").value;
    const programDescription = document.getElementById("description").value;
    const initialFee = document.getElementById("initalFee").value;
    const monthlyFee = document.getElementById("monthlyFee").value;
    const annualFee = document.getElementById("annualFee").value;

    const newTrainingProgram = new Payment(programTitle, programDescription, monthlyFee, annualFee, initialFee);
    newTrainingProgram.createID(gymTrainingProgram);
    gymTrainingProgram.push(newTrainingProgram);
    localStorage.setItem('gymTrainingProgram', JSON.stringify(gymTrainingProgram));
    event.target.reset();
    tableBodyCreation(gymTrainingProgram);
    addProgramModal.style.display = 'none';
});


// Function to handle editing a program
function programEditModal(id) {
    modalTitle.innerHTML = `Edit Workout ${id}`;
    const workoutProgram = gymTrainingProgram.find(item => item.id === id);
    populateForm(workoutProgram);
    console.log("b")

    modalSubmit.onclick = function() {
        workoutProgram.title = programTitle.value;
        workoutProgram.description = programDescription.value;
        workoutProgram.monthlyFee = monthlyFee.value;
        workoutProgram.annualFee = annualFee.value;
        workoutProgram.initalFee = initialFee.value;
        log("a")
        const index = gymTrainingProgram.findIndex(item => item.id === workoutProgram.id);
        if (index !== -1) {
            gymTrainingProgram[index] = workoutProgram;  // Update the member info in the array
            console.log(index)
            localStorage.setItem('gymTrainingProgram', JSON.stringify(gymTrainingProgram)); // Store the updated array in localStorage
            tableBodyCreation(gymTrainingProgram); // Update the table view
            closeModals(addProgramModal); // Close the modal
        }
    };

    addProgramModal.style.display = 'block';
}

// Function to populate form fields with existing data
function populateForm(data) {
    programTitle.value = data.title || '';
    programDescription.value = data.description || '';
    initialFee.value = data.initalFee || '';
    monthlyFee.value = data.monthlyFee || '';
    annualFee.value = data.annualFee || '';
}





function viewProgramModal(id){
    console.log("A");
     ProgramDetails.innerHTML="";
    let workoutProgram=gymTrainingProgram.find(item =>item.id===id)
    console.log(workoutProgram)
    let Detail=`
                <h1 class="modalTitle">${workoutProgram.title}</h4>
                <p>Program Id : ${workoutProgram.id}</p>
                <p>Initial Fee : ${workoutProgram.initalFee}</p>
                <p>Monthly Fee : ${workoutProgram.monthlyFee}</p>
                <p>Annual Fee : ${workoutProgram.annualFee}</p>
                <p>Further Details : ${workoutProgram.description}</p>`
    ProgramDetails.innerHTML=Detail;
    console.log(Detail)
    modalVeiwProgram.style.display='block';
}

function DeleteProgram(id){
    program.innerHTML=id;

    modalDeleteProgram.style.display = "block";
    Delete.onclick=function(){
        let filterProgram=gymTrainingProgram.filter(item =>item.id !=id);
        gymTrainingProgram=filterProgram;
        console.log(filterProgram)
        localStorage.setItem('gymTrainingProgram', JSON.stringify(gymTrainingProgram));
        tableBodyCreation(gymTrainingProgram);
        closeModals(modalDeleteProgram);
    }

}



function closeModals(modalName){
    modalName.style.display='none'
     location.reload();
}


    