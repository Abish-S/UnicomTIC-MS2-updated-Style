class Payment{
    title;
    description;
    initalFee;
    monthlyFee;
    annualFee;
    id;

    constructor(title,description,monthlyFee,annualFee,initialFee){
        this.title=title;
        this.description=description;
        this.monthlyFee=monthlyFee;
        this.annualFee=annualFee;
        this.initalFee=initialFee
    }
    createID(TrainingProgram) {
        try {
            this.id = "T" + (100 + (TrainingProgram.length))
        } catch (error) {
            console.log(error);
        }
    }
    setMonthlyFee(monthlyFee){
        this.monthlyFee=monthlyFee;
    }
    setAnnualFee(annualFee){
        this.annualFee=annualFee;
    }

    getMonthlyFee(){
        return this.monthlyFee;
    }
    getAnnualFee(){
        return this.annualFee;
    }
    getId(){
        return this.id;
    }
}