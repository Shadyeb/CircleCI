<template>
  <v-app id="app">
    <div class="body">
       <vue-particles
        class="particles"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="200"
        shapeType="circle"
        :particleSize="6"
        linesColor="#dedede"
        :linesWidth="0"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
      <v-container :fluid="$vuetify.breakpoint.smAndDown">
        <v-img src='./assets/logo.png' width="50%" class="mx-auto mb-5"></v-img>
        <v-card color="white" tile elevation="0" width="100%" class="mx-0">
          <v-row justify="center">
            <v-col cols="12">
              <v-card color="secondary" min-width="300" width="50%" class="text-center mx-auto pt-5">
                <v-icon color="white" x-large>mdi-cash-multiple</v-icon>
                <v-card-title class="white--text"><span class="text-center mx-auto">Currency Conversion</span></v-card-title>
                <v-card-text class="white--text">Converse any currency to any other simplay. Fast and up to date.</v-card-text>
                <v-card-actions>
                  <v-btn @click="dialog = true; type='currency'" rounded color="white" elevation="0" class="mb-5 mx-auto"><span class="primary--text">TRY NOW</span></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card style="background: linear-gradient(0deg, rgba(195,55,100,1) 0%, rgba(29,38,113,1) 100%);" min-width="300" width="50%" class="text-center mx-auto pt-5">
                <v-icon color="white" x-large>mdi-clock-time-nine-outline</v-icon>
                <v-card-title class="white--text"><span class="text-center mx-auto">Time Conversion</span></v-card-title>
                <v-card-text class="white--text">Get the current time at any timezone simplay. Fast and up to date.</v-card-text>
                <v-card-actions>
                  <v-btn @click="dialog = true; type='time'; originIntervalTime();" rounded color="white" elevation="0" class="mb-5 mx-auto"><span class="primary--text">TRY NOW</span></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card color="primary" min-width="300" width="50%" class="text-center mx-auto pt-5">
                <v-icon color="white" x-large>mdi-weather-cloudy</v-icon>
                <v-card-title class="white--text"><span class="text-center mx-auto">Current Weather</span></v-card-title>
                <v-card-text class="white--text">Get the current weather at your city and predicted forcasts, instantly.</v-card-text>
                <v-card-actions>
                  <v-btn @click="dialog = true; type='weather'" rounded color="white" elevation="0" class="mb-5 mx-auto"><span class="primary--text">TRY NOW</span></v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <div class="text-center my-5">
          <v-btn class="mr-5" icon><a href="https://www.facebook.com/ahmed.khatab.520125" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-facebook</v-icon></a></v-btn>
          <v-btn class="mr-5" icon><a href="https://www.instagram.com/khatab396/?hl=en" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-instagram</v-icon></a></v-btn>
          <v-btn class="mr-5" icon><a href="https://www.linkedin.com/in/ahmed-khatab-843141135/" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-linkedin</v-icon></a></v-btn>
        </div>
      </v-container>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-snackbar v-model="snackbar" :color="color" :timeout="5000" top>
          {{text}}
          <v-spacer></v-spacer>
          <v-btn @click="snackbar = false" icon color="white">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>
        <v-card color="white darken--1">
           <v-card-text v-if="type==='currency'" style="background: linear-gradient(0deg, #FC354C 0%, #0ABFBC 100%); min-height: 100vh;">
            <div style="display: flex">
              <v-btn icon dark @click="dialog = false;">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-img src='./assets/logo.png' class="ml-5" max-width="230"></v-img>
            </div>
            <v-form ref="currencyForm" v-model="currencyValidForm">
              <v-container class="mt-5">
                <v-row class="mt-5">
                  <v-col cols="12" sm="5" class="mt-5">
                    <currencyAutocomplete type="origin" @currencyReady="submitCurrency"></currencyAutocomplete>
                  </v-col>
                  <v-col cols="1" sm="2" class="d-none d-sm-flex">
                    <v-icon color="white" x-large class="mx-auto">mdi-swap-horizontal</v-icon>
                  </v-col>
                  <v-col cols="12" sm="5" :class="$vuetify.breakpoint.smAndUp ? 'mt-5' : ''">
                    <currencyAutocomplete type="destin" @currencyReady="submitCurrency"></currencyAutocomplete>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-text-field
                    placeholder="Mouny amount"
                    solo
                    rounded
                    prepend-inner-icon="mdi-cash-multiple"
                    height="60px"
                    elevation="5"
                    v-model="moneyAmount"
                    type="number"
                    min="1"
                    step="0.5"
                    :rules=" [v => !!v || 'Item is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2"  class="d-none d-sm-flex"></v-col>
                  <v-col cols="12" sm="5">
                    <v-btn
                    :disabled="!currencyValidForm"
                    :loading="currencyButtonLoader"
                    rounded
                    block
                    height="60px"
                    color="secondary"
                    @click="getCurrency"
                    >
                      Convert Currency
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <div v-if="moneyConverted">
              <v-divider background-color="primary" class="mt-5"></v-divider>
              <p class="display-1 sont-weight-bold text-center mt-5 white--text"><span class="font-weight-black white--text">{{moneyAmountStatic}}</span> {{currencyFrom}} will give you <span class="font-weight-black white--text">{{moneyEquivelent.toFixed(2)}}</span> {{currencyTo}}</p>
            </div>
            <div class="text-center my-5">
              <v-btn class="mr-5" icon><a href="https://www.facebook.com/ahmed.khatab.520125" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-facebook</v-icon></a></v-btn>
              <v-btn class="mr-5" icon><a href="https://www.instagram.com/khatab396/?hl=en" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-instagram</v-icon></a></v-btn>
              <v-btn class="mr-5" icon><a href="https://www.linkedin.com/in/ahmed-khatab-843141135/" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-linkedin</v-icon></a></v-btn>
            </div>
          </v-card-text>
          <v-card-text v-if="type==='time'" style="background: linear-gradient(0deg, #DE6262 0%, #FFB88C 100%); min-height: 100vh;">
            <div style="display: flex">
              <v-btn icon dark @click="dialog = false; clearInterval(originTimerID); clearInterval(distinTimerID);">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-img src='./assets/logo.png' class="ml-5" max-width="230"></v-img>
            </div>
            <v-container class="mt-5">
              <v-row align="center" style="min-height: 80vh;">
                <v-col cols="12">
                  <v-row justify="center">
                    <div class="ml-5">
                      <h4 class="body-1 font-weight-thin text-center white--text">{{ currentDate }}</h4>
                      <h2 class="display-3 font-weight-thin text-center white--text">{{ currentTime }}</h2>
                    </div>
                    <v-col cols="12" sm="1" class="text-center">
                      <v-icon x-large class="mx-auto my-5" v-if="timeReady && $vuetify.breakpoint.smAndUp" color="white">mdi-swap-horizontal</v-icon>
                      <v-icon x-large class="mx-auto my-5" v-if="timeReady && $vuetify.breakpoint.xs" color="white">mdi-swap-vertical</v-icon>
                    </v-col>
                    <div v-if="timeReady" class="white--text">
                      <h4 class="body-1 font-weight-thin text-center white--text">{{ distinDate }}</h4>
                      <h2 class="display-3 font-weight-thin text-center white--text">{{ distinTime }}</h2>
                    </div>
                  </v-row>
                </v-col>
                <v-row class="mt-5" justify="space-around">
                  <v-col cols="12" sm="4" class="mt-5">
                    <timeAutocomplete @zoneReady="submitZone"></timeAutocomplete>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-btn
                    :disabled="toTime === ''"
                    :loading="timeButtonLoader"
                    rounded
                    block
                    height="60px"
                    color="secondary"
                    class="mt-5"
                    @click="distinIntervalTime()"
                    >
                      Convert Time
                    </v-btn>
                  </v-col>
                </v-row>
                <v-col cols="12">
                  <div class="text-center my-5 px-auto">
                    <v-btn class="mr-5" icon><a href="https://www.facebook.com/ahmed.khatab.520125" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-facebook</v-icon></a></v-btn>
                    <v-btn class="mr-5" icon><a href="https://www.instagram.com/khatab396/?hl=en" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-instagram</v-icon></a></v-btn>
                    <v-btn class="mr-5" icon><a href="https://www.linkedin.com/in/ahmed-khatab-843141135/" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-linkedin</v-icon></a></v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-text style="background: linear-gradient(0deg, rgb(126, 159, 218) 0%, #2a5298 100%);" v-if="type === 'weather'">
            <div style="display: flex">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-img src='./assets/logo.png' class="ml-5" max-width="230"></v-img>
            </div>
            <div class="text-center white--text">
              <!-- <img :src="getWeatherIcon(weather.current.weather)"> -->
              <h2 class="display-1 font-weight-thin mt-5">{{weather.current.temp}}<sup>&deg;</sup>C</h2>
              {{weather.current.weather[0].main}}
              <h2 class="body-1"><v-icon color="white">mdi-map-marker</v-icon>{{city}}</h2>
              <v-subheader class="white--text"><span class="mx-auto">{{formatDate(weather.current.dt * 1000)}}</span></v-subheader>
            </div>
            <v-divider dark class="my-5"></v-divider>
            <div>
              <v-slide-group dark multiple show-arrows>
                <v-slide-item
                  v-for="hour in weather.hourly"
                  :key="hour.dt"
                >
                  <v-chip
                  class="ma-2"
                  color="white"
                  outlined
                  >
                    {{formatTime(hour.dt * 1000)}}
                    <!-- <img width="50" :src="getWeatherIcon(hour.weather[0])"> -->
                    <v-icon :color="getWeatherIcon(hour.weather[0]).color" class="mx-2">{{getWeatherIcon(hour.weather[0]).icon}}</v-icon>
                    <span>{{hour.temp}}<sup>&deg;</sup>C</span>
                  </v-chip>
                </v-slide-item>
              </v-slide-group>
            </div>
            <v-divider dark class="my-5"></v-divider>
            <div v-for="day in weather.daily" :key="day.dt" class="white--text">
              <v-row justify="space-between">
                <p class="body-1 white--text">{{formatDate(day.dt * 1000).substring(0, 11)}}</p>
                <!-- <img width="50" :src="getWeatherIcon(day.weather[0])">{{day.weather[0].main}} -->
                <div>
                  <v-icon :color="getWeatherIcon(day.weather[0]).color">{{getWeatherIcon(day.weather[0]).icon}}</v-icon>
                </div>
                <p class="body-1 white--text">{{Math.floor(day.temp.max)}}/{{Math.floor(day.temp.min)}}<sup>&deg;</sup>C</p>
              </v-row>
              <v-divider dark class="my-5"></v-divider>
            </div>
            <div class="white--text">
              <v-row justify="space-between" class="px-5">
                <v-progress-circular
                :size="120"
                :width="5"
                color="white"
                :value="weather.current.humidity"
                >
                  {{ weather.current.humidity }}%
                  humidity
                </v-progress-circular>
                <v-progress-circular
                :size="120"
                :width="5"
                color="white"
                :value="weather.current.clouds"
                >
                  {{ weather.current.clouds }}%
                  clouds
                </v-progress-circular>
                <div class="pt-5">
                  <p class="body-2">FEELS LIKE: {{weather.current.feels_like}}<sup>&deg;</sup>C</p>
                  <p class="body-2">UV INDEX: {{weather.current.uvi}}</p>
                </div>
              </v-row>
            </div>
            <v-divider dark class="my-5"></v-divider>
            <div class="white--text">
              <v-row justify="space-between">
                <div>
                  <v-icon color="white" x-large>mdi-wind-turbine</v-icon>
                  <span class="body-2">WIND SPEED {{weather.current.wind_speed}}m/s</span>
                </div>
                <div>
                  <v-icon color="white" large>mdi-wind-turbine</v-icon>
                  <span class="body-2">WIND DEG {{weather.current.wind_deg}}<sup>&deg;</sup></span>
                </div>
              </v-row>
            </div>
            <v-divider dark class="my-5"></v-divider>
            <div class="white--text">
              <v-row justify="space-between">
                <div>
                  <v-icon color="yellow" class="ml-5" x-large>mdi-weather-sunset-up</v-icon>
                  <p class="body-1">sunrise {{formatDate(weather.current.sunrise * 1000).substring(20, 24)}}</p>
                </div>
                <div>
                  <v-icon color="orange" class="ml-5" x-large>mdi-weather-sunset-down</v-icon>
                  <p class="body-1 mr-5">sunset {{formatDate(weather.current.sunset * 1000).substring(20, 24)}}</p>
                </div>
              </v-row>
            </div>
            <div class="text-center my-5">
              <v-btn class="mr-5" icon><a href="https://www.facebook.com/ahmed.khatab.520125" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-facebook</v-icon></a></v-btn>
              <v-btn class="mr-5" icon><a href="https://www.instagram.com/khatab396/?hl=en" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-instagram</v-icon></a></v-btn>
              <v-btn class="mr-5" icon><a href="https://www.linkedin.com/in/ahmed-khatab-843141135/" target="_blank" style="text-decoration: none;"><v-icon color="white" x-large>mdi-linkedin</v-icon></a></v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import { currencies, zones } from './lists'
