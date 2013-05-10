function Item(name, sell_in, quality) {
    this.name = name;
    this.sell_in = sell_in;
    this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function updateQuality(items) {
    for (var i = 0; i < items.length; i++) {
        updateItemQuality(items[i]);
    }
}

var rules = {
  'Sulfuras, Hand of Ragnaros' : function (item) {
  },
  'Aged Brie': function (item) {
      increaseQualityUnlessMax(item);
      decrementSellIn(item);
  },
  'Backstage passes to a TAFKAL80ETC concert': function(item) {
    increaseQualityUnlessMax(item);
    if (item.sell_in < 11) {
        increaseQualityUnlessMax(item);
    }
    if (item.sell_in < 6) {
        increaseQualityUnlessMax(item);
    }
    decrementSellIn(item);
    if (item.sell_in < 0){
      item.quality = 0;
    }
  }
};

function updateItemQuality(item) {
    var ruleToBeApplyed = rules[item.name];    
    if(ruleToBeApplyed){
      ruleToBeApplyed(item);
      return;
    }

    decrementQuality(item);

    if (item.sell_in <= 0){
      decrementQuality(item);
    }

    decrementSellIn(item);
    
}

function increaseQualityUnlessMax(item) {
  if (item.quality < 50) {
      item.quality = item.quality + 1
  }
}

function decrementSellIn(item) {
  item.sell_in--;
}

function decrementQuality(item) {
  if(item.quality > 0){
    item.quality--;
  }
}

module.exports = {
    Item: Item,
    updateQuality: updateQuality
}