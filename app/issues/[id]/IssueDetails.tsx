import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { Issue } from '@prisma/client'

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>
        {issue.title}
      </Heading>
      <Flex gap='4' my='4'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
        <ReactMarkdown>
          {issue.description}
        </ReactMarkdown>
      </Card>
    </>
  )
}

export default IssueDetails
