import { TimeTraxPage } from './app.po';

describe('time-trax App', function() {
  let page: TimeTraxPage;

  beforeEach(() => {
    page = new TimeTraxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('time-trax works!');
  });
});
