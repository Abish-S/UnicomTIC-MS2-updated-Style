class Payment {
    date;
    details;
    amount;
    //memberId;
    constructor(amount,details,date){
        this.amount=amount;
        this.details=details;
        this.date=date;
    }

    setPaymentDate() {
        try {
            const date = new Date();
            this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        } catch (error) {
            console.log(error);
        }
    }
    setDetails(detail){
        this.details=detail;
    }
    getPaymentDate() {
        return this.date;
    }

    setMemberId(memberId) {
        this.memberId = memberId
    }
    getMemberId() {
        return this.memberId;
    }

}