// import createBrowserless from 'browserless';
// import getHTML from 'html-get';
import createMetascraper from 'metascraper';

// const browserless = createBrowserless();
const metascraper = createMetascraper([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

const getContent = async (url:string) => {
  // const browserContext = browserless.createContext();

  try {
    // const result = await getHTML(url, { getBrowserless: () => browserContext });
    // return result;
  } finally {
    // const browser = await browserContext;
    // browser.destroyContext();
  }
};

export async function getMetData(url:string){
    try {
        // const metadata = await getContent(url).then(metascraper);
        // console.log(metadata);
        // return metadata
      } finally {
        // await browserless.close();
        process.exit();
      }
}
