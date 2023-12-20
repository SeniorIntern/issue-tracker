'use client'

import { Button, Callout, TextField } from '@radix-ui/themes';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner, ErrorMessage } from '@/app/components'
import { Issue } from '@prisma/client';
import { issueSchema } from '@/app/validationSchema';
import SimpleMDE from 'react-simplemde-editor'

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) })
  const [error, setError] = useState('')
  const [isSubmiting, setIsSubmiting] = useState(false)

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      setIsSubmiting(true)
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data)
      else
        await axios.post('/api/issues', data)
      router.push('/issues')
      router.refresh()
    } catch (error) {
      setIsSubmiting(false)
      setError('An unexpected error occurred.')
    }
  })

  return (
    <div className='max-w-xl'>
      {error &&
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      }
      <form
        onSubmit={onSubmit}
        className='space-y-3'
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} {...register('title')} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) =>
            <SimpleMDE {...field} placeholder='Description' />
          }
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button disabled={isSubmiting}>
          {issue ? 'Update Issue' : 'Submit New Issue'}
          {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm
