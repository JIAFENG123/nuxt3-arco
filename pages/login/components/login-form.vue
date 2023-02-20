<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">
      {{ $t('login.form.title') }}
    </div>
    <!-- <div class="login-form-sub-title">{{ $t('login.form.title') }}</div> -->
    <div class="login-form-error-msg">
      {{ errorMessage }}
    </div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <!-- <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="(setRememberPassword as any)"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>{{ $t('login.form.forgetPassword') }}</a-link>
        </div> -->
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <!-- <a-button type="text" long class="login-form-register-btn">
          {{ $t('login.form.register') }}
        </a-button> -->
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { useStorage } from '@vueuse/core'
import useLoading from '@/hooks/loading'
import type { LoginData } from '@/api/users'
import { useUserStore } from '@/store'

// const router = useRouter()
const errorMessage = ref('')
const { loading, setLoading } = useLoading()
const userStore = useUserStore()

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: '', // 演示默认值
  password: '', // demo default value
})
const userInfo = reactive({
  username: '',
  password: '',
})

const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (!errors) {
    setLoading(true)
    try {
      await userStore.LoginByUsernameDev(values as LoginData)
      // const { redirect, ...othersQuery } = router.currentRoute.value.query
      // router.push({
      //   name: (redirect as string) || 'Workplace',
      //   query: {
      //     ...othersQuery,
      //   },
      // })
      const { rememberPassword } = loginConfig.value
      const { username, password } = values
      // 实际生产环境需要进行加密存储。
      // The actual production environment requires encrypted storage.
      loginConfig.value.username = rememberPassword ? username : ''
      loginConfig.value.password = rememberPassword ? password : ''
      // Message.success(t('login.form.login.success'))
    }
    catch (err) {
      errorMessage.value = (err as Error).message
    }
    finally {
      setLoading(false)
    }
  }
}
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
