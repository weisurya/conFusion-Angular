import { browser, by, element } from 'protractor';

export class AppPage {
  // navigateTo() {
  //   return browser.get('/');
  // }
  navigateTo(link: string) {
    return browser.get(link);
  }

  // getParagraphText() {
  //   return element(by.css('app-root h1')).getText();
  // }
  
  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }
}
