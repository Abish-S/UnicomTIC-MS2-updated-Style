//-------Gym Members Class------

class Member {
    // ----All the properties of members------

    id;
    pasword;
    nicNumber;
    address;
    dob;
    contactNo;
    email;
    fname;
    lname;
    age;
    gender;
    height;
    weight;
    admissionDate;
    trainingProgram;
    payment;
    membershipType;
    // trainingSession;

    // Constructor to initialize the object with attributes
    constructor(address, contactNo, height, weight, email, dob, gender,membershipType,fname,lname) {
        this.address = address;
        this.contactNo = contactNo;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.email = email;
        this.dob = dob;
        this.membershipType=membershipType;
        this.fname=fname;
        this.lname=lname;
    }

    //--------------------------------------------------------------------------------------------------------------------------------//
    //  Create
    //Create a uniques password
    createPassword() {
        let password = `${this.fname[0]}${(parseInt(Math.random() * 1000000))}${this.lname[(this.lname.length) - 2]}`
        return password;
    }
    // Encrypt the password to store
    encryptPassword(password) {
        try {
            let EncryptPassword = [];
            //Reversing the password and returning an array
            for (let i = 0; i < password.length; i++) {
                EncryptPassword.push(password[(password.length - 1) - i])
            }
            for (let i = 0; i < EncryptPassword.length; i = i + 2) {
                //Changing the Numbers in the password
                if (!isNaN(EncryptPassword[i])) {
                    if (EncryptPassword[i] <= 4) {
                        EncryptPassword[i] = (EncryptPassword[i]) + 5;
                    } else {
                        EncryptPassword[i] = (EncryptPassword[i]) - 3;
                    }
                }
                if (!isNaN(EncryptPassword[i + 1])) {
                    if (EncryptPassword[i + 1] <= 4) {
                        EncryptPassword[i + 1] = (EncryptPassword[i + 1]) + 1;
                    } else {
                        EncryptPassword[i + 1] = (EncryptPassword[i + 1]) - 5;
                    }
                }
                //jumbling the characters
                let temp = EncryptPassword[i];
                EncryptPassword[i] = EncryptPassword[i + 1];
                EncryptPassword[i + 1] = temp;
            }
            this.pasword = EncryptPassword.join("");
        } catch (error) {
            console.log(error);
        }
    }
    //A method to create admission date
    createAdmissionDate() {
        try {
            const date = new Date();
            this.admissionDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

        } catch (error) {
            console.log(error);
        }
    }
    //A method to create a unique Id
    createID(gymMember) {
        try {
            console.log("c")
            if(gymMember.length==0){
                this.id = "GM" + (100000 + (gymMember.length)) 
                console.log("a")               
            }else{
                let Lastobj=(gymMember[gymMember.length-1])
                let Lastid=Lastobj.id;
                let ExtractNum=Number(Lastid.slice(2,8));
                this.id="GM"+(ExtractNum+1)
            }

        } catch (error) {
            console.log(error);
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------------------
    //Set
    setPayment(payment){
        this.payment=payment;
    }
    setNxtDueDateMonth(mdate){
        const Mdate=new Date(mdate);
        if(Mdate.getMonth()+1<12){
        this.nxtDueDate=`${Mdate.getFullYear()}-${Mdate.getMonth() + 2}-${Mdate.getDate()}`;
        }else{
            this.nxtDueDate= `${Mdate.getFullYear()+1}-${Mdate.getMonth()-10}-${Mdate.getDate()}`;

        }
    }
    setRenewalDate(date){
        const Adate=new Date(date);
        this.RenewalDate=`${Adate.getFullYear()+1}-${Adate.getMonth() + 1}-${Adate.getDate()}`;
    }
    setTrainingProgram(UserSelectedProgram){
        this.trainingProgram=UserSelectedProgram;
    }
    setPayment(payment){
        this.payment=payment;
    }

    //A method to validate Age   
    setAge(age) {
        try {
            if ((age >= 14) || (age <= 100)) {
                this.age = age;
            } else {
                throw "Age is invalid"
            }
        } catch (error) {
            document.getElementById("message8").innerHTML = error;
        }
    }
    // A method to set NIC number
    setNicNo(nicNo) {
        try {
            // Conditions for the NIC number validation
            if ((nicNo.length == 10) && ((nicNo[0] == 1) && ((nicNo[9]) == "V" || (nicNo[9] == "X")))) {    //Condition for old NIC number
                this.nicNumber = nicNo;
                document.getElementById("message").innerHTML = "User Creation Successful";
            } else if ((nicNo.length == 12) && (nicNo[0] == 2) && (nicNo[1] == 0)) {                    //Condition for new NIC number
                this.nicNumber = nicNo;
                document.getElementById("message").innerHTML = "User Creation Successful";
            } else {
                throw "NIC number is incorrect";                                           //The error message that should be thrown
            }
        } catch (error) {
            // document.getElementById("message3").innerHTML=error;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------//
    //Get
    // Methhod to get admission date of the user
    getAdmissionDate() {
        return this.admissionDate;
    }
    //A method to get encrypted password
    getPassword() {
        return this.pasword;
    }
    //A method to get Id 
    getID() {
        return this.id;
    }
    // A method to get NIC number
    getNicNo() {
        return this.nicNumber;
    }
}