module.exports = {
  up: queryInterface => queryInterface.bulkInsert('EmailTemplate', [{
    name: 'Reset',
    description: 'Reset passwords',
    subject: 'Password Reset',
    htmlMessage: `<html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title></title>
        <style>
          .cover {
            width: 100%;
            background-color: #F2F2F2;
            margin: 40px auto auto;
            box-sizing: border-box;
            padding: 50px;
          }
          h3 {
            margin: 0 0 30px;
            font-family: Comic Sans MS;
          }
          .wrapper {
            background-color: #ffffff;
            font-family: Trebuchet MS;
            padding: 35px;
            width: 350px;
            margin: 0 auto 50px;
            border-radius: 15px;
            text-align: center;
            box-sizing: border-box;
          }
          p {
            margin: 0 0 10px;
            color: #5C5D5D
          }
          button {
            background-color: black;
            color: white;
            font-size: 16px;
            padding: 15px;
            box-sizing: border-box;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          footer {
            text-align: center;
          }
          @media screen and (max-width: 400px) {
            .wrapper {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="cover">
          <div class="wrapper">
            <h2>Aaaah! You forgot your password!</h2>
            <p>Not a problem, {{staffFirstName}}. Click the button below to reset it</p>
            <a href="http://init.overtime-api.example.com:7000/confirm-reset-request?hash={{hash}}" target="_blank">
              <button>Reset password</button>
            </a>
          </div>
          <footer class="footer">
            <div class="contact-us">
              <p>For enquiries, call us on 01-01234</p>
              <p>1876 Crescent, Opposite Sheruru Drive, Mozini, Lagos, Nigeria.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>`,
    createdAt: '2019-01-12',
    updatedAt: '2018-01-12'
  },
  {
    name: 'New Claim Supervisor',
    description: 'Notify Supervisor of newly submitted claim',
    subject: 'New Overtime Claim Request',
    htmlMessage: `<html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title></title>
        <style>
          .cover {
            width: 100%;
            background-color: #F2F2F2;
            margin: 40px auto auto;
            box-sizing: border-box;
            padding: 50px;
            font-family: Trebuchet MS;
            box-sizing: border-box;
          }
          .content-wrapper {
            width: 550px;
            margin: 0 auto 50px;
            text-align: center;
            box-sizing: border-box;
            font-weight: 400;
          }
          .letter {
            background-color: #ffffff;
          }
          .header {
            padding: 15px 35px;
            box-sizing: border-box;
          }
          .header img {
            width: 250px;
          }
          hr {
            border: 1px solid #001E50;
          }
          .body {
            padding: 10px 25px 10px;
            box-sizing: border-box;
          }
          .body h2 {
            color: #001E50;
            margin: 20px auto;
            box-sizing: border-box;
          }
          .body .paragraphs p {
            color: #001E50;
            margin-bottom: 15px;
            text-align: left;
          }
          .body .button-wrapper {
            margin: 30px auto;
          }
          .body .button-wrapper button {
            background-color: #001E50;
            color: white;
            font-size: 16px;
            padding: 15px;
            box-sizing: border-box;
            border: none;
            cursor: pointer;
          }
          .footer {
            margin-top: 20px;
          }
          @media screen and (max-width: 700px) {
            .cover {
              padding: 50px 3%;
            }
            .content-wrapper {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>New Overtime Claim request</h2>
                <div class="paragraphs">
                  <p>Dear {{supervisorFirstName}},</p>
                  <p><strong>{{staffFirstName}} {{staffLastName}}</strong> just submitted an overtime claim. It is awaiting your approval.</p>
                  <p>Click the button below to access all pending claims awaiting your approval.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/approvals?hash={{hash}}" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            <section class="footer">
              <div class="contact-us">
                <p>For enquiries, call us on 01-01234</p>
                <p>1876 Crescent, Opposite Sheruru Drive, Mozini, Lagos, Nigeria.</p>
              </div>
            </section>
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-02-23',
    updatedAt: '2018-02-23'
  },
  {
    name: 'New Claim BSM',
    description: 'Notify BSM of newly submitted claim',
    subject: 'New Overtime Claim Request',
    htmlMessage: `<html lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title></title>
        <style>
          .cover {
            width: 100%;
            background-color: #F2F2F2;
            margin: 40px auto auto;
            box-sizing: border-box;
            padding: 50px;
            font-family: Trebuchet MS;
            box-sizing: border-box;
          }
          .content-wrapper {
            width: 550px;
            margin: 0 auto 50px;
            text-align: center;
            box-sizing: border-box;
            font-weight: 400;
          }
          .letter {
            background-color: #ffffff;
          }
          .header {
            padding: 15px 35px;
            box-sizing: border-box;
          }
          .header img {
            width: 250px;
          }
          hr {
            border: 1px solid #001E50;
          }
          .body {
            padding: 10px 25px 10px;
            box-sizing: border-box;
          }
          .body h2 {
            color: #001E50;
            margin: 20px auto;
            box-sizing: border-box;
          }
          .body .paragraphs p {
            color: #001E50;
            margin-bottom: 15px;
            text-align: left;
          }
          .body .button-wrapper {
            margin: 30px auto;
          }
          .body .button-wrapper button {
            background-color: #001E50;
            color: white;
            font-size: 16px;
            padding: 15px;
            box-sizing: border-box;
            border: none;
            cursor: pointer;
          }
          .footer {
            margin-top: 20px;
          }
          @media screen and (max-width: 700px) {
            .cover {
              padding: 50px 3%;
            }
            .content-wrapper {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="cover">
          <div class="content-wrapper">
            <section class="letter">
              <div class="header">
                <img src="https://res.cloudinary.com/invergent/image/upload/v1550692251/assets/invergent04a.png" alt="Logo">
              </div>
              <hr>
              <article class="body">
                <h2>New Overtime Claim request</h2>
                <div class="paragraphs">
                  <p>Dear {{bsmFirstName}},</p>
                  <p><strong>{{staffFirstName}} {{staffLastName}}</strong>'s overtime claim was approved by <strong>{{supervisorFirstName}} {{supervisorLastName}}</strong>. Your approval is required to commence processing the claim.</p>
                  <p>Click the button below to access all pending claims awaiting your approval.</p>
                </div>
                <div class="button-wrapper">
                  <a href="http://init.overtime-api.example.com:7000/approvals?hash={{hash}}" target="_blank">
                    <button>View pending claims</button>
                  </a>
                </div>
              </article>
            </section>
            <section class="footer">
              <div class="contact-us">
                <p>For enquiries, call us on 01-01234</p>
                <p>1876 Crescent, Opposite Sheruru Drive, Mozini, Lagos, Nigeria.</p>
              </div>
            </section>
          </div>
        </div>
      </body>
    </html>`,
    createdAt: '2019-02-23',
    updatedAt: '2018-02-23'
  }]),
  down: queryInterface => queryInterface.dropTable('EmailTemplate')
};
