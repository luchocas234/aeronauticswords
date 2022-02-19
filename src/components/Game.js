import React, { Component } from 'react';
import airplaneData from '../airplaneData';


export default class Game extends Component{
    static defaultProps ={
        maxWrongs:10
    }

   constructor(props) {
       super(props);
       this.state={
           wordsguessed:new Set([]),
           nombres:airplaneData.data.airplane,
           start:true,
           aciertos:0,
           mistake: 10,
           id:0,
           guessed: new Set([]),
           model: "ejemplo1",
           imagen:"https://cdn.pocket-lint.com/r/s/970x/assets/images/148109-gadgets-feature-the-most-interesting-and-important-aircraft-of-all-time-image1-ilaq2cbk0j-jpg.webp?v1"
       }
   } 
   
reset =() => {
    
    const airplaneArray = this.state.nombres
    const randomNumber = Math.floor(Math.random() * airplaneArray.length)
    const url = airplaneArray[randomNumber].imagen

    this.setState({
        wordsguessed: new Set([]),
        nombres:airplaneData.data.airplane,
        start:false,
        aciertos:0,
        mistake: 10,
        guessed: new Set([]),
        model: airplaneArray[randomNumber].model,
        id: airplaneArray[randomNumber].id,

        imagen: url
      });

}





buttons (){
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
        <button className='btn'
            key={letter}
            value={letter}
            //onClick={handleGuess}
            onClick={this.handleGuess}
            disabled={this.state.guessed.has(letter)}
            
            
        >
            {letter}
        </button>
    ))
}

handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake - (st.model.includes(letter) ? 0 : 1)
    }));
  }
nextimage(nombre){
    

    const airplaneArray = this.state.nombres
    const newArray = airplaneArray.filter((x) => x.model !== (nombre))
    const randomNumber = Math.floor(Math.random() * newArray.length)
    const url = newArray[randomNumber].imagen
    

    this.setState(st => ({
        
        nombres: newArray,
        aciertos: this.state.aciertos + 1,
        mistakake: this.state.mistake,
        guessed: new Set([]),
        model: newArray[randomNumber].model,
        imagen: url
      }));

}

esrepetido(){
    

}

 
  guessedWord() {
    return this.state.model.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

   render(){ 
    const gameOver = this.state.mistake === 0 
    const isWinner = this.guessedWord().join("") === this.state.model;
    const gameStart= this.state.start;
    let gameStat = this.buttons();
    
    

    if (isWinner) {
            if(this.state.nombres.length >1){
                 this.nextimage(this.state.model)}
            else{
                gameStat="Ganaste"
            }
            
            
           
    
        
      }
  
      if (gameOver) {
        gameStat = "You Lost!!!"
      }

  return (



    <div className='Game'>
        <h1>Aeronautic Words D:</h1>
        {gameStart? 
        <div>
            
            <button className="btn1" onClick={this.reset} > START </button> 
        </div>
        : 

        <div className='inicio-game'>
            <div className='vidas'>
                <h2>Vidas: {this.state.mistake}</h2>
                <h2> Aciertos: {this.state.aciertos}</h2>
            </div>

            <div className='avion'>
             <img src={this.state.imagen} className='avion-img'alt="airplanes"/>
                <h2>{this.guessedWord()}</h2> 
            </div>

            <div className='teclas'>
                {gameStat}
            </div>

            <br/>

            <button className="btn2" onClick={this.reset} > RESTART </button>
        
        
        </div>}
    


    </div>
    )
    }}
