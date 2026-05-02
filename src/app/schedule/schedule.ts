import { Component, computed, inject, signal } from '@angular/core';
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

   // Kör funktion vid inläsning
  ngOnInit() {
    // Inläsning av kurser
    this.loadCourses();
  }

  // Sökfras
  searchQuery = signal<string>("");

  onSearchUpdated(sq: string) {
    this.searchQuery.set(sq);
  }

  // Filtera kurser med sökfras
  filteredCourses = computed(() => {
    const searchTerm = this.searchQuery().toLowerCase();
    let filteredList = this.courseList().filter((course) => 
      course.coursename.toLowerCase().includes(searchTerm) ||
      course.code.toLowerCase().includes(searchTerm));
      return filteredList;
  });

  // Hämta kurser
  async loadCourses() {
    try {
      this.courseList.set(await this.courseService.loadCourses());
    } catch(error) {
      this.error.set("Något gick fel...")
    }
  }
  
  arrow = signal<string>("");

  // Sortera kurskod i bokstavsordning
  sortCourseCode() {
    this.filteredCourses().sort((a, b) => a.code.localeCompare(b.code));
    this.arrow.set("code");
  }

  // Sortera kurskod i bokstavsordning
  sortCourseName() {
    this.filteredCourses().sort((a, b) => a.coursename.localeCompare(b.coursename));
    this.arrow.set("name");
  }

  // Sortera kurskod i bokstavsordning
  sortCourseProgression() {
    this.filteredCourses().sort((a, b) => a.progression.localeCompare(b.progression));
    this.arrow.set("progression");
  }
}

