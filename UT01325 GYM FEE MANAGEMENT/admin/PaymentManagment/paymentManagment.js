//Local Storage
const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
//Html elements
const tableBody = document.querySelector('#data-table tbody');
const paymentTableBody = document.querySelector('#payment-data-table tbody');
const modalVeiwPaymentHistory = document.getElementById("modalVeiwPaymentHistory");
const memberId = document.getElementById('memberId');
const PaymentModal = document.getElementById('PaymentModal');
const message = document.getElementById('message');
const paymentAmount = document.getElementById('paymentAmount');
const payingProcess = document.getElementById('payingProcess');
const searchInput=document.getElementById("searchInput");

//function to combine data
const EntireData = [];
function SelectData() {
    gymMember.forEach(item => {
        let userPaymentHistory = paymentHistory.find(element => element[0] == item.id)
        let userObj = {
            id: item.id,
            memberDetails: item,
            memberPaymentHistory: userPaymentHistory[1]
        }
        EntireData.push(userObj)
    })
}
SelectData();
//function to add data to table
function tableBodyCreation(EntireData) {
    console.log(EntireData);
    let tableData = "";
    tableBody.innerHTML = "";
    EntireData.forEach(item => {
        let nxtDueDate = [];
        if (item.memberDetails.membershipType == "monthlyMembership") {
            nxtDueDate = item.memberDetails.nxtDueDate;
        } else {
            nxtDueDate = item.memberDetails.RenewalDate;
        }
        let lastPaidDate = item.memberPaymentHistory[item.memberPaymentHistory.length - 1].date;
        tableData += `<tr>
                            <td>${item.id}</td>
                            <td>${item.memberDetails.fname} ${item.memberDetails.lname}</td>
                            <td>${item.memberDetails.membershipType}</td>
                            <td>${nxtDueDate}</td>
                            <td>${lastPaidDate}</td>
                            <td>
                                <button type="button" class="tablecolor btn"onclick="viewMemberPaymentHistory('${item.id}')">View Payment History</button>
                                <button type="button" class="tablecolor btn" onclick="pay('${item.id}')">Pay</button>
                            </td>
                        </tr>`;
    });
    tableBody.innerHTML = tableData;
}
tableBodyCreation(EntireData);
//Search function
function search(){
    let Search=searchInput.value;
    let displayData = EntireData.filter(item => item.id == Search);
    tableBodyCreation(displayData);
}

//Filter Options
function filterTable(filterby) {
    if (filterby == "all") {
        tableBodyCreation(EntireData);
    } else if (filterby == "overdue") {
        const today = new Date();
        let displayData = [];
        EntireData.forEach(item => {
            if (today > item.memberDetails.nxtDueDate) {
                displayData.push(item);
            }
        });
        tableBodyCreation(displayData);
    }
    else {
        let displayData = EntireData.filter(item => item.memberDetails.membershipType == filterby);
        tableBodyCreation(displayData)
    }
}

function viewMemberPaymentHistory(id) {
    let tableRows = "";
    paymentTableBody.innerHTML = "";
    memberId.innerHTML = id;
    let userPaymentHistory = paymentHistory.find(element => element[0] == id)
    userPaymentHistory[1].forEach(element => {
        tableRows += `
        <tr>
                <td>${element.date}</td>
                <td>${element.details}</td>
                <td>${element.amount}</td>
        </tr>`
    });
    paymentTableBody.innerHTML = tableRows;
    modalVeiwPaymentHistory.style.display = 'block'
}
function UserPayment(id) {
    paymentAmount.innerHTML = personalInfo.payment;
    PaymentModal.style.display = "block";
}

function pay(id) {
    let UserDetails = EntireData.find(element => element.id == id);
    let personalInfo = UserDetails.memberDetails;
    message.innerHTML = `Do you want to pay user ${id} payment`
    paymentAmount.innerHTML = ` Rs.${personalInfo.payment}`;
    PaymentModal.style.display = 'block';
    payingProcess.onclick = function () {
        const date = new Date();
        let paymentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let details = [];
        let ChangedDate = [];
        if (personalInfo.membershipType == "monthlyMembership") {
            details = "Monthly Fee";
            ChangedDate = setNxtDueDateMonth(personalInfo.nxtDueDate);
            personalInfo.nxtDueDate = ChangedDate;


        } else {
            details = "Renewal Fee";
            ChangedDate = setRenewalDate(personalInfo.RenewalDate);
            personalInfo.RenewalDate = ChangedDate;

        }
        const UserPayment = new Payment(personalInfo.payment, details, paymentDate);
        const memberPayment = paymentHistory.find(item => item[0] === personalInfo.id);
        console.log(ChangedDate)
        memberPayment[1].push(UserPayment);
        localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
        const member = gymMember.find(item => item.id === personalInfo.id);
        member.nxtDueDate = ChangedDate;
        localStorage.setItem('gymMember', JSON.stringify(gymMember));
        closeModals(PaymentModal);
        location.reload();

    }
};

function setNxtDueDateMonth(day) {
    const Mdate = new Date(day);
    if (Mdate.getMonth() + 1 < 12) {
        return `${Mdate.getFullYear()}-${Mdate.getMonth() + 2}-${Mdate.getDate()}`;
    } else {
        return `${Mdate.getFullYear() + 1}-${Mdate.getMonth() - 10}-${Mdate.getDate()}`;
    }
}
function setRenewalDate(date) {
    const Adate = new Date(date);
    return `${Adate.getFullYear() + 1}-${Adate.getMonth() + 1}-${Adate.getDate()}`;
}

function closeModals(modalName) {
    modalName.style.display = 'none'
    // location.reload();
}