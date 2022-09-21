<template>
    <div class="submit-form">
      <h4>Add Course</h4>
      <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            required
            v-model="course.name"
            name="name"
          />
        </div>
        <div class="form-group">
          <label for="courseNumber">Course Number</label>
          <input
            type="text"
            class="form-control"
            id="courseNumber"
            required
            v-model="course.courseNumber"
            name="courseNumber"
            />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="course.description"
            name="description"
          />
        </div>
        <div class="form-group">
          <label for="level">Level</label>
          <input
            type="text"
            class="form-control"
            id="level"
            required
            v-model="course.level"
            name="level"
            />
        </div>
        <div class="form-group">
            <label for="hours">Hours</label>
            <input
            type="text"
            class="form-control"
            id="hours"
            required
            v-model="course.hours"
            name="hours"
            />
        </div>
        <div class="form-group">
          <label for="dept">Department</label>
          <input
            type="text"
            class="form-control"
            id="dept"
            required
            v-model="course.dept"
            name="dept"
            />
        </div>
        <button @click="saveCourse" class="btn btn-success">Submit</button>
      </div>
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newCourse">Add another course</button>
      </div>
    </div>
  </template>
  <script>
  import CourseDataService from "../services/CourseDataService";
  export default {
    name: "add-course",
    data() {
      return {
        course: {
          id: null,
          name: "",
          courseNumber:"",
          description: "",
          level: "",
          hours:"",
          dept: "",
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveCourse() {
        var data = {
          name: this.course.name,
          courseNumber: this.course.courseNumber,
          description: this.course.description,
          level: this.course.level,
          hours: this.course.hours,
          dept: this.course.dept
        };
        CourseDataService.create(data)
          .then(response => {
            this.course.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newCourse() {
        this.submitted = false;
        this.course = {};
      }
    }
  };
  </script>
<style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
</style>