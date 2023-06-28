import { Pipe, PipeTransform } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';

@Pipe({
    name: 'dieLongFilter',
    pure: false
})
export class DieLongFilterPipe implements PipeTransform {
    transform(items: Course[], filter: string): any {
        if (!items || filter == null) {
            return items.map(e => e.short).splice(0, 300);
        }
        return items.filter(item => item.long.toLowerCase().includes(filter.toLowerCase())).map(e => e.long).splice(0, 300);
    }
}