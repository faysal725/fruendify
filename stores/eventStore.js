import { defineStore } from "pinia";

export const useEventStore = defineStore("eventStore", {
  state: () => ({
    stepNo: 1,
    eventData: {
      title: "",
      short_description: "",
      event_date: "",
      number_of_people: "",
      start_time: "",
      notice_hour: "",
      slot: "",
      user_uid: "",
      interests: "",
      road:"",
      country: "",
      city: "",
      address: "",
      neighbourhood : "",
      lat: "",
      long: "",
      gender: "",
      age_range: "",
      start_age: "",
      end_age: "",
      diet: "",
      language: "",
      education: "",
      carrier: "",
      hobbies: "",
      music: "",
      politic: "",
      relationship_status: "",
      drink: "",
      is_athlete: "",
      smoke: "",
      face_blur: "",
      religion: "",
      category: "",
      status: "",
      evenet_activities: "",
      created_by: "",
    },
  }),
  persist: true,
  actions: {
    saveEventInitials(data) {
      this.eventData.title = data.title;
      this.eventData.short_description = data.short_description;
      this.eventData.number_of_people = data.number_of_people;

      this.stepNo +=1;
    },

    saveEventDates(data) {
      
      this.eventData.event_date = data.event_date;
      this.eventData.start_time = data.start_time;
      this.eventData.notice_hour = data.notice_hour;
      this.eventData.slot = data.slot;

      this.stepNo +=1;
    },


    saveCategory(data) {
      // this.eventData.category = [...data.category];
      this.eventData.category = data.category;

      this.stepNo +=1;
    },

    saveCoords(data) {
      this.eventData.road = data.road;
      this.eventData.country = data.country;
      this.eventData.city = data.city;
      this.eventData.address = data.address;
      this.eventData.neighbourhood = data.neighbourhood;
      this.eventData.lat = data.lat;
      this.eventData.long = data.long;

      this.stepNo +=1;
    },


    saveChoices(data) {
      console.log(data)
      this.eventData.gender = data.gender;


      function convertAgeRangeToObject(str) {
        const parts = str.split("-");
      
        if (parts.length !== 2) {
          throw new Error("Invalid string format. Expected 'start-end'");
        }
      
        const startAge = parseInt(parts[0], 10);
        const endAge = parseInt(parts[1], 10);
      
        if (isNaN(startAge) || isNaN(endAge)) {
          throw new Error("Invalid age values. Must be numbers.");
        }
      
        return {
          start_age: startAge,
          end_age: endAge,
        };
      }

      this.eventData.start_age = convertAgeRangeToObject(data.age_range).start_age;
      this.eventData.end_age = convertAgeRangeToObject(data.age_range).end_age;

      // this.eventData.diet = data.diet;
      this.eventData.language = data.language;
      this.eventData.education = data.education;
      this.eventData.carrier = data.carrier;


      this.stepNo +=1;
    },

    savePreferences(data) {
      console.log(data)
      this.eventData.interests = data.interests;
      this.eventData.music = data.music;


      this.stepNo +=1;
    },

    saveInsights(data) {
      console.log(data.is_athlete)
      this.eventData.politic = data.politic;
      this.eventData.relationship_status = data.relationship_status;
      this.eventData.drink = data.drink;
      this.eventData.is_athlete = data.is_athlete;
      this.eventData.smoke = data.smoke;



      this.stepNo +=1;
    },


    stepUp() {
      this.stepNo++;
    },
    stepDown() {
      this.stepNo--;
    },
    setStep(number) {
      console.log(number);
      this.stepNo = number;
    },

    clearEventData() {
      this.stepNo = 1;
      this.eventData.title = "";
      this.eventData.short_description = "";
      this.eventData.notice_hour = "";
      this.eventData.event_date = "";
      this.eventData.interest = "";
      this.eventData.address = "";
      this.eventData.lat = "";
      this.eventData.long = "";
      this.eventData.gender = "";
      this.eventData.start_age = "";
      this.eventData.end_age = "";
      this.eventData.diet = "";
      this.eventData.language = "";
      this.eventData.education = "";
      this.eventData.carrier = "";

      this.eventData.hobbies = "";
      this.eventData.politic = "";
      this.eventData.thumbnail = "";
      this.eventData.evenet_activities = "";
    },
  },
});
