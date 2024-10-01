
//----------Local Storage----------
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
let gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const TrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];
//-------------------HTML Elements and their values-------------------------
//table
const tableBody = document.querySelector('#data-table tbody');
//modals
const modal = document.getElementById("modal2");
const modal1 = document.getElementById("modal1");
const modalDeleteUser = document.getElementById("modalDeleteUser");
const modalVeiwUser = document.getElementById("modalVeiwUser");
const modalSubmit = document.getElementById("modalSubmit");
const modalTitle = document.getElementById("modalTitle");
//Addmember
const addMemberbtn = document.getElementById("addMember");
const addMember = document.getElementById("memberDetails");
const programSelection = document.getElementById("programSelection");
//form data
const nicNo = document.getElementById("nicNo");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const checkGender = document.forms["memberDetails"]["gender"];
const dob = document.getElementById("dob");
const contactNo = document.getElementById("contactNo");
const email = document.getElementById("email");
const address = document.getElementById("address");
const membershipType = document.getElementById("membershipType");
const paymentAmount = document.getElementById("paymentAmount");
//View 
const User = document.getElementById("User");
const UserDetails = document.getElementById("UserDetails");
const ProgramView=document.getElementById("ProgramView");
//Delete
const Delete = document.getElementById("Delete");

//Search
const searchInput=document.getElementById("searchInput");
console.log(weight);
//------------Global Variable Declarations
let UserSelectedProgram = [];
let Ipayment = 0;
let Mpayment = 0;
let Apayment = 0;

//function to close modals
function closeModalWindow(modalName) {
    if (modalName.id == "modal2") {
        //training program
        modal.style.display = 'none';
    } else if (modalName.id == "modal1") {
        //user creation
        modal1.style.display = 'none';
    } else if (modalName.id == 'modalDeleteUser') {
        modalDeleteUser.style.display = 'none';
    } else if (modalName.id = 'modalVeiwUser') {
        console.log("a")
        modalVeiwUser.style.display = 'none';
    }
    location.reload();

}

//function to close modals
function openModalWindow(modalName) {
    if (modalName.id == "modal2") {
        //training program
        modal.style.display = 'block';
        selectTrainingProgram();
    } else if (modalName.id == "modal1") {
        //userCreation
        modal1.style.display = 'block';
    }
    
}

//Search
function search(){
    console.log("a")
    let Search=searchInput.value;
    let displayData = gymMember.filter(item => item.id == Search);
    tableBodyCreation(displayData);
}

//-------Functions about training programs------------

//Selecting members trainig program

function selectTrainingProgram() {
    //Creating a modal to select programs
    let programs = `<img src="../../Icons/close btn.svg" alt="close" width="2%" onclick=closeModalWindow(modal1)>
    <form>`;
    TrainingProgram.forEach(element => {
        //Displaying each program in the collection
        let selectProgram = `<div class="selectProgram df" id="${element.id}" >
                    <input type="checkbox" value="${element.id}">
                    <h4>${element.title}</h4>
                    <p>Monthly payment :${element.monthlyFee}</p>
                    <p>Initial payment :${element.initalFee}</p>          
                    <p>Annual payment :${element.annualFee}</p> 
                    </div>`
        programs += selectProgram;
    });
    programs += `<button type="submit">Add</button></form>`;
    document.getElementById("program").innerHTML = programs;

}

//Function to get the selected programs and enter them to user profile
modal.addEventListener('submit', (e) => {
    e.preventDefault();
    const TProgram = [];
    //Checking the selected programs
    document.querySelectorAll('[type="checkbox"]').forEach(item => {
        if (item.checked === true) {
            TProgram.push(item.value);
        }
    })
    //Calculating the payments for the selected programs
    TProgram.forEach(element => {
        TrainingProgram.forEach(e => {
            if (element == e.id) {
                UserSelectedProgram.push(e);
                Mpayment += Number(e.monthlyFee);
                Apayment += Number(e.annualFee);
                Ipayment += Number(e.initalFee);
            }
        })
    })
    paymentAmount.innerHTML = `Total Monthly Payment=${Mpayment} <br>Total Annual Payment=${Apayment} <br>Total initial Payment=${Ipayment}`
    modal.style.display = "none";
});


