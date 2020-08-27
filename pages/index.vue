<template>
  <main>
    <div class="container">
      <div class="main-sidebar">
        <div class="main-sidebar__list">
          <span
            @click="page(index)"
            v-for="(i, index) in slides.length"
            :key="index"
            :class="{'active' : current - 1 == index}"
            class="main-sidebar__item"
          >{{slides[index].title}}</span>
        </div>
      </div>

      <div class="main-slider" :class="direction">
        <div class="main-slider__text">
          <div class="main-slider__text-card">
            <transition-group name="slidetext" tag="div" class="main-slider__text-blocks">
              <div v-for="slide in slides" :key="slide.id" v-show="slide.id == current - 1">
                <h2>{{slide.title}}</h2>
                <p :data-id="slide.id" :inner-html.prop="clamp(slide.description, 2)"></p>
              </div>
            </transition-group>
            <div class="main-slider__counter">
              <span class="main-slider__prev" @click="prev()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.523 490.523">
                  <path
                    d="M487.411,355.047L252.744,120.38c-4.165-4.164-10.917-4.164-15.083,0L2.994,355.047
	c-4.093,4.237-3.976,10.99,0.262,15.083c4.134,3.993,10.687,3.993,14.821,0l227.115-227.115l227.115,227.136
	c4.237,4.093,10.99,3.976,15.083-0.261c3.993-4.134,3.993-10.688,0-14.821L487.411,355.047z"
                  />
                  <path
                    d="M479.859,373.266c-2.831,0.005-5.548-1.115-7.552-3.115L245.192,143.015L18.077,370.151
	c-4.237,4.093-10.99,3.976-15.083-0.262c-3.993-4.134-3.993-10.687,0-14.821l234.667-234.667c4.165-4.164,10.917-4.164,15.083,0
	l234.667,234.667c4.159,4.172,4.148,10.926-0.024,15.085C485.388,372.146,482.681,373.265,479.859,373.266z"
                  />
                </svg>
              </span>

              <transition-group name="slidetext" tag="div" class="main-slider__counter-digit">
                <span v-for="i in [current - 1]" :key="i">{{ i + 1 }}</span>
              </transition-group>/6
              <span class="main-slider__next" @click="prev()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.688 490.688">
                  <path
                    d="M472.328,120.529L245.213,347.665L18.098,120.529c-4.237-4.093-10.99-3.975-15.083,0.262
	c-3.992,4.134-3.992,10.687,0,14.82l234.667,234.667c4.165,4.164,10.917,4.164,15.083,0l234.667-234.667
	c4.237-4.093,4.354-10.845,0.262-15.083c-4.093-4.237-10.845-4.354-15.083-0.262c-0.089,0.086-0.176,0.173-0.262,0.262
	L472.328,120.529z"
                  />
                  <path
                    d="M245.213,373.415c-2.831,0.005-5.548-1.115-7.552-3.115L2.994,135.633c-4.093-4.237-3.975-10.99,0.262-15.083
	c4.134-3.992,10.687-3.992,14.82,0l227.136,227.115l227.115-227.136c4.093-4.237,10.845-4.354,15.083-0.262
	c4.237,4.093,4.354,10.845,0.262,15.083c-0.086,0.089-0.173,0.176-0.262,0.262L252.744,370.279
	C250.748,372.281,248.039,373.408,245.213,373.415z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <transition-group name="slide" tag="div" class="main-slider__img">
          <img v-for="i in [current - 1]" :key="i" :src="imgSrc" />
        </transition-group>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      block: null,
      current: 1,
      direction: 'slider_direction_next',
      slides: [
        {
          id: 0,
          src: '/images/1-layer.png',
          title: 'Инфраструктура',
          description:
            'Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса',
        },
        {
          id: 1,
          src: '/images/2-layer.png',
          title: 'Транспортная доступность',
          description:
            'Жилой комплекс «Первомайска» расположен в престижном Академическом районе. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса',
        },
        {
          id: 2,
          src: '/images/3-layer.png',
          title: 'Архитектура',
          description:
            'Оригинальная архитектура жилого комплекса бизнес-класса «Первомайская» формирует современный стиль жизни. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса',
        },
        {
          id: 3,
          src: '/images/4-layer.png',
          title: 'Благоустройство',
          description:
            'Запроектированные большие окна, которые пропускают много солнечного света, наполнят Ваши квартиры теплотой и уютом. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса. ',
        },
        {
          id: 4,
          src: '/images/5-layer.png',
          title: 'Безопастность',
          description:
            'Современный двор европейского уровня — территория для детей, игр на свежем воздухе и вечерних. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса',
        },
        {
          id: 5,
          src: '/images/6-layer.png',
          title: 'Инженерия',
          description:
            'Оригинальная архитектура жилого комплекса бизнес-класса «Первомайская» формирует современный стиль жизни. Прекрасный вариант для тех, кто предпочитает жить в спокойном районе среди интеллигенции, но при этом чувствовать ритм мегаполиса',
        },
      ],
    }
  },
  mounted() {
    this.block = document.querySelector(
      `.main-slider__text-blocks  p`
    ).clientWidth

    setTimeout(
      () =>
        document
          .querySelectorAll('.main-slider__text-blocks p')
          .forEach((node) => {
            if (node.children[0]) {
              node.children[0].addEventListener('click', (el) => {
                node.innerHTML = this.slides[node.getAttribute('data-id')].description
              })
            }
          }),
      0
    )
  },
  methods: {
    clamp(text, length) {
      let symb = 7.3
      let arrayOfStrings = text.split(' ')
      let clamped = ''
      arrayOfStrings.forEach((element, index) => {
        if (clamped.length < (this.block * length) / symb) {
          clamped += element + ' '
        }
      })
      return clamped.length < text.length
        ? clamped + '<span class="clamp">...</span>'
        : text
    },
    page(index) {
      this.direction =
        this.current < index + 1
          ? 'slider_direction_next'
          : 'slider_direction_prev'
      this.current = index + 1
    },
    next: function () {
      this.direction = 'slider_direction_next'
      this.current == this.slides.length
        ? (this.current = 1)
        : (this.current += 1)
    },
    prev: function () {
      this.direction = 'slider_direction_prev'
      this.current == 1
        ? (this.current = this.slides.length)
        : (this.current -= 1)
    },
  },

  computed: {
    imgSrc() {
      return this.slides[this.current - 1].src
    },
  },
}
</script>

<style>
</style>