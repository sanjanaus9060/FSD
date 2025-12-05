document.getElementById("engineering-application").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        fullName: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        address: document.getElementById("address").value,
        highSchool: document.getElementById("high-school").value,
        gpa: document.getElementById("gpa").value,
        testScore: document.getElementById("test-score").value,
        testDate: document.getElementById("test-date").value,
        program: document.getElementById("program").value,
        session: document.getElementById("session").value,
        terms: document.getElementById("terms").checked
    };

    const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
});