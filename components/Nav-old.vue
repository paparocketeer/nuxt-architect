<template>
  <nav>
    <div class="container">
      <div class="nav-logo">
        <nuxt-link to="/">
          <span></span>Первомайская
        </nuxt-link>
      </div>

      <div class="nav-menu">
        <ul class="nav-menu__list">
          <li v-for="(page,index) in pages" :key="index" class="nav-menu__item">
            <nuxt-link
              ref="link"
              :to="page.path"
              :data-id="page.id"
              @mouseover.native="mouseOver"
              @mouseleave.native="mouseLeave"
              @click.native="click"
            >{{ page.title }}</nuxt-link>
            <span></span>
          </li>

          <!-- <li class="nav-menu__item" data-id="2" @mouseover="mouseOver">
            <nuxt-link to="/properties">
              Особенности
              <span></span>
            </nuxt-link>
          </li>
          <li class="nav-menu__item" data-id="3" @mouseover="mouseOver">
            <nuxt-link to="/penthouses">
              Пентхаусы
              <span></span>
            </nuxt-link>
          </li>
          <li class="nav-menu__item" data-id="4" @mouseover="mouseOver">
            <nuxt-link to="/choose">
              Выбрать квартиру
              <span></span>
            </nuxt-link>
          </li>-->
        </ul>
      </div>
      <div class="nav-phone">
        <a href="#">8 888 888 88 88</a>
        <span>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.998047 26.5522L26.5556 0.995117L28.005 2.44437L2.44665 28.0016L0.998047 26.5522ZM12.9987 26.5522L26.5556 12.9957L28.005 14.4437L14.4474 28.0016L12.9987 26.5522ZM14.5569 0.995117L0.998047 14.5533L2.44665 16.001L16.0042 2.44437L14.5569 0.995117Z"
              fill="#F0F0F0"
            />
          </svg>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        { id: 0, path: '/', title: 'О комплексе', ref: '0' },
        { id: 1, path: '/properties', title: 'Особенности', ref: '1' },
        { id: 2, path: '/penthouses', title: 'Пентхаусы', ref: '2' },
        { id: 3, path: '/choose', title: 'Выбрать квартиру', ref: '3' },
      ],
      margin: 0,
      offset: 14,
      currentSpan: 0,
      spans: [],
      currentId: 0,
      totalSpan: 0,
    }
  },
  watch: {
    $route() {
    //   this.currentId = this.pages.findIndex(
    //     (page) => page.path == this.$nuxt.$route.path
    //   )
      console.log(localStorage.getItem('LS_FROM_KEY'))
      // if (process.client) {
      // this.$refs.link[0].$el.style.width = this.spans[0]
      // this.$refs.link[1].$el.style.width = this.spans[1]
      // this.$refs.link[2].$el.style.width = this.spans[2]
      // this.$refs.link[3].$el.style.width = this.spans[3]
      // document.querySelectorAll('.nav-menu__item a+span')[1].style.width = this.spans[1]
      // document.querySelectorAll('.nav-menu__item a+span')[2].style.width = this.spans[2]
      // document.querySelectorAll('.nav-menu__item a+span')[3].style.width = this.spans[3]
      // }
      // let current = document.querySelector(
      // '.nav-menu__item .nuxt-link-exact-active+span'
      // )
      // if (process.client) {
      // console.log(document.querySelector('.nav-menu__item a+span')[0])
      // }

      // let current = document.querySelector(
      // '.nav-menu__item .nuxt-link-exact-active'
      // ).getAttribute('data-id')
      // console.log(current)

      // let normalSpan = this.spans[this.currentId] + 'px'
      // console.log(normalSpan)
      // current.style.width = normalSpan
      // this.totalSpan = normalSpan
    },
  },
  mounted() {
    if (process.client) {
      document
        .querySelectorAll('.nav-menu__item a')
        .forEach((page) => this.spans.push(page.offsetWidth + this.offset))
      // console.log(this.spans)

      // this.$nextTick(function () {
      //         document.querySelectorAll('.nav-menu__item a+span')[0].style.width = this.spans[0]
      //         document.querySelectorAll('.nav-menu__item a+span')[1].style.width = this.spans[1]
      //         document.querySelectorAll('.nav-menu__item a+span')[2].style.width = this.spans[2]
      //         document.querySelectorAll('.nav-menu__item a+span')[3].style.width = this.spans[3]
      //     })

      // console.log(document.querySelectorAll('.nav-menu__item a'))

      this.margin = Number.parseInt(
        getComputedStyle(document.querySelector('.nav-menu__item')).marginLeft
      )
    }
  },
  methods: {
    click() {
      if (process.client) {
        this.spans.forEach((span, index) => {
          document.querySelector(
            `.nav-menu__item a[data-id="${index}"] + span`
          ).style.width = span + 'px'
        })
      }
    },
    mouseLeave(el) {
        if (process.client) {
        this.spans.forEach((span, index) => {
          document.querySelector(
            `.nav-menu__item a[data-id="${index}"] + span`
          ).style.width = span + 'px'
        })
      }
    //   let current = document.querySelector(
    //     '.nav-menu__item .nuxt-link-exact-active+span'
    //   )
    //   let normalSpan = this.spans[this.currentId] + 'px'
    //   current.style.width = normalSpan
      //   this.totalSpan = normalSpan
    },
    mouseOver(el) {
      if (process.client) {

          this.currentId = this.pages.findIndex(
        (page) => page.path == this.$nuxt.$route.path
      )

        let current = document.querySelector(
          '.nav-menu__item .nuxt-link-exact-active+span'
        )

        let hovered = el.target.getAttribute('data-id')
        let ltr, k

        if (hovered > this.currentId) {
          ltr = true
          k = hovered - this.currentId
          current.classList.remove('right')
        }
        if (hovered < this.currentId) {
          ltr = false
          k = this.currentId - hovered
          current.classList.add('right')
        }

        let totalSpan = this.spans[this.currentId]
        let index = hovered

        while (index != this.currentId) {
          totalSpan += this.spans[index] + this.offset
          ltr ? index-- : index++
        }
        this.totalSpan = totalSpan + k * this.margin + 'px'

        current.style.width = this.totalSpan
      }
    },
  },
}
</script>