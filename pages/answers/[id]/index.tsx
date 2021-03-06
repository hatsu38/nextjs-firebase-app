import Head from 'next/head'
import { Answer } from '../../../models/Answer'
import { Question } from '../../../models/Question'
import Layout from '../../../components/Layout'
import TwitterShareButton from '../../../components/TwitterShareButton'

type Props = {
  answer: Answer
  question: Question
}
function getDescription(answer: Answer) {
  const body = answer.body.trim().replace(/[ \r\n]/g, '')
  if (body.length < 140) {
    return body
  }
  return body.substring(0, 140) + '...'
}

export default function AnswersShow(props: Props) {
  const ogpImageUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/api/answers/${props.answer.id}/ogp`
  const description = getDescription(props.answer)
  return (
    <Layout>
      <Head>
      <meta property="og:image" key="ogImage" content={ogpImageUrl} />
        <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        <meta name="twitter:image" key="twitterImage" content={ogpImageUrl} />
        <meta name="description" key="description" content={description} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
      </Head>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <>
            <div className="card">
              <div className="card-body">{props.question.body}</div>
            </div>

            <section className="text-center mt-4">
              <h2 className="h4">回答</h2>

              <div className="card">
                <div className="card-body text-left">{props.answer.body}</div>
              </div>
            </section>
          </>
        </div>
        <div className="my-3 d-flex justify-content-center">
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_WEB_URL}/answers/${props.answer.id}`}
            text={props.answer.body}
          ></TwitterShareButton>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const res = await fetch(process.env.API_URL + `/api/answers/${query.id}`)
  const json = await res.json()
  return { props: json }
}