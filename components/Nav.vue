<template>
  <nav>
    <div class="container">
      <div class="nav-logo">
        <nuxt-link @click.native="click" to="/">
          <span></span>Первомайская
        </nuxt-link>
      </div>

      <div class="nav-menu">
        <ul class="nav-menu__list">
          <li v-for="(page,index) in pages" :key="index" class="nav-menu__item">
            <nuxt-link
              :to="page.path"
              :data-id="page.id"
              @mouseover.native="mouseOver"
              @mouseleave.native="mouseLeave"
              @click.native="click"
            >{{ page.title }}</nuxt-link>
          </li>
          <span></span>
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
        { id: 0, path: '/', title: 'О комплексе' },
        { id: 1, path: '/properties', title: 'Особенности' },
        { id: 2, path: '/penthouses', title: 'Пентхаусы' },
        { id: 3, path: '/choose', title: 'Выбрать квартиру' },
      ],
      margin: 0,
      offset: 7,
      spans: [],
      currentId: 0,
      currentWidth: 0,
      currentLeft: 0,
    }
  },
  mounted() {
    document
      .querySelectorAll('.nav-menu__item a')
      .forEach((page) => this.spans.push(page.scrollWidth + this.offset))

    this.margin = Number.parseInt(
      getComputedStyle(document.querySelector('.nav-menu__item')).marginLeft
    )
    this.setPosition()
  },
  methods: {
    setPosition() {
      if (process.client) {
        this.currentId = this.pages.findIndex(
          (page) => page.path == this.$nuxt.$route.path
        )

        let span = document.querySelector('.nav-menu__list span')
        let left = this.margin - this.offset
        this.spans.forEach((span, index) => {
          if (index < this.currentId) {
            left += span
          }
        })

        this.currentWidth = this.spans[this.currentId] + this.offset
        this.currentLeft =
          left + this.currentId * 2 * this.margin - this.currentId * this.offset

        span.style.width = this.currentWidth + 'px'
        span.style.left = this.currentLeft + 'px'
      }
    },
    click() {
      this.setPosition()
    },
    mouseLeave(el) {
      this.setPosition()
    },
    mouseOver(el) {
      if (process.client) {
        let span = document.querySelector('.nav-menu__list span')

        let hoveredId = el.target.getAttribute('data-id')
        let k

        if (hoveredId > this.currentId) {
          k = hoveredId - this.currentId
          let delta = this.currentWidth
          this.spans.forEach((span, index) => {
            if (index <= hoveredId && index > this.currentId) {
              delta += span
            }
          })
          span.style.width =
            delta + k * 2 * this.margin - k * this.offset + 'px'
        }

        if (hoveredId < this.currentId) {
          k = this.currentId - hoveredId
          let delta = 0
          this.spans.forEach((span, index) => {
            if (index >= hoveredId && index < this.currentId) {
              delta += span
            }
          })
          span.style.width =
            this.currentWidth +
            delta +
            k * 2 * this.margin -
            k * this.offset +
            'px'
          span.style.left =
            this.currentLeft -
            delta -
            k * 2 * this.margin +
            k * this.offset +
            'px'
        }
      }
    },
  },
}
</script>