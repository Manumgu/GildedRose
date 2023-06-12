import { GildedRose } from '@/gilded-rose';
import { ItemFactory } from "@/helpers/ItemFactory";

describe("GildedRose", () => {
    it("creates a new item correctly", () => {
        // Arrange
        const itemName = 'foo';
        const sellIn = 10;
        const quality = 20;

        // Act
        const item = ItemFactory.createItem(itemName, sellIn, quality);

        // Assert
        expect(item.name).toBe(itemName);
        expect(item.sellIn).toBe(sellIn);
        expect(item.quality).toBe(quality);
    });

    describe("updateQuality", () => {
        it("should degrades normal items by 1 if sellIn > 0", () => {
            // Arrange
            const gildedRose = new GildedRose([ItemFactory.createItem('foo', 10, 20)]);

            // Act
            const items = gildedRose.updateQuality();

            // Assert
            expect(items[0].sellIn).toBe(9);
            expect(items[0].quality).toBe(19);
        });

        it("should degrade normal items quality twice as fast after sell by date", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('foo', 0, 10)]);
  
          // Act
          const items = gildedRose.updateQuality();
  
          // Assert
          expect(items[0].sellIn).toBe(-1);
          expect(items[0].quality).toBe(8); // Decreased by 2
        });

        it("should increases quality of Aged Brie by 1", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('Aged Brie', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(21);
        });

        it("should not increase quality of any item above 50", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('Aged Brie', 10, 50)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(50); // Remains 50
        });

        it("should not decrease quality or sellin of sulfuras item and has fixed quality and sellIn", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('Sulfuras, Hand of Ragnaros', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(0); // sellIn does not decrease
          expect(items[0].quality).toBe(80); // quality does not decrease
        });

        it("should increases quality by 1 for backstage passes with sellIn 11 or more", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(14);
          expect(items[0].quality).toBe(21);
        });

        it("should increases quality by 2 for backstage passes with sellIn 10 or less", () => {
          // Arrange
          const gildedRose = new GildedRose([ItemFactory.createItem('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);

          // Act
          const items = gildedRose.updateQuality();

          // Assert
          expect(items[0].sellIn).toBe(9);
          expect(items[0].quality).toBe(22);
      });

      it("should increases quality by 3 for backstage passes with sellIn 5 or less", () => {
        // Arrange
        const gildedRose = new GildedRose([ItemFactory.createItem('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(4);
        expect(items[0].quality).toBe(23);
      });

      it("should sets quality to 0 for backstage passes after the concert", () => {
        // Arrange
        const gildedRose = new GildedRose([ItemFactory.createItem('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(-1);
        expect(items[0].quality).toBe(0);
      });

      it("should never sets quality to negative", () => {
        // Arrange
        const gildedRose = new GildedRose([ItemFactory.createItem('foo', 10, 0)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0); // Remains 0
      });

      it("should degrade conjured items twice as fast", () => {
        // Arrange
        const gildedRose = new GildedRose([ItemFactory.createItem('Conjured Mana Cake', 10, 20)]);

        // Act
        const items = gildedRose.updateQuality();

        // Assert
        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(18); // Decreased by 2
    });
    });
});
