import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.interface';

@Component({
  selector: 'app-schedule',
  imports: [],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  courseList = signal<Course[]>([]);
  error = signal<string | null>(null);

  courseService = inject(CourseService);

  async loadCourses() {
    try {
      this.courseList.set(await this.courseService.loadCourses());

    } catch(error) {
      this.error.set("Något gick fel...")
    }
  }

}
