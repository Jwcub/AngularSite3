import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CourseInterface } from '../models/course.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    url: string = "https://webbutveckling.miun.se/files/ramschema.json";

    http = inject(HttpClient);

    // Ladda in kurser
    async loadCourses() : Promise<CourseInterface[]> {
        const courses = this.http.get<CourseInterface[]>(this.url);

        return await firstValueFrom(courses);
    }

}