import currencyAutocomplete from './components/currenciesAutocomplete.vue'
import timeAutocomplete from './components/timezonesAutocomplte.vue'

export default {
  name: 'App',
  components: {
    currencyAutocomplete,
    timeAutocomplete
  },
  data () {
    return {
      dialog: false,
      type: '',
      snackbar: false,
      color: '',
      text: '',
      currencyValidForm: false,
      currencyButtonLoader: false,
      timeButtonLoader: false,
      timeValidForm: false,
      dateMenu: false,
      timeMenu: false,
      currencyFrom: '',
      timeForm: '',
      currencyTo: '',
      moneyAmount: '',
      moneyAmountStatic: '',
      moneyEquivelent: '',
      moneyConverted: false,
      currencies: currencies,
      zones: zones,
      toTime: '',
      currentTime: '',
      distinTime: '',
      currentDate: '',
      distinDate: '',
      convertedTime: {},
      distinTimerID: null,
      originTimerID: null,
      timeReady: false,
      location: {
        lat: '',
        lng: ''
      },
      city: '',
      weather: {}
    }
  },
  watch: {
    dateMenu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.dateMenu.save(date)
    },
    formatDate (date) {
      const dateUnformatted = new Date(date)
      const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const day = dateUnformatted.getDate()
      return `${weekdays[dateUnformatted.getDay()]}, ${months[dateUnformatted.getMonth()]} ${day}, ${dateUnformatted.getFullYear()} at ${dateUnformatted.toLocaleString().substring(10, 18)}`
      // return dateUnformatted.substring(0, 15)
    },
    formatTime (date) {
      const dateUnformatted = new Date(date)
      const time = `${dateUnformatted.getHours() > 10 ? '' : '0'}${dateUnformatted.getHours()}:${dateUnformatted.getMinutes() > 10 ? '' : '0'}${dateUnformatted.getMinutes()}`
      return time
    },
    getWeatherIcon (weather) {
      let icon
      switch (weather.main) {
        case 'Thunderstorm':
          icon = { icon: 'mdi-weather-lightning', color: 'yellow ' }
          break
        case 'Drizzle':
          icon = { icon: 'mdi-weather-rainy', color: 'white' }
          break
        case 'Rain':
          icon = { icon: 'mdi-weather-pouring', color: 'light-blue lighten-4' }
          break
        case 'Snow':
          icon = { icon: 'mdi-snowflake', color: 'white' }
          break
        case 'Atmosphere':
          icon = { icon: 'mdi-weather-fog', color: 'grey' }
          break
        case 'Clear':
          icon = { icon: 'mdi-white-balance-sunny', color: 'yellow' }
          break
        case 'Clouds':
          icon = { icon: 'mdi-weather-partly-cloudy', color: 'white' }
          break
        default:
          icon = { icon: 'mdi-white-balance-sunny', color: 'warning' }
          break
      }
      return icon
    },
    submitCurrency (val, type) {
      if (type === 'origin') this.currencyFrom = val.code
      else this.currencyTo = val.code
    },
    submitZone (val) {
      this.toTime = val.zoneName
    },
    getCurrency () {
      this.$refs.currencyForm.validate()
      if (this.currencyValidForm) {
        this.currencyButtonLoader = true
        this.$http.get(`https://free.currconv.com/api/v7/convert?q=${this.currencyFrom}_${this.currencyTo}&compact=ultra&apiKey=27a6efd04977450d0cb4`).then(res => {
          this.currencyButtonLoader = false
          if (res.status === 200) {
            this.moneyEquivelent = Object.values(res.body)[0] * this.moneyAmount
            this.moneyAmountStatic = this.moneyAmount
            this.moneyConverted = true
          } else {
            this.currencyButtonLoader = false
            this.snackbar = true
            this.color = 'error'
            this.text = 'Something went wrong, please try again in a few minutes!'
          }
        }, (response) => {
          this.timeButtonLoader = false
          this.snackbar = true
          this.color = 'error'
          this.text = 'Something went wrong, please try again in a few minutes!'
        })
      } else {
        this.snackbar = true
        this.color = 'warning'
        this.text = 'Please fill all fields!'
      }
    },
    distinIntervalTime () {
      this.distinTimerID = setInterval(this.getTime('distin'), 60000)
    },
    originIntervalTime () {
      this.originTimerID = setInterval(this.getTime('origin'), 60000)
    },
    getTime (rigion) {
      let term
      if (rigion === 'distin') term = `http://worldtimeapi.org/api/timezone/${this.toTime}`
      else term = 'http://worldtimeapi.org/api/ip'
      if (rigion === 'distin') this.timeButtonLoader = true
      this.$http.get(term).then(res => {
        this.timeButtonLoader = false
        if (res.status === 200) {
          this.convertedTime = res.body.datetime
          this.updateTime(this.convertedTime, rigion)
          if (rigion === 'distin') this.timeReady = true
        } else {
          this.timeButtonLoader = false
          this.snackbar = true
          this.color = 'error'
          this.text = 'Something went wrong, please try again in a few minutes!'
        }
      }, (response) => {
        this.timeButtonLoader = false
        this.snackbar = true
        this.color = 'error'
        this.text = 'Something went wrong, please try again in a few minutes!'
      })
    },
    updateTime (date, rigion) {
      if (rigion === 'distin') {
        this.distinTime = date.substring(11, 16)
        this.distinDate = date.substring(0, 10)
      } else {
        this.currentTime = date.substring(11, 16)
        this.currentDate = date.substring(0, 10)
      }
    },
    zeroPadding (num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    getWeather () {
      this.$http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.location.lat}&lon=${this.location.lng}&appid=38022ecab90ab659abc28cd7ec31106a&units=metric`).then(res => {
        this.weather = res.body
      })
    }
  },
  created () {
    this.$http.get('https://extreme-ip-lookup.com/json/').then(response => {
      this.location.lat = response.body.lat
      this.location.lng = response.body.lon
      this.city = `${response.body.city},${response.body.country}`
      this.getWeather()
    })
  }
}
</script>

<style scoped>
  .body {
    width: 100%;
    height: 100%;
    background: rgb(195,55,100);
    background: linear-gradient(0deg, rgba(195,55,100,1) 0%, rgba(29,38,113,1) 100%);
    overflow: hidden;
  }
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    height: 110vh;
    width: 100%;
  }
</style>
