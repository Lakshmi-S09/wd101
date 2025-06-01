let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}
let userEntries = retrieveEntries(); 

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
    const nameCell = `<td class = 'border px-4 py-2'>${entry.name}</td>`;
    const emailCell = `<td class = 'border px-4 py-2'>${entry.email}</td>`;
    const passwordCell = `<td class = 'border px-4 py-2'>${entry.password}</td>`;
    const dobCell = `<td class = 'border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class = 'border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;

    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    return row;
}).join("\n");

const table = `<table class="table-auto w-full"><tr>

 <th class="px-4 py-2">Name</th>
 <th class="px-4 py-2">Email</th>
 <th class="px-4 py-2">Password</th>
 <th class="px-4 py-2">Dob</th>
 <th class="px-4 py-2">Accepted terms?</th>
</tr>${tableEntries}</table>`;

let details = document.getElementById("user-entries");
details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dobInput = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("checkbox").checked;

    const dob = new Date(dobInput);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
        age--; // adjust if birthday hasn't occurred this year yet
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob: dobInput,
        acceptedTermsAndConditions
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};
userForm.addEventListener("submit", saveUserForm)
displayEntries();

const setDateBounds = () => {
    const today = new Date();
    const minAge = 18;
    const maxAge = 55;

    const yyyy = today.getFullYear();

    const maxDate = new Date(yyyy - minAge, today.getMonth(), today.getDate());
    const minDate = new Date(yyyy - maxAge, today.getMonth(), today.getDate());

    document.getElementById("dob").setAttribute("max", maxDate.toISOString().split("T")[0]);
    document.getElementById("dob").setAttribute("min", minDate.toISOString().split("T")[0]);
};

setDateBounds();

