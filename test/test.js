var expect = require("chai").expect;
var sinon = require("sinon");

var Item = require('../src/gilded_rose').Item;
var updateQuality = require('../src/gilded_rose').updateQuality;


describe('Sulfuras', function() {
  it('never gets bad', function() {
    var item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
    updateQuality([item]);
    expect(item.quality).to.equal(80);
    expect(item.sell_in).to.equal(0);
  });
});

describe('A regular item', function() {
  it('decreases quality by one after one round', function () {
    var item = new Item('+5 Dexterity Vest', 10, 20);
    updateQuality([item]);            
    expect(item.quality).to.equal(19);
  });
  it('decreases sell_in by one after one round', function () {
    var item = new Item('+5 Dexterity Vest', 10, 20);
    updateQuality([item]);            
    expect(item.sell_in).to.equal(9);
  });
  it('quality can never decrease below 0', function() {
    var item = new Item('+5 Dexterity Vest', 10, 1);
    updateQuality([item]);            
    updateQuality([item]);
    expect(item.quality).to.equal(0);
  });
  it('should decrease quality twice as fast after the sell in date', function() {
    var item = new Item('+5 Dexterity Vest', 0, 10);
    updateQuality([item]);                  
    expect(item.quality).to.equal(8);
  });
});

describe('A Aged Brie', function(){
  it('increase the quality with every round', function(){
    var item = new Item('Aged Brie', 3, 49);
    updateQuality([item]);                  
    expect(item.quality).to.equal(50);
  });
  it('quality can never increase over 50', function() {
    var item = new Item('Aged Brie', 3, 49);
    updateQuality([item]);
    updateQuality([item]);
    expect(item.quality).to.equal(50);
  });
});

  describe('Backstage pass', function(){
    it('should increase quality by 1 before 10 days of the concert', function(){
      var item = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)
      updateQuality([item]);
      expect(item.quality).to.equal(21);
    });

    it('should increase quality by 2 between 5 and 10 days of the concert', function(){
      var item = new Item('Backstage passes to a TAFKAL80ETC concert', 9, 20)
      updateQuality([item]);
      expect(item.quality).to.equal(22);
    });

    it('should increase quality by 3 between 0 and 5 days of the concert', function(){
      var item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 20)
      updateQuality([item]);
      expect(item.quality).to.equal(23);
    });

    it('should drop the quality to 0 in the day of the concert', function(){
      var item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)
      updateQuality([item]);
      expect(item.quality).to.equal(0);
    });
  });