import { createFileRoute } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/use-app-form';

export const Route = createFileRoute('/(no-cookie)/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleSubmit() {

  }

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 '>
        <form.AppField 
          name="email"
          children={(field) => (
            <>
              <field.TextField field={field} />
            </>
          )}
        />
      </form>
    </>
  )
}
