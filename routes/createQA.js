'use strict';

const express = require('express');
const router = require('express').Router();
const data = require('../models/data');
const request = require('request');
const htmlToJson = require('html-to-json');

router.post('/create', (req, res, next) => {
  const url = req.body.url;
  const regex = /\d+/;
  const asset = url.match(regex)[0];

  request.get({
      url: "http://content-api-a127.api.bbci.co.uk/cms/cps/asset/" + asset + "?api_key=",
      headers: {
        "X-Candy-Audience": "Domestic",
        "X-Candy-Platform": "Desktop",
        "Accept": "application/json"
      }
    },
    function (err, response, body) {
      //   if (err) return next(err);
      //   htmlToJson.parse(body, {
      //     'questions': {
      //       'question': ($doc) => {
      //         return $doc.find(".story-body__crosshead").text();
      //       },
      //       'answer': ($doc) => {
      //         return $doc.find(".story-body__crosshead").text();
      //       }
      //     }
      //   }, function (err, body) {
      //     console.log(body);
      //     res.json(body);
      //   });
      const CPSBody = JSON.stringify(JSON.parse(body).results[0].body);
      const practice = "<crosshead>What's happening now?</crosshead><paragraph>The UK has voted to leave the European Union. It is scheduled to depart on 29 March, 2019. Talks are currently taking place on three aspects of how Brexit will work - focusing on how much the UK owes the EU, what happens to the Northern Ireland border and what happens to UK citizens living elsewhere in the EU and EU citizens living in the UK. The UK wants to talk about future trade relations - and a plan for a two year \"transition\" period to smooth the way to post-Brexit relations. But the EU says they will not talk about the future until enough progress has been made on the other issues. UK Prime Minister Theresa May is at a Brussels summit trying to persuade fellow EU leaders to agree to talks about the future.</paragraph><paragraph><bold>What does Brexit mean?</bold></paragraph><paragraph>It is a word that has become used as a shorthand way of saying the UK leaving the EU - merging the words <bold>Br</bold>itain and <bold>exit </bold>to get Brexit, in a same way as a possible Greek exit from the euro was dubbed Grexit in the past.</paragraph><crosshead>Why is Britain leaving the European Union?</crosshead>"
      const crossheadStart = /<crosshead>(.*)<\/crosshead>/;
      console.log(practice.split(crossheadStart));

      //   console.log(CPSBody);
      res.json(CPSBody);


      //   data.createQA((err, allData) => {
      //     if (err) {
      //       return next(err)
      //     };
      //     // const total = allData.length;
      //     res.json({
      //       questions: allData
      //     });
      //   });
    });
});

// function qanda(body) {
//   const question = htmlToJson.parse(body, function (err, body) {
//     return this.map('.story-body__crosshead', function ($item) {
//       return $item.text();
//     });
//   });

//   const answer = htmlToJson.parse(body, function (err, body) {
//     return this.map('.story-body p', function ($item) {
//       return $item.text();
//     });
//   });

//   //   htmlToJson.parse(body, {
//   //       'questions': {
//   //           'question': ($doc) => {
//   //               return $doc.find(".story-body__crosshead").text();
//   //           },
//   //           'answer': ($doc) => {
//   //               return $doc.find(".story-body__crosshead").text();
//   //           }
//   //       }
//   //   }, function (err, body) {
//   //       console.log(body);
//   //       res.json(body);
//   //   });
//   return {
//     question,
//     answer
//   }
// }

module.exports = router;
