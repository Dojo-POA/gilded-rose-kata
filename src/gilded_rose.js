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

function updateItemQuality(item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = item.quality - 1;
            }
        }
    } else {
        increaseQualityUnlessMax(item);
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sell_in < 11) {
                increaseQualityUnlessMax(item);
            }
            if (item.sell_in < 6) {
                increaseQualityUnlessMax(item);
            }
        }
    }
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sell_in = item.sell_in - 1;
    }
    if (item.sell_in < 0) {
        if (item.name != 'Aged Brie') {
            if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.quality > 0) {
                    if (item.name != 'Sulfuras, Hand of Ragnaros') {
                        item.quality = item.quality - 1
                    }
                }
            } else {
                item.quality = 0;
            }
        } else {
            increaseQualityUnlessMax(item);
        }
    }
}

function increaseQualityUnlessMax(item) {
    if (item.quality < 50) {
        item.quality = item.quality + 1
    }
}

module.exports = {
    Item: Item,
    updateQuality: updateQuality
}