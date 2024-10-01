const adminDetails={
    UserName:'Admin',
    Password:'123'
}



// Login
document.getElementById('Login_form').addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById('userName').value;
    let password = document.getElementById('adminPasword').value;
    console.log(username);
    console.log(password);

    if (adminDetails.UserName === username && adminDetails.Password === password) {
        document.getElementById('loginMessage').textContent = "";
        // alert("Redirecting to student page...");
        window.location.href = "../Dashboard/adminpage.html";

    } else {
        document.getElementById('loginMessage').textContent = "Invalid username or password.";
    }
});