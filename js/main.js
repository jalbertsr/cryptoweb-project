(function () {
  window.fetch('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=10')
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      console.log(data)
      data.map(function (currency) {
        var name = currency.name
        var price = currency.price_usd
        var ul = document.getElementById('currency')
        var li = document.createElement('li')
        li.appendChild(document.createTextNode('Price for ' + name + ' → ' + price))
        ul.appendChild(li)
      })
    })
})()
