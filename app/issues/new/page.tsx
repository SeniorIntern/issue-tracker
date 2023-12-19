'use client'

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

type IssueForm = {
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
      className='max-w-xl space-y-3'
    >
      <TextField.Root>
        <TextField.Input {...register('title')} placeholder="Title" />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) =>
          <SimpleMDE {...field} placeholder='Description' />
        }
      />
      <Button>Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage
