import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';

@Pipe({
    name: 'dieShortFilter',
    pure: false
})
export class DieShortFilterPipe implements PipeTransform {
    transform(items: Course[], filter: string): any {
        if (!items || filter == null) {
            return items.map(e => e.short).splice(0, 300);
        }
        return items.filter(item => item.short.toLowerCase().includes(filter.toLowerCase())).map(e => e.short).splice(0, 300);
    }
}