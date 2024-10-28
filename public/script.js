console.log("JavaScript file loaded");

document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior

    const name = e.target.name.value;
    const email = e.target.email.value;

    try {
        console.log("Submitting form with:", { name, email });

        const response = await fetch('https://mlsatezpuruniversity.vercel.app/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();
        console.log("Response from server:", result);

        const successMessage = document.getElementById('successMessage');
        if (result.success) {
            successMessage.style.display = 'block';
            successMessage.innerHTML = `
                🎉 Thank you, ${name}! 🎉<br>
                Your registration was successful!<br>
                <strong>Check your email</strong> for further details.<br>
                Join our <a href="https://chat.whatsapp.com/EbM3IMWPN1YI8OemScHKZ5" target="_blank">WhatsApp group</a> and <a href="https://mvp.microsoft.com/studentambassadors" target="_blank">Microsoft Student Ambassadors</a> for future updates.
            `;

            e.target.reset();  // Clear the form

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 8000);
        } else {
            successMessage.style.display = 'block';
            successMessage.innerHTML = `🚫 ${result.message}`;
        }
    } catch (err) {
        console.error("Error submitting the form:", err);
    }
});
