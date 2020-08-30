<template>
  <nav>
    <div class="container">
      <div class="nav-logo">
        <nuxt-link to="/">
          <span></span>Первомайская
        </nuxt-link>
      </div>

      <div class="nav-menu">
        <ul class="nav-menu__list" ref="list">
          <li v-for="(page,index) in pages" :key="index" class="nav-menu__item" ref="item">
            <nuxt-link
              :to="page.path"
              :data-id="page.id"
              @mouseover.native="mouseOver"
              @mouseleave.native="mouseLeave"
            >{{ page.title }}</nuxt-link>
          </li>
          <span ref="span"></span>
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
      margin: 28,
      offset: 7,
      spans: [],
      currentId: 0,
      currentWidth: 0,
      currentLeft: 0,
    }
  },
  mounted() {
    // this.imgs.query().then((response) => {
    //   console.log('success', response);
    //   this.imgs = response.data.acf.gallery;
    //   this.$nextTick(() => this.doStuffWithImgs());
    // }, (response) => {
    //   console.log('erreur', response);
    // });

    // this.$nextTick(() => document
    //   .querySelectorAll('.nav-menu__item a')
    //   .forEach((page) => this.spans.push(page.scrollWidth + this.offset)))
    // console.log(this.$refs.item)

    if (process.client) {
      window.addEventListener('load', () => {
        // document
        //   .querySelectorAll('.nav-menu__item a')
        //   .forEach((page) => this.spans.push(page.scrollWidth + this.offset))

        this.$refs.item.forEach((node) => this.spans.push(node.children[0].clientWidth + this.offset))

        // this.margin = Number.parseInt(
        //   getComputedStyle(document.querySelector('.nav-menu__item')).marginLeft
        // )
        this.setPosition()
      })
    }

    // document
    //   .querySelectorAll('.nav-menu__item a')
    //   .forEach((page) => this.spans.push(page.scrollWidth + this.offset))

    // this.margin = Number.parseInt(
    //   getComputedStyle(document.querySelector('.nav-menu__item')).marginLeft
    // )
    // this.setPosition()
  },
  watch: {
      $route() {
        this.setPosition()
      },
    },
  methods: {
    setPosition() {
      // if (process.client) {
      this.currentId = this.pages.findIndex(
        (page) => page.path == this.$nuxt.$route.path
      )

      // let span = document.querySelector('.nav-menu__list span')
      let span = this.$refs.span
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
      // }
    },
    
    // click() {
    //   this.setPosition()
    // },
    mouseLeave(el) {
      this.setPosition()
    },
    mouseOver(el) {
      // if (process.client) {
      // let span = document.querySelector('.nav-menu__list span')
      let span = this.$refs.span

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
        span.style.width = delta + k * 2 * this.margin - k * this.offset + 'px'
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
      // }
    },
  },
}
</script>

<style lang="scss">
nav{
    font-style: normal;
    font-weight: 800;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #262525;
    .container{   
        justify-content: space-between;
        align-items: center;
        padding: 0;
        height: 60px;
        .nav-logo{        
            a{
                align-self: center;
                position: relative;
                left: -35px;
                display: flex;
                align-items: center;
                span{
                    position: relative;
                    width: 70px;
                    height: 70px;
                    top: 25px;
                    left: 0;
                    background: #262525;
                    display: block;
                    margin-right: 25px;
                }
            }
        }

        .nav-menu{
            font-size: 12px;
            line-height: 15px;
            letter-spacing: 0.8px;
            ul{
                list-style-type: none;
                display: flex;
                align-self: center;
                padding: 0;
                position: relative;
                li{
                    margin: 0 28px;
                    position: relative;
                    a{
                        display: flex;
                    } 
                    + span{
                        position: absolute;
                        margin: 0;
                        height: 4px;
                        background: #D88F5E;
                        bottom: -7px;
                        transition: all 0.6s ease-in-out;
                        &.right{
                            left: unset;
                            right: 0;
                        }
                    }  
                            
                }
            }

        }

        .nav-phone{
            display: inline-flex;
            a{
                align-self: center;
                position: relative;
                display: inline-flex;
            }
            span{
                position: relative;
                width: 70px;
                height: 70px;
                top: 25px;
                right: -35px;
                margin-left: -10px;
                background: #262525;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
}

@media (max-width: 1359.9px) {
    nav {
        .container{
            .nav-menu {
                ul {
                    li {
                        margin: 0 10px;
                        position: relative;
                    }
                }
            }
            .nav-logo{
                a{
                    span{
                        width: 30px;
                        height: 30px;
                        top: 5px;
                        left: -10px;
                        margin-right: 10px;
                    }
                }
            }
            .nav-phone{
                span{
                    width: 30px;
                    height: 30px;
                    top: 5px;
                    right: -45px;
                    margin-left: -25px;
                    svg{
                        width: 14px;
                        height: 14px;
                    }
                }
            }
        }
    }
}

@media (max-width: 1023.9px) {
    nav {
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0;
        .container{            
            .nav-menu {
                font-size: 10px;
                line-height: 12px;
                letter-spacing: 0.3px;
                ul{
                    flex-wrap: wrap;
                    justify-content: center;
                    li{
                        margin: 3px 10px;
                        a{
                            &.nuxt-link-exact-active{
                                + span {
                                    width: calc(100% + 6px);
                                    height: 4px;
                                    margin-left: -3px;
                                    bottom: -3px;
                                }
                            }
                        }
                    }
                }
            }
            .nav-phone{
                a {
                    display: none;
                }
            }
        }
    }
}

@media (max-width: 767.9px) {
    nav{
        .container{
            .nav-phone{
                span {
                    width: 30px;
                    height: 30px;
                    top: 5px;
                    right: 0px;
                    margin-left: 10px;
                }
            }
            .nav-menu{
                ul{
                    li{
                        + span {
                            display: none;
                        }
                    }
                }
            }
            .nav-logo{
                a{
                    left: 10px;
                    span {
                        width: 30px;
                        height: 30px;
                        top: 5px;
                        left: -10px;
                        margin-right: 0px;
                    }
                }
            }
        }
    }
}

@media (max-width: 539.9px) {
    nav{
        .container {
            height: auto;
            flex-direction: column;
            .nav-logo{
                a{
                    top: 10px;
                    span {
                        top: 0;
                    }
                }
            }
            .nav-menu{
                margin-top: 10px;
                ul {
                    flex-direction: column;
                    align-items: center;                    
                    li{
                        margin: 4px 10px;
                        a{
                            &.nuxt-link-exact-active{
                                + span {
                                    bottom: -2px;
                                }
                            }
                        }
                    }
                }
            }
            .nav-phone {
                position: absolute;
                right: 0px;
                span{
                    top: 10px;
                }
            }
        }  
    }  
}

@media (max-width: 375px) {  
    nav{
        .container{
            .nav-phone{
                a {
                    display: none;
                }
                span {
                    right: 10px;
                    margin-left: 0;
                }
            }
            .nav-logo{
                a {
                    left: 20px;
                }
            }
        }
    }
}
</style>