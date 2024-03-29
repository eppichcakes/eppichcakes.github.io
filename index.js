function sendEmail(data) {
    const {
        eventdate,
        description,
        email,
        guest,
        name,
        phone,
        firstname,
    } = data;

    if (firstname !== '') {
        document.querySelector('body').style.display = "none";
        return;
    }

    Email.send({
      Host: "smtp.sendgrid.net",
      Username: "apikey",
      Password: "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",
    //   To: 'mitcheleppich@gmail.com',
      To: ['orders@eppichcakes.com', 'mitcheleppich@gmail.com'],
      From: "eppichcakes.mailorder@gmail.com",
      FromName: "eppichcakes.com",
      Subject: "Eppich Cakes: Message from a potential customer!",
      ReplyAddress: email, 
      Body: `
        <table>
            <tbody>
                <tr>
                    <td>You received an email from 'eppichcakes.com':</td>
                </tr>
                <tr></tr>
                <tr><td>Name: ${name}</td></tr>
                <tr><td>Email: ${email}</td></tr>
                <tr><td>Phone: ${phone}</td></tr>
                <tr></tr>
                <tr><td>Requested Date: ${eventdate}</td></tr>
                <tr><td>Approx. Guest: ${guest}</td></tr>
                <tr></tr>
                <tr><td>Description:</td></tr>
                <tr><td>${description}</td></tr>
            </tbody>
        </table>
      `,
    })
    .then(function (message) {
        console.log("mail sent successfully");

        let el;
        
        el = document.querySelector('#submit');
        el.classList.remove('loading');

        el = document.querySelector('.fields');
        el.style.display = "none";

        el = document.querySelector('.checkmark');
        el.style.display = "block";
    })
    .catch(function (error) {
        console.log(error);

        const el = document.querySelector('#submit');
        el.classList.remove('loading');
    });
}

function handleSubmit (event) {
    event.preventDefault();

    const el = document.querySelector('#submit');
    el.classList.add('loading');

    const data = {};
    const formData = new FormData(document.querySelector('form'));
    for (const pair of formData.entries()) {
        data[pair[0]] = pair[1];
    }

    sendEmail(data);
}
