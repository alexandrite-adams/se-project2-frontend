<template>
    <div>
        <div> 
          <form>
            <label>Select Session: </label>
            <select @change="changeDisplayedSession">
              <option selected value="First Session">First Session</option>
              <option value="Second Session">Second Session</option>
            </select>
          </form>
          <p>{{today}}</p>  
        </div>
        <v-row>
        <v-col>
            <v-sheet height="650">
            <v-calendar
                ref="calendar"
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="week"
                min-weeks="5"
                :end="calEnd"
                @click:event="showEvent"
            ></v-calendar>
            </v-sheet>
        </v-col>
        </v-row>
    </div>
</template>

<script>
    import SectionDataService from "../services/SectionDataService";
    import SectionTimeDataService from "../services/SectionTimeDataService";
    import CourseDataService from "../services/CourseDataService";
    import moment from 'moment';
    export default {
      data: () => ({
        // today: '2023-01-08', // placeholder same as first session
        today: '2023-01-15',
        calEnd: "2023-04-27", // ending date of the last session
        sessionOne: '2023-01-08', // placeholder first session start
        sessionTwo: '2023-03-06', // placeholder second session start
        displayedSession: "First Session",
        sections: [],
        sectionTimes: [],
        courses: [],
        selectedEvent: {},
        selectedOpen: false,
        events: [],
      }),
      mounted () {
        this.$refs.calendar.scrollToTime('08:00')
      },
      async beforeMount() {
        await this.getSections();
        // console.log(this.events)
      },
      methods: {
        async getSections() {
          await SectionDataService.getAll()
            .then(async response => {
              this.sections = response.data;
              await this.getSectionTimes(); // grab sectionTimes
              await this.getCourses();
              // map sectionTimes to sections
              this.sections.forEach(this.createEvent)
              

              // Change this for the filter
              // this.filteredCourses = this.courses
              
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getSectionTimes() {
          await SectionTimeDataService.getAll()
            .then(response => {
              this.sectionTimes = response.data;
              // Change this for the filter
              // this.filteredCourses = this.courses
            })
            .catch(e => {
              console.log(e);
            });
        },
        async getCourses() {
          await CourseDataService.getAll()
            .then(response => {
              this.courses = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        },
        // Map sectionTimes to sections and add a new event.
        // If the section is a full semester, 2 events will
        // be created, one for each section time.
        createEvent(section) {
          
          this.sectionTimes.forEach( sectionTime => {
            if (section.id == sectionTime.sectionId) 
            {
              // find the course name
              // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
              let relevantCourse = this.courses.find( course => course.id == section.courseId);
              let name = relevantCourse.name;

              // used for temporary filtering
              // let courseNumber = relevantCourse.number;
              
              let formatString = 'YYYY-MM-DD';

              let activeWeekdays = [];
              // load up which weekdays have classes for this section
              if (sectionTime.sunday == 1)
                activeWeekdays[0] = 1;
              if (sectionTime.monday == 1)
                activeWeekdays[1] = 1;
              if (sectionTime.tuesday == 1)
                activeWeekdays[2] = 1;
              if (sectionTime.wednesday == 1)
                activeWeekdays[3] = 1;
              if (sectionTime.thursday == 1)
                activeWeekdays[4] = 1;
              if (sectionTime.friday == 1)
                activeWeekdays[5] = 1;
              if (sectionTime.saturday == 1)
                activeWeekdays[6] = 1;
              
              // the date for the start of the week

              // if their data hasn't passed, then include courses in both first and second term
              let currentDay = moment(sectionTime.startDate);
              currentDay.add(1, 'weeks').isoWeekday(1);
              for (let i = 0; i < activeWeekdays.length; i++){
                let readableCurrentDay = currentDay.isoWeekday(i).format(formatString);
                console.log(readableCurrentDay);
                if (activeWeekdays[i] == 1){
                  let tempEvent = {
                    name: name,
                    // figure out how to do multiple week days
                    // find a function to get the next X weekday from a date.
                    // have a loop to iterate through the weekdays in sectionTime and make 
                    // and event for each one that is valid
                    start: readableCurrentDay + " " + sectionTime.startTime,
                    end: readableCurrentDay + " " + sectionTime.endTime
                  }
                  
                  // temporary filtering
                  // if (courseNumber.includes("NURS"))
                  this.events.push(tempEvent);
                }
                currentDay.add(1, 'days');//.isoWeekday(i).format(formatString);
              }



              // let isoDate = '';
              

              // //create events for each specified week date
              // if (sectionTime.sunday == 1) {
              //   let startWkDay = moment(sectionTime.startDate).weekday();
              //   if (startWkDay <= 1) { 
              //     // then just give me this week's instance of that day
              //     isoDate = moment(sectionTime.startDate).isoWeekday(startWkDay).format(formatString);
              //   } else {
              //     // otherwise, give me *next week's* instance of that same day
              //     isoDate = moment(sectionTime.startDate).add(1, 'weeks').isoWeekday(startWkDay).format(formatString);
              //   }

              //   // create the event object and add it to the list
              //   let tempEvent = {
              //     name: name,
              //     // figure out how to do multiple week days
              //     // find a function to get the next X weekday from a date.
              //     // have a loop to iterate through the weekdays in sectionTime and make 
              //     // and event for each one that is valid
              //     start: isoDate + " " + sectionTime.startTime,
              //     end: isoDate + " " + sectionTime.endTime
              //   }
              //   this.events.push(tempEvent);
              // }

              // if (sectionTime.monday == 1) {
              //   let startWkDay = moment(sectionTime.startDate).weekday();

              //   if (startWkDay <= 1) { // 2 is the number for Monday (hopefully) 
              //     // then just give me this week's instance of that day
              //     isoDate = moment(sectionTime.startDate).isoWeekday(startWkDay).format(formatString);
              //   } else {
              //     // otherwise, give me *next week's* instance of that same day
              //     isoDate = moment(sectionTime.startDate).add(1, 'weeks').isoWeekday(startWkDay).format(formatString);
              //   }

              //   // create the event object and add it to the list
              //   let tempEvent = {
              //     name: name,
              //     // figure out how to do multiple week days
              //     // find a function to get the next X weekday from a date.
              //     // have a loop to iterate through the weekdays in sectionTime and make 
              //     // and event for each one that is valid
              //     start: isoDate + " " + sectionTime.startTime,
              //     end: isoDate + " " + sectionTime.endTime
              //   }
              //   this.events.push(tempEvent);
              // }

              // if (sectionTime.tuesday == 1) {
              //   let startWkDay = moment(sectionTime.startDate).weekday();
                
              //   if (startWkDay <= 3) { // 2 is the number for Monday (hopefully) 
              //     // then just give me this week's instance of that day
              //     isoDate = moment(sectionTime.startDate).isoWeekday(startWkDay).format(formatString);
              //     console.log(isoDate);
              //   } else {
              //     // otherwise, give me *next week's* instance of that same day
              //     isoDate = moment(sectionTime.startDate).add(1, 'weeks').isoWeekday(startWkDay).format(formatString);
              //   }

              //   // create the event object and add it to the list
              //   let tempEvent = {
              //     name: name,
              //     // figure out how to do multiple week days
              //     // find a function to get the next X weekday from a date.
              //     // have a loop to iterate through the weekdays in sectionTime and make 
              //     // and event for each one that is valid
              //     start: isoDate + " " + sectionTime.startTime,
              //     end: isoDate + " " + sectionTime.endTime
              //   }
              //   this.events.push(tempEvent);
              // }

              // // create the event object and add it to the list
              // let tempEvent = {
              //   name: name,
              //   // figure out how to do multiple week days
              //   // find a function to get the next X weekday from a date.
              //   // have a loop to iterate through the weekdays in sectionTime and make 
              //   // and event for each one that is valid
              //   start: sectionTime.startDate + " " + sectionTime.startTime,
              //   end: sectionTime.startDate + " " + sectionTime.endTime
              // }
              // console.log(tempEvent);
              // this.events.push(tempEvent);

              // add a test to see if the section is in both first and second session
              // add another event if it is, but with the end date
              // if (sectionTime.)
          }
        });
          // for (let i = 0; i < this.sectionTimes.length; i++){
          //   if (section.id == this.sectionTimes[i].sectionId)
          //   {
          //     // find the course name

          //     // suggest that the sections controller has a function to grab sections, include their courses and include their sectionTimes
          //     let relevantCourse = this.courses.find( course => course.id == section.courseId);
          //     let name = relevantCourse.name;
          //     // console.log(name)

          //     // create the event object and add it to the list
          //     let sectionTime = this.sectionTimes[i];
          //     let tempEvent = {
          //       name: name,
          //       // figure out how to do multiple week days
          //       start: sectionTime.startDate + " " + sectionTime.startTime,
          //       end: sectionTime.startDate + " " + sectionTime.endTime
          //     }
          //     // console.log(tempEvent);
          //     this.events.push(tempEvent);

          //     // add a test to see if the section is in both first and second session
          //     // add another event if it is, but with the end date
          //     // if (sectionTime.)
          //   }  
          // }
        },
        // createCalEvents() {
        //   this.sections.forEach(this.createCalEvent);
        // },
        // createCalEvent(event) {
        //   this.events.push({
        //     name: event.name
        //   });
        // },
        changeDisplayedSession() {
          if (this.displayedSession == "First Session"){
            this.today = this.sessionTwo;
            this.displayedSession = "Second Session";
          }
          else{
            this.today = this.sessionOne;
            this.displayedSession = "First Session";
          }
        },
        showEvent (event) {
          console.log(event.date);
        },
      }
    }
</script>

<!-- <style scoped>
    /* .my-event {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-radius: 2px;
      background-color: #1867c0;
      color: #ffffff;
      border: 1px solid #1867c0;
      font-size: 12px;
      padding: 3px;
      cursor: pointer;
      margin-bottom: 1px;
      left: 4px;
      margin-right: 8px;
      position: relative;
    }
    
    .my-event.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    } */
</style> -->