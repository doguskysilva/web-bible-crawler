var tinyreq     = require('tinyreq')
var cheerio     = require('cheerio')
var cheerioReq  = require('cheerio-req');
var fs          = require('fs')

var book = {
    version : "asv",
    number : '39',
    name : 'ml',
    size : 4
}

var slash = "/"
var link = 'https://www.bibliaonline.com.br'

var chapter_current = 1;
var jsonBible = [];

var counter = 0;


function createJsonBook(i){

    console.log("Loading chapter => "+(i+1).toString())

    if ( i < book.size) {
        var navigate = link.concat(slash, book.version, slash, book.name, slash, (i+1).toString())
        jsonBible.push({chapter : i + 1, verses : []})

        cheerioReq(navigate, (err, $) => {
            console.log('Navegando no '+ navigate);

            var count = 0
            var size_verse = parseInt($("div.verses > p:last-child > sup").text());

            while(count < size_verse){

                var verse = $("div.verses > p").eq(count).children('sup').text();

                var text    = $("div.verses > p").eq(count).children('span.text').text();

                jsonBible[i].verses.push({number : verse, text : text})
                
                count++
            }

            createJsonBook(i+1)

            if(i + 1 == book.size){
                //console.log(JSON.stringify(jsonBible));
                fs.writeFile(book.number.concat('.json'), JSON.stringify(jsonBible), 'utf8');
            }
        })
    }
}

createJsonBook(0);


