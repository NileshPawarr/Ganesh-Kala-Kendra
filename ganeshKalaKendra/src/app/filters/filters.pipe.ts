import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'nameFilter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return (it.name.toLowerCase() === searchText);
        });
    }
}

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.products.find(product => {
                return (product.toLowerCase() === searchText);
            });
        });
    }
}

@Pipe({
    name: 'monthFilter'
})
export class MonthFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.month !== undefined) {
                return (it.month.toLowerCase() === searchText);
            } else {
                return false;
            }
        });
    }
}

@Pipe({
    name: 'yearFilter'
})
export class YearFilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) { return items; }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            if (it.year !== undefined) {
                return (it.year.toLowerCase() === searchText);
            } else {
                return false;
            }
        });
    }
}
