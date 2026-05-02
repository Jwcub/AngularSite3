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

  if (this.arrow() === "codeDesc") {
    this.filteredCourses().sort((a, b) => b.code.localeCompare(a.code));
    console.log("Ö-A");
    this.arrow.set("codeAsc");
  } else {
    this.filteredCourses().sort((a, b) => a.code.localeCompare(b.code));
    console.log("A-Ö");
    this.arrow.set("codeDesc");
  }
}

  // Sortera kurskod i bokstavsordning
  sortCourseName() {
    if(this.arrow() === "nameDesc") {
      this.filteredCourses().sort((a, b) => b.coursename.localeCompare(a.coursename));
      this.arrow.set("nameAsc");
      console.log("A-Ö")
    } else {
      this.filteredCourses().sort((a, b) => a.coursename.localeCompare(b.coursename));
      this.arrow.set("nameDesc");
      console.log("Ö-A")
    }
  }

  // Sortera kurskod i bokstavsordning
  sortCourseProgression() {
    if(this.arrow() === "progressionDesc") {
      this.filteredCourses().sort((a, b) => b.progression.localeCompare(a.progression));
      this.arrow.set("progressionAsc");
    } else {
      this.filteredCourses().sort((a, b) => a.progression.localeCompare(b.progression));
      this.arrow.set("progressionDesc");
    }
  }
}

