import {
    Row, Col, Table, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, ButtonGroup
} from 'reactstrap';

import Link from 'next/link'
import DateTime from './DateTime'
import CustomCard from './CustomCard'

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

import { setHeatMode, setHeatSetPoint } from '../components/Socket_Client'



class PoolSpaState extends React.Component {

    constructor(props) {
        super(props)


        this.state = {
            setPoint: 0
            
          }

        this.handleToggleState = this.handleToggleState.bind(this)
        this.changeHeat = this.changeHeat.bind(this)
       // this.changeTempVal = this.changeTempVal.bind(this)

          //console.log(`evaling state.setpoint`)
       if (this.state.setPoint!==this.props.data.setPoint){
           this.setState({setPoint: this.props.data.setPoint})
       }
    }




    handleToggleState(){
        //console.log(`toggle ${this.state.data.name} val`)
    }

    changeHeat = mode => {

            //console.log(`changing ${mode} for ${this.props.data.name}`)
            setHeatMode(this.props.data.name, mode)
    }

      changeSetPointVal = (setPoint) => {
          if (this.state.setPoint!==setPoint){
             
          //console.log(`setPoint change! ${setPoint}`)
        this.setState({
          setPoint: setPoint
        });
    }
      };

    changeSetPointComplete = () => {
        console.log(`changing ${this.state.setPoint} for ${this.props.data.name}`)
        setHeatSetPoint(this.props.data.name, this.state.setPoint)
    }

    render() {

    
        return (
         
            <div>           


                        <a name={this.props.data.name} className="anchor"></a>
                        <CustomCard name={this.props.data.name}>
                        
                        

                   
                            <Row>
                                <Col lg={3} md={6} sm={12} xs={12}>Pool State
                                </Col>
                                <Col lg={3} md={6} sm={12} xs={12}>
                                    {this.props.data.state}
                                </Col>
                            </Row>
                         
                    
                            <Row>
                                <Col lg={3} md={6} sm={12} xs={12}>Temp</Col>
                                <Col lg={3} md={6} sm={12} xs={12}>{this.props.data.temp}
                          
                                
                                 </Col>
                            </Row>
                            <Row>
                               <Col>
                                Set Point
                                
                                
                                <Slider className='slider custom-labels' 
                                         min={50}
                                         max={110}
                                        value={this.state.setPoint===0?this.props.data.setPoint:this.state.setPoint}
                                        onChange={this.changeSetPointVal}
                                        onChangeComplete={this.changeSetPointComplete}
                                    />
                                  <div className='text-center'>
                                  {this.props.data.setPoint}
                                  </div>
                                  </Col>
                            </Row>
                            <Row>
                                <Col lg={3} md={6} sm={12} xs={12}>
                               Heater Mode
                               {this.props.data.heatModeStr} ({this.props.data.heatMode})
                                <div className='text-center'>
                                <ButtonGroup >
                                    <Button onClick={() => this.changeHeat(0)} color={this.props.data.heatMode===0?'success':'secondary'}>Off</Button>
                                    <Button onClick={() => this.changeHeat(1)} color={this.props.data.heatMode===1?'success':'secondary'}>Heater</Button>
                                    <Button onClick={() => this.changeHeat(2)} color={this.props.data.heatMode===2?'success':'secondary'}>Solar Pref</Button>
                                    <Button onClick={() => this.changeHeat(3)} color={this.props.data.heatMode===3?'success':'secondary'}>Solar</Button>
                                </ButtonGroup>
                                </div>
                                </Col>
                            </Row>
                           
                      

                        
                        
                        </CustomCard>
                    
                





            </div>



        );
    }
}

export default PoolSpaState;