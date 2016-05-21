export class TimeTraxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('time-trax-app h1')).getText();
  }
}
