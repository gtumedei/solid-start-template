import { css } from "vite-plugin-inline-css-modules"
import { z } from "zod"
import AppTitle from "~/components/app-title"
import { MainLayout } from "~/layouts/MainLayout"
import { createForm } from "~/lib/form"

const FormPage = () => {
  const { form, errors, isValid, isSubmitting } = createForm({
    schema: z.object({
      email: z.string().email(),
      password: z.string()
    }),
    onSubmit: (values) => console.log(values)
  })

  form
  return (
    <MainLayout>
      <main>
        <AppTitle>Form</AppTitle>

        <h1 class="text-6xl text-sky-700 font-thin uppercase my-16">
          Form
        </h1>
        <div class="max-w-3xl flex flex-col gap-6 m-auto">
          <form use:form class="flex flex-col gap-3">
            <input class={style.input} type="text" name="email" placeholder="Email" />
            <input class={style.input} type="password" name="password" placeholder="Password" />
            <pre class="text-left">{JSON.stringify(errors(), null, 2)}</pre>
            <button type="submit" class="btn mx-auto" disabled={!isValid() || isSubmitting()}>Sign in</button>
          </form>
        </div>
      </main>
    </MainLayout>
  )
}

const style = css`
  .input {
    @apply rounded-lg px-3 py-2 border-2 border-gray-300 focus:border-gray-400 outline-none;
  }
`

export default FormPage
