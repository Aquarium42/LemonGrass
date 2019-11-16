import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
class Quiz extends Component{
    state={
        results: {},//{[id]:success error
        isFinished: false,
        activeQuestion: 0,
        answerState: null, //{[id]: 'success' 'error'}
        quiz:[{
            question: 'Какой размер поля?',
            rightAnswerId: 2,
            id:1,
            answers: [
                {text: '100*35', id:1},
                {text: '100*37', id:2},
                {text: '90*35', id:3},
                {text: '90*37', id:4},
            ]
        },
            {
                question: 'После несопоренного нарушения со стороны защищающейся команды столл-счёт начинается ',
                rightAnswerId: 1,
                id:2,
                answers: [
                    {text: 'со"столинг" 1', id:1},
                    {text: 'максимум с девяти(9)', id:2},
                    {text: '"столинг" восемь(8)', id:3},
                    {text: 'максимум с шести(6)', id:4},
                ]
            }
        ]
    }

    onAnswerClickHandler =answerId=>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success'){
                return
            }
        }
        const results=this.state.results
        const question = this.state.quiz[this.state.activeQuestion]
        if (question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState(
                {answerState:{[answerId]:'success'}, results
                }
            )
            const timeout = window.setTimeout(()=>{
                if(this.isQuizFinished()){
                    this.setState({isFinished:true})
                }
                else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion+1,
                        answerState:null
                    } )
                }
                window.clearTimeout(timeout)
            }, 500)
        }
        else{
            results[question.id]='error'
            this.setState({
                answerState:{[answerId]: 'error'}, results

            })
        }
    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler=()=>{
        this.setState({
            activeQuestion:0,
            answerState:null,
            isFinished:false,
            results:{}

        })
}

componentDidMount() {
        console.log('Quiz ID =', this.props.match.params.id)
}

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Пройдите тест на знание правил</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    : <ActiveQuiz
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}
export default Quiz