<template>
  <div class="footer-wrap">
    <div class="footer" v-show="!isFocus">
      <!-- 普通页脚 -->
      <input type="text" placeholder="写跟帖" @focus="handleFocule" />

      <div class="right">
        <span class="comment">
          <i>{{post.comment_length}}</i>
          <em class="iconfont iconpinglun-"></em>
        </span>
        <span
          class="iconfont iconshoucang"
          :class="{star_active:post.has_star}"
          @click="$emit('handleStar')"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>

    <!-- 输入评论页脚, 这里显示隐藏必须要用v-show，原因是为了获得textare的dom元素 -->
    <div class="footer-comment" v-show="isFocus">
      <textarea rows="3" @blur="isFocus=false" :autofocus="isFocus"></textarea>
      <span>发送</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 输入框是否获得焦点 */
      isFocus: false
    };
  },
  /* 接受文章的详情 */
  props: ["post"],
  methods: {
    /* 获得焦点时触发 */
    handleFocule() {
      this.isFocus = true;
    }
  }
};
</script>

<style scope lang="less">
.footer-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px #eee solid;
  padding: 0 10px;
  margin-top: 100px;
  box-sizing: border-box;
  .footer-comment {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    textarea {
      width: 260/360 * 100vw;
      border: none;
      border-radius: 10px;
      background: #d7d7d7;
      resize: none;
    }
    span {
      height: 20px;
      padding: 3px 15px;
      text-align: center;
      line-height: 20px;
      background: red;
      color: #fff;
      border-radius: 50px;
      font-size: 12px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background: #fff;
    input {
      width: 40%;
      height: 36/360 * 100vw;
      font-size: 12px;
      padding: 0 15px;
      border: none;
      border-radius: 50px;
      background: #d7d7d7;
    }
    .right {
      .comment {
        position: relative;
        i {
          position: absolute;
          top: -9px;
          right: -11px;
          background: red;
          border-radius: 50px;
          color: #fff;
          font-size: 12px;
          padding: 0 10px;
        }
      }
      .iconshoucang {
        margin: 0 10px;
      }
      .iconfont {
        font-size: 20px;
      }
    }
    .star_active {
      color: red;
    }
  }
}
</style>