const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;
  const returnToPage = req.get('referer');

  console.log(locale);
  console.log(returnToPage);
  console.log("hi");
  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 2 }); //La cookie va a durar 2 minutos

  // redireccionamos a la página de la que venía
  res.redirect(returnToPage);
});

module.exports = router;