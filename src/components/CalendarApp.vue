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
        </div>
        <v-row>
        <v-col>
            <v-sheet height="400">
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
    import SessionDataService from "../services/SessionDataService";
    export default {
      data: () => ({
        today: '2019-01-08', // placeholder date
        calEnd: "2022-10-30", // placeholder date
        sessionOne: '2019-01-08', // placeholder session date
        sessionTwo: '2019-07-09', // placeholder session date
        displayedSession: "First Session",
        sections: [],
        selectedEvent: {},
        selectedOpen: false,
        events: [ // example events 
          {
            name: 'Weekly Meeting',
            start: '2019-01-07 9:00', 
            // start: {
            //   date: '2019-01-07',
            //   time: '09:00',
            // },
            end: '2019-01-07 10:00',

          },
          {
            name: `Thomas' Birthday`,
            start: '2019-01-10',
          },
          {
            name: 'Mash Potatoes',
            start: '2019-01-09 12:30',
            end: '2019-01-09 15:30',
          },
          {
            name: "Second Weekly Meeting",
            start: "2019-07-10 12:30",
            end: "2019-07-10 15:00"
          },
          {
            name: "Some other event",
            start: "2019-07-07 12:30",
            end: "2019-07-07 15:00"
          }
        ],
      }),
      mounted () {
        this.$refs.calendar.scrollToTime('08:00')
      },
      methods: {
        getSections() {
          SessionDataService.getAll()
            .then(response => {
              this.sections = response.data;
              // Change this for the filter
              // this.filteredCourses = this.courses
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        },
        createCalEvents() {
          this.sections.forEach(this.createCalEvent);
        },
        createCalEvent(event) {
          this.events.push({
            name: event.name
          });
        },
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

<style scoped>
    .my-event {
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
    }
</style>