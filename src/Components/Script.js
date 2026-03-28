// ================================================
// TYF 2K26 — COMBINED Registration + Payment Script
// 
// ⚠️ IMPORTANT: Paste this ENTIRE file into your REGISTRATION script project (library: 1U0lbd8FXJkrbDoFY0rTJFHzqoVDHn8A3YvPN6nlREGzRvn6N2R6zAeB6/6)
// Then: Deploy → Manage Deployments → Edit → 
//       Change Version to "New version" → Deploy
// ================================================

const ADMIN_EMAIL      = "jaishankar7655@gmail.com";
const EVENT_NAME       = "Truba Youth Fest 2K26";
const ORGANIZER_PHONE  = "+91-9131705898";

// ── Sheet IDs ──────────────────────────────────────────────────────────────
// Payment sheet (for payment records)
const PAYMENT_SHEET_ID = "1-LZyDYImyo9wWavhcJ9EuL6pjVhKu0qmqKLc5m-BVqM";
// Drive folder (for screenshots)
const DRIVE_FOLDER_ID  = "10l4qoTVhMhCQTrQW5brooOWZXufsE_dS";

// ── Event pricing ──────────────────────────────────────────────────────────
const EVENT_CATEGORIES = {
  "Singing Competition": { "Solo": 50, "Duo": 100, "Group": 150 },
  "Dance Competition":   { "Solo": 100, "Duo": 150, "Group": 250 }
};

// ── Health check ───────────────────────────────────────────────────────────
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "active", message: "TYF2K26 Script OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Router ─────────────────────────────────────────────────────────────────
function doPost(e) {
  try {
    const type = (e.parameter && e.parameter.type) ? e.parameter.type : "registration";
    Logger.log("doPost called, type=" + type);

    if (type === "payment") {
      return handlePayment(e);
    } else {
      return handleRegistration(e);
    }
  } catch (err) {
    Logger.log("doPost error: " + err.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── PAYMENT HANDLER ────────────────────────────────────────────────────────
function handlePayment(e) {
  Logger.log("handlePayment started");

  const phone       = e.parameter.phone       || "Unknown";
  const totalAmount = e.parameter.totalAmount  || "N/A";
  const imageData   = e.parameter.imageData    || "";
  const filename    = e.parameter.filename     || ("payment_" + phone + ".jpg");
  const now         = new Date().toLocaleString();

  // 1. Save record to payment sheet (just text — always reliable)
  try {
    const ss    = SpreadsheetApp.openById(PAYMENT_SHEET_ID);
    const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
    sheet.appendRow([phone, "Rs." + totalAmount, "Screenshot emailed to admin", now]);
    Logger.log("Sheet row saved for phone: " + phone);
  } catch (sheetErr) {
    Logger.log("Sheet error: " + sheetErr.toString());
  }

  // 2. Try to save screenshot to Drive (optional — won't block sheet save)
  let fileUrl = null;
  if (imageData) {
    try {
      const base64 = imageData.includes(",") ? imageData.split(",")[1] : imageData;
      const blob   = Utilities.newBlob(Utilities.base64Decode(base64), "image/jpeg", filename);
      const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      const file   = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
      Logger.log("Drive upload success: " + fileUrl);

      // Update the sheet row with the actual Drive URL
      const ss    = SpreadsheetApp.openById(PAYMENT_SHEET_ID);
      const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
      const lastRow = sheet.getLastRow();
      sheet.getRange(lastRow, 3).setValue(fileUrl);
    } catch (driveErr) {
      Logger.log("Drive upload failed (non-fatal): " + driveErr.toString());
    }
  }

  // 3. Email admin with screenshot
  try {
    const emailOptions = {
      to: ADMIN_EMAIL,
      subject: "💰 Payment Received - " + EVENT_NAME + " | Phone: " + phone,
      htmlBody: `
        <h2 style="color:#6B46C1;">Payment Screenshot Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;background:#f0f0f0;">Phone</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f0f0f0;">Amount</td><td style="padding:8px;">Rs.${totalAmount}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;background:#f0f0f0;">Time</td><td style="padding:8px;">${now}</td></tr>
          ${fileUrl ? `<tr><td style="padding:8px;font-weight:bold;background:#f0f0f0;">Screenshot</td><td style="padding:8px;"><a href="${fileUrl}">View Screenshot</a></td></tr>` : ""}
        </table>
        <p style="color:#888;margin-top:16px;">Screenshot ${fileUrl ? "saved to Drive and" : ""} attached below.</p>
      `
    };

    // Attach screenshot to email if we have image data
    if (imageData) {
      try {
        const base64 = imageData.includes(",") ? imageData.split(",")[1] : imageData;
        const blob   = Utilities.newBlob(Utilities.base64Decode(base64), "image/jpeg", filename);
        emailOptions.attachments = [blob];
      } catch (attachErr) {
        Logger.log("Attachment error (non-fatal): " + attachErr.toString());
      }
    }

    MailApp.sendEmail(emailOptions);
    Logger.log("Admin email sent to " + ADMIN_EMAIL);
  } catch (emailErr) {
    Logger.log("Email error: " + emailErr.toString());
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: "Payment recorded." }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── REGISTRATION HANDLER ───────────────────────────────────────────────────
function handleRegistration(e) {
  Logger.log("handleRegistration started");

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  const formData       = e.parameter;
  const registrationId = generateRegistrationId();
  const eventsData     = parseEventsData(formData);

  sheet.appendRow([
    new Date(),
    registrationId,
    formData.name,
    formData.email,
    formData.phone,
    formData.college,
    eventsData.formattedEvents,
    formData.totalAmount,
    "Pending Payment Verification"
  ]);

  const qrData = generateQRCodeData(formData, registrationId, eventsData);
  sendUserConfirmation(formData, qrData, eventsData);
  sendAdminNotification(formData, qrData, eventsData);

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      registrationId: registrationId,
      message: "Registration successful!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── HELPERS ────────────────────────────────────────────────────────────────
function parseEventsData(formData) {
  let detailedEvents = [];
  let formattedEventsList = [];
  
  if (formData.events) {
    try {
      detailedEvents = JSON.parse(formData.events);
      formattedEventsList = detailedEvents.map(e => {
        let text = e.name;
        if (e.category) text += " (" + e.category + ")";
        if (e.price !== null && e.price !== undefined) text += " - Rs." + e.price;
        return text;
      });
    } catch (err) {
      // Fallback for old comma-separated string format
      const events = formData.events.split(",").map(e => e.trim());
      events.forEach(event => {
        const base = event.split("(")[0].trim();
        if (base === "Singing Competition" || base === "Dance Competition") {
          const cat   = formData[base + " Options"];
          const price = EVENT_CATEGORIES[base] ? EVENT_CATEGORIES[base][cat] : null;
          formattedEventsList.push(base + " (" + cat + ") - Rs." + (price || "?"));
          detailedEvents.push({ name: base, category: cat, price: price });
        } else {
          formattedEventsList.push(event);
          detailedEvents.push({ name: event, category: null, price: null });
        }
      });
    }
  }

  return { formattedEvents: formattedEventsList.join(", "), detailedEvents: detailedEvents };
}

function generateRegistrationId() {
  return "TYF26-" + new Date().getTime().toString().slice(-6) + "-" +
         Math.floor(Math.random() * 1000).toString().padStart(3, "0");
}

function generateQRCodeData(formData, registrationId, eventsData) {
  const data = { registrationId, name: formData.name, phone: formData.phone,
                 events: eventsData.formattedEvents, totalAmount: formData.totalAmount };
  return {
    url: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(JSON.stringify(data)),
    registrationId: registrationId
  };
}

function eventsTable(eventsData) {
  let t = '<table style="width:100%;border-collapse:collapse;">' +
          '<tr style="background:#6B46C1;color:white;"><th style="padding:8px;text-align:left;">Event</th>' +
          '<th style="padding:8px;">Category</th><th style="padding:8px;text-align:right;">Price</th></tr>';
  eventsData.detailedEvents.forEach(function(ev, i) {
    var bg = i % 2 === 0 ? "#f7f7f7" : "#fff";
    t += '<tr style="background:' + bg + ';"><td style="padding:8px;border:1px solid #ddd;">' + ev.name + '</td>' +
         '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' + (ev.category || "-") + '</td>' +
         '<td style="padding:8px;border:1px solid #ddd;text-align:right;">' + ((ev.price !== null && ev.price !== undefined) ? "Rs." + ev.price : "-") + '</td></tr>';
  });
  return t + "</table>";
}

function sendUserConfirmation(formData, qrData, eventsData) {
  MailApp.sendEmail({
    to: formData.email,
    subject: "Registration Confirmed - " + EVENT_NAME + " [" + qrData.registrationId + "]",
    htmlBody: '<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">' +
      '<div style="background:linear-gradient(135deg,#6B46C1,#D53F8C);color:white;padding:32px;text-align:center;border-radius:12px;">' +
      '<h1>Registration Confirmed!</h1><h2>' + EVENT_NAME + '</h2></div>' +
      '<div style="text-align:center;background:#EDF2F7;padding:16px;margin:16px 0;border-radius:8px;">' +
      '<h3 style="color:#6B46C1;">ID: ' + qrData.registrationId + '</h3></div>' +
      '<div style="text-align:center;"><img src="' + qrData.url + '" style="border:2px solid #ddd;border-radius:8px;padding:8px;"/>' +
      '<p>Show this QR at the registration desk</p></div>' +
      '<p><strong>Name:</strong> ' + formData.name + '</p>' +
      '<p><strong>Phone:</strong> ' + formData.phone + '</p>' +
      '<p><strong>College:</strong> ' + formData.college + '</p>' +
      eventsTable(eventsData) +
      '<p style="font-weight:bold;color:#6B46C1;font-size:18px;text-align:right;">Total: Rs.' + formData.totalAmount + '</p>' +
      '<div style="background:#fef3c7;color:#92400e;padding:16px;margin:20px 0;border-left:4px solid #f59e0b;border-radius:6px;">' +
      '<h4 style="margin-top:0;margin-bottom:8px;">Important Instructions:</h4>' +
      '<ul style="padding-left:20px;margin-bottom:0;font-size:14px;line-height:1.5;">' +
      '<li style="margin-bottom:4px;"><strong>ID Card:</strong> Please bring your original College ID Card for verification.</li>' +
      '<li style="margin-bottom:4px;"><strong>Reporting Time:</strong> Arrive at the venue at least 30 minutes before the event begins.</li>' +
      '<li style="margin-bottom:4px;"><strong>QR Code:</strong> Keep this QR code handy at the registration desk.</li>' +
      '<li style="margin-bottom:4px;"><strong>Discipline:</strong> Maintain decorum and follow coordinator instructions.</li>' +
      '<li><strong>Decisions:</strong> The decision of the judges and organizing committee will be final.</li>' +
      '</ul></div>' +
      '<p style="text-align:center;color:#888;margin-top:20px;font-size:14px;">Contact: ' + ADMIN_EMAIL + ' | ' + ORGANIZER_PHONE + '</p></div>'
  });
}

function sendAdminNotification(formData, qrData, eventsData) {
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: "New Registration - " + EVENT_NAME + " [" + qrData.registrationId + "]",
    htmlBody: "<h2>New Registration</h2>" +
      "<p><strong>ID:</strong> " + qrData.registrationId + "</p>" +
      "<p><strong>Name:</strong> " + formData.name + "</p>" +
      "<p><strong>Email:</strong> " + formData.email + "</p>" +
      "<p><strong>Phone:</strong> " + formData.phone + "</p>" +
      "<p><strong>College:</strong> " + formData.college + "</p>" +
      eventsTable(eventsData) +
      "<p><strong>Total:</strong> Rs." + formData.totalAmount + "</p>" +
      "<h3>Important Instructions:</h3>" +
      "<ul>" +
      "<li><strong>ID Card:</strong> Please bring your original College ID Card for verification.</li>" +
      "<li><strong>Reporting Time:</strong> Arrive at the venue at least 30 minutes before the event begins.</li>" +
      "<li><strong>QR Code:</strong> Keep this QR code handy at the registration desk.</li>" +
      "<li><strong>Discipline:</strong> Maintain decorum and follow coordinator instructions.</li>" +
      "<li><strong>Decisions:</strong> The decision of the judges and organizing committee will be final.</li>" +
      "</ul>"
  });
}

// ── ONE-TIME SETUP ─────────────────────────────────────────────────────────
// Run this once manually from the Apps Script editor
function setupPaymentSheet() {
  var ss    = SpreadsheetApp.openById(PAYMENT_SHEET_ID);
  var sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];
  var headers = ["Phone Number", "Amount", "Screenshot URL", "Timestamp"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setBackground("#6B46C1").setFontColor("#ffffff").setFontWeight("bold");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  Logger.log("Payment sheet setup done.");
}
