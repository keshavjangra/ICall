// ==========================================
// QR Contact Generator
// ==========================================

const generateBtn = document.getElementById("generateBtn");

const downloadBtn = document.getElementById("downloadBtn");

const nameInput = document.getElementById("name");

const qrSection = document.getElementById("qrSection");

const qrContainer = document.getElementById("qrcode");

const contactIdText = document.getElementById("contactId");


// ==========================================
// Generate QR
// ==========================================

generateBtn.addEventListener("click", function () {

    const name = nameInput.value.trim();

    // Validate name
    if (name === "") {

        alert("Please enter your name.");

        nameInput.focus();

        return;
    }


    // Generate unique Contact ID
    const contactId =
        "contact_" +
        crypto.randomUUID();


    // ======================================
    // IMPORTANT
    // ======================================
    // We DON'T put the phone number
    // inside the QR code.
    //
    // Only a unique identifier is stored.
    // ======================================

    const qrData = JSON.stringify({

        type: "QRCONTACT",

        contactId: contactId

    });


    // Remove previous QR
    qrContainer.innerHTML = "";

    const link =document.createElement("a");
    link.href="tel:+91"+nameInput.value.trim();
    link.textContent="Call";
    link.target="_blank";

    // Generate QR Code
    new QRCode(qrContainer, {

        text: link,

        width: 220,

        height: 220,

        correctLevel: QRCode.CorrectLevel.H

    });


    // Show Contact ID
    contactIdText.textContent = link;
        


    // Show QR section
    qrSection.classList.remove("hidden");


    console.log("Name:", name);

    console.log("QR Data:", qrData);

});


// ==========================================
// Download QR Code
// ==========================================

downloadBtn.addEventListener("click", function () {

    const qrImage =
        qrContainer.querySelector("img");


    if (!qrImage) {

        alert("Please generate the QR code first.");

        return;

    }


    const link =
        document.createElement("a");


    link.href =
        qrImage.src;


    link.download =
        "my-contact-qr.png";


    link.click();

});