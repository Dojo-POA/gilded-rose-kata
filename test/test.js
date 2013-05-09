var expect = require("chai").expect;
var sinon = require("sinon");

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

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
          if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (items[i].sell_in < 11) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
              }
            }
            if (items[i].sell_in < 6) {
              if (items[i].quality < 50) {
                items[i].quality = items[i].quality + 1
              }
            }
          }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}

function setup() {
  items = [];
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));
  items.push(new Item('Aged Brie', 3, 49));
  items.push(new Item('+5 Dexterity Vest', 10, 1));
  items.push(new Item('+5 Dexterity Vest', 0, 10));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20));
}

describe("Gilded Rose", function() {
  beforeEach(function () {
    setup();
  });

  describe('Sulfuras', function() {
    it('never gets bad', function() {
      update_quality();
      expect(items[3].quality).to.equal(80);
      expect(items[3].sell_in).to.equal(0);
    });
  });

  describe('A regular item', function() {
    it('decreases quality by one after one round', function () {
      update_quality();
      expect(items[0].quality).to.equal(19);
    });
    it('decreases sell_in by one after one round', function () {
      update_quality();
      expect(items[0].sell_in).to.equal(9);
    });
    it('quality can never decrease below 0', function() {
      update_quality();
      update_quality();
      expect(items[7].quality).to.equal(0);
    });
    it('should decrease quality twice as fast after the sell in date', function() {
      update_quality();
      expect(items[8].quality).to.equal(8);
    });
  });

  describe('A Aged Brie', function(){
    it('increase the quality with every round', function(){
      update_quality();
      expect(items[6].quality).to.equal(50);
    });
    it('quality can never increase over 50', function() {
      update_quality();
      update_quality();
      expect(items[6].quality).to.equal(50);
    });
  });

    describe('Backstage pass', function(){
      it('should increase quality by 1 before 10 days of the concert', function(){
        update_quality();
        expect(items[9].quality).to.equal(21);
      });

      it('should increase quality by 2 between 5 and 10 days of the concert', function(){
        update_quality();
        expect(items[10].quality).to.equal(22);
      });

      it('should increase quality by 3 between 0 and 5 days of the concert', function(){
        update_quality();
        expect(items[11].quality).to.equal(23);
      });

      it('should drop the quality to 0 in the day of the concert', function(){
        update_quality();
        expect(items[12].quality).to.equal(0);
      });
    });
    
});


