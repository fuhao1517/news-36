<template>
  <div class="footer-wrap">
    <div class="footer" v-show="!isFocus">
      <!-- 普通页脚 -->
      <input type="text" placeholder="写跟帖" @focus="handleFocule" />

      <div class="right">
        <router-link :to="`/post_comment/${post.id}`">
          <span class="comment">
            <i>{{post.comment_length}}</i>
            <em class="iconfont iconpinglun-"></em>
          </span>
        </router-link>
        <!-- 收藏 -->
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
      <textarea
        rows="3"
        ref="textarea"
        v-model="value"
        :placeholder="placeholder"
        @blur="handleBlur"
        :autofocus="isFocus"
      ></textarea>
      <span @click="handleSubmit">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /* 输入框是否获得焦点 */
      isFocus: false,
      /* 评论的内容 */
      value: "",
      /* 输入框的提示文字 */
      placeholder: "写跟帖",
    };
  },
  /* 接受文章的详情 */
  // props: ["post"],
  /* replyComment 要回复的评论 */
  props: ["post", "replyComment"],

  watch: {
    replyComment() {
      this.isFocus = true;
      this.placeholder = "@" + this.replyComment.user.nickname;
    }
  },
  methods: {
    /* 获得焦点时触发 */
    handleFocule() {
      this.isFocus = true;
    },
    /* 失去焦点时触发 */
    handleBlur() {
      if (!this.value) {
        this.isFocus = false;
      }
    },
    /* 发布评论 */
    handleSubmit() {
      if (!this.value) {
        return;
      }
      this.$axios({
        url: "/post_comment/" + this.post.id,
        method: "POST",
        /* 添加头信息 */
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data: {
          content: this.value
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "评论发布成功") {
          /* 触发父组件方法更新评论的列表 */
          this.$emit("getComments", this.post.id);
          /* 隐藏输入框 */
          this.isFocus = false;
          /* 清空输入框的值 */
          this.value = "";
          /* 滚动到顶部 */
          window.scrollTo(0, 0);
        }
      });
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
  padding: 20px 5px 7px 10px;
  box-sizing: border-box;
  background: #fff;
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