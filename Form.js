import React, {Component } from 'react';
import Step1 from './Step1.js';
import Step2 from './Step2.js';
import OurCamera from './Camera.js';
import ShowDetail from './ShowDetail.js';
import moment from 'moment';

export class Form extends Component {
    state = {
        step: 1,
        id: '',
        first: '',
        last: '',
        sex: '',
        birth: moment().format('DD-MM-YYYY'),
        acneYear: 0,
        acneMonth: 0,
        period: 'ไม่มี',
        pregnant: 'ไม่มี',
        medic: [],
        medical: [],
        drug: [],
        drugs: [],
        User: this.props.User,
    };

    // Proceed to next step
    nextStep = () => {
      const { step } = this.state;
      this.setState({
        step: step + 1
      });
    };

    // Go back to prev step
    prevStep = () => {
      const { step } = this.state;
      this.setState({
        step: step - 1
      });
    };

    // Handle fields change
    handleChange = (input, e) => {

      // format id
      if (input === 'id')  {

        e = e.replace(/[\W\D\s\._\-]+/g, '');

        var split = 1;
        var chunk = [];
        
        for (var i = 0, len = e.length; i < len; i += split) {
          if ( i >= 1 && i <= 4 ) {
            split = 4;
          }
          else if ( i >= 5 && i <= 9 ) {
            split = 5;
          }
          else if ( i >= 10 && i <= 11 ) {
            split = 2;
          }
          else {
            split = 1;
          }
          
          chunk.push( e.substr( i, split ) );
        }

        e = chunk.join("-");
        
      } else if (input === 'birth') {
        e = moment(e).format('DD-MM-YYYY')
      }
      
      // set input for all state
      this.setState({ [input]: e },
      // combine month and year into durationAcne field
      () =>
        this.setState({ acne: `${this.state.acneYear} ปี ${this.state.acneMonth} เดือน` })
      );
    };


    render() {
      const { step } = this.state;
      const { id, first, last, sex, birth, acneYear, acneMonth, acne, period, pregnant, medic, medical, drug, drugs } = this.state;
      const values = { id, first, last, sex, birth, acneYear, acneMonth, acne, period, pregnant, medic, medical, drug, drugs };

      console.log(this.state);

      switch(step) {
        case 1:
          return (
            <Step1
              nextStep={this.nextStep}
              prevStep={this.props.onPress}
              handleChange={this.handleChange}
              values={values}
            />
          );
        case 2:
            return (
                <Step2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            );
        case 3:
              return (
                  <ShowDetail
                    nextStep={this.nextStep}
                    onPress={this.prevStep}
                    values={values}
                    onPress1={this.props.onPress}
                    User={this.state.User}
                  />
              );
      }        
    }
}

export default Form;
