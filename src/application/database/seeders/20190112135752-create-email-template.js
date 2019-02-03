module.exports = {
  up: queryInterface => queryInterface.bulkInsert('EmailTemplate', [{
    name: 'Reset',
    description: 'For reseting passwords',
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
            <p>Not a problem, {{name}}. Click the button below to reset it</p>
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
  }]),
  down: queryInterface => queryInterface.dropTable('EmailTemplate')
};
