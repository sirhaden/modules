(function () {
'use strict';

// Angular initialization
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListCheckOff', ShoppingListCheckOffProvider)
.config(Config);

// Configuration - Config
Config.$inject = ['ShoppingListCheckOffProvider'];
function Config(ShoppingListCheckOffProvider) {
}

// Controller 1 - ToBuyController
ToBuyController.$inject = ['ShoppingListCheckOff'];
function ToBuyController(ShoppingListCheckOff) {
  var list1 = this;

  list1.items = ShoppingListCheckOff.getItemsToBuy();

  list1.isEmpty = function() {
      return (ShoppingListCheckOff.getItemsToBuy().length == 0 ? true : false);
  }

  list1.buyItem = function (itemIndex) {
    ShoppingListCheckOff.buyItem(itemIndex);
  };
}

// Controller 2 - AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];
function AlreadyBoughtController(ShoppingListCheckOff) {
  var list2 = this;

  list2.items = ShoppingListCheckOff.getItemsBought();

  list2.isEmpty = function() {
      return (ShoppingListCheckOff.getItemsBought().length == 0 ? true : false);
  };
}

// Service - ShoppingListCheckOffService
// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService(maxItems) {
  var service = this;

  // Starting lists of shopping items
  var itemsBought = [];
  var itemsToBuy = [
  {
    name: "cookies",
    quantity: 10
  },
  {
    name: "cookies",
    quantity: 15
  },
  {
    name: "cookies",
    quantity: 20
  },
  {
    name: "cookies",
    quantity: 25
  },
  {
    name: "cookies",
    quantity: 30
  }
];

  service.buyItem = function (itemIndex) {
    console.log("Items To Buy (before): " + itemsToBuy.length);
    console.log("Items Bought (before): " + itemsBought.length);

    var item = itemsToBuy[itemIndex];
    itemsToBuy.splice(itemIndex, 1);
    itemsBought.push(item);

    console.log("Items To Buy (after): " + itemsToBuy.length);
    console.log("Items Bought (after): " + itemsBought.length);
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
}

// Service Provider (factory) - ShoppingListCheckOffService
function ShoppingListCheckOffProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 100
  };

  provider.$get = function () {
    var shoppingListCheckOff = new ShoppingListCheckOffService(provider.defaults.maxItems);
    return shoppingListCheckOff;
  };
}

})();
