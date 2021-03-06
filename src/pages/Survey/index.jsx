import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`


function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  // const [surveyData, setSurveyData] = useState({})
  // const [isDataLoading, setDataLoading] = useState(false)
  const { saveAnswers, answers } = useContext(SurveyContext)
  // const [error, setError] = useState(false)
  const { data, isLoading, error } = useFetch(`http://localhost:8000/survey`)
  const { surveyData } = data
  const { theme } = useTheme()

  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction pass??e ?? useEffect ne peut pas ??tre asynchrone,
  // il faut utiliser une fonction qui est appel??e dans useEffect et d??clar??e en dehors, comme ici ????.
  // Essayez de commenter le code cr???? dans le chapitre et de d??commenter fetchData pour voir.

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     setSurveyData(surveyData)
  //   } catch (error) {
  // console.log('===== error =====', error)
  // setError(true)
  //   }
  // }

  // useEffect(() => {
  //   // fetchData()
  //   setDataLoading(true)
  //   fetch(`http://localhost:8000/survey`).then((response) =>
  //     response.json().then(({ surveyData }) => {
  //       setSurveyData(surveyData)
  //       setDataLoading(false)
  //     })
  //   )
  // }, [])

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  // METHODE PLUS RECENTE

  // useEffect(() => {
  //   async function fetchSurvey(){
  //     setDataLoading(true)
  //     try{
  //       const response = await fetch(`http://localhost:8000/survey`)
  //       const { surveyData } = await response.json()
  //       setSurveyData(surveyData)
  //     }
  //     catch(err){
  //       // console.log(err)
  //       setError(true)
  //     }
  //     finally{
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchSurvey()
  // }, [])

  if (error) {
    return <span>Oups il y a eu un probl??me</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader data-testid="loader"  />
      ) : (
        <QuestionContent> {surveyData && surveyData[questionNumber]} </QuestionContent>
        )}
        {answers && (
      <ReplyWrapper>
          <ReplyBox
            onClick={() => saveReply(true)}
            isSelected={answers[questionNumber] === true}
            theme={theme}
          >
            Oui
          </ReplyBox>
          <ReplyBox
            onClick={() => saveReply(false)}
            isSelected={answers[questionNumber] === false}
            theme={theme}
          >
            Non
          </ReplyBox>
        </ReplyWrapper>
      )}
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Pr??c??dent</Link>
        {data[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">R??sultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey