import nodemailer from "nodemailer";
// import 'setimmediate';
 
const transporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "leadspartscentral.us@gmail.com",
    pass: "ftzc nrta ufnx sudz",
   
  },
});
 
export function sendEmail(
  year: string,
  engine_size: string,
  make: string,
  model: string,
  transmission: string,
  part: string,
  name: string,
  email: string,
  phone: string,
  zip_code: string,
  Source: string,
  SourceCampaign: string,
  SourceMedium: string,
  SearchBy: string
) {
  // console.log("Hello", year, engine_size, make, model, transmission, part, name, email, phone, zip_code);
 
  const htmlBody =
    "<table width='100%' border='0' cellspacing='3' cellpadding='3' bgcolor='#F9F9F9'><tbody><tr><td colspan='4' align='center' bgcolor='#CCCCCC'><strong>You Have Received Enquiry. Following are the details</strong></td></tr>" +
    "<tr><td> Name: </td><td>" +
    name +
    "</td> </tr>" +
    "<tr><td> Email: </td><td><a href='mailto:" +
    email +
    "' rel='noreferrer' target='_blank'>" +
    email +
    "</a></td></tr>" +
    "<tr><td> Phone Number: </td><td>" +
    phone +
    "</td> </tr>" +
    "<tr> <td> Zip code: </td><td>" +
    zip_code +
    "</td></tr>" +
    "<tr><td> Make name: </td><td>" +
    make +
    "</td></tr>" +
    "<tr><td> Model name: </td><td>" +
    model +
    "</td></tr>" +
    "<tr><td> Make year: </td><td>" +
    year +
    "</td></tr>" +
    "<tr><td>Engine part: </td><td>" +
    part +
    "</td> </tr>" +
    "<tr><td> Engine size: </td><td>" +
    engine_size +
    "</td></tr>" +
    "<tr><td> Transmission select: </td><td>" +
    transmission +
    "</td></tr>" +
    "</tbody></table>";
 
  const newhtmlBody =
    "<table width='100%' border='0' cellspacing='3' cellpadding='3' bgcolor='#F9F9F9'><tbody><tr><td colspan='4' align='center' bgcolor='#CCCCCC'><strong>You Have Received Enquiry. Following are the details</strong></td></tr>" +
    "<tr><td> Name: </td><td>" +
    name +
    "</td> </tr>" +
    "<tr><td> Email: </td><td><a href='mailto:" +
    email +
    "' rel='noreferrer' target='_blank'>" +
    email +
    "</a></td></tr>" +
    "<tr><td> Phone Number: </td><td>" +
    phone +
    "</td> </tr>" +
    "<tr> <td> Zip code: </td><td>" +
    zip_code +
    "</td></tr>" +
    "<tr><td> Make name: </td><td>" +
    make +
    "</td></tr>" +
    "<tr><td> Model name: </td><td>" +
    model +
    "</td></tr>" +
    "<tr><td> Make year: </td><td>" +
    year +
    "</td></tr>" +
    "<tr><td>Engine part: </td><td>" +
    part +
    "</td> </tr>" +
    "<tr><td> Engine size: </td><td>" +
    engine_size +
    "</td></tr>" +
    "<tr><td> Transmission select: </td><td>" +
    transmission +
    "</td></tr>" +
    "<tr><td> Source: </td><td>" +
    (Source == "" ? "Organic" : Source) +
    "</td></tr>" +
    "<tr><td> Source Campaign: </td><td>" +
    SourceCampaign +
    "</td></tr>" +
    "<tr><td> Source Medium: </td><td>" +
    SourceMedium +
    "</td></tr>" +
    "<tr><td> Search By: </td><td>" +
    SearchBy +
    "</td></tr>" +
    "</tbody></table>";
 
  const mailData = {
    from: "UsedCarPartsCentral <leadspartscentral.us@gmail.com>",
    // to: "sales@partscentral.us",
    to: "a2zautoleads@gmail.com",
   
   
    replyTo: email,
    subject: "UCPC - " + year + " - " + make + " - " + part + "- " + zip_code,
    html: htmlBody,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };
 
  const newMailData = {
    from: "UsedCarPartsCentral <leadspartscentral.us@gmail.com>",
    // to: "sales@partscentral.us",
 
   to: "a2zautoleads@gmail.com",
 
   
    replyTo: email,
    subject: "UCPC - " + year + " - " + make + " - " + part + "- " + zip_code,
    html: newhtmlBody,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };
 
  return new Promise((resolve, reject) => {
    transporter.sendMail(newMailData, (error, info) => {
      if (error) {
        console.error("❌ SMTP error code:", (error as any)?.code);
        console.error("❌ SMTP error response:", (error as any)?.response);
        reject(error);
      } else {
        console.log('Email sent successfully:', info.response);
        console.log('Email message ID:', info.messageId);
        console.log('Email to:', newMailData.to);
        resolve(info.response);
      }
    });
  });
}
 