
// input handle functions.
let getValue = value => document.getElementById(value).value
let clearInput = value => document.getElementById(value).value = ""
let displayFunction = (id, value) => document.getElementById(id).style.display = value;

const uniqueId = () => Math.random().toString(36).slice(2);

let loggedUser ;

const showUserEmailInNavbar = () => {
    document.getElementById('show-user-email').textContent = loggedUser.email;
}

// list of users.
let users = [{email: "abc@gmail.com", password:"111111", date: new Date(), id: uniqueId(), status: "active"}]
let todos = [];
// validate email function
const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };


// funstion login.
function handleLoginBtn() {
    let email = getValue('email')
    let password = getValue('password')

    email = email.trim()

    if (email === "" || password === "") { toast("Please enter Email and Password", "error")  } 
    else {
        let user = users.find(user => user.email === email && user.password === password)
        // console.log(users);
        // console.log(user);
        // console.log(email);
        // console.log(password);
        if (user) {
            toast("login Successfully", "success")
            loggedUser = user;

            console.log(loggedUser);
            clearInput("email")
            clearInput("password")

            displayFunction("reg-log-section", "none");
            displayFunction("header-home", "block")
            displayFunction("main-home", "block")
            displayFunction("foot-home", "block")

            showUserEmailInNavbar();

        } else {
            toast("Invalid email or password", "warn")
        }
    }
}

// handle Registration.
function handleRegisterBtn() {
    let email = getValue('register-email')
    let password = getValue('register-password')

    email = email.trim()

    if (email === "" || password === "") { toast("Please enter Email and Password", "error")}
    else if(users.find(user => user.email === email)) { toast("Already have account", "warn")}
    else {
        if(validateEmail(email)){
            if(password.length < 6){
                toast("Password must be 6 characters", "error")
            }else{
                let user = {
                    email: email,
                    password: password,
                    date: new Date(),
                    id: uniqueId(),
                    status: "active"
                }

                users.push(user);

                toast("Registered Successfully", "success")

                clearInput("register-email")
                clearInput("register-password")

                // document.getElementById('register-card').style.display = "none"
                // document.getElementById('login-card').style.display = "inline-block";
                displayFunction("register-card",  "none" );
                displayFunction("login-card", "inline-block");
            }
           
        }else{ toast("Invalid Email","warn") }
    }
      
}



const handleNewTodo = () => {
    event.preventDefault();

    let title = getValue('input-title');
    let description = getValue('input-description')
    let addTodoTime = getValue('input-time-date')


    console.log(title);
    console.log(description);
    console.log(addTodoTime);
    if(title == "" || description == "" || addTodoTime == "") { return toast("All Fields are Required!","warn")}

    let todo = {
        title: title,
        des: description,
        date: addTodoTime,
        id: uniqueId(),
        status: "NotCompleted",
        createdAt: new Date(),
        user_id: loggedUser.id
    }

    todos.push(todo)
    console.log(todo);
    console.log(todos);

    clearInput("input-title")
    clearInput('input-description')
    clearInput('input-time-date')
}

const showTodoTable = () =>{
    document.getElementById('table-data').innerHTML = "";
    if(users.length === 0){return alert("Table is empty")}
    
    let tableHeader = "<tr><th scope='col'>Sr#</th><th scope='col'>Title</th><th scope='col'>Description</th><th scope='col'>Date</th><th scope='col'>status</th></tr>"
    document.getElementById('table-header').innerHTML = tableHeader;
  
    let strength = 0;
    todos.forEach(todo => {
        strength++;
        document.getElementById('table-data').innerHTML += `<tr><td>${strength}</td><td>${todo.title}</td><td>${(todo.description)}</td><td>${todo.date}</td><td>${todo.status}</td></tr>`
    })
}
  


const handleDeleteTodo = () => {
    let index = parseInt(prompt("Enter No which you want to delete"))

    todos=todos.filter((element,i) => i !== index-1)
    showTodoTable();
}
    



const handleUpdateTodo=()=>{
    let index=+prompt("Enter Index To Update")

    todos=todos.map((element,i)=>{
        if(i===index-1){
            return {...element,status: "Completed"}
        }
        return element
    })
    showTodoTable();
}

const handleClearBtn = () =>{
    document.getElementById('table-output').innerHTML = ""
  }




// toastify function
function toast(note, key) {
    let color1;
    let color2;
    switch (key) {
        case "error":
            color1 = "#C71585"
            color2 = "#09203F"
            break;
        case "warn":
            color1 = "#d02d2d"
            color2 = "#09203F"
            break;
        case "success":
            color1 = "#008000"
            color2 = "#09203F"
            break;
        default:
            color1 = "#FFFFFF"
            color2 = "#F0F0F0"
    }

    Toastify({
        text: note,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: `linear-gradient(to right, ${color1},${color2}`,
        },
        onClick: function () { } // Callback after click
    }).showToast();

}