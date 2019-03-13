// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Testing Currency Report Data': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.profit_table_20180507')
      .assert.elementPresent('.profit_table_profit_BTC')
      .assert.containsText('td', '2.030')
      .end()
  }
}
