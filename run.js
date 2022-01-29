const puppeteer = require('puppeteer');

const Scrapper = async (url) => {
  const browser = await puppeteer.launch({headless : true});
  const page = await browser.newPage();
  await page.goto(url);


  await page.type('[id=fi-q]', 'rice') 


  await page.evaluate(()=>{
    document.getElementsByTagName('button')[1].click()
  })


  await page.waitForNavigation()

  var date = new Date
  var milliSec = date.getMilliseconds()
  await page.screenshot({path: 'example'+ milliSec + '.png'})

  const data = await page.evaluate(() =>{
    const section = document.querySelectorAll('section')
    const secNode = section[2].childNodes
    const div = secNode[1]
    const divNode = div.childNodes
    const result = []
   


  for (let i = 0; i < 40; i++) {
    
      // article Div
      const article = divNode[i]
      const articleNode = article.childNodes
   
      // anchor Div
      const anchor = articleNode[0]
      const anchorUrl = anchor.getAttribute('href')
      const anchorNode = anchor.childNodes
   

      // Image Div
      const imgDiv = anchorNode[0]
      const imgDivNode = imgDiv.childNodes
      const img = imgDivNode[0]
      var imgSrc = img.getAttribute('data-src')

      // Info Div
      const infoDiv = anchorNode[1]
      const infoDivNode = infoDiv.childNodes
      const infoDivNodeLength = infoDivNode.length
      // var rDivNum = infoDivNodeLength - 1
      // var infoValue = infoDivNode[1].nodeName

      for (let i = 0; i < infoDivNodeLength; i++) {
        var value = infoDivNode[i]
        var valueClass = value.getAttribute('class')
          if(valueClass === 'name'){
            var name = value.innerText
          } else if(valueClass === 'prc'){
            var price = value.innerText
          } else if(valueClass === 'rev'){
            var valueNode = value.childNodes
            var rating = valueNode[0]
            var ratingText = rating.innerText
          }

      }
 
    const jumia = {
        name: name,
        url: anchorUrl,
        img: imgSrc,
        price: price,
        rating: ratingText
      }

  
      result.push(jumia)

 
  }

   

  return result



  })



  console.log(data);
  await browser.close();
}


Scrapper('https://www.jumia.ng')