import { Item, GildedRose } from '@/gilded-rose';

describe("GildedRose", () => {
    it("creates a new item correctly", () => {
        // Arrange
        const itemName = 'foo';
        const sellIn = 10;
        const quality = 20;

        // Act
        const item = new Item(itemName, sellIn, quality);

        // Assert
        expect(item.name).toBe(itemName);
        expect(item.sellIn).toBe(sellIn);
        expect(item.quality).toBe(quality);
    });

    describe("updateQuality", () => {
        it("should degrades normal items by 1 if sellIn > 0", () => {
            // Arrange
            const gildedRose = new GildedRose([new Item('foo', 10, 20)]);

            // Act
            const items = gildedRose.updateQuality();

            // Assert
            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(19);
        });

        it("should degrade normal items quality twice as fast after sell by date", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
  
          // Act
          const items = gildedRose.updateQuality();
  
          // Assert
          expect(items[0].sellIn).toBe(-1);
          expect(items[0].quality).toBe(8); // Decreased by 2
        });

        it("should increases quality of Aged Brie by 1", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(21);
        });

        it("should not increase quality of any item above 50", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('Aged Brie', 10, 50)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(50); // Remains 50
        });

        it("should not decrease quality or sellin of sulfuras item", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(10); // sellIn does not decrease
          expect(items[0].quality).toBe(20); // quality does not decrease
        });

        it("should increases quality by 1 for backstage passes with sellIn 11 or more", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(14);
          expect(items[0].quality).toBe(21);
        });

        it("should increases quality by 2 for backstage passes with sellIn 10 or less", () => {
          // Arrange
          const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(22);
      });

      it("should increases quality by 3 for backstage passes with sellIn 5 or less", () => {
        // Arrange
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(23);
      });

      it("should sets quality to 0 for backstage passes after the concert", () => {
        // Arrange
        const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
      });

      it("should never sets quality to negative", () => {
        // Arrange
        const gildedRose = new GildedRose([new Item('foo', 10, 0)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0); // Remains 0
      });
    });
});
