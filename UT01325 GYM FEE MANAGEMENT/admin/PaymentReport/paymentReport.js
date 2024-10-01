const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];
const summary=document.getElementById("summary");

let payment=[];
    paymentHistory.forEach(element => {
        element[1].forEach(item=>{
            payment.push(item);
        })
    });
function ReportMonth(){
    let today=new Date();
    const Calculatemonth=today.getMonth();
    const CalculateYear=today.getFullYear();
    return [Calculatemonth,CalculateYear];
}

function filterPaymentsByMonth(payments) {
    let filterDate=ReportMonth();
    let data= payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        console.log(paymentDate.getMonth())
        return paymentDate.getMonth() == filterDate[0] && paymentDate.getFullYear() == filterDate[1];
    });
    
    return data;
}
function filterPaymentTypes(payment,detail){
    return payment.filter(item=>item.details==detail);
}

const monthPaymentDetails=filterPaymentsByMonth(payment);

let MonthlyFeePayment=filterPaymentTypes(monthPaymentDetails,"Monthly Fee")
let AnnualFeePayment=filterPaymentTypes(monthPaymentDetails,"Annual fee")
let initialFeePayment=filterPaymentTypes(monthPaymentDetails,"initial Fee")
let RenewalFeePayment=filterPaymentTypes(monthPaymentDetails,"Renewal Fee")

let NumberOfPaymentOcured=monthPaymentDetails.length;
summary.innerHTML=`
            <p>Total number of payment occured : ${NumberOfPaymentOcured}</p>
            <p>Initial Fees : ${initialFeePayment.length}</p>
            <p>Monthly Fees : ${MonthlyFeePayment.length}</p>
            <p>Annual Fees : ${AnnualFeePayment.length}</p>
            <p>Renewal Fees : ${RenewalFeePayment.length}</p>
        `

