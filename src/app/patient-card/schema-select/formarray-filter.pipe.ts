import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: number[]): any {
        if (!items || filter.length == 0) {
            return items;
        }
        return items.filter(item => item.controls.schemaId.value.filter( i => filter.includes(i)).length !== 0);
        
    }
}