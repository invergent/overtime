module.exports = function headerAndFooterContent(section) {
  const headerAndFooter = {
    header: `<head>
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
    </head>`,
    footer: `<footer class="footer">
      <div class="contact-us">
        <p>For enquiries, call us on 01-01234</p>
        <p>1876 Crescent, Opposite Sheruru Drive, Mozini, Lagos, Nigeria.</p>
      </div>
    </footer>`
  };
  return headerAndFooter[section];
};
