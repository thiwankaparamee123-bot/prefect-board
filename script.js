const prefects = JSON.parse(
    localStorage.getItem("prefects") || "[]"
);

let tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);

const prefectSelect =
    document.getElementById("prefectSelect");

const taskMessage =
    document.getElementById("taskMessage");

const taskDate =
    document.getElementById("taskDate");

const taskList =
    document.getElementById("taskList");


// Load prefects
function loadPrefects() {

    prefectSelect.innerHTML =
        '<option value="">-- Select Prefect --</option>';

    prefects.forEach(function (prefect) {

        const option =
            document.createElement("option");

        option.value = prefect.whatsapp;

        option.textContent = prefect.name;

        prefectSelect.appendChild(option);
    });
}


// Save tasks
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Send WhatsApp + create task
function sendWhatsApp() {

    const phone =
        prefectSelect.value;

    const selectedOption =
        prefectSelect.options[
            prefectSelect.selectedIndex
        ];

    const prefectName =
        selectedOption.text;

    const message =
        taskMessage.value.trim();

    const date =
        taskDate.value;


    if (phone === "") {

        alert("Please select a prefect.");

        return;
    }


    if (message === "") {

        alert("Please enter the task.");

        return;
    }


    if (date === "") {

        alert("Please select a date.");

        return;
    }


    // Add task
    tasks.push({

        prefect: prefectName,

        phone: phone,

        message: message,

        date: date,

        status: "Pending"

    });


    saveTasks();

    showTasks();


    // WhatsApp message
    const whatsappMessage =
        "Hello " + prefectName + ",\n\n" +
        "You have been assigned a task.\n\n" +
        "Task: " + message + "\n" +
        "Date: " + date + "\n\n" +
        "- Prefect Board";


    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
            whatsappMessage
        );


    window.open(
        whatsappURL,
        "_blank"
    );


    taskMessage.value = "";

    taskDate.value = "";
}


// Show tasks
function showTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks yet.</p>";

        return;
    }


    tasks.forEach(function (task, index) {

        const box =
            document.createElement("div");

        box.className =
            "task-box";


        box.innerHTML =

            "<strong>👤 " +
            task.prefect +
            "</strong>" +

            "<p>📝 " +
            task.message +
            "</p>" +

            "<p>📅 " +
            task.date +
            "</p>" +

            "<p>📌 Status: <strong>" +
            task.status +
            "</strong></p>";


        const completeButton =
            document.createElement("button");

        completeButton.textContent =
            "✅ Mark Completed";


        completeButton.addEventListener(
            "click",
            function () {

                tasks[index].status =
                    "Completed";

                saveTasks();

                showTasks();

            }
        );


        box.appendChild(
            completeButton
        );


        taskList.appendChild(
            box
        );

    });
}


loadPrefects();

showTasks();