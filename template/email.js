module.exports = {
  templateEmail: function templateEmail(subtitle, button, title, content, link) {
    return ("<head>\n" +
      "<meta http-equiv=\"Content-Type\" content=\"text/html\">\n" +
      "<meta charset=\"utf-8\">\n" +
      "<meta name=\"viewport\" content=\"width=device-width\">\n" +
      "</head>\n" +
      "<body style=\"-moz-box-sizing: border-box; -ms-text-size-adjust: 100%; -webkit-box-sizing: border-box; -webkit-text-size-adjust: 100%; box-sizing: border-box; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 22px; margin: 0; min-width: 100%; padding: 0; text-align: left; width: 100% !important\">\n" +
      "<style type=\"text/css\">\n" +
      "  body {\n" +
      "    width: 100% !important;\n" +
      "    min-width: 100%;\n" +
      "    -webkit-text-size-adjust: 100%;\n" +
      "    -ms-text-size-adjust: 100%;\n" +
      "    margin: 0;\n" +
      "    padding: 0;\n" +
      "    -moz-box-sizing: border-box;\n" +
      "    -webkit-box-sizing: border-box;\n" +
      "    box-sizing: border-box;\n" +
      "  }\n" +
      "  .ExternalClass {\n" +
      "    width: 100%;\n" +
      "  }\n" +
      "  .ExternalClass {\n" +
      "    line-height: 100%;\n" +
      "  }\n" +
      "  #backgroundTable {\n" +
      "    margin: 0;\n" +
      "    padding: 0;\n" +
      "    width: 100% !important;\n" +
      "    line-height: 100% !important;\n" +
      "  }\n" +
      "  img {\n" +
      "    outline: none;\n" +
      "    text-decoration: none;\n" +
      "    -ms-interpolation-mode: bicubic;\n" +
      "    width: auto;\n" +
      "    max-width: 100%;\n" +
      "    clear: both;\n" +
      "    display: block;\n" +
      "  }\n" +
      "  body {\n" +
      "    color: #1C232B;\n" +
      "    font-family: Helvetica, Arial, sans-serif;\n" +
      "    font-weight: normal;\n" +
      "    padding: 0;\n" +
      "    margin: 0;\n" +
      "    text-align: left;\n" +
      "    line-height: 1.3;\n" +
      "  }\n" +
      "  body {\n" +
      "    font-size: 16px;\n" +
      "    line-height: 1.3;\n" +
      "  }\n" +
      "  a:hover {\n" +
      "    color: #1f54ed;\n" +
      "  }\n" +
      "  a:active {\n" +
      "    color: #1f54ed;\n" +
      "  }\n" +
      "  a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h1 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h2 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h3 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h4 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h5 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  h6 a:visited {\n" +
      "    color: #4E78F1;\n" +
      "  }\n" +
      "  table.button:hover table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button:active table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button table tr td a:visited {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.tiny:hover table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.tiny:active table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.tiny table tr td a:visited {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.small:hover table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.small:active table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.small table tr td a:visited {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.large:hover table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.large:active table tr td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.large table tr td a:visited {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button:hover table td {\n" +
      "    background: #1f54ed;\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button:visited table td {\n" +
      "    background: #1f54ed;\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button:active table td {\n" +
      "    background: #1f54ed;\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button:hover table a {\n" +
      "    border: 0 solid #1f54ed;\n" +
      "  }\n" +
      "  table.button:visited table a {\n" +
      "    border: 0 solid #1f54ed;\n" +
      "  }\n" +
      "  table.button:active table a {\n" +
      "    border: 0 solid #1f54ed;\n" +
      "  }\n" +
      "  table.button.secondary:hover table td {\n" +
      "    background: #fefefe;\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.secondary:hover table a {\n" +
      "    border: 0 solid #fefefe;\n" +
      "  }\n" +
      "  table.button.secondary:hover table td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.secondary:active table td a {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.secondary table td a:visited {\n" +
      "    color: #FFFFFF;\n" +
      "  }\n" +
      "  table.button.success:hover table td {\n" +
      "    background: #009482;\n" +
      "  }\n" +
      "  table.button.success:hover table a {\n" +
      "    border: 0 solid #009482;\n" +
      "  }\n" +
      "  table.button.alert:hover table td {\n" +
      "    background: #ff6131;\n" +
      "  }\n" +
      "  table.button.alert:hover table a {\n" +
      "    border: 0 solid #ff6131;\n" +
      "  }\n" +
      "  table.button.warning:hover table td {\n" +
      "    background: #fcae1a;\n" +
      "  }\n" +
      "  table.button.warning:hover table a {\n" +
      "    border: 0px solid #fcae1a;\n" +
      "  }\n" +
      "  .thumbnail:hover {\n" +
      "    box-shadow: 0 0 6px 1px rgba(78, 120, 241, 0.5);\n" +
      "  }\n" +
      "  .thumbnail:focus {\n" +
      "    box-shadow: 0 0 6px 1px rgba(78, 120, 241, 0.5);\n" +
      "  }\n" +
      "  body.outlook p {\n" +
      "    display: inline !important;\n" +
      "  }\n" +
      "  body {\n" +
      "    font-weight: normal;\n" +
      "    font-size: 16px;\n" +
      "    line-height: 22px;\n" +
      "  }\n" +
      "  @media only screen and (max-width: 596px) {\n" +
      "    .small-float-center {\n" +
      "      margin: 0 auto !important;\n" +
      "      float: none !important;\n" +
      "      text-align: center !important;\n" +
      "    }\n" +
      "    .small-text-center {\n" +
      "      text-align: center !important;\n" +
      "    }\n" +
      "    .small-text-left {\n" +
      "      text-align: left !important;\n" +
      "    }\n" +
      "    .small-text-right {\n" +
      "      text-align: right !important;\n" +
      "    }\n" +
      "    .hide-for-large {\n" +
      "      display: block !important;\n" +
      "      width: auto !important;\n" +
      "      overflow: visible !important;\n" +
      "      max-height: none !important;\n" +
      "      font-size: inherit !important;\n" +
      "      line-height: inherit !important;\n" +
      "    }\n" +
      "    table.body table.container .hide-for-large {\n" +
      "      display: table !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.body table.container .row.hide-for-large {\n" +
      "      display: table !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.body table.container .callout-inner.hide-for-large {\n" +
      "      display: table-cell !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.body table.container .show-for-large {\n" +
      "      display: none !important;\n" +
      "      width: 0;\n" +
      "      mso-hide: all;\n" +
      "      overflow: hidden;\n" +
      "    }\n" +
      "    table.body img {\n" +
      "      width: auto;\n" +
      "      height: auto;\n" +
      "    }\n" +
      "    table.body center {\n" +
      "      min-width: 0 !important;\n" +
      "    }\n" +
      "    table.body .container {\n" +
      "      width: 95% !important;\n" +
      "    }\n" +
      "    table.body .columns {\n" +
      "      height: auto !important;\n" +
      "      -moz-box-sizing: border-box;\n" +
      "      -webkit-box-sizing: border-box;\n" +
      "      box-sizing: border-box;\n" +
      "      padding-left: 16px !important;\n" +
      "      padding-right: 16px !important;\n" +
      "    }\n" +
      "    table.body .column {\n" +
      "      height: auto !important;\n" +
      "      -moz-box-sizing: border-box;\n" +
      "      -webkit-box-sizing: border-box;\n" +
      "      box-sizing: border-box;\n" +
      "      padding-left: 16px !important;\n" +
      "      padding-right: 16px !important;\n" +
      "    }\n" +
      "    table.body .columns .column {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.body .columns .columns {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.body .column .column {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.body .column .columns {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.body .collapse .columns {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.body .collapse .column {\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    td.small-1 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 8.333333% !important;\n" +
      "    }\n" +
      "    th.small-1 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 8.333333% !important;\n" +
      "    }\n" +
      "    td.small-2 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 16.666666% !important;\n" +
      "    }\n" +
      "    th.small-2 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 16.666666% !important;\n" +
      "    }\n" +
      "    td.small-3 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 25% !important;\n" +
      "    }\n" +
      "    th.small-3 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 25% !important;\n" +
      "    }\n" +
      "    td.small-4 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 33.333333% !important;\n" +
      "    }\n" +
      "    th.small-4 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 33.333333% !important;\n" +
      "    }\n" +
      "    td.small-5 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 41.666666% !important;\n" +
      "    }\n" +
      "    th.small-5 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 41.666666% !important;\n" +
      "    }\n" +
      "    td.small-6 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 50% !important;\n" +
      "    }\n" +
      "    th.small-6 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 50% !important;\n" +
      "    }\n" +
      "    td.small-7 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 58.333333% !important;\n" +
      "    }\n" +
      "    th.small-7 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 58.333333% !important;\n" +
      "    }\n" +
      "    td.small-8 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 66.666666% !important;\n" +
      "    }\n" +
      "    th.small-8 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 66.666666% !important;\n" +
      "    }\n" +
      "    td.small-9 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 75% !important;\n" +
      "    }\n" +
      "    th.small-9 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 75% !important;\n" +
      "    }\n" +
      "    td.small-10 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 83.333333% !important;\n" +
      "    }\n" +
      "    th.small-10 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 83.333333% !important;\n" +
      "    }\n" +
      "    td.small-11 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 91.666666% !important;\n" +
      "    }\n" +
      "    th.small-11 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 91.666666% !important;\n" +
      "    }\n" +
      "    td.small-12 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    th.small-12 {\n" +
      "      display: inline-block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    .columns td.small-12 {\n" +
      "      display: block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    .column td.small-12 {\n" +
      "      display: block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    .columns th.small-12 {\n" +
      "      display: block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    .column th.small-12 {\n" +
      "      display: block !important;\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-1 {\n" +
      "      margin-left: 8.333333% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-1 {\n" +
      "      margin-left: 8.333333% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-2 {\n" +
      "      margin-left: 16.666666% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-2 {\n" +
      "      margin-left: 16.666666% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-3 {\n" +
      "      margin-left: 25% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-3 {\n" +
      "      margin-left: 25% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-4 {\n" +
      "      margin-left: 33.333333% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-4 {\n" +
      "      margin-left: 33.333333% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-5 {\n" +
      "      margin-left: 41.666666% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-5 {\n" +
      "      margin-left: 41.666666% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-6 {\n" +
      "      margin-left: 50% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-6 {\n" +
      "      margin-left: 50% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-7 {\n" +
      "      margin-left: 58.333333% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-7 {\n" +
      "      margin-left: 58.333333% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-8 {\n" +
      "      margin-left: 66.666666% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-8 {\n" +
      "      margin-left: 66.666666% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-9 {\n" +
      "      margin-left: 75% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-9 {\n" +
      "      margin-left: 75% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-10 {\n" +
      "      margin-left: 83.333333% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-10 {\n" +
      "      margin-left: 83.333333% !important;\n" +
      "    }\n" +
      "    table.body td.small-offset-11 {\n" +
      "      margin-left: 91.666666% !important;\n" +
      "    }\n" +
      "    table.body th.small-offset-11 {\n" +
      "      margin-left: 91.666666% !important;\n" +
      "    }\n" +
      "    table.body table.columns td.expander {\n" +
      "      display: none !important;\n" +
      "    }\n" +
      "    table.body table.columns th.expander {\n" +
      "      display: none !important;\n" +
      "    }\n" +
      "    table.body .right-text-pad {\n" +
      "      padding-left: 10px !important;\n" +
      "    }\n" +
      "    table.body .text-pad-right {\n" +
      "      padding-left: 10px !important;\n" +
      "    }\n" +
      "    table.body .left-text-pad {\n" +
      "      padding-right: 10px !important;\n" +
      "    }\n" +
      "    table.body .text-pad-left {\n" +
      "      padding-right: 10px !important;\n" +
      "    }\n" +
      "    table.menu {\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.menu td {\n" +
      "      width: auto !important;\n" +
      "      display: inline-block !important;\n" +
      "    }\n" +
      "    table.menu th {\n" +
      "      width: auto !important;\n" +
      "      display: inline-block !important;\n" +
      "    }\n" +
      "    table.menu.vertical td {\n" +
      "      display: block !important;\n" +
      "    }\n" +
      "    table.menu.vertical th {\n" +
      "      display: block !important;\n" +
      "    }\n" +
      "    table.menu.small-vertical td {\n" +
      "      display: block !important;\n" +
      "    }\n" +
      "    table.menu.small-vertical th {\n" +
      "      display: block !important;\n" +
      "    }\n" +
      "    table.menu[align=\"center\"] {\n" +
      "      width: auto !important;\n" +
      "    }\n" +
      "    table.button.small-expand {\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.button.small-expanded {\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "    table.button.small-expand table {\n" +
      "      width: 100%;\n" +
      "    }\n" +
      "    table.button.small-expanded table {\n" +
      "      width: 100%;\n" +
      "    }\n" +
      "    table.button.small-expand table a {\n" +
      "      text-align: center !important;\n" +
      "      width: 100% !important;\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.button.small-expanded table a {\n" +
      "      text-align: center !important;\n" +
      "      width: 100% !important;\n" +
      "      padding-left: 0 !important;\n" +
      "      padding-right: 0 !important;\n" +
      "    }\n" +
      "    table.button.small-expand center {\n" +
      "      min-width: 0;\n" +
      "    }\n" +
      "    table.button.small-expanded center {\n" +
      "      min-width: 0;\n" +
      "    }\n" +
      "    table.body .container {\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "  }\n" +
      "  @media only screen and (min-width: 732px) {\n" +
      "    table.body table.milkyway-email-card {\n" +
      "      width: 525px !important;\n" +
      "    }\n" +
      "    table.body table.emailer-footer {\n" +
      "      width: 525px !important;\n" +
      "    }\n" +
      "  }\n" +
      "  @media only screen and (max-width: 731px) {\n" +
      "    table.body table.milkyway-email-card {\n" +
      "      width: 320px !important;\n" +
      "    }\n" +
      "    table.body table.emailer-footer {\n" +
      "      width: 320px !important;\n" +
      "    }\n" +
      "  }\n" +
      "  @media only screen and (max-width: 320px) {\n" +
      "    table.body table.milkyway-email-card {\n" +
      "      width: 100% !important;\n" +
      "      border-radius: 0;\n" +
      "      box-sizing: none;\n" +
      "    }\n" +
      "    table.body table.emailer-footer {\n" +
      "      width: 100% !important;\n" +
      "      border-radius: 0;\n" +
      "      box-sizing: none;\n" +
      "    }\n" +
      "  }\n" +
      "  @media only screen and (max-width: 280px) {\n" +
      "    table.body table.milkyway-email-card .milkyway-content {\n" +
      "      width: 100% !important;\n" +
      "    }\n" +
      "  }\n" +
      "  @media (min-width: 596px) {\n" +
      "    .milkyway-header {\n" +
      "      width: 11%;\n" +
      "    }\n" +
      "  }\n" +
      "  @media (max-width: 596px) {\n" +
      "    .milkyway-header {\n" +
      "      width: 50%;\n" +
      "    }\n" +
      "    .emailer-footer .emailer-border-bottom {\n" +
      "      border-bottom: 0.5px solid #E2E5E7;\n" +
      "    }\n" +
      "    .emailer-footer .make-you-smile {\n" +
      "      margin-top: 24px;\n" +
      "    }\n" +
      "    .emailer-footer .make-you-smile .email-tag-line {\n" +
      "      width: 80%;\n" +
      "      position: relative;\n" +
      "      left: 10%;\n" +
      "    }\n" +
      "    .emailer-footer .make-you-smile .universe-address {\n" +
      "      margin-bottom: 10px !important;\n" +
      "    }\n" +
      "    .emailer-footer .make-you-smile .email-tag-line {\n" +
      "      margin-bottom: 10px !important;\n" +
      "    }\n" +
      "    .have-questions-text {\n" +
      "      width: 70%;\n" +
      "    }\n" +
      "    .hide-on-small {\n" +
      "      display: none;\n" +
      "    }\n" +
      "    .product-card-stacked-row .thumbnail-image {\n" +
      "      max-width: 32% !important;\n" +
      "    }\n" +
      "    .product-card-stacked-row .thumbnail-content p {\n" +
      "      width: 64%;\n" +
      "    }\n" +
      "    .welcome-subcontent {\n" +
      "      text-align: left;\n" +
      "      margin: 20px 0 10px;\n" +
      "    }\n" +
      "    .milkyway-title {\n" +
      "      padding: 16px;\n" +
      "    }\n" +
      "    .meta-data {\n" +
      "      text-align: center;\n" +
      "    }\n" +
      "    .label {\n" +
      "      text-align: center;\n" +
      "    }\n" +
      "    .welcome-email .wavey-background-subcontent {\n" +
      "      width: calc(100% - 32px);\n" +
      "    }\n" +
      "  }\n" +
      "  @media (min-width: 597px) {\n" +
      "    .emailer-footer .show-on-mobile {\n" +
      "      display: none;\n" +
      "    }\n" +
      "    .emailer-footer .emailer-border-bottom {\n" +
      "      border-bottom: none;\n" +
      "    }\n" +
      "    .have-questions-text {\n" +
      "      border-bottom: none;\n" +
      "    }\n" +
      "    .hide-on-large {\n" +
      "      display: none;\n" +
      "    }\n" +
      "    .milkyway-title {\n" +
      "      padding: 55px 55px 16px;\n" +
      "    }\n" +
      "  }\n" +
      "  @media only screen and (max-width: 290px) {\n" +
      "    table.container.your-tickets .tickets-container {\n" +
      "      width: 100%;\n" +
      "    }\n" +
      "  }\n" +
      "</style>\n" +
      "<table class=\"body\" data-made-with-foundation=\"\" style=\"background: #FAFAFA; border-collapse: collapse; border-spacing: 0; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; height: 100%; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\"\n" +
      "  bgcolor=\"#FAFAFA\">\n" +
      "  <tbody>\n" +
      "    <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "      <td class=\"center\" align=\"center\" valign=\"top\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\">\n" +
      "        <center style=\"min-width: 580px; width: 100%\">\n" +
      "          <table class=\" spacer  float-center\" align=\"center\" style=\"border-collapse: collapse; border-spacing: 0; float: none; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 100%\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td height=\"20px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; hyphens: auto; line-height: 20px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "          <table class=\"header-spacer spacer  float-center\" align=\"center\" style=\"border-collapse: collapse; border-spacing: 0; float: none; line-height: 60px; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 100%\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td height=\"16px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 16px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "          <div class=\"milkyway-header float-center\" align=\"center\">\n" +
      "            <img src=\"\"\n" +
      "              style=\"-ms-interpolation-mode: bicubic; clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: auto\">\n" +
      "          </div>\n" +
      "          <table class=\"header-spacer-bottom spacer  float-center\" align=\"center\" style=\"border-collapse: collapse; border-spacing: 0; float: none; line-height: 30px; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 100%\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td height=\"16px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 16px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "          <table class=\"milkyway-email-card container float-center\" align=\"center\" style=\"background: #FFFFFF; border-collapse: collapse; border-radius: 6px; border-spacing: 0; box-shadow: 0 1px 8px 0 rgba(28,35,43,0.15); float: none; margin: 0 auto; overflow: hidden; padding: 0; text-align: center; vertical-align: top; width: 580px\"\n" +
      "            bgcolor=\"#FFFFFF\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">\n" +
      "                  <table class=\"milkyway-content confirmation-instructions container\" align=\"center\" style=\"background: #FFFFFF; border-collapse: collapse; border-spacing: 0; hyphens: none; margin: auto; max-width: 100%; padding: 0; text-align: inherit; vertical-align: top; width: 280px !important\"\n" +
      "                    bgcolor=\"#FFFFFF\">\n" +
      "                    <tbody>\n" +
      "                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                        <td style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                          align=\"left\" valign=\"top\">\n" +
      "                          <table class=\" spacer \" style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" spacer \" style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <td height=\"30px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 30px; font-weight: normal; hyphens: auto; line-height: 30px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" row\" style=\"border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th class=\"header-padding small-12 large-12 columns first last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; text-align: left; width: 564px\" align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <h1 class=\"welcome-header\" style=\"color: inherit; font-family: Helvetica, Arial, sans-serif; font-size: 24px; font-weight: 600; hyphens: none; line-height: 30px; margin: 0 0 24px; padding: 0; text-align: left; width: 100%; word-wrap: normal\" align=\"left\">\n" +
      `                                            ${title}\n` +
      "                                          </h1>\n" +
      "                                        </th>\n" +
      "                                        <th class=\"expander\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; visibility: hidden; width: 0\" align=\"left\"></th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" row\" style=\"border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th class=\"body-content small-12 large-12 columns first last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; text-align: left; width: 564px\" align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <h2 class=\"welcome-subcontent\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; line-height: 22px; margin: 0; padding: 0; text-align: left; width: 100%; word-wrap: normal\" align=\"left\">\n" +
      `                                            <span style="font-weight: 600">${subtitle}\n</span>` +
      "                                          </h2>\n" +
      "                                        </th>\n" +
      "                                        <th class=\"expander\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; visibility: hidden; width: 0\" align=\"left\"></th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" row\" style=\"border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th class=\"body-content-end small-12 large-12 columns first last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; text-align: left; width: 564px\" align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <h2 class=\"welcome-subcontent\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; line-height: 22px; margin: 0; padding: 0; text-align: left; width: 100%; word-wrap: normal\" align=\"left\">\n" +
      `                                            ${content}` +
      "                                          </h2>\n" +
      "                                        </th>\n" +
      "                                        <th class=\"expander\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; visibility: hidden; width: 0\" align=\"left\"></th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" spacer \" style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <td height=\"30px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 30px; font-weight: normal; hyphens: auto; line-height: 30px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\"milkyway-content row\" style=\"border-collapse: collapse; border-spacing: 0; display: table; hyphens: none; margin: auto; max-width: 100%; padding: 0; position: relative; text-align: left; vertical-align: top; width: 280px !important\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th class=\"milkyway-padding small-12 large-12 columns first last\" valign=\"middle\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0; text-align: left; width: 564px\"\n" +
      "                                  align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <table class=\"cta-text primary radius expanded button\" style=\"border-collapse: collapse; border-spacing: 0; font-size: 14px; font-weight: 400; line-height: 0; margin: 0 0 16px; padding: 0; text-align: left; vertical-align: top; width: 100% !important\">\n" +
      "                                            <tbody>\n" +
      "                                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                                <td style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                                                  align=\"left\" valign=\"top\">\n" +
      "                                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                                    <tbody>\n" +
      "                                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                                        <td style=\"-moz-hyphens: auto; -webkit-hyphens: auto; background: #4E78F1; border: 2px none #4e78f1; border-collapse: collapse !important; border-radius: 6px; color: #FFFFFF; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                                                          align=\"left\" bgcolor=\"#4E78F1\" valign=\"top\">\n" +
      `                                                          <a href=\"${link}\" style=\"border: 0 solid #4e78f1; border-radius: 6px; color: #FFFFFF; display: inline-block; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; line-height: 1.3; margin: 0; padding: 13px 0; text-align: center; text-decoration: none; width: 100%\"\n` +
      "                                                            target=\"_blank\">\n" +
      "                                                            <p class=\"text-center\" style=\"color: white; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 300; letter-spacing: 1px; line-height: 1.3; margin: 0; padding: 0; text-align: center\" align=\"center\">\n" +
      `                                                              ${button}\n` +
      "                                                            </p>\n" +
      "                                                          </a>\n" +
      "                                                        </td>\n" +
      "                                                      </tr>\n" +
      "                                                    </tbody>\n" +
      "                                                  </table>\n" +
      "                                                </td>\n" +
      "                                              </tr>\n" +
      "                                            </tbody>\n" +
      "                                          </table>\n" +
      "                                        </th>\n" +
      "                                        <th class=\"expander\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; visibility: hidden; width: 0\" align=\"left\"></th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                          <table class=\" spacer \" style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <td height=\"10px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: normal; hyphens: auto; line-height: 10px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                        </td>\n" +
      "                      </tr>\n" +
      "                    </tbody>\n" +
      "                  </table>\n" +
      "                </td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "          <table class=\" spacer  float-center\" align=\"center\" style=\"border-collapse: collapse; border-spacing: 0; float: none; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 100%\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td height=\"20px\" style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 20px; font-weight: normal; hyphens: auto; line-height: 20px; margin: 0; mso-line-height-rule: exactly; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">&nbsp;</td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "          <table class=\"emailer-footer container float-center\" align=\"center\" style=\"background-color: transparent !important; border-collapse: collapse; border-spacing: 0; float: none; margin: 0 auto; padding: 0; text-align: center; vertical-align: top; width: 580px\"\n" +
      "            bgcolor=\"transparent\">\n" +
      "            <tbody>\n" +
      "              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                <td style=\"-moz-hyphens: auto; -webkit-hyphens: auto; border-collapse: collapse !important; color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; hyphens: auto; line-height: 1.3; margin: 0; padding: 0; text-align: left; vertical-align: top; word-wrap: break-word\"\n" +
      "                  align=\"left\" valign=\"top\">\n" +
      "                  <table class=\" row\" style=\"border-collapse: collapse; border-spacing: 0; display: table; padding: 0; position: relative; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                    <tbody>\n" +
      "                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                        <th class=\" small-12 large-4 columns first\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 8px 16px 16px; text-align: left; width: 177.3333333333px\"\n" +
      "                          align=\"left\">\n" +
      "                          <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                </th>\n" +
      "                                <th class=\"emailer-border-bottom small-12 large-11 columns first\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 0 16px; text-align: left; width: 91.666666%\"\n" +
      "                                  align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <p class=\"text-left small-text-center\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                            <a target=\"_blank\" style=\"color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none\">Florent Klein</a>\n" +
      "                                          </p>\n" +
      "                                        </th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                                <th class=\"show-for-large small-12 large-1 columns last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 0 16px; text-align: left; width: 8.333333%\" align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <p class=\"first-bullet\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; left: 6px; line-height: 1.5; margin: 0; padding: 0; position: relative; text-align: left\" align=\"left\">\n" +
      "                                            -\n" +
      "                                          </p>\n" +
      "                                        </th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                        </th>\n" +
      "                        <th class=\" small-12 large-4 columns\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 8px 16px; text-align: left; width: 177.3333333333px\" align=\"left\">\n" +
      "                          <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                </th>\n" +
      "                                <th class=\"emailer-border-bottom small-12 large-11 columns first\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 0 16px; text-align: left; width: 91.666666%\"\n" +
      "                                  align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <p class=\"text-center small-text-center\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; margin: 0; padding: 0; text-align: center\" align=\"center\">\n" +
      "                                            <a target=\"_blank\" style=\"color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none\">Soulmatch</a>\n" +
      "                                          </p>\n" +
      "                                        </th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                                <th class=\"show-for-large small-12 large-1 columns last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 0 16px; text-align: left; width: 8.333333%\" align=\"left\">\n" +
      "                                  <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                                    <tbody>\n" +
      "                                      <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                        <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                          <p class=\"last-bullet\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; left: 22px; line-height: 1.5; margin: 0; padding: 0; position: relative; text-align: left\" align=\"left\">\n" +
      "                                            -\n" +
      "                                          </p>\n" +
      "                                        </th>\n" +
      "                                      </tr>\n" +
      "                                    </tbody>\n" +
      "                                  </table>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                        </th>\n" +
      "                        <th class=\"emailer-border-bottom small-12 large-4 columns last\" style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0 auto; padding: 0 16px 16px 8px; text-align: left; width: 177.3333333333px\"\n" +
      "                          align=\"left\">\n" +
      "                          <table style=\"border-collapse: collapse; border-spacing: 0; padding: 0; text-align: left; vertical-align: top; width: 100%\">\n" +
      "                            <tbody>\n" +
      "                              <tr style=\"padding: 0; text-align: left; vertical-align: top\" align=\"left\">\n" +
      "                                <th style=\"color: #1C232B; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left\" align=\"left\">\n" +
      "                                  <p class=\"text-center small-text-center\" style=\"color: #6F7881; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: normal; line-height: 1.5; margin: 0; padding: 0; text-align: center\" align=\"center\">\n" +
      "                                    <a target=\"_blank\" style=\"color: #4E78F1; font-family: Helvetica, Arial, sans-serif; font-weight: normal; line-height: 1.3; margin: 0; padding: 0; text-align: left; text-decoration: none\">Tanguy Boissel-Dallier</a>\n" +
      "                                  </p>\n" +
      "                                </th>\n" +
      "                              </tr>\n" +
      "                            </tbody>\n" +
      "                          </table>\n" +
      "                        </th>\n" +
      "                      </tr>\n" +
      "                    </tbody>\n" +
      "                  </table>\n" +
      "                </td>\n" +
      "              </tr>\n" +
      "            </tbody>\n" +
      "          </table>\n" +
      "        </center>\n" +
      "      </td>\n" +
      "    </tr>\n" +
      "  </tbody>\n" +
      "</table>\n" +
      "</body>");
  }
};