<template>
  <div className="movie-button">
    <button
      :class="{
        activate: true,
        loading: loading,
        done: loaded
      }"
      @click="animate"
    >
      <span>
        <svg>
          <use xlink:href="#circle" />
        </svg>
        <svg>
          <use xlink:href="#arrow" />
        </svg>
        <svg>
          <use xlink:href="#check" />
        </svg>
      </span>
      <ul>
        <li>Посоветуй</li>
        <li>Думаю</li>
        <li>Нашел</li>
      </ul>
    </button>

    <svg xmlns="http://www.w3.org/2000/svg" display="none">
      <symbol
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        id="circle"
      >
        <circle cx="8" cy="8" r="7.5" />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="arrow">
        <path
          d="M2.7008908,5.37931459 L2.7008908,5.37931459 C2.9224607,5.60207651 3.2826628,5.60304283 3.50542472,5.38147293 C3.52232305,5.36466502 3.53814843,5.34681177 3.55280728,5.32801875 L5.34805194,3.02646954 L5.34805194,10.3480519 C5.34805194,10.7081129 5.63993903,11 6,11 L6,11 C6.36006097,11 6.65194806,10.7081129 6.65194806,10.3480519 L6.65194806,3.02646954 L8.44719272,5.32801875 C8.6404327,5.57575732 8.99791646,5.61993715 9.24565503,5.42669716 C9.26444805,5.41203831 9.28230129,5.39621293 9.2991092,5.37931459 L9.2991092,5.37931459 C9.55605877,5.12098268 9.57132199,4.70855346 9.33416991,4.43193577 L6.75918715,1.42843795 C6.39972025,1.00915046 5.76841509,0.960656296 5.34912761,1.32012319 C5.31030645,1.35340566 5.27409532,1.38961679 5.24081285,1.42843795 L2.66583009,4.43193577 C2.42867801,4.70855346 2.44394123,5.12098268 2.7008908,5.37931459 Z"
        />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" id="check">
        <path
          id="test"
          d="M4.76499011,6.7673683 L8.2641848,3.26100386 C8.61147835,2.91299871 9.15190114,2.91299871 9.49919469,3.26100386 C9.51164115,3.27347582 9.52370806,3.28637357 9.53537662,3.29967699 C9.83511755,3.64141434 9.81891834,4.17816549 9.49919469,4.49854425 L5.18121271,8.82537365 C4.94885368,9.05820878 4.58112654,9.05820878 4.34876751,8.82537365 L2.50080531,6.97362503 C2.48835885,6.96115307 2.47629194,6.94825532 2.46462338,6.93495189 C2.16488245,6.59321455 2.18108166,6.0564634 2.50080531,5.73608464 C2.84809886,5.3880795 3.38852165,5.3880795 3.7358152,5.73608464 L4.76499011,6.7673683 Z"
        />
      </symbol>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores'

const movieStore = useMovieStore()
const loading = ref(false)
const loaded = ref(false)
const { push } = useRouter()

const animate = async () => {
  loading.value = true

  await movieStore.fetchSuggestedMovie()

  setTimeout(() => {
    loaded.value = true
  }, 1300)

  setTimeout(() => {
    const { currentMovie } = movieStore
    push({
      name: 'movie',
      params: { id: currentMovie.id },
      query: { type: 'suggested' }
    })
  }, 1400)
}
</script>

<style lang="scss">
$background: #5628ee;
$success: #3fdc75;

.activate {
  display: table;
  background: $background;
  box-shadow: 0 4px 20px rgba($background, 0.15);
  line-height: 20px;
  padding: 12px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease;
  span {
    display: inline-block;
    vertical-align: top;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    margin: 0 4px 0 0;
    position: relative;
    overflow: hidden;
    &:before {
      content: '';
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      background: $background;
      border-radius: 50%;
      transform: scale(0);
      transition: transform 0.3s ease, background 0.3s ease;
    }
    svg {
      position: absolute;
      width: 12px;
      height: 12px;
      left: 50%;
      top: 50%;
      margin: -6px 0 0 -6px;
      z-index: 1;
      &:nth-child(1) {
        width: 20px;
        height: 20px;
        top: 0;
        left: 0;
        fill: none;
        margin: 0;
        stroke: #fff;
        stroke-width: 1px;
        stroke-dashoffset: 47.124 * 2;
        stroke-dasharray: 47.124;
      }
      &:nth-child(2) {
        fill: $background;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      &:nth-child(3) {
        fill: $background;
        transform: translateY(20px);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
          opacity 0.3s ease;
      }
    }
  }
  &:hover {
    box-shadow: 0 8px 24px rgba($background, 0.15);
    span {
      svg {
        &:nth-child(2) {
          transform: translateY(-20px);
        }
        &:nth-child(3) {
          transform: translateY(0);
        }
      }
    }
  }
  &:active {
    transform: scale(0.94);
    box-shadow: 0 4px 16px rgba($success, 0.18);
  }
  &.loading {
    span {
      background: none;
      transition: background 0.1s ease 0.3s;
      &:before {
        transform: scale(1);
      }
      svg {
        &:nth-child(1) {
          animation: turn 1.6s linear infinite forwards,
            path 1.6s linear infinite forwards;
        }
        &:nth-child(2) {
          transform: translateY(-20px);
        }
        &:nth-child(3) {
          opacity: 0;
          transform: translateY(0) scale(0.6);
        }
      }
    }
    ul {
      transform: rotateX(90deg);
    }
    &.done {
      background: $success;
      box-shadow: 0 4px 20px rgba($success, 0.15);
      span {
        background: #fff;
        transition: background 0.1s ease 0s;
        &:before {
          background: $success;
          transform: scale(0);
        }
        svg {
          &:nth-child(1) {
            animation: none;
          }
          &:nth-child(3) {
            fill: $success;
            opacity: 1;
            transform: scale(1);
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)
                0.3s,
              opacity 0.4s ease 0.25s;
          }
        }
      }
      ul {
        transform: rotateX(180deg);
      }
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    height: 20px;
    width: 100px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    li {
      --rotateX: 0deg;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      transform-origin: 50% 50%;
      transform: rotateX(var(--rotateX)) translateZ(10px);
      &:nth-child(2) {
        --rotateX: -90deg;
      }
      &:nth-child(3) {
        --rotateX: -180deg;
      }
    }
  }
}

@keyframes turn {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes path {
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
