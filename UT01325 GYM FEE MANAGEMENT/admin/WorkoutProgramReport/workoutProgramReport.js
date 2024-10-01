const gymMember = JSON.parse(localStorage.getItem('gymMember')) || [];
const TrainingProgram = JSON.parse(localStorage.getItem('gymTrainingProgram')) || [];
const conclusion=document.getElementById("conclution");
const programChart = document.getElementById('ProgramReportChart').getContext('2d');

const ProgramData = [];
TrainingProgram.forEach(element => {
    let count = 0;
    gymMember.forEach(i => {
        i.trainingProgram.forEach(item => {
            if (item.id == element.id) {
                count += 1;
            }
        })
    })
    let individualProgram={
        ProgramName:element.title,
        Particpants:count
    }
    ProgramData.push(individualProgram);
});
const ProgamNames=[];
const ParticpantsNumber=[];
ProgramData.forEach(item=>{
    ProgamNames.push(item.ProgramName);
    ParticpantsNumber.push(item.Particpants);
})

let programClarification=[];
ProgramData.forEach(item => {
    programClarification+=`<p>${item.ProgramName} : ${item.Particpants} members</p>`
});
conclusion.innerHTML=programClarification;

const myBarChart = new Chart(programChart, {
    type: 'bar',
    data: {
        labels: ProgamNames, 
        datasets: [{
            label: 'Participating Members',
            data: ParticpantsNumber,
            backgroundColor: 'rgba(255, 0, 0, 0.6)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    }
});