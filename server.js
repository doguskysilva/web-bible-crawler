var tinyreq = require('tinyreq')
var cheerio = require('cheerio')
var cheerioReq = require('cheerio-req');
var fs = require('fs')

//let $  = cheerio.load("<h2 class='title'>Hello world</h2>");

var link = 'https://www.bibliaonline.com.br/acf/lv/1'

let $ = cheerio.load("<div class='bible verses'><p><sup>16</sub><span class='text'>Ola</span></p><p><sub>17</sub><span class='text'>Ola 17</span></p></div>");

//console.log($("div.verses > p:eq( 2 ) > sup").text());

var jsonBible = []
var chapter_count = 0;

cheerioReq(link, (err, $) => {
    var size_verse = parseInt($("div.verses > p:last-child > sup").text());
    var count = 0;

    jsonBible.push({chapter : chapter_count + 1, verses : []})

    while(count < size_verse){

        var chapter = $("div.verses > p").eq(count).children('sup').text();
        var text    = $("div.verses > p").eq(count).children('span.text').text();

        jsonBible[chapter_count].verses.push({number : count + 1, text : text})

        //console.log(json)
        
        count++
    }
    console.log(JSON.stringify(jsonBible))
    fs.writeFile('3.json', JSON.stringify(jsonBible), 'utf8');
})