function editRow(id) {
    // Find the member with the specified id
    const member = gymMember.find(item => item.id === id);
    // showing the alredy existing data to the user   
    nicNo.value = member.nicNumber
    age.value = member.age
    email.value = member.email
    dob.value = member.dob
    address.value = member.address
    height.value = member.height
    weight.value = member.weight
    contactNo.value = member.contactNo
    fname.value = member.fname
    lname.value = member.lname
    checkGender.value = member.gender;
    membershipType.parentNode.parentNode.style.display = 'none';
    programSelection.style.display = 'none';
    modalTitle.innerHTML = `Edit member ${member.id}`
    modalSubmit.innerHTML = "Edit Member"
    modalSubmit.type = "button";
    //Saving the changes 
    modalSubmit.onclick = function () {
        member.nicNumber = nicNo.value;
        member.age = age.value
        member.email = email.value
        member.dob = dob.value
        member.address = address.value
        member.height = height.value
        member.weight = weight.value
        member.contactNo = contactNo.value
        member.fname = fname.value
        member.lname = lname.value;
        member.gender = checkGender.value;
        //Storing the data in the local storage
        localStorage.setItem('gymMember', JSON.stringify(gymMember));
        closeModalWindow(modal1);
        location.reload();
    };
    // Display the modal
    modal1.style.display = "block";
}
//delete User
function deleteUserbtn(id) {
    User.innerHTML = id;
    modalDeleteUser.style.display = "block";
    Delete.onclick = function () {
        let Members = gymMember.filter(item => item.id != id);
        gymMember = Members
        localStorage.setItem('gymMember', JSON.stringify(gymMember));
        tableBodyCreation(TrainingProgram);
        closeModalWindow(modalDeleteUser);
    }
}
//ViewUser
function viewUser(id) {
    UserDetails.innerHTML = "";
    const member = gymMember.find(item => item.id === id);
    let programList=[];
    member.trainingProgram.forEach(item =>{
        programList +=`<li>${item.title}</li>`;
    })
    let SingleUserDetail = `                
                <h2 class="modalTitle">User Details</h2>
                <p><span>Id</span> : ${member.id}</p>
                <p><span>Name</span> : ${member.fname} ${member.lname}</p>
                <p><span>NIC</span> : ${member.nicNumber} </p>
                <p><span>Age</span> : ${member.age} </p>
                <p><span>Gender</span> : ${member.gender}</p>
                <p><span>Date of Birth</span> : ${member.dob}</p>
                <p><span>Height</span> : ${member.height} </p>
                <p><span>Weight</span> : ${member.weight} </p>
                <p><span>Email</span> : ${member.email}</p>
                <p><span>Address</span> : ${member.address}</p>
                <p><span>Contact No.</span> : ${member.contactNo}</p>
                <p><span>Membership Type</span> : ${member.membershipType}</p>
                <p><span>Selected Training Program</span> :</p>
                <ul id="ProgramView"> ${programList}</ul>
`;
    UserDetails.innerHTML = SingleUserDetail;
    modalVeiwUser.style.display = "block";

}

//-----functions to create the table of user details
function tableBodyCreation(gymMember) {
    let tableData = "";
    tableBody.innerHTML = "";
    gymMember.forEach(item => {
        //Get every user and creating their rows
        tableData += `<tr>
                            <td class="t-op-nextlvl">${item.id}</td>
                            <td class="t-op-nextlvl">${item.fname} ${item.lname}</td>
                            <td class="t-op-nextlvl">${item.membershipType}</td>
                            <td class="t-op-nextlvl">
                                <button type="button" class="tablecolor btn" onclick="viewUser('${item.id}')">View</button>
                                <button type="button" class="tablecolor btn" onclick="editRow('${item.id}')">Edit</button>
                                <button type="button" class="tablecolor btn"onclick="deleteUserbtn('${item.id}')">Delete</button>
                            </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}

tableBodyCreation(gymMember);

//Creating new users
//Get the data from form
addMember.addEventListener("submit", function (event) {
    event.preventDefault();
    //get the gender***
    let gender;
    if (checkGender.value == "male") {
        gender = "male"
    } else if (checkGender.value == "female") {
        gender = "female"
    } else {
        gender = "other"
    }
    let mType = membershipType.value;
    //Creating an object to each user and inserting their details
    const newMember = new Member(address.value, contactNo.value, height.value, weight.value, email.value, dob.value, gender, mType, fname.value, lname.value);
    newMember.setAge(age.value);
    newMember.createID(gymMember);
    newMember.createAdmissionDate();
    newMember.setTrainingProgram(UserSelectedProgram);
    //Creating payment history for the user
    let paymentDate = newMember.getAdmissionDate();
    let Paid;
    let details;
    //defining the user as an annual member or a monthly member and calculating their payment
    if (mType == "monthlyMembership") {
        newMember.setNxtDueDateMonth(paymentDate);
        newMember.setPayment(Mpayment);
        Paid = Ipayment;
        details = "initial Fee";

    } else {
        newMember.setRenewalDate(paymentDate);
        newMember.setPayment(Apayment);
        Paid = Apayment;
        details = "Annual fee"
    }
    let password = newMember.createPassword();
    console.log(password)
    alert(password);
    newMember.encryptPassword(password);
    if (!(nicNo.value == "")) {
        newMember.setNicNo(nicNo.value);
    }
    const UserPayment = new Payment(Paid, details, paymentDate);
    //Pushing the user object into an array
    let memberPaymentHistory = [];
    memberPaymentHistory.push(UserPayment);
    let MPaymentHistory = [];
    MPaymentHistory.push(newMember.id);
    MPaymentHistory.push(memberPaymentHistory);
    paymentHistory.push(MPaymentHistory);
    gymMember.push(newMember);
    //Saving it in local storage
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    localStorage.setItem('gymMember', JSON.stringify(gymMember));
    console.log(gymMember)
    event.target.reset();
    paymentAmount.innerHTML=""
    Mpayment=0;
    Apayment=0;
    Ipayment=0;

    tableBodyCreation(TrainingProgram);

    modal1.style.display = "none";

}
);












