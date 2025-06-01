let userForm = document.getElementById("user-form");

// ✅ Date picker restriction
window.addEventListener("DOMContentLoaded", () => {
    const dobInput = document.getElementById("dob");
    const today = new Date();

    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

    const formatDate = (date) => {
        let month = "" + (date.getMonth() + 1);
        let day = "" + date.getDate();
        const year = date.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return `${year}-${month}-${day}`;
    };

    dobInput.min = formatDate(minDate);
    dobInput.max = formatDate(maxDate);
});

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableEntries = entries.map((entry) => {
        return `<tr>
            <td class='border px-4 py-2'>${entry.name}</td>
            <td class='border px-4 py-2'>${entry.email}</td>
            <td class='border px-4 py-2'>${entry.password}</td>
            <td class='border px-4 py-2'>${entry.dob}</td>
            <td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>
        </tr>`;
    }).join("\n");

    const table = `<table class="table-ato w-full">
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Dob</th>
            <th class="px-4 py-2">Accepted terms?</th>
        </tr>
        ${tableEntries}
    </table>`;

    document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("checkbox").checked;

    // ✅ Age validation
    const dobParts = dob.split("-");
    const birthDate = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);
    const today = new Date();

    birthDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
