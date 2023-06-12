import { ItemFactory } from '../../app/helpers/ItemFactory';
import { AgedBrieItem, BackstagePassItem, SulfurasItem, ConjuredItem, BaseItem } from '../../app/models/index';

describe('ItemFactory', () => {
    it('should create an Aged Brie item', () => {
        // Act
        const item = ItemFactory.createItem('Aged Brie', 2, 0);

        // Assert
        expect(item).toBeInstanceOf(AgedBrieItem);
    });

    it('should create a Sulfuras item', () => {
        // Act
        const item = ItemFactory.createItem('Sulfuras, Hand of Ragnaros', 0, 80);
        
        // Assert
        expect(item).toBeInstanceOf(SulfurasItem);
    });

    it('should create a Backstage Pass item', () => {
        // Act
        const item = ItemFactory.createItem('Backstage passes to a TAFKAL80ETC concert', 15, 20);
        
        // Assert
        expect(item).toBeInstanceOf(BackstagePassItem);
    });

    it('should create a Conjured item', () => {
        // Act
        const item = ItemFactory.createItem('Conjured Mana Cake', 3, 6);
        
        // Assert
        expect(item).toBeInstanceOf(ConjuredItem);
    });

    it('should create a BaseItem for unrecognized item names', () => {
        // Act
        const item = ItemFactory.createItem('Some Unrecognized Item', 5, 10);
        
        // Assert
        expect(item).toBeInstanceOf(BaseItem);
    });
});
